import React from 'react';

function  Layout({ children }) {
  return (
    <div className="bg-blue-300 min-h-screen flex-col">
      <main className="flex-grow p-0.5">
        {children}
      </main>
    </div>
  );
};

export default Layout;
