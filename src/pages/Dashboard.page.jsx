import React from 'react';
import RecentUpdates from '../components/manager/RecentUpdates.component';
import OpenSuggestions from '../components/manager/OpenSuggestions.component';
import PiechartComponent from '../components/manager/Piechart.component';

const Dashboard = () => {
	return (
		<div className='flex w-[calc(100vw-15rem)] h-[calc(100vh-5rem)] p-3 relative overflow-hidden'>
			<div className='w-1/2'>
				<PiechartComponent />
			</div>
			<div className='w-1/2'>
				<div className='w-full h-[calc((100vh-7rem)/2)] rounded-lg overflow-hidden'>
					<RecentUpdates />
				</div>
				{/* <div className='h-full'>
					<OpenSuggestions />
				</div> */}
			</div>
		</div>
	);
};

export default Dashboard;
