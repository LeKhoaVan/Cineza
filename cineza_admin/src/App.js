import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRouter } from './routes';
import { Fragment } from "react";

function App() {
  return (
    <Router basename="/cineza/admin" >
      <div className="App">
        <Routes>
          {publicRouter.map((route, index) => {
            const Page = route.componet;
            const Layout = route.layout
            return <Route key={index} path={route.path} element={
              <Layout>
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

