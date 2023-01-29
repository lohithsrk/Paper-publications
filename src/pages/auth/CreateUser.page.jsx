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
  Typography,
} from "@material-tailwind/react";

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
    <section className="flex justify-center w-full items-center h-[calc(100vh-5rem)]">
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

      <Card className="absolute top-2/4 left-2/4 w-full max-w-[30rem] -translate-y-2/4 -translate-x-2/4">
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
      </Card>
    </section>
  );
};

export default CreateUser;
