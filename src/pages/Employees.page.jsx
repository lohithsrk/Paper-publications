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
				await getPaper(u.id_user, user.token, [2023,2024,2025,2026,2027]).then(
					(res) => {
						u.papers = res.data;
						setAllEmployees([...allEmployees, u]);
					}
				);
			});
		});
	}, []);

	return (
		<div className='px-10 py-5 w-[calc(100vw-15rem)]'>
			<h1 className='font-bold text-2xl mb-5'>Employees</h1>
			<div className='rounded-lg overflow-hidden shadow-lg mb-6 w-full'>
				<table className='w-full text-center h-full'>
					<thead className=' bg-gray-100'>
						<tr>
							<td className='py-3 font-semibold text-base'>Name</td>
							<td className='py-3 font-semibold text-base'>Total papers</td>
							<td className='py-3 font-semibold text-base'>Submitted</td>
							<td className='py-3 font-semibold text-base'>Revision</td>
							<td className='py-3 font-semibold text-base'>Revised</td>
						</tr>
					</thead>
					<tbody>
						{allEmployees && allEmployees.length > 0 ? (
							allEmployees.map((employee, index) => (
								<tr
									key={index}
									className='border-b-[1px] border-gray-100 cursor-pointer'
									onClick={() =>
										navigate(`/user/${employee.id_user}`, { state: employee })
									}
								>
									<td className='py-3'>
										{employee.name.charAt(0).toUpperCase() +
											employee.name.slice(1)}
									</td>
									<td className='py-3'>{employee.papers.length}</td>
									<td className='py-3'>
										{
											employee.papers.filter(
												(paper) => paper.status === 'Submitted'
											).length
										}
									</td>
									<td className='py-3'>
										{
											employee.papers.filter(
												(paper) => paper.status === 'Revision'
											).length
										}
									</td>
									<td className='py-3'>
										{
											employee.papers.filter(
												(paper) => paper.status === 'Revised'
											).length
										}
									</td>
								</tr>
							))
						) : (
							<tr>
								<td></td>
								<td></td>
								<td className='py-6'>No Employees found</td>
								<td></td>
								<td></td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Employees;
