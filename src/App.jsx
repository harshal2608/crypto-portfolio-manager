import Portfolio from "./components/portfolio";
// import axios from "axios";
import { useEffect, useContext } from "react";
import { GlobalContext } from "./context/globalContext";
import { Container } from "@mui/material";
import BasicTable from "./components/Table";
import styled from "@emotion/styled";
import axios from "./axios";
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
    const jsonResponse = await axios.get(import.meta.env.VITE_FETCH_URL);

    const response = jsonResponse.data.data;
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
