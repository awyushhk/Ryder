import React from "react";

export const dynamic = "force-dynamic";

const MainLayout = ({ children }) => {
  return <div className="container mx-auto my-20">{children}</div>;
};

export default MainLayout;
