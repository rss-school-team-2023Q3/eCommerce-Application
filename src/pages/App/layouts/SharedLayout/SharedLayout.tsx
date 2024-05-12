import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Header from 'widgets/Header/Header';
import Loader from 'widgets/Loader/Loader';

// import { Footer } from 'components/Footer/Footer';
// import Header from 'components/Header/Header';

function SharedLayout() {
  return (
    <div>
      <Header />
      <Suspense fallback={<Loader />}>
        <main>
          <Outlet />
        </main>
      </Suspense>
      {/* <Footer /> */}
    </div>
  );
}

export default SharedLayout;
