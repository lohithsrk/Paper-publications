import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Input,
	Checkbox,
	Button,
	Typography
} from '@material-tailwind/react';

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
			{/* <div className='bg-[#83A1CE] w-[30%] rounded-lg h-[80%] flex flex-col justify-center items-center shadow-neu1 shadow-neu2'>
				<div className='flex flex-col mb-10'>
					<h1 className='flex font-bold text-4xl text-white'>Create User</h1>
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
			</div> */}

			{/* <Card className="absolute top-2/4 left-2/4 w-full max-w-[30rem] -translate-y-2/4 -translate-x-2/4">
        <form onSubmit={(e) => handleSubmit(e)}>
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Sign Up
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            
              <Input
                variant="standard"
                type="email"
                label="Email"
                size="lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              
           
            

            <Input
              variant="standard"
              type="password"
              label="Password"
              size="lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" fullWidth type="submit">
              Sign Up
            </Button>
            
          </CardFooter>
        </form>
      </Card> */}
			<div className='flex w-[100%]'>
				<div className='flex flex-col justify-center items-center w-[100%]'>
					<div className='p-20 rounded-lg flex flex-col justify-center items-center'>
						<h1 className='flex  font-bold mb-3 text-3xl text-black'>
							Create User
						</h1>
						<form
							className='flex flex-col justify-center items-center'
							onSubmit={handleSubmit}
						>
							<label htmlFor='' className='w-full'>Email</label>
							<input
								type='text'
								name='email'
								placeholder='E-Mail'
								required
								onChange={(e) => setEmail(e.target.value)}
								value={email}
								className='appearance-none bg-transparent border-2 border-[#ffffff] border-b-[#00008b] w-full text-black text-base mt-3 mb-5 py-1 px-2 leading-tight focus:outline-none'
							/>
							<label htmlFor='' className='w-full'>Password</label>
							<input
								type='password'
								name='password'
								placeholder='Password'
								required
								minLength='6'
								maxLength='15'
								onChange={(e) => setPassword(e.target.value)}
								value={password}
								className='appearance-none bg-transparent border-2 border-[#ffffff] border-b-[#00008b] w-full text-black text-base mt-3 mb-5 py-1 px-2 leading-tight focus:outline-none'
							/>
							<button className='w-full inline-block px-6 py-2.5 bg-[#354259] text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-[#C2DED1] hover:text-black hover:shadow-lg focus:bg-[#C2DED1] focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#C2DED1] active:shadow-lg active:text-black transition duration-150 ease-in-out m-5'>
								Create user
							</button>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
};

export default CreateUser;
