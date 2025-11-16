import styled from "styled-components";
import trashImg from "./trash.png";

const Button = styled.button`
  background: none;
  height: 2rem;
  width: 2rem;
  margin-left: auto;
  cursor: pointer;
  border: none;
  &:hover {
    background: cyan; //results in red on hover
    border-radius: 10px;
    filter: invert(1);
  }
`;

type Props = React.ComponentProps<"button">;

export const DeleteButton = ({ ...rest }: Props) => {
  return (
    <Button {...rest}>
      <img src={trashImg} style={{ width: "1.1rem" }} />
    </Button>
  );
};
