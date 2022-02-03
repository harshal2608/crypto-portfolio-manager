import React from "react";
import { useState, useEffect } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import styled from "@emotion/styled";

import { ImageWrapper, Image, Span, Row } from "../../theme/components";
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
    alignItems: "center",
  },
}));

function createData(id, name, symbol, price, rank, supply, holdings) {
  return { id, name, symbol, price, rank, supply, holdings };
}

export default function BasicTable({ data }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    const newRows = data.map((i) =>
      createData(
        i.id,
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
    <Card>
      <CardContent>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <TableContainer>
          <Table stickyHeader aria-label="simple table">
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>#</StyledTableCell>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="right">Price</StyledTableCell>
                <StyledTableCell align="right">
                  Circulating Supply
                </StyledTableCell>
                <StyledTableCell align="right">Holdings</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {rows
                ? rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <StyledTableRow key={row.name}>
                        <TableCell>{row.rank}</TableCell>
                        <StyledTableCell>
                          <Row>
                            <ImageWrapper>
                              <Image
                                src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${row.id}.png`}
                              />
                            </ImageWrapper>
                            {row.name} <Span>{row.symbol}</Span>
                          </Row>
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
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </CardContent>
    </Card>
  );
}
