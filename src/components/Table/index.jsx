import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState, useEffect, useContext } from "react";

import { GlobalContext } from "../../context/globalContext";

import styled from "@emotion/styled";
import formatNumber from "../../utils/formatNumber";

const StyledTableRow = styled(TableRow)``;

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    fontWeight: "600",
    fontSize: "1rem",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: "1rem",
    fontWeight: "600",
  },
}));

const Span = styled.span`
  font-weight: normal;
`;

function createData(name, symbol, price, rank, supply, holdings) {
  return { name, symbol, price, rank, supply, holdings };
}

export default function BasicTable({ data }) {
  const ctx = useContext(GlobalContext);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const newRows = data.map((i) =>
      createData(
        i.name,
        i.symbol,
        formatNumber(i.quote.INR.price),
        i.cmc_rank,
        formatNumber(i.circulating_supply),
        i.holdings ? i.holdings : 0
      )
    );
    setRows(newRows);
  }, [data]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell>#</StyledTableCell>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="right">Price</StyledTableCell>
            <StyledTableCell align="right">Circulating Supply</StyledTableCell>
            <StyledTableCell align="right">Holdings</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {rows
            ? rows.map((row) => (
                <StyledTableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{row.rank}</TableCell>
                  <StyledTableCell component="th" scope="row">
                    {row.name} <Span>{row.symbol}</Span>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    &#8377; {row.price}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.supply} {row.symbol}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.holdings}
                  </StyledTableCell>
                </StyledTableRow>
              ))
            : null}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
