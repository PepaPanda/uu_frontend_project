import styled from "styled-components";

//Subcomponents
import Option from "./Option";


const SelectEl = styled.select`
  appearance: none;
  background: white;
  border: 1px solid #d0d0d0;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 14px;
  color: #333;
  outline: none;
  cursor: pointer;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    border-color: #aaa;
  }

  &:focus {
    border-color: #666;
    box-shadow: 0 0 0 2px rgba(0,0,0,0.06);
  }
`;

const Select = ({children} : {children: React.ReactNode}) => {
    return <SelectEl>{children}</SelectEl>
}


Select.Option = Option;
export default Select