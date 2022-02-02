import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import { useEffect } from "react";
import axios from "../../axios";

const CustomContainer = styled(Container)`
  color: ${({ theme }) => theme.jediPink};
`;

export default function LandingPage() {
  useEffect(() => {
    async function fetchdata() {
      const response = await axios.get(
        "/v1/cryptocurrency/map?sort=cmc_rank&limit=10"
      );
      console.log(response);
    }
    try {
      fetchdata();
    } catch (e) {
      console.log(e);
    }
  }, []);
  return (
    <>
      <Container>Hi</Container>
      <CustomContainer>Hi</CustomContainer>
    </>
  );
}
