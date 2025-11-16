import styled from "styled-components";

const Gap = styled.div<{ $height?: string }>`
  height: ${({ $height = "29px" }) => $height};
`;

export default Gap;
