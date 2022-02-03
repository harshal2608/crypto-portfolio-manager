import React from "react";
import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import styled from "@emotion/styled";

const StyledFormControl = styled(FormControl)`
  width: 100%;
  margin: 0;
`;

export default function SelectVariants({ rows, childToParent }) {
  const [value, setValue] = useState(0);
  const handleChange = (event) => {
    setValue(event.target.value);
    childToParent(event.target.value);
  };

  return (
    <div>
      <StyledFormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-filled-label">
          Select Coin
        </InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={value}
          onChange={handleChange}
          required
        >
          <MenuItem value={0} key={0}>
            Select Coin
          </MenuItem>
          {rows.map((row) => (
            <MenuItem value={row.id} key={row.id}>
              {row.name}
            </MenuItem>
          ))}
        </Select>
      </StyledFormControl>
    </div>
  );
}
