import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '../lib/store';
import { useRouter } from 'next/router';
import { useState } from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [navbar, setNavbar] = useState(false);
  const { user, removeAuth } = useAuth((state) => ({
    user: state.auth,
    removeAuth: state.removeAuth,
  }));
  const router = useRouter();

  const onLogout = (e) => {
    localStorage.removeItem('auth');
    localStorage.removeItem('token');
    removeAuth();
    router.push('/');
  };

  return (
    <>
      <header className=" h-20 w-full bg-gray-900 font-sans text-gray-200 p-4 fixed top-0 right-0 z-10">
        <div className=" justify-between  md:flex  items-center">
          <div className="  flex justify-between md:w-2/5  ">
            <div className=" flex items-center ">
              <Link href="/">
                <Image
                  src="/home.png"
                  alt="Logo of the Servi home company that is a house with a heart in the middle"
                  width={50}
                  height={50}
                  className="rounded shadow-lg transform hover:scale-105 transition-transform duration-200"
                />
              </Link>
              <h1 className="md:text-4xl font-semibold text-yellow-500">
                Servi Home
              </h1>
            </div>
            {/* Hamburger Button for mobile */}
            <div className="md:hidden">
              <button
                className="p-2 text-gray-200 rounded-md outline-none focus:border-gray-400 focus:border"
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? (
                  <Image src="/close.svg" width={30} height={30} alt="logo" />
                ) : (
                  <Image
                    src="/hamburger-menu.svg"
                    width={30}
                    height={30}
                    alt="logo"
                    className="focus:border-none active:border-none"
                  />
                )}
              </button>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <nav
              className={` bg-gray-900 flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                navbar ? 'p-12 md:p-0 block' : 'hidden'
              }`}
            >
              <ul className="h-screen md:h-auto items-center justify-center md:flex ">
                <li className="pb-3 py-2 text-center border-b-2 hover:text-yellow-500 hover:border-yellow-500  md:pb-0 md:px-2 md:border-b-0 md:hover:text-yellow-500 md:transform md:hover:scale-105 md:transition-transform md:duration-200">
                  <Link href="/" onClick={() => setNavbar(!navbar)}>
                    Home
                  </Link>
                </li>
                <li className="pb-3 py-2 text-center border-b-2 hover:text-yellow-500 hover:border-yellow-500  md:pb-0 md:px-2 md:border-b-0 md:hover:text-yellow-500 md:transform md:hover:scale-105 md:transition-transform md:duration-200">
                  {' '}
                  <Link href="/reviews" onClick={() => setNavbar(!navbar)}>
                    Reviews
                  </Link>
                </li>
                <li className="pb-3 py-2 text-center border-b-2 hover:text-yellow-500 hover:border-yellow-500  md:pb-0 md:px-2 md:border-b-0 md:hover:text-yellow-500 md:transform md:hover:scale-105 md:transition-transform md:duration-200">
                  {' '}
                  <Link href="/services" onClick={() => setNavbar(!navbar)}>
                    Services
                  </Link>
                </li>

                {!!user ? (
                  <button
                    data-cy="log-out"
                    onClick={(e) => onLogout(e)}
                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition-colors duration-200"
                  >
                    Log Out
                  </button>
                ) : (
                  <>
                    <li className="pb-3 py-2 text-center border-b-2 hover:text-yellow-500  hover:border-yellow-500  md:pb-0 md:px-2 md:border-b-0 md:hover:text-yellow-500 md:transform md:hover:scale-105 md:transition-transform md:duration-200">
                      <Link
                        data-cy="cleaner-signup"
                        href="/cleanersignup"
                        onClick={() => setNavbar(!navbar)}
                      >
                        Cleaner
                      </Link>
                    </li>
                    <li className="pb-3 py-2 text-center border-b-2 hover:text-yellow-500 hover:border-yellow-500  md:pb-0 md:px-2 md:border-b-0 md:hover:text-yellow-500 md:transform md:hover:scale-105 md:transition-transform md:duration-200">
                      <Link href="/signup" onClick={() => setNavbar(!navbar)}>
                        Sign Up
                      </Link>
                    </li>
                    <li className="pb-3 py-2 text-center border-b-2 hover:text-yellow-500  hover:border-yellow-500  md:pb-0 md:px-2 md:border-b-0 md:hover:text-yellow-500 md:transform md:hover:scale-105 md:transition-transform md:duration-200">
                      <Link href="/login" onClick={() => setNavbar(!navbar)}>
                        Login
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <main className="mt-14 md:mt-8 ">{children}</main>
    </>
  );
};

export default Layout;
