import Icon from "../../../../ui_components/Icon";
import { Link } from "react-router";

const Social = ({ imgSrc, url }: { imgSrc: string; url: string }) => {
  return (
    <Link to={url}>
      <Icon imgSrc={imgSrc} />
    </Link>
  );
};

export default Social;
