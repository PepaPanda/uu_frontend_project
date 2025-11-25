import Box from "../../../../ui_components/Box";

const Total = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box direction="column" align="flex-end">
      <span>Total items</span>
      <strong>{children}</strong>
    </Box>
  );
};

export default Total;
