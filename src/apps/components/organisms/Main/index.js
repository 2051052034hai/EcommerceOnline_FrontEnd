import React from "react";
export const Main = React.memo((props) => {
  const { children } = props;
  return <>{children}</>;
});
