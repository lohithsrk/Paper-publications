import React, { useState } from 'react';
import { Helmet } from 'react-helmet';

import RecentUpdates from '../components/manager/RecentUpdates.component';
import OpenSuggestions from '../components/manager/OpenSuggestions.component';
import PiechartComponent from '../components/manager/Piechart.component';

const Dashboard = () => {
	const [isRecentSelected, serIsRecentSelected] = useState(true);
	return (
		<div className='flex w-[calc(100vw-15rem)] h-[calc(100vh-5rem)] p-3 relative overflow-hidden'>
			<Helmet>
				<title>Dashboard</title>
			</Helmet>
			<div className='w-1/2'>
				<PiechartComponent />
			</div>
			<div className='w-1/2 pl-3 flex justify-center flex-col'>
				<div className='flex mb-3 shadow-lg rounded-lg mr-10'>
					<div
						className={`w-full text-center ${
							isRecentSelected && 'text-white bg-[#354259]'
						} py-3 rounded-lg cursor-pointer`}
						onClick={() => serIsRecentSelected(true)}
					>
						Recent updates
					</div>
					<div
						className={`w-full text-center ${
							!isRecentSelected && 'text-white bg-[#354259]'
						} py-3 rounded-lg cursor-pointer`}
						onClick={() => serIsRecentSelected(false)}
					>
						Open Suggessions
					</div>
				</div>
				<div>
					<div className='w-full rounded-lg p-3'>
						{isRecentSelected ? <RecentUpdates /> : <OpenSuggestions />}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
