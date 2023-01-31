import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { getRecentPapers } from '../../axios/paper.axios';

import Paper from '../../components/employee/Paper.component';

const RecentUpdates = () => {
	const { user } = useSelector((state) => ({ ...state }));

	const [recentPapers, setRecentPapers] = useState([]);

	useEffect(() => {
		getRecentPapers(user.token).then((response) => {
			setRecentPapers(response.data);
		});
	}, [user.token]);

	return (
		<div className='h-full'>
			<div className='overflow-y-scroll h-full'>
				<div className='mr-5 bg-[#ECE5C7] shadow-lg rounded-lg overflow-hidden'>
					<Paper papers={recentPapers} />
				</div>
			</div>
		</div>
	);
};

export default RecentUpdates;
