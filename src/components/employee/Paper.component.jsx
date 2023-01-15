import React from 'react';

const Paper = () => {
	return (
		<div className='flex mx-20 my-5 justify-between items-center rounded-lg bg-[#E98086] p-5 '>
			<h1 className='text-center font-bold text-2xl'>
				Editorial: Data Science Applications to Inverse and Optimization
				Problems in Earth Science
			</h1>

			<div>
				<p>Status: Waiting for review</p>

				<select
					name='Change status'
					id=''
					className='mt-1 rounded-lg border-[#ffff]'
				>
					<option value=''>Submitted</option>
					<option value=''>Revision</option>
					<option value=''>Waiting for review</option>
				</select>
				<p className='pt-3'>Date: DD/MM/YYYY</p>
			</div>
		</div>
	);
};

export default Paper;
