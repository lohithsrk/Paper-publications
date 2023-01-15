import React from 'react';
import { setPaper } from '../../axios/paper.axios';

const Paper = ({ paper, fetchPapers, user }) => {
	return (
		<div
			className={`flex mx-20 my-5 justify-between items-center rounded-lg ${
				paper.status === 'Submitted'
					? 'bg-[#E98086]'
					: paper.status === 'Revision'
					? 'bg-yellow-200'
					: 'bg-green-300'
			} p-5 cursor-pointer`}
		>
			<h1 className='text-center font-bold text-2xl'>{paper.title}</h1>

			<div>
				<p>Status: {paper.status}</p>

				<select
					name='Change status'
					id=''
					className='mt-1 rounded-lg border-[#ffff]'
					defaultValue={paper.status}
					onChange={(e) => {
						setPaper(paper.id_paper, user.token, e.target.value).then((res) => {
							fetchPapers('DESC');
						});
					}}
				>
					<option value='Submitted'>Submitted</option>
					<option value='Revison'>Revision</option>
					<option value='Reviewed'>Reviewed</option>
				</select>
				<p className='pt-3'>Date: {paper.createdAt}</p>
			</div>
		</div>
	);
};

export default Paper;
