import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';

import AddPaper from '../components/employee/AddPaper.component';
import Paper from '../components/employee/Paper.component';

import { getPaper } from '../axios/paper.axios';

const Employee = () => {
	const { id_user } = useParams();
	const { user } = useSelector((state) => ({ ...state }));
	const { state } = useLocation();
	const [papers, setPapers] = useState([]);
	const [isDialogopened, setIsDialogopened] = useState(false);

	const fetchPapers = async (year) =>
		getPaper(id_user ? id_user : user.id_user, user.token, [year]).then(
			(res) => {
				setPapers(res.data);
			}
		);

	useEffect(() => {
		fetchPapers(new Date().getFullYear());
	}, []);

	return (
		<section
			className={`relative ${
				user.role === 'admin' ? 'w-[calc(100vw-10rem)]' : 'w-full'
			} bg-gray-50`}
		>
			{isDialogopened && (
				<AddPaper
					fetchPapers={fetchPapers}
					setIsDialogopened={setIsDialogopened}
				/>
			)}
			<div className='px-5'>
				<h1 className='pl-20 font-bold text-4xl pt-7'>
					{state && state.name
						? state.name
						: user.name.charAt(0).toUpperCase() + user.name.slice(1)}
				</h1>
				{/* <h1 className='pl-20 font-normal text-xl pb-7 pt-1'>Designation</h1> */}
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
			</div>
			<div className='flex justify-between items-center mx-20 my-6 shadow-lg p-5 rounded-lg bg-white'>
				<div className='flex'>
					{user && user.role !== 'admin' ? (
						<button
							className='
							bg-[#313A87] rounded-lg shadow-lg flex text-white p-2 items-center'
							onClick={() => setIsDialogopened(true)}
						>
							<img
								src='https://img.icons8.com/ios-glyphs/30/ffffff/macos-maximize.png'
								width='35'
								alt='plus'
							/>
							<span className='mx-2 '>Add paper</span>
						</button>
					) : (
						<h1 className='text-lg font-semibold uppercase'>Papers uploaded</h1>
					)}
				</div>
				<div>
					<select
						className='border-[#313A87] border-2 rounded-lg p-1 pl-4 flex shadow-lg'
						onChange={(e) => fetchPapers(e.target.value)}
					>
						{Array(5)
							.fill(0)
							.map((e, i) => (
								<option value={new Date().getFullYear() - i}>
									{new Date().getFullYear() - i}
								</option>
							))}
					</select>
				</div>
			</div>
			<div className='px-20'>
				<div className='rounded-lg overflow-hidden mb-7 bg-white'>
					<Paper papers={papers} />
				</div>
			</div>
		</section>
	);
};

export default Employee;
