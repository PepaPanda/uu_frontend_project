import Item from "../../../../ui_components/UnorderedListOfStrings/Item";
import CustomNavLink from "../../../../ui_components/CustomNavLink";

const MenuItem = ({
  children,
  link,
}: {
  children: React.ReactNode;
  link: string;
}) => {
  return (
    <CustomNavLink to={link}>
      <Item>{children}</Item>
    </CustomNavLink>
  );
};

export default MenuItem;
