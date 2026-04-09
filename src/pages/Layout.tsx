import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Top';

function Layout(): React.ReactElement {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
