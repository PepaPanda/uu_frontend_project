import styled from "styled-components";
import { useNavigate } from "react-router";

export const Li = styled.li<{ $cursor?: string }>`
  display: flex;
  flex-direction: column;
  padding: 20px;
  min-height: 150px;
  width: 300px;
  cursor: ${({ $cursor = "default" }) => $cursor};
  border: 1px solid grey;
  &:hover {
    background: #eaeaea;
  }
`;

const Card = ({
  link = null,
  children,
}: {
  link?: string | null;
  children: React.ReactNode;
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!link) return;
    navigate(link);
  };

  return (
    <>
      <Li $cursor="pointer" onClick={handleClick}>
        {children}
      </Li>
    </>
  );
};

export default Card;
