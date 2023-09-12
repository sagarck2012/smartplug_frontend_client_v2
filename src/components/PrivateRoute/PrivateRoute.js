import React from 'react';
import {Navigate, Redirect, Route} from 'react-router';
import useAuth from '../../hooks/useAuth';
import {render} from "react-dom";
import {useNavigate} from "react-router-dom";

const PrivateRoute = ({ children, ...rest }) => {
    const { user } = useAuth();
    const navigate = useNavigate()

    return user.username ? children : navigate('/')
};

export default PrivateRoute;