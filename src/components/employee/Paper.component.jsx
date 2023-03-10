import React from 'react';
import { useNavigate } from 'react-router-dom';

const Paper = ({ papers }) => {
	const navigate = useNavigate();

	return (
		<div className='rounded-lg shadow-lg'>
			<table className='w-full text-center h-full'>
				<thead className=' bg-[#354259]'>
					<tr>
						<td className='py-3 font-semibold text-base text-white'>Title</td>
						<td className='py-3 font-semibold text-base text-white'>Date</td>
						<td className='py-3 font-semibold text-base text-white'>Status</td>
					</tr>
				</thead>
				<tbody>
					{papers && papers.length > 0 ? (
						papers.map((paper, index) => (
							<tr
								key={index}
								className='border-b-[1px] border-gray-100 cursor-pointer'
								onClick={(e) => {
									navigate(`/paper/${paper.id_user}/${paper.id_paper}`);
								}}
							>
								<td className='py-3'>
									{paper.title.charAt(0).toUpperCase() + paper.title.slice(1)}
								</td>
								<td className='py-3'>
									{new Date(paper.createdAt).toLocaleString().split(',')[0]}
									<br />
									{new Date(paper.createdAt).toLocaleString().split(',')[1]}
								</td>
								<td
									className={`py-3 font-semibold ${
										paper.status === 'Submitted'
											? 'text-red-500'
											: paper.status === 'Revision'
											? 'text-yellow-400'
											: 'text-green-400'
									}`}
								>
									{paper.status}
								</td>
							</tr>
						))
					) : (
						<tr>
							<td></td>
							<td className='py-3'>No papers found</td>
							<td></td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
};

export default Paper;
