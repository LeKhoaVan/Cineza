import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRouter } from './routes';
import { Fragment } from "react";
import ButtonSidebar from "./components/ButtonSidebar";
import Sidebar from "./components/Layouts/Sidebar";
import SidebarHierarchyStructure from "./components/Layouts/SideBarHierarychStructure";

function App() {
  return (
    <Router basename="/cineza/admin" >
      <div className="App">
        <Routes>
          {publicRouter.map((route, index) => {
            const Page = route.componet;
            const Layout = route.layout;
            const SidebarAS = route.sidebar;
            return <Route key={index} path={route.path} element={
              <Layout>
                <SidebarAS />
                <Page />
              </Layout>
            }
            />
          })}
        </Routes>
      </div>
    </Router>

  );
}

export default App;

