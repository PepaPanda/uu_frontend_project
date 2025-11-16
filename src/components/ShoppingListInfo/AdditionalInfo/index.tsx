import Box from "../../../ui_components/Box";
import Members from "./Members";
import Owner from "./Owner";
import Status from "./Status";

import { useMediaQuery } from "react-responsive";

const AdditionalInfo = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 817px)" });

  return (
    <Box
      gap="14px"
      align={isMobile ? "normal" : "center"}
      direction={isMobile ? "column" : "row"}
    >
      {children}
    </Box>
  );
};

AdditionalInfo.Members = Members;
AdditionalInfo.Owner = Owner;
AdditionalInfo.Status = Status;
export default AdditionalInfo;
