import Box from "../../../ui_components/Box";

//Sub
import Open from "./Open";
import Total from "./Total";

const Items = ({ children }: { children: React.ReactNode }) => {
  return <Box justify="space-between">{children}</Box>;
};

Items.Open = Open;
Items.Total = Total;

export default Items;
