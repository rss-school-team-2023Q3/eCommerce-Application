import Loader from 'components/Loader/Loader';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

// import { Footer } from 'components/Footer/Footer';
// import Header from 'components/Header/Header';

function SharedLayout() {
  return (
    <>
      {/* {isLoggedIn ? <Header onTheme={onTheme} /> : null} */}
      <Suspense fallback={<Loader />}>
        <main>
          <Outlet />
        </main>
      </Suspense>
      {/* {isLoggedIn ? <Footer /> : null} */}
    </>
  );
}

export default SharedLayout;
