import Box from "../../../../ui_components/Box";

const Summary = ({
  unresolvedItemsCount = 0,
  resolvedItemsCount = 0,
}: {
  unresolvedItemsCount?: number;
  resolvedItemsCount?: number;
}) => {
  return (
    <>
      <Box justify="space-between">
        <div></div>
        <span>
          {unresolvedItemsCount + resolvedItemsCount} items,{" "}
          {unresolvedItemsCount} unresolved
        </span>
      </Box>
    </>
  );
};

export default Summary;
