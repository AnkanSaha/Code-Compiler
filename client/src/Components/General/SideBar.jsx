/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate } from "react-router-dom"; // Navigation

// Import Chakra UI Components
import { Button } from "@chakra-ui/react"; // Chakra UI

// React Redux
import { useDispatch, useSelector } from "react-redux"; // useSelector
import { setSideBarToggleStatus } from "@redux/Components/SideBar"; // Redux Action

// Import Data
import { SideBarLangNameData } from "@app/Data/Sidebar Data"; // SideBarLangNameData

export default function SideBar() {
  // Hooks
  const navigate = useNavigate();

  // Redux
  const Updater = useDispatch(); // Redux Updater
  const isSideBarOpen = useSelector((state) => state.SideBarToggle); // Redux Selector

  const SideBarToggle = (event) => {
    if (isSideBarOpen) {
      Updater(setSideBarToggleStatus(false));
    } else {
      Updater(setSideBarToggleStatus(true));
    }
  };

  return (
    <>
      <div className="drawer">
        <input
          id="my-drawer"
          type="checkbox"
          checked={isSideBarOpen === undefined ? true : isSideBarOpen}
          className="drawer-toggle"
        />
        <div className="drawer-side">
          <label htmlFor="my-drawer" className="drawer-overlay" />
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content pt-16">
            {SideBarLangNameData.map((item, index) => {
              return (
                <li key={index}>
                  <Button
                    className="my-3"
                    onClick={() => {
                      navigate(item.Link);
                    }}
                    colorScheme={item.colorScheme}
                  >
                    {item.ProgrammingLanguage}
                  </Button>
                </li>
              );
            })}
            <button
              className="btn btn-square btn-outline fixed top-2 ml-[15rem]"
              onClick={SideBarToggle}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </ul>
        </div>
      </div>
    </>
  );
}
