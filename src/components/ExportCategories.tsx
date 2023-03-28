import React from "react";

import { useSelector } from "react-redux";
import { Categories, Users } from "../types/types";

const ExportButton = () => {
  const categories = useSelector(
    (state: { categories: Categories }) => state.categories
  );
  const users = useSelector((state: { users: Users }) => state.users);

  const data = { categories, users };

  const [href, setHref] = React.useState<string>("");

  const handleClick = React.useCallback(() => {
    const jsonString = JSON.stringify(data);
    const blob = new Blob([jsonString], { type: "application/json" });
    const href = URL.createObjectURL(blob);
    setHref(href);
  }, [data]);

  return (
    <a className='download' href={href} download={"Data"} onClick={handleClick}>
      Download JSON
    </a>
  );
};

export default ExportButton;
