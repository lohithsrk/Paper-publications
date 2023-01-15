import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

const UserRoute = () => {
	const { user } = useSelector((state) => ({ ...state }));
	return user && user.token.length ? <Outlet /> : <Navigate to='login' />;
};

export default UserRoute;
