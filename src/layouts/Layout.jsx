import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="px-4 sm:px-12 lg:px-14 xl:px-16 ">
      {/* Render child components here */}
      {children}
    </div>
  );
};

export default Layout;