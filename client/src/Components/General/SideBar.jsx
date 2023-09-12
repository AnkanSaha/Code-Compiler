/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate } from "react-router-dom"; // Navigation

// Import Chakra UI Components
import { Button } from "@chakra-ui/react";

// React Icons
import { BsCodeSquare } from "react-icons/bs"; // Write Code Icon

// Import Data
import { SideBarOptions } from "@component/General/Data/SideBarData"; // SideBar Options

export default function SideBar() {
  // Hooks
  const navigate = useNavigate();

  // State Variables
  const [isSideBarOpen, setIsSideBarOpen] = React.useState(true);

  const SideBarToggle = (event) => {
    if (isSideBarOpen) {
      setIsSideBarOpen(false);
    } else {
      setIsSideBarOpen(true);
    }
  };

  return (
    <>
      <div className="drawer">
        <input
          id="my-drawer"
          type="checkbox"
          checked={isSideBarOpen}
          className="drawer-toggle"
        />
        <div className="drawer-side">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {SideBarOptions.map((Values) => {
              return (
                <li key={Values.value}>
                  <Button
                    onClick={() => {
                      navigate(Values.value);
                    }}
                    leftIcon={<Values.icon />}
                  >
                    {Values.title}
                  </Button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
