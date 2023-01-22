import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { loginUser } from '../../axios/auth.axios';

const CreateUser = () => {
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
		<section className='flex justify-center w-full items-center h-[calc(100vh-5rem)]'>
			<div className='bg-[#83A1CE] w-[30%] rounded-lg h-[80%] flex flex-col justify-center items-center shadow-neu1 shadow-neu2'>
				<div className='flex flex-col mb-10'>
					<h1 className='flex font-bold text-4xl text-white'>Login</h1>
				</div>
				<form onSubmit={handleSubmit}>
					<div className='flex flex-col items-center'>
						<input
							type='text'
							name='email'
							className='border-[#313A87] border-2 m-3 text-center rounded-lg leading-9'
							placeholder='E-Mail'
							required
							onChange={(e) => setEmail(e.target.value)}
							value={email}
						/>
						<input
							type='password'
							name='password'
							className='border-[#313A87] border-2 m-3 text-center rounded-lg leading-9'
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
		</section>
	);
};

export default CreateUser;
