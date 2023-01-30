import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { loginUser } from '../../axios/auth.axios';
import Image from '../../assets/login-img-3.jpg';

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
    <section className="flex justify-center w-full items-center h-[100vh] bg-white">
      {/* <div className='bg-gray-50  shadow-lg w-[30%] rounded-lg h-[80%] flex flex-col justify-center items-center shadow-neu1 shadow-neu2'>
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
			</div>  */}

      <div className="flex w-[100%]">
        <div className="flex flex-col justify-center items-center w-[50%]">
          <div className="p-20 rounded-lg">
            <h1 className="flex items-center font-bold text-6xl text-black">
              Login
            </h1>
            <p className="mb-12 mt-5 text-lg">Enter your details</p>
            <form
              className="flex flex-col justify-center items-center"
              onSubmit={handleSubmit}
            >
              <label htmlFor="">Email</label>
              <input
                type="text"
                name="email"
                placeholder="E-Mail"
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="appearance-none bg-transparent border-2 border-[#ffffff] border-b-gray-300 focus:border-b-[#354259] w-full text-black text-lg mt-3 mb-5 py-1 px-2 leading-tight focus:outline-none"
              />
              <label htmlFor="">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                minLength="6"
                maxLength="15"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="appearance-none bg-transparent border-2 border-[#ffffff]  border-b-gray-300  focus:border-b-[#354259] w-full text-black text-lg mt-3 mb-5 py-1 px-2 leading-tight focus:outline-none"
              />
              <button className="inline-block px-6 py-2.5 bg-[#354259] text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-[#C2DED1] hover:text-black hover:shadow-lg focus:bg-[#C2DED1] focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#C2DED1] active:shadow-lg active:text-black transition duration-150 ease-in-out m-5">
                Sign In
              </button>
            </form>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center w-[50%] relative h-[100vh] bg-black]">
          <img src={Image} alt="" className="object-cover" />
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
