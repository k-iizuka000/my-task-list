import React from 'react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <header>
        <h1>My Task App</h1>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout; 