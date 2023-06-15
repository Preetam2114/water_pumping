import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { account } from "../../utils/init-appwrite";
import { Link, useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  // @ts-expect-error It is not taking props don't know why
  const { refetchAuthState, user } = useAuth();
  const navigate = useNavigate();
  const [state, setState] = useState(false);
  async function logout() {
    try {
      const res = await account.deleteSession("current");
      console.log(res);
      refetchAuthState();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  // Replace javascript:void(0) paths with your paths
  const navigation = [
    { title: "Donate", path: "https://www.buymeacoffee.com/dashboard" },
    { title: "Contribute", path: "https://github.com/Preetam2114/water_pumping" }
  ];

  return (
    <nav className="bg-white border-b w-full md:static md:text-sm md:border-none">
      <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:px-8">
        <div className="flex items-center justify-between py-3 md:py-5 md:block">
          <div className="flex justify-center items-center">
            <img
              src="/logo2.png"
              // width={80}
              alt="Float UI logo"
            />
            {/* <p className='text-2xl font-bold'>Mizunohana</p> */}
          </div>
          <div className="md:hidden">
            <button className="text-gray-500 hover:text-gray-800" onClick={() => setState(!state)}>
              {state ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        <div className={`flex-1 pb-3 mt-8 md:block md:pb-0 md:mt-0 ${state ? "block" : "hidden"}`}>
          <ul className="justify-end items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
            {navigation.map((item, idx) => {
              return (
                <li key={idx} className="text-gray-700 hover:text-indigo-600">
                  <Link to={item.path}>
                    <p className="block">{item.title}</p>
                  </Link>
                </li>
              );
            })}

            <span className="hidden w-px h-6 bg-gray-300 md:block"></span>
            <div>
              <button
                onClick={() => logout()}
                className="block py-3 px-4 font-medium text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 active:shadow-none rounded-lg shadow md:inline"
              >
                Logout
              </button>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
