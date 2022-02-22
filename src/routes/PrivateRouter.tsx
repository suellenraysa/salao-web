import React from "react";
import { RouteProps, Route, Redirect } from "react-router";
import { getUser } from "../services/auth";

interface RProps extends RouteProps {
    component: React.ComponentType;
}

const PrivateRouter: React.FC<RProps> = ({ component: Component, ...rest }) => {
    const user = getUser();
    
    return (
        <Route 
            {...rest}
            render={({ location }) => {
                return user.usuarioId 
                ? (<Component />)
                : (
                    <Redirect 
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            }}
        />
    )
}

export default PrivateRouter;