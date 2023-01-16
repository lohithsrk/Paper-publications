import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const Navbar = () => {
	const { user } = useSelector((state) => ({ ...state }));
	const dispatch = useDispatch();
	return (
		<nav className='flex w-full justify-between px-20 h-20 bg-[#313A87] items-center'>
			<div>
				<h2 className='text-white'>Paper Publication</h2>
			</div>
			<div>
				{user&&user.token && (
					<p
						className='text-white cursor-pointer'
						onClick={() => dispatch({ type: 'LOGOUT_USER' })}
					>
						Logout
					</p>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
