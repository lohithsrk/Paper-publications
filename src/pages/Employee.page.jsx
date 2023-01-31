import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import AddPaper from '../components/employee/AddPaper.component';
import Paper from '../components/employee/Paper.component';

import { getPaper } from '../axios/paper.axios';

import Image from '../assets/plus-icon-white.png';

const Employee = () => {
	const { id_user } = useParams();
	const { user } = useSelector((state) => ({ ...state }));
	console.log('🚀 ~ file: Employee.page.jsx:16 ~ Employee ~ user', user);
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
			<Helmet>
				<title>{user.name.charAt(0).toUpperCase() + user.name.slice(1)}</title>
			</Helmet>
			{isDialogopened && (
				<AddPaper
					fetchPapers={fetchPapers}
					setIsDialogopened={setIsDialogopened}
				/>
			)}
			<div className='px-5'>
				<h1 className='pl-20 font-bold text-4xl pt-7'>{user.name}</h1>
				{/* <h1 className="pl-20 font-normal text-xl pb-7 pt-1">Designation</h1> */}
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
			<div
				className={`flex justify-between items-center mx-20 my-6 -lg ${
					user && user.role !== 'admin' && 'bg-[#ECE5C7] shadow-lg p-5 rounded'
				}`}
			>
				<div className='flex'>
					{user && user.role !== 'admin' && (
						<button
							className='bg-[#354259] rounded-lg shadow-lg flex text-white p-2 items-center'
							onClick={() => setIsDialogopened(true)}
						>
							<img src={Image} width='35' alt='plus' />
							<span className='mx-2 text-white font-bold '>Add paper</span>
						</button>
					)}
				</div>
				<div>
					<select
						className='border-[#354259] border-2 rounded-lg p-1 pl-4 flex shadow-lg'
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
				<div className='rounded-lg overflow-hidden shadow-lg mb-7 bg-[#ECE5C7]'>
					<Paper papers={papers} />
				</div>
			</div>
		</section>
	);
};

export default Employee;
