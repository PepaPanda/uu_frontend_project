import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Box = styled.div<{ $theme: string }>`
  background: ${({ $theme }) => ($theme === "light" ? "white" : "#0b0b0b")};
  padding: 20px;
  border-radius: 8px;
  border: ${({ $theme }) =>
    $theme === "light" ? "none" : "2px solid #545454"};
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
