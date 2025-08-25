import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../page/Login";
import Register from "../page/Register";
import Home from "../page/Home";
import Admin from "../page/Admin";

const router = createBrowserRouter([
    {
        path : "/",
        element : <App />,
        children : [
            {
                path : "/",
                element : <Home />
            },
            {
                path : "/login",
                element : <Login />
            },
            {
                path : "/register",
                element : <Register />
            },
            {
                path : "/admin",
                element : <Admin />
            }
        ]
    }
])

export default router