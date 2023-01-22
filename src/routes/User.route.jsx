import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/manager/Sidebar.component';

const UserRoute = () => {
	const { user } = useSelector((state) => ({ ...state }));
	return user && user.token.length ? (
		<div className={user.role === 'admin' && 'flex'}>
			{user.role === 'admin' && <Sidebar />}
			<div className={user.role === 'admin' && 'p-3'}>
				<Outlet />
			</div>
		</div>
	) : (
		<Navigate to='login' />
	);
};

export default UserRoute;
