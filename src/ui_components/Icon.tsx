import styled from "styled-components";

const Img = styled.img`
  height: 1.8rem;
  witdh: 1.8rem;
`;

const Icon = ({ imgSrc }: { imgSrc: string }) => {
  return <Img src={imgSrc} />;
};

export default Icon;
