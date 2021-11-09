import React, { useContext } from "react";

import { 
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect 
} from "react-router-dom";

import { routes } from "./router";
import { MyContext } from "../context/context";
import { GlobalStyle } from "../components/globalStyle"

function CustomRoute(props) {
    const { authenticated, loading } = useContext(MyContext);

    if (loading) {
        return (

            <div>
                loading
            </div>
        )
    }

    if (props.isPrivate && !authenticated) {
        return <Redirect to="/login" exact />;
    }

    return <Route {...props} />;
}

const Routes = () => {

    return (
        <Router>

            <GlobalStyle />
            
            <Switch>
                {routes.map((routes) => {
                    return (
                        <CustomRoute key={routes.name} exact path={routes.path} component={routes.Component} isPrivate={routes.isPrivate} />
                    )
                })}

                <Route component={() => <h2>Something is Wrong...</h2>} />
            </Switch>
        </Router>
    );
}

export default Routes;