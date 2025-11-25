 import styled from "styled-components";

const OptionEl = styled.option`
  color: #333;
  background: white;
  font-size: 14px;
  padding: 6px 10px;
`;

const Option = ({children} : {children: React.ReactNode}) => {
    return <OptionEl>{children}</OptionEl>
}

export default Option;