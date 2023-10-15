import React from 'react';

function  Layout({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-blue-300 ">
      <main className="flex-grow p-0.5">
        {children}
      </main>
    </div>
  );
};

export default Layout;
