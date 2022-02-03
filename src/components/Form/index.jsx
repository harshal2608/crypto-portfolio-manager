import React from "react";
import { useEffect, useState, useContext } from "react";
import { GlobalContext } from "../../context/globalContext";

import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import SelectVariants from "../Select";
import Button from "@mui/material/Button";
import styled from "@emotion/styled";

import formatNumber from "../../utils/formatNumber";

const StyledButton = styled(Button)`
  width: 100%;
`;

function createData(id, name, symbol, price) {
  return { id, name, symbol, price };
}

export default function Form() {
  const ctx = useContext(GlobalContext);

  const [rows, setRows] = useState([]);
  const [Id, setId] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [localSum, setLocalSum] = useState(0);

  const setAssetId = (id) => {
    setId(id);
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleTotalValue = () => {
    const item = ctx.globalAssets.find((e) => e.id === Id);
    const newItem = { ...item, holdings: quantity };

    ctx.addPortfolioAsset(newItem);
    ctx.setTotal((prvTotal) => parseFloat(prvTotal) + parseFloat(localSum));
    setQuantity(0);
    setId(0);
    setLocalSum(0);
  };

  useEffect(() => {
    const newRows = ctx.globalAssets.map((i) =>
      createData(i.id, i.name, i.symbol, i.quote.INR.price)
    );
    setRows(newRows);
  }, [ctx.globalAssets]);

  useEffect(() => {
    if (!!Id && quantity !== 0) {
      const item = rows.find((e) => e.id === Id);
      console.log(item);
      const sum = quantity * parseFloat(item.price);
      setLocalSum(sum);
    }
  }, [quantity, Id]);

  return (
    <>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Select Coin
      </Typography>

      <SelectVariants rows={rows} setAssetId={setAssetId} />

      <TextField
        hiddenLabel
        fullWidth
        margin="dense"
        label="Quantity"
        variant="outlined"
        type="number"
        value={quantity}
        onChange={handleQuantityChange}
      />
      <Typography align="center">
        Total Value:{formatNumber(localSum)}
      </Typography>

      <StyledButton
        disabled={!localSum}
        variant="contained"
        onClick={handleTotalValue}
      >
        Add To Portfolio
      </StyledButton>
    </>
  );
}
