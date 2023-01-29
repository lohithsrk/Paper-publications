import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { loginUser } from '../../axios/auth.axios';
import Image from '../../assets/login-img.jpg';

const LoginPage = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const dispatch = useDispatch();

	const handleSubmit = async (e) => {
		e.preventDefault();

		await loginUser({ email, password })
			.then((res) => {
				toast.success(`Welcome back ${res.data.name}`);
				dispatch({
					type: 'CREATE_USER',
					payload: res.data
				});
			})
			.catch(({ response }) => {
				toast.error(response.data.error);
			});
	};

	return (
		<section className='flex justify-center w-full items-center h-[calc(100vh-5rem)] bg-gray-100'>
			<div className='bg-gray-50  shadow-lg w-[30%] rounded-lg h-[80%] flex flex-col justify-center items-center shadow-neu1 shadow-neu2'>
				<div className='flex flex-col mb-10'>
					<h1 className='flex font-bold text-4xl text-[#313A87]'>Login</h1>
				</div>
				<form onSubmit={handleSubmit}>
					<div className='flex flex-col items-center'>
						<input
							type='text'
							name='email'
							className='border-2 m-3 text-center rounded-lg leading-9'
							placeholder='E-Mail'
							required
							onChange={(e) => setEmail(e.target.value)}
							value={email}
						/>
						<input
							type='password'
							name='password'
							className='border-2 m-3 text-center rounded-lg leading-9'
							placeholder='Password'
							required
							minLength='6'
							maxLength='15'
							onChange={(e) => setPassword(e.target.value)}
							value={password}
						/>
					</div>
					<button className='bg-[#313A87] rounded-lg flex text-white p-2 items-center px-10 m-10 mt-20 hover:bg-violet-600'>
						Login
					</button>
				</form>
			</div>

			<div className='flex'>
				<div className='flex flex-col justify-center items-center w-[50%] '>
					<h1 className='flex font-bold text-4xl text-black'>Login</h1>
					<p>Enter your details</p>
					<form
						className='flex flex-col justify-center items-center'
						onSubmit={handleSubmit}
					>
						<label htmlFor=''>Email</label>
						<input
							type='text'
							name='email'
							placeholder='E-Mail'
							required
							onChange={(e) => setEmail(e.target.value)}
							value={email}
							className='w-full rounded-md border-gray-200 pr-10 shadow-sm sm:text-sm'
						/>
						<label htmlFor=''>Password</label>
						<input
							type='password'
							name='password'
							placeholder='Password'
							required
							minLength='6'
							maxLength='15'
							onChange={(e) => setPassword(e.target.value)}
							value={password}
							className='w-full rounded-md border-gray-200 pr-10 shadow-sm sm:text-sm'
						/>
						<input type='checkbox' />
						<label htmlFor=''>Remember me</label>
						<button>Sign In</button>
					</form>
				</div>
				<div className='flex h-full flex-col justify-center items-center w-[50%] relative overflow-hidden '>
					<img
						src={Image}
						alt='imageeee'
						className=' h-[100vh] w-full object-cover'
					/>
				</div>
			</div>
		</section>
	);
};

export default LoginPage;
