import React from "react";
import { RouteProps, Route, Redirect } from "react-router";
import { getUser, isAuthenticated } from "../services/auth";

interface RProps extends RouteProps {
    component: React.ComponentType;
}

const ClientePrivateRouter: React.FC<RProps> = ({ component: Component, ...rest }) => {
    const user = getUser();
    
    return (
        <Route 
            {...rest}
            render={({ location }) => {
                return user.clienteId 
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

export default ClientePrivateRouter;