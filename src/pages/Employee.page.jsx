import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import AddPaper from '../components/employee/AddPaper.component';
import Paper from '../components/employee/Paper.component';

import { getPaper } from '../axios/paper.axios';

const EmployeePage = () => {
	const { user } = useSelector((state) => ({ ...state }));

	const [papers, setPapers] = useState([]);
	const [isDialogopened, setIsDialogopened] = useState(false);

	const fetchPapers = async (order) =>
		getPaper(user.id_user, user.token, order).then((res) => {
			setPapers(res.data);
		});

	useEffect(() => {
		fetchPapers('DESC');
	}, []);

	return (
		<section className='relative'>
			{isDialogopened && (
				<AddPaper
					fetchPapers={fetchPapers}
					setIsDialogopened={setIsDialogopened}
				/>
			)}
			<h1 className='text-center font-bold text-4xl py-7'>
				Welcome back {user.name}
			</h1>
			<div className='flex w-full justify-around'>
				<span className='font-semibold'>Mentor: XXXYYY</span>
				<span className='font-semibold'>
					Papers Submitted:{' '}
					{papers.filter((paper) => paper.status === 'Submitted').length}
				</span>
				<span className='font-semibold'>
					Papers for review:{' '}
					{papers.filter((paper) => paper.status === 'Revision').length}
				</span>
				<span className='font-semibold'>
					Papers for reviewed:{' '}
					{papers.filter((paper) => paper.status === 'Reviewed').length}
				</span>
			</div>
			<div className='flex justify-between mx-20 my-10'>
				<div className='flex'>
					<button
						className='bg-[#313A87] rounded-full flex text-white p-2 items-center'
						onClick={() => setIsDialogopened(true)}
					>
						<img
							src='https://img.icons8.com/ios-glyphs/30/ffffff/macos-maximize.png'
							width='35'
							alt='plus'
						/>
						<span className='mx-2'>Add paper</span>
					</button>
				</div>
				<div>
					<select
						className='border-[#313A87] border-2 rounded-lg p-1 flex'
						onChange={(e) => fetchPapers(e.target.value)}
					>
						<option value='DESC'>Latest</option>
						<option value='ASC'>Oldest</option>
					</select>
				</div>
			</div>
			<div>
				{papers.map((paper, index) => {
					return (
						<Paper
							paper={paper}
							key={index}
							fetchPapers={fetchPapers}
							user={user}
						/>
					);
				})}
			</div>
		</section>
	);
};

export default EmployeePage;
