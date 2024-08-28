import React, { useState } from "react";
import ViewCategories from "../components/ViewCategories";
import AddCategory from "../components/AddCategory";
import ViewProducts from "../components/ViewProducts";
import AddProducts from "../components/AddProducts";

const Dashboard = () => {
  const [currentView, setCurrentView] = useState("viewCategories");

  const renderContent = () => {
    switch (currentView) {
      case "viewCategories":
        return <ViewCategories />;
      case "addCategory":
        return <AddCategory />;
      case "viewProducts":
        return <ViewProducts />;
      case "addProducts":
        return <AddProducts />;
      default:
        return <div>Select an option from the sidebar</div>;
    }
  };

  const buttons = {
    viewCategories: {
      label: "View Categories",
      onClick: () => setCurrentView("viewCategories"),
    },
    addCategory: {
      label: "Add Category",
      onClick: () => setCurrentView("addCategory"),
    },
    viewProducts: {
      label: "View Products",
      onClick: () => setCurrentView("viewProducts"),
    },
    addProducts: {
      label: "Add Products",
      onClick: () => setCurrentView("addProducts"),
    },
  };

  return (
    <div className="flex flex-col md:flex-row w-[80%] mx-auto">
      <div className=" my-10 md:w-[20%] md:border-r-2">
        <h2 className=" text-[24px] font-poppins font-bold">Menu</h2>
        <div className="flex flex-wrap md:flex-col gap-5 md:gap-0 justify-start items-start mt-6">
          {Object.keys(buttons).map((key) => (
            <button
              key={key}
              className="my-2 hover:underline"
              onClick={buttons[key].onClick}
            >
              {buttons[key].label}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 p-4">{renderContent()}</div>
    </div>
  );
};

export default Dashboard;
