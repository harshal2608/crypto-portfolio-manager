import Portfolio from "./pages/portfolio";
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
  margin-top: 20px;
`;

function App() {
  const ctx = useContext(GlobalContext);
  async function fetchdata() {
    const jsonResponse = await axios.get(
      import.meta.env.VITE_FETCH_URL
      // "https://api.jsonbin.io/v3/b/61fa616ef77b236211e8fe28",
      // {
      //   headers: {
      //     "X-Master-Key":
      //       "$2b$10$lwGmkpzcXicy8Mp5Xxckye2gn6lQeIAQnOYmkwf4AAR.DXKmerdcu",
      //   },
      // }
    );

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
