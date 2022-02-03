import Form from "../Form";
import { useEffect, useContext } from "react";
import { GlobalContext } from "../../context/globalContext";

import formatNumber from "../../utils/formatNumber";
import { Typography, Stack, Card, CardContent } from "@mui/material";
import styled from "@emotion/styled";

const Header = styled(Typography)`
  @media only screen and (max-width: 600px) {
    font-size: 1.5rem;
    font-weight: bold;
  }
`;

const Portfolio = () => {
  const ctx = useContext(GlobalContext);

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
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <Header variant="h4">Total Portfolio Value:-</Header>
          <Typography variant="h5">
            &#8377; {formatNumber(ctx.total)}
          </Typography>
          <Form />
        </Stack>
      </CardContent>
    </Card>
  );
};

export default Portfolio;
