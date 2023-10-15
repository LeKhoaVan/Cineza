import React from "react";

import "./defaulfLayout.css";
import Header from "../Header";
import Sidebar from "../Sidebar";
import VTDL from "../../../pages/VTDL/index";
import Home from "../../../pages/Home";
import SidebarAddress from "../SidebarAddress";
import SidebarHierarchyStructure from "../SideBarHierarychStructure";
import HierarychyStructure from "../../../pages/HierarchyStructure";
import User from "../../../pages/User";
import UserDetail from "../../../pages/UserDetail";
import VTDLDetail from "../../../pages/VTDLDetail";
import VTDLLevel from "../../../pages/VTDLLevel";
import PromotionHeader from "../../../pages/PromotionHeader";
import PromotionLine from "../../../pages/PromotionLine";
import Rap from "../../../pages/Rap";
import Room from "../../../pages/Room";

const DefaultLayout = (props) => {
  // gán biến component
  let sidebarComponent = "";
  let pageComponent = "";
  //lọc biến
  React.Children.forEach(props.children, (child) => {
    //lọc sidebar
    if (child.type === Sidebar || child.type === SidebarHierarchyStructure) {
      sidebarComponent = child;
      //lọc page
    } else if (
      child.type === HierarychyStructure ||
      child.type === VTDL ||
      child.type === Home ||
      child.type === User ||
      child.type === VTDLLevel ||
      child.type === UserDetail ||
      child.type === PromotionHeader ||
      child.type === PromotionLine ||
      child.type === Rap ||
      child.type === Room
    ) {
      pageComponent = child;
    }
  });

  return (
    <div className="default-container">
      <div className="default-header">
        <Header />
      </div>
      <div className="default-wrapper">
        <div className="dedefault-sidebar">{sidebarComponent}</div>
        <div className="default-content">{pageComponent}</div>
      </div>
    </div>
  );
};

export default DefaultLayout;
