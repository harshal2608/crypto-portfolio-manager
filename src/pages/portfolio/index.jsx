import { Button } from "@mui/material";
import BasicModal from "../../components/Modal";
import { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../../context/globalContext";
import BasicTable from "../../components/Table";
import formatNumber from "../../utils/formatNumber";
import { Typography } from "@mui/material";
import { Stack } from "@mui/material";

const Portfolio = () => {
  const ctx = useContext(GlobalContext);
  const [open, setOpen] = useState(false);
  // const [data, setData] = useState([]);

  const HandleAddAssets = () => {
    setOpen(true);
  };

  const createArray = () => {};
  useEffect(() => {
    createArray();
    if (ctx.total === 0) {
      ctx.globalAssets.forEach((e) => {
        ctx.setTotal(
          (prv) => prv + parseFloat(e.holdings) * parseFloat(e.quote.INR.price)
        );
      });
    }
  }, [ctx.globalAssets]);

  return (
    <Stack spacing={2}>
      {/* <Button variant="contained" disableElevation onClick={HandleAddAssets}>
        Add Assets
      </Button> */}
      <Typography variant="h4">Total Portfolio Worth:</Typography>
      <Typography variant="h5">&#8377; {formatNumber(ctx.total)}</Typography>
      <BasicModal />
      {/* {data.length > 0 ? <BasicTable data={data} /> : null} */}
    </Stack>
  );
};

export default Portfolio;
