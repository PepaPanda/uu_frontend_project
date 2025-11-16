import Member from "./Member";
import Gap from "../../ui_components/Gap";

import UnorderedListOfRows from "../../ui_components/UnorderedListOfRows";
const ListMembers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <h4>Current Members</h4>
      <Gap $height="5px" />
      <UnorderedListOfRows>{children}</UnorderedListOfRows>
    </>
  );
};

ListMembers.Member = Member;
export default ListMembers;
