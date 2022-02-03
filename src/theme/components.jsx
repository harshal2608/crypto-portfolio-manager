import styled from "@emotion/styled";

import CardContent from "@mui/material/CardContent";

export const Span = styled.span`
  font-weight: normal;
`;

export const ImageWrapper = styled.div`
  margin-right: 2px;
  padding: auto;
  width: 24px;
`;
export const Image = styled.img`
  max-width: 24px;
  height: auto;
  margin: auto;
`;
export const Row = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
`;

export const StyledCardContent = styled(CardContent)`
  background-color: #1e1e1e;
  color: #f4f4f4;
`;
