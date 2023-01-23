import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const Sidebar = () => {
	const { pathname } = useLocation();

	return (
		<div className='bg-gray-100 h-[calc(100vh-5rem)] py-3 px-5 w-[15rem] shadow-lg'>
			<ul>
				{adminNav.map((nav, index) => (
					<li
						key={index}
						className={`${
							pathname === nav.path ? 'bg-[#313A87] text-white' : 'bg-gray-300'
						} my-3 p-3 w-full text-center rounded-md shadow-md`}
					>
						<Link to={nav.path} className='w-full h-full'>
							{nav.name}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Sidebar;

const adminNav = [
	{ path: '/', name: 'Statistics' },
	{ path: '/employees', name: 'Employees' },
	{ path: '/create-user', name: 'Create user' }
];
