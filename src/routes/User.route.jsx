import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Outlet } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { validateUser } from '../axios/auth.axios';

const UserRoute = () => {
	const { user } = useSelector((state) => ({ ...state }));
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { isLoading, error, data } = useQuery({
		queryKey: ['login'],
		queryFn: () => validateUser(user.token).then((res) => res.json())
	});
	console.log("🚀 ~ file: User.route.jsx:18 ~ UserRoute ~ data", data)
	if (user && user.token) {
		if (error) {
			dispatch({ type: 'LOGOUT_USER', payload: null });
			toast.error('Please login to continue');
			navigate('/login');
		}
		if (!isLoading) {
			if (!data.token.length) {
				dispatch({ type: 'LOGOUT_USER', payload: null });
				navigate('/login');
			}
		}
	}

	return user && user.token.length ? <Outlet /> : <Navigate to='login' />;
};

export default UserRoute;
