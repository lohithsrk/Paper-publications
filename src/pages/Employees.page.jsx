import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getAllUsers } from '../axios/employees.axios';
import { getPaper } from '../axios/paper.axios';

const Employees = () => {
	const navigate = useNavigate();
	const { user } = useSelector((state) => ({ ...state }));

	const [allEmployees, setAllEmployees] = useState([]);

	useEffect(() => {
		getAllUsers(user.token).then((res) => {
			const users = res.data;
			users.forEach(async (u, i) => {
				await getPaper(u.id_user, user.token, 'DESC').then((res) => {
					u.papers = res.data;
					setAllEmployees([...allEmployees, u]);
				});
			});
		});
	}, []);

	return (
		<div className='px-10 py-5'>
			<h1 className='font-bold text-2xl mb-5'>Employees</h1>
			<div>
				{allEmployees.map((employee, index) => {
					return (
						<div
							key={index}
							className='bg-gray-200 p-3 px-5 rounded-md shadow-md cursor-pointer'
							onClick={() => navigate(`/user/${employee.id_user}`)}
						>
							<p className='text-center text-xl font-semibold mb-3'>
								{employee.name}
							</p>
							<p className='bg-white p-2 rounded-md mb-2'>
								Submitted:{' '}
								{
									employee.papers.filter(
										(paper) => paper.status === 'Submitted'
									).length
								}
							</p>
							<p className='bg-white p-2 rounded-md mb-2'>
								Revision:{' '}
								{
									employee.papers.filter((paper) => paper.status === 'Revision')
										.length
								}
							</p>
							<p className='bg-white p-2 rounded-md mb-2'>
								Reviewed:{' '}
								{
									employee.papers.filter((paper) => paper.status === 'Reviewed')
										.length
								}
							</p>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Employees;
