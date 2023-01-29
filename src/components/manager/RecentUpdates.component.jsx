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
	}, []);

	return (
		<div className='h-full'>
			<h1 className='text-xl font-semibold mb-2 mt-3 mr-8'>Recent Updates</h1>
			<div className='overflow-y-scroll h-full '>
				<div className='mr-5 '>
					<Paper papers={recentPapers} />
				</div>
			</div>
		</div>
	);
};

export default RecentUpdates;
