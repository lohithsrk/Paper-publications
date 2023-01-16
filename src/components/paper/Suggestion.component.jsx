import React from 'react';

const Suggestion = ({ user, comment }) => {
	return (
		<div className='bg-gray-100 rounded-md my-2 p-3'>
			<p className='text-lg font-medium'>{user}</p>
			<p>{comment}</p>
		</div>
	);
};

export default Suggestion;
