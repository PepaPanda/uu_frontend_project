import styled from "styled-components";

const OptionEl = styled.option`
  color: #333;
  background: white;
  font-size: 14px;
  padding: 6px 10px;
`;

type OptionProps = {
  children: React.ReactNode;
} & React.OptionHTMLAttributes<HTMLOptionElement>;

const Option = ({ children, ...rest }: OptionProps) => {
  return <OptionEl {...rest}>{children}</OptionEl>;
};

export default Option;
