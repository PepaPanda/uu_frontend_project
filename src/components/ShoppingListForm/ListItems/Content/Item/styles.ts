import styled from "styled-components";

export const Label = styled.label<{ $disabled?: boolean }>`
  padding-left: 10px;
  display: flex;
  align-items: center;
  height: 50px;
  cursor: ${({ $disabled = false }) => ($disabled ? "normal" : "pointer")};
`;
