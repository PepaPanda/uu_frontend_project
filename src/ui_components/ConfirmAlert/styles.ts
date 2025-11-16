import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Box = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 280px;
  text-align: center;
`;

export const ButtonRow = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: center;
  gap: 12px;
`;

export const Button = styled.button`
  padding: 6px 14px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
`;
