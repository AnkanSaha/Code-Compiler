/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React from "react"; // imported React from 'react';

// Import Data
import {SideBarLangNameData} from '@app/Data/Sidebar Data'; // SideBarLangNameData

// Router 
import { Link } from "react-router-dom"; // imported Link from 'react-router-dom';


export default function Home_Options() {
  return (
    <div className="flex flex-wrap ml-5">
    {
      SideBarLangNameData.map((item, index) => {
        return (
          <div key={index} className="mt-10 mx-5 my-5">
          <Link
             to={item.Link}
             className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
           >
             <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {item.ProgrammingLanguage}
             </h5>
             <p className="font-normal text-gray-700 dark:text-gray-400">
             {item.LanguageDescription}
             </p>
           </Link>
          </div>
        )
      })
    }
    
    </div>
  );
}
