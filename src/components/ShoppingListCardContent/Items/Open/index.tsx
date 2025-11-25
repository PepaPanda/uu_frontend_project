import Box from "../../../../ui_components/Box";

const Open = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box direction="column">
      <span>Open items</span>
      <strong>{children}</strong>
    </Box>
  );
};

export default Open;
