import React from "react";
import { RouteProps, Route, Redirect } from "react-router";
import { getUser, isAuthenticated } from "../services/auth";

interface RProps extends RouteProps {
    component: React.ComponentType;
}

const GerentePrivateRouter: React.FC<RProps> = ({ component: Component, ...rest }) => {
    const user = getUser();
    
    return (
        <Route 
            {...rest}
            render={({ location }) => {
                return user.perfilAcessoId === 4
                ? (<Component />)
                : (
                    <Redirect 
                        to={{
                            pathname: isAuthenticated() ? "/home" : "/login",
                            state: { from: location }
                        }}
                    />
                )
            }}
        />
    )
}

export default GerentePrivateRouter;