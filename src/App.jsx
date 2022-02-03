import Portfolio from "./components/portfolio";
import axios from "axios";
import { useEffect, useContext } from "react";
import { GlobalContext } from "./context/globalContext";
import { Container } from "@mui/material";
import BasicTable from "./components/Table";
import styled from "@emotion/styled";
// import axios from "./axios";
import { Stack } from "@mui/material";
import { Divider } from "@mui/material";

const StyledContainer = styled(Container)`
  padding: 40px;

  @media only screen and (max-width: 600px) {
    padding: 20px 0;
  }
`;

function App() {
  const ctx = useContext(GlobalContext);
  async function fetchdata() {
    const jsonResponse = await axios.get(
      "https://api.jsonbin.io/v3/b/61fbe0394ce71361b8ccae79",
      {
        headers: {
          "X-Master-Key":
            "$2b$10$lwGmkpzcXicy8Mp5Xxckye2gn6lQeIAQnOYmkwf4AAR.DXKmerdcu",
        },
      }
    );

    const response = jsonResponse.data.record.data;
    console.log(response);
    const updatedResponse = response.map((element) => {
      return { ...element, holdings: 0 };
    });

    ctx.setGlobalAssets(updatedResponse);
  }

  useEffect(() => {
    try {
      const cachedData = localStorage.getItem("globalAssets");
      if (!cachedData) fetchdata();
      else {
        ctx.setGlobalAssets(JSON.parse(cachedData));
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <div className="App">
      <StyledContainer>
        <Stack spacing={5}>
          <Portfolio />
          <Divider />
          <BasicTable data={ctx.globalAssets} />
        </Stack>
      </StyledContainer>
    </div>
  );
}

export default App;
