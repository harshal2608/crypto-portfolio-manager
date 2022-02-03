import React from "react";
import { useEffect, useState, useContext } from "react";
import { GlobalContext } from "../../context/globalContext";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import SelectVariants from "../Select";
import Button from "@mui/material/Button";
import styled from "@emotion/styled";

import formatNumber from "../../utils/formatNumber";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const StyledButton = styled(Button)`
  width: 100%;
`;

function createData(id, name, symbol, price, rank, supply, holdings) {
  return { id, name, symbol, price, rank, supply, holdings };
}

export default function BasicModal({ open, handleClose }) {
  const ctx = useContext(GlobalContext);

  const [rows, setRows] = useState([]);
  const [childId, setChildId] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [localSum, setLocalSum] = useState(0);

  const childToParent = (id) => {
    setChildId(id);
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleTotalValue = () => {
    const item = ctx.globalAssets.find((e) => e.id === childId);
    const newItem = { ...item, holdings: quantity };

    ctx.addPortfolioAsset(newItem);
    ctx.setTotal((prvTotal) => parseFloat(prvTotal) + parseFloat(localSum));
    setQuantity(0);
    setChildId(0);
    setLocalSum(0);
    handleClose();
  };

  useEffect(() => {
    const newRows = ctx.globalAssets.map((i) =>
      createData(
        i.id,
        i.name,
        i.symbol,
        i.quote.INR.price,
        i.cmc_rank,
        formatNumber(i.circulating_supply),
        10
      )
    );
    setRows(newRows);
  }, [ctx.globalAssets]);

  useEffect(() => {
    if (!!childId && quantity !== 0) {
      const item = rows.find((e) => e.id === childId);
      const sum = quantity * parseFloat(item.price);
      setLocalSum(sum);
    }
  }, [quantity, childId]);

  // if (!open) return null;
  return (
    // <Modal
    //   open={open}
    //   onClose={handleClose}
    //   aria-labelledby="modal-modal-title"
    //   aria-describedby="modal-modal-description"
    // >
    <>
      {/* <Box sx={style}> */}
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Select Coin
      </Typography>

      <SelectVariants rows={rows} childToParent={childToParent} />

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
      <Typography align="center">{formatNumber(localSum)}</Typography>

      <StyledButton
        disabled={!localSum}
        variant="contained"
        onClick={handleTotalValue}
      >
        Add To Portfolio
      </StyledButton>
      {/* </Box> */}
    </>
  );
}
