import Item from "../../../../ui_components/UnorderedListOfStrings/Item";
import { Link as ReactRouterLink } from "react-router";

const Link = ({
  children,
  target,
}: {
  children: React.ReactNode;
  target: string;
}) => {
  return (
    <ReactRouterLink to={target}>
      <Item>{children}</Item>
    </ReactRouterLink>
  );
};

export default Link;
