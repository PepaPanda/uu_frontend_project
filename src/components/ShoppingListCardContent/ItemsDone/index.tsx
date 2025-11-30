import Tag from "../../../ui_components/Tag";

const ItemsDone = ({ children }: { children: React.ReactNode }) => {
  return (
    <Tag bg="#e9e9e9" color="#1e1e1e">
      {children}
    </Tag>
  );
};

export default ItemsDone;
