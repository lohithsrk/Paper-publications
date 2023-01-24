import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import AddPaper from '../components/employee/AddPaper.component';
import Paper from '../components/employee/Paper.component';

import { getPaper } from '../axios/paper.axios';

const Employee = () => {
	const { id_user } = useParams();
	const { user } = useSelector((state) => ({ ...state }));

	const [papers, setPapers] = useState([]);
	const [isDialogopened, setIsDialogopened] = useState(false);

	const fetchPapers = async (order) =>
		getPaper(id_user ? id_user : user.id_user, user.token, order).then(
			(res) => {
				setPapers(res.data);
			}
		);

	useEffect(() => {
		fetchPapers('DESC');
	}, []);

	return (
		<section
			className={`relative ${
				user.role === 'admin' ? 'w-[calc(100vw-10rem)]' : 'w-full'
			}`}
		>
			{isDialogopened && (
				<AddPaper
					fetchPapers={fetchPapers}
					setIsDialogopened={setIsDialogopened}
				/>
			)}
			<h1 className='pl-20 font-bold text-4xl py-7'>
				Welcome back {user.name}
			</h1>
			<div className='flex w-full justify-between px-20'>
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
			<br />
			<hr />
			<div className='flex justify-between items-center mx-20 my-6'>
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
			<hr />
			<br />
			<div className='flex px-20 gap-7 flex-wrap '>
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

export default Employee;
