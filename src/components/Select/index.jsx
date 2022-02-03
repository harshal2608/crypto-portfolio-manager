import React from "react";
import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import styled from "@emotion/styled";

import { ImageWrapper, Image, Row } from "../../theme/components";

const StyledFormControl = styled(FormControl)`
  width: 100%;
  margin: 0;
`;

export default function SelectVariants({ rows, setAssetId }) {
  const [value, setValue] = useState(0);
  const handleChange = (event) => {
    setValue(event.target.value);
    setAssetId(event.target.value);
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
          <MenuItem value={0} key={0} divider>
            Select Coin
          </MenuItem>
          {rows.map((row) => (
            <MenuItem value={row.id} key={row.id} divider>
              <Row>
                <ImageWrapper>
                  <Image
                    style={{
                      maxWidth: "24px",
                      height: "auto",
                      marginTop: "2px",
                    }}
                    src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${row.id}.png`}
                  />
                </ImageWrapper>
                {row.name} {row.symbol}
              </Row>
            </MenuItem>
          ))}
        </Select>
      </StyledFormControl>
    </div>
  );
}
