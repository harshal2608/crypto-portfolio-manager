import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";

const CustomContainer = styled(Container)`
  color: ${({ theme }) => theme.jediPink};
`;

export default function LandingPage() {
  return (
    <>
      <Container>Hi</Container>
      <CustomContainer>Hi</CustomContainer>
    </>
  );
}
