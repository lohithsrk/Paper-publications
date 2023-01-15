import React from 'react';
import Paper from '../components/employee/Paper.component';

const EmployeePage = () => {
	return (
		<section className='relative'>
			<h1 className='text-center font-bold text-4xl py-7'>Welcome back user</h1>
			<div className='flex w-full justify-around'>
				<span className='font-semibold'>Mentor: XXXYYY</span>
				<span className='font-semibold'>Papers Submitted: 2</span>
				<span className='font-semibold'>Papers for review: 1</span>
				<span className='font-semibold'>Papers for revision: 1</span>
			</div>
			<div className='flex justify-between mx-20 my-10'>
				<div className='flex'>
					<button className='bg-[#313A87] rounded-full flex text-white p-2 items-center'>
						<img
							src='https://img.icons8.com/ios-glyphs/30/ffffff/macos-maximize.png'
							width='35'
							alt='plus'
						/>
						<span className='mx-2'>Add paper</span>
					</button>
					<button className='bg-[#313A87] rounded-full flex text-white p-2 items-center px-4 ml-5'>
						Get Suggestions
					</button>
				</div>
				<div>
					<select
						name=''
						id=''
						className='border-[#313A87] border-2 rounded-lg p-1 flex'
					>
						<option value=''>Newest</option>
						<option value=''>Modified</option>
					</select>
				</div>
			</div>
			<div>
				<Paper />
			</div>
		</section>
	);
};

export default EmployeePage;
