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
		<div>
			<div className='overflow-y-scroll '>
				<div className='mr-5 '>
					<Paper papers={recentPapers} />
				</div>
			</div>
		</div>
	);
};

export default RecentUpdates;
