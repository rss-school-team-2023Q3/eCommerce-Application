import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Header from 'widgets/Header/Header';
import Loader from 'widgets/Loader/Loader';
import './SharedLayout.modules.css';
import ModalCart from 'widgets/ModalCart/ModalCart';

// import { Footer } from 'components/Footer/Footer';
// import Header from 'components/Header/Header';

interface ISharedLayoutProps {
  onTheme: (event: React.SyntheticEvent, checked: boolean) => void;
}

function SharedLayout({ onTheme }: ISharedLayoutProps) {
  return (
    <div>
      <Header onTheme={onTheme} />
      <Suspense fallback={<Loader />}>
        <ModalCart />
        <main className="main">
          <Outlet />
          <ToastContainer />
        </main>
      </Suspense>
      {/* <Footer /> */}
    </div>
  );
}

export default SharedLayout;
