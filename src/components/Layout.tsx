import Link from 'next/link';
import { useAuth } from '../lib/store';
import { useRouter } from 'next/router';

const Layout = ({ children }: { children: React.ReactNode }) => {
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
    <div className="bg-gray-900 font-sans text-gray-200">
      <header className="p-6 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link href="/">
            <img
              src="/home.png"
              alt="Logo of the Servi home company that is a house with a heart in the middle"
              width={50}
              height={50}
              className="rounded shadow-lg transform hover:scale-105 transition-transform duration-200"
            />
          </Link>
          <h1 className="text-4xl font-semibold text-yellow-500">Servi Home</h1>
        </div>

        {/* Navigation */}
        <nav className="flex items-center space-x-6">
          <Link
            href="/"
            className="hover:text-yellow-500 transform hover:scale-105 transition-transform duration-200"
          >
            Home
          </Link>
          <Link
            href="/reviews"
            className="hover:text-yellow-500 transform hover:scale-105 transition-transform duration-200"
          >
            Reviews
          </Link>
          <Link
            href="/services"
            className="hover:text-yellow-500 transform hover:scale-105 transition-transform duration-200"
          >
            Services
          </Link>

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
              <Link
                data-cy="cleaner-signup"
                href="/cleanersignup"
                className="hover:text-yellow-500 transform hover:scale-105 transition-transform duration-200"
              >
                Cleaner
              </Link>
              <Link
                href="/signup"
                className="hover:text-yellow-500 transform hover:scale-105 transition-transform duration-200"
              >
                Sign Up
              </Link>
              <Link
                href="/login"
                className="hover:text-yellow-500 transform hover:scale-105 transition-transform duration-200"
              >
                Login
              </Link>
            </>
          )}
        </nav>
      </header>
      <main className="mt-8">{children}</main>
    </div>
  );
};

export default Layout;
