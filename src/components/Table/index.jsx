import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";
import axios from "axios";

function createData(name, symbol, price, rank, supply, holdings) {
  return { name, symbol, price, rank, supply, holdings };
}

export default function BasicTable({ tabledata, name }) {
  const [data, setData] = useState([]);
  const [rows, setRows] = useState([]);

  async function fetchdata() {
    const jsonResponse = await axios.get(
      "https://api.jsonbin.io/v3/b/61fa41844ce71361b8cb411e",
      {
        headers: {
          "X-Master-Key":
            "$2b$10$lwGmkpzcXicy8Mp5Xxckye2gn6lQeIAQnOYmkwf4AAR.DXKmerdcu",
        },
      }
    );
    console.log(jsonResponse.data.record.data[0]);
    const response = jsonResponse.data.record.data;
    setData(response);
    console.log(response);
  }

  useEffect(() => {
    try {
      fetchdata();
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    const newRows = data.map((i) =>
      createData(
        i.name,
        i.symbol,
        i.quote.USD.price,
        i.cmc_rank,
        i.circulating_supply,
        10
      )
    );
    setRows(newRows);
    console.log(rows);
  }, [data]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">rank</TableCell>
            <TableCell align="right">supply</TableCell>
            <TableCell align="right">holdings</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows
            ? rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name} {row.symbol}
                  </TableCell>
                  <TableCell align="right">{row.price}</TableCell>
                  <TableCell align="right">{row.rank}</TableCell>
                  <TableCell align="right">{row.supply}</TableCell>
                  <TableCell align="right">{row.holdings}</TableCell>
                </TableRow>
              ))
            : null}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
