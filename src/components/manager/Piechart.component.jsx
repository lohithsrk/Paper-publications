import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import { useSelector } from 'react-redux';

import { getPapers } from '../../axios/paper.axios';

export const options = {
	title: 'Analysis',
	pieHole: 0,
	is3D: true
};

function Piechart() {
	const { user } = useSelector((state) => ({ ...state }));
	const [data, setData] = useState([
		['Status', 'Count'],
		['Reviewed', 1],
		['Revision', 1],
		['Submitted', 1]
	]);
	useEffect(() => {
		getPapers(user.token).then(({ data }) => {
			
			setData([
				['Status', 'Count'],
				[
					'Reviewed',
					data.filter((paper) => paper.status === 'Reviewed').length
				],
				[
					'Revision',
					data.filter((paper) => paper.status === 'Revision').length
				],
				[
					'Submitted',
					data.filter((paper) => paper.status === 'Submitted').length
				]
			]);
		});
	}, []);

	return (
		<>
			<Chart
				chartType='PieChart'
				width='100%'
				height='110%'
				data={data}
				options={options}
			/>
		</>
	);
}

export default Piechart;
