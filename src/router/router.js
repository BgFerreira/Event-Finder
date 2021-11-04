import Login from "../components/pages/login";
import Signup from "../components/pages/signup";
import Home from "../components/pages/home";

export const routes = [

    {
        name: "login",
        Component: Login,
        path: "/",
        isPrivate: false
    },

    {
        name: "signup",
        Component: Signup,
        path: "/signup",
        isPrivate: false
    },
    
    {
        name: "home",
        Component: Home,
        path: "/home",
        isPrivate: false
    }
]