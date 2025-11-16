import styled from "styled-components";
import Box from "./Box";

const Img = styled.img`
  height: 1.2rem;
  padding-right: 5px;
`;

const TextWithIcon = ({
  children,
  imgSrc,
}: {
  children: React.ReactNode;
  imgSrc: string;
}) => {
  return (
    <Box>
      <Img src={imgSrc} />
      <span>{children}</span>
    </Box>
  );
};

export default TextWithIcon;
