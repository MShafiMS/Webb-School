import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import wslogo from "../../../Assets/wslogo.png";
import "./Header.css";
import { useQuery } from "react-query";
import Drawer from "react-modern-drawer";

import "react-modern-drawer/dist/index.css";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import { signOut } from "firebase/auth";
import useRole from "../../../Hooks/useRole";
import Messages from "../../Messages/Messages";
import primaryAxios from "../../../Api/primaryAxios";

const Header = ({ handleThemeChange, theme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };
  const [user, loading] = useAuthState(auth);
  const [role, roleLoading, userName] = useRole();

  const logout = () => {
    signOut(auth);
    //Token Remove
    localStorage.removeItem("accessToken");
  };

  const {
    data: message,
    isLoading,
    refetch,
  } = useQuery(["message"], () => primaryAxios.get(`/message`));

  const manuItems = (
    <>
      <li>
        <NavLink to="courses">Courses</NavLink>
      </li>
      <li>
        <NavLink to="bookstore">Book Store</NavLink>
      </li>
      <li>
        <NavLink to="audiobook">AudioBook</NavLink>
      </li>
      {/* <li>
        <NavLink to="admission">Admission</NavLink>
      </li>
      <li>
        <NavLink to="jobs">Jobs</NavLink>
      </li> */}
      <li>
        <NavLink to="blogs">Blog</NavLink>
      </li>
      <li>
        <NavLink to="LiveClass">Live Class</NavLink>
      </li>
      {role === "admin" && (
        <li>
          <NavLink to="admin/courses/language">Admin</NavLink>
        </li>
      )}
    </>
  );
  return (
    <div className="navbar fixed top-0 w-full z-50 lg:px-10  bg-base-200 bg-opacity-30 backdrop-filter backdrop-blur-lg border-b-[0.5px] border-neutral">
      <div className="navbar-start">
        <Drawer open={isOpen} onClose={toggleDrawer} direction="left">
          <div>
            <ul tabIndex="0" className="bg-base-100 h-screen">
              <Link to="/">
                <div className="flex items-center p-2 w-full">
                  <img className="w-9 ml-3" src={wslogo} alt="" />
                  <div className="ml-1 text-md font-sub font-bold mt-1">
                    <p>Webb</p>
                    <p className="-mt-2">School</p>
                  </div>
                </div>
              </Link>
              <ul className="menu menu-compact">
                <li>
                  <NavLink to="/">Home</NavLink>
                </li>
                <li>
                  <NavLink to="courses">Courses</NavLink>
                </li>
                <li>
                  <NavLink to="bookstore">Book Store</NavLink>
                </li>
                <li>
                  <NavLink to="audiobook">AudioBook</NavLink>
                </li>
                {/* <li>
                  <NavLink to="admission">Admission</NavLink>
                </li>
                <li>
                  <NavLink to="jobs">Jobs</NavLink>
                </li> */}
                <li>
                  <NavLink to="blogs">Blog</NavLink>
                </li>
                <li>
                  <NavLink to="LiveClass">Live Class</NavLink>
                </li>
                {role === "admin" && (
                  <li>
                    <NavLink to="admin/courses/language">Admin</NavLink>
                  </li>
                )}
              </ul>
              <li>
                {user ? (
                  <div>
                    <div className="flex flex-nowrap items-center cursor-pointer border-b border-neutral w-full">
                      <label className="avatar">
                        <div className="w-7 mx-2 my-2 rounded-full border border-gray-200">
                          <img
                            src={`${user?.photoURL
                                ? user?.photoURL
                                : "https://github.com/MShafiMS/admission/blob/gh-pages/profile.png?raw=true"
                              }`}
                          />
                        </div>
                      </label>
                      <p className="whitespace-nowrap">
                        {userName ? userName : "User"}
                        <i className="ml-2 fa-solid fa-angle-down"></i>
                      </p>
                    </div>
                    <ul className="menu menu-compact">
                      <li>
                        <NavLink to={"profile"}>
                          <i className="ml-4 fa-solid fa-user" />
                          Profile
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to={"mycourse"}>
                          <i className="ml-4 fa-solid fa-bolt"></i>My Courses
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to={"dashboard"}>
                          <i className="ml-4 fa-solid fa-chart-line"></i>
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to={"/orders"}>
                          <i className="ml-4 fa-solid fa-clock"></i>Payment
                          History
                        </NavLink>
                      </li>
                      <li>
                        <a onClick={logout}>
                          <i className="ml-4 fa-solid fa-right-from-bracket"></i>
                          Logout
                        </a>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <div className="border-t border-neutral">
                    <li>
                      <Link
                        className="mt-3 mx-3 w-56 btn-info btn-sm btn rounded-full text-white hover:rounded-full font-thin"
                        to="Login"
                      >
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="bg-[#494FC1] hover:bg-[#4a4e94] my-3 mx-3 w-56 hover:rounded-full btn-sm btn rounded-full text-white font-thin"
                        to="Signup"
                      >
                        Register
                      </Link>
                    </li>
                  </div>
                )}
              </li>
            </ul>
          </div>
        </Drawer>
        <Link to="/">
          <div className="flex items-center">
            <img className="w-9 ml-3" src={wslogo} alt="" />
            <div className="ml-1 text-md font-header font-bold">
              <p>Webb</p>
              <p className="-mt-2">School</p>
            </div>
          </div>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal menu-compact p-0 gap-3 uppercase">
          {manuItems}
        </ul>
      </div>

      <div className="navbar-end hidden lg:flex">
        {user ? (
          <div class="dropdown dropdown-end">
            <button tabindex="0" className="pr-6">
              <p>
                <i class="fa-solid fa-bell"></i>
                <span class="inline-flex absolute text-xs text-left bg-primary rounded-full w-[10px] h-[10px] z-0 left-[6px] bottom-[13px] justify-center text-white">
                  
                </span>
              </p>
            </button>
            <div
              tabindex="0"
              class="dropdown-content  rounded-lg bg-base-200 border border-neutral mt-6 w-72 "
            >
              <div class="card-body p-1">
                <h3 class="text-xl px-3 pt-2">Notifications! <i class="text-yellow-500 fa-solid fa-bell"></i></h3>
                <Messages></Messages>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        <button
          onClick={handleThemeChange}
          className="rounded-full lg:mx-2 pr-5"
        >
          {theme ? (
            <svg
              aria-hidden="true"
              id="theme-toggle-light-icon"
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                fill-rule="evenodd"
                clip-rule="evenodd"
              ></path>
            </svg>
          ) : (
            <svg
              aria-hidden="true"
              id="theme-toggle-dark-icon"
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
            </svg>
          )}
        </button>

        {user ? (
          <div class="dropdown dropdown-end">
            <label tabindex="0" class="btn btn-ghost btn-circle avatar">
              <div class="w-9 rounded-full">
                <img
                  src={`${user?.photoURL
                      ? user?.photoURL
                      : "https://github.com/MShafiMS/admission/blob/gh-pages/profile.png?raw=true"
                    }`}
                />
              </div>
            </label>
            <ul
              tabindex="0"
              class="mt-3 shadow menu menu-compact dropdown-content rounded-md w-56 bg-base-100 text-warning"
            >
              <div className="mx-auto mt-3">
                <div class="avatar">
                  <div class="w-20 rounded-full">
                    <img
                      src={`${user?.photoURL
                          ? user?.photoURL
                          : "https://github.com/MShafiMS/admission/blob/gh-pages/profile.png?raw=true"
                        }`}
                    />
                  </div>
                </div>
              </div>
              <div className="border-b border-neutral">
                <h1 className="text-lg text-center">
                  {userName ? userName.slice(0, 14) : "User"}
                </h1>
                <p className="text-xs mb-2 text-center">Student</p>
              </div>
              <li>
                <NavLink to={"profile"} className=" hover:rounded-none">
                  <i className="ml-4 fa-solid fa-user" />
                  Profile
                </NavLink>
              </li>
              <li>
                <NavLink to={"mycourse"} className="hover:rounded-none">
                  <i className="ml-4 fa-solid fa-bolt"></i>My Courses
                </NavLink>
              </li>
              <li>
                <NavLink to={"dashboard"} className="hover:rounded-none">
                  <i className="ml-4 fa-solid fa-chart-line"></i>Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink to={"/orders"} className="hover:rounded-none">
                  <i className="ml-4 fa-solid fa-clock"></i>Payment History
                </NavLink>
              </li>
              <li>
                <a
                  onClick={logout}
                  className="hover:rounded-b-md hover:rounded-none text-red-500"
                >
                  <i className="ml-4 fa-solid fa-right-from-bracket"></i>
                  Logout
                </a>
              </li>
            </ul>
          </div>
        ) : (
          // <div className="dropdown dropdown-end">
          //   <div
          //     tabIndex="0"
          //     className="flex flex-nowrap items-center cursor-pointer"
          //   >
          //     <label className="avatar">
          //       <div className="w-7 mr-2 rounded-full border border-gray-200">
          //         <img
          //           src={`${
          //             user?.photoURL
          //               ? user?.photoURL
          //               : "https://github.com/MShafiMS/admission/blob/gh-pages/profile.png?raw=true"
          //           }`}
          //         />
          //       </div>
          //     </label>
          //     <p className="whitespace-nowrap">
          //       {userName ? userName : "User"}
          //       <i className="ml-2 fa-solid fa-angle-down"></i>
          //     </p>
          //   </div>
          //   <ul
          //     tabIndex="0"
          //     className="mt-4 menu menu-compact w-48 dropdown-content rounded-xl bg-base-300"
          //   >
          //     <li>
          //       <NavLink
          //         to={"profile"}
          //         className="hover:rounded-t-xl hover:rounded-none"
          //       >
          //         <i className="ml-4 fa-solid fa-user" />
          //         Profile
          //       </NavLink>
          //     </li>
          //     <li>
          //       <NavLink to={"mycourse"} className="hover:rounded-none">
          //         <i className="ml-4 fa-solid fa-bolt"></i>My Courses
          //       </NavLink>
          //     </li>
          //     <li>
          //       <NavLink to={"dashboard"} className="hover:rounded-none">
          //         <i className="ml-4 fa-solid fa-chart-line"></i>Dashboard
          //       </NavLink>
          //     </li>
          //     <li>
          //       <NavLink to={"coming"} className="hover:rounded-none">
          //         <i className="ml-4 fa-solid fa-clock"></i>Payment History
          //       </NavLink>
          //     </li>
          //     <li>
          //       <a
          //         onClick={logout}
          //         className="hover:rounded-b-xl hover:rounded-none"
          //       >
          //         <i className="ml-4 fa-solid fa-right-from-bracket"></i>
          //         Logout
          //       </a>
          //     </li>
          //   </ul>
          // </div>
          <div className="flex">
            <a className="btn-accent btn-sm btn rounded-md text-white font-thin">
              <Link to="Login">Login</Link>
            </a>
            <div className="divider lg:divider-horizontal"></div>
            <a className="bg-[#494FC1] hover:bg-[#4a4e94] btn-sm btn rounded-md text-white font-thin">
              <Link to="SignUp">Register</Link>
            </a>
          </div>
        )}
      </div>
      <div className="navbar-end lg:hidden flex">
      {user ? (
          <div class="dropdown dropdown-end">
            <button tabindex="0" className="pr-3">
              <p>
                <i class="fa-solid fa-bell"></i>
                <span class="inline-flex absolute text-xs text-left bg-primary rounded-full w-[10px] h-[10px] z-0 left-[6px] bottom-[13px] justify-center text-white">
                  
                </span>
              </p>
            </button>
            <div
              tabindex="0"
              class="dropdown-content  rounded-lg bg-base-200 border border-neutral mt-6 w-72 -mr-14"
            >
              <div class="card-body p-1">
                <h3 class="text-xl px-3 pt-2">Notifications! <i class="text-yellow-500 fa-solid fa-bell"></i></h3>
                <Messages></Messages>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        <button
          onClick={handleThemeChange}
          className="rounded-full lg:mx-2 font-bold px-2"
        >
          {theme ? (
            <svg
              aria-hidden="true"
              id="theme-toggle-light-icon"
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                fill-rule="evenodd"
                clip-rule="evenodd"
              ></path>
            </svg>
          ) : (
            <svg
              aria-hidden="true"
              id="theme-toggle-dark-icon"
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
            </svg>
          )}
        </button>
        <div className="dropdown">
          <label
            onClick={toggleDrawer}
            tabIndex="0"
            className="mx-4 text-2xl lg:hidden"
          >
            <i className="fa-solid fa-bars"></i>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Header;
