
import Home from "../pages/Home";
import Rap from "../pages/Rap";

import DefaultLayout from "../components/Layouts/DefaultLayout";

const publicRouter = [
    { path: "/home", componet: Home, layout: DefaultLayout },
    { path: "/rap", componet: Rap, layout: DefaultLayout },
]

const privateRouter = [

]

export {
    publicRouter,
    privateRouter
}
