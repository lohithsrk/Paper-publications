import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
	const { user } = useSelector((state) => ({ ...state }));
	const dispatch = useDispatch();
	const navigate = useNavigate();
	return (
		<nav className='flex w-full justify-between px-20 h-20 bg-[#313A87] items-center shadow-lg'>
			<div>
				<h2 className='text-white'>PAPER PUBLICATION</h2>
			</div>
			<div>
				{user && user.token && (
					<p
						className='text-white cursor-pointer'
						onClick={() => {
							dispatch({ type: 'LOGOUT_USER' });
							navigate('/');
						}}
					>
						LOGOUT
					</p>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
