import Login from "../components/pages/login";
import Signup from "../components/pages/signup";
import Home from "../components/pages/home";
import NewEvent from "../components/pages/newEvent";
import Event from "../components/pages/Event";
import Chekin from "../components/pages/chekin";
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
    },
    {
        name: "new event",
        Component: NewEvent,
        path: "/newEvent",
        isPrivate: false
    },
    {
        name: "event",
        Component:Event,
        path: "/event/:id",
        isPrivate: false
    },
    {
        name: "chekin",
        Component:Chekin,
        path: "/chekin",
        isPrivate: false
    }
]

