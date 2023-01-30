import React from 'react';

const Suggestion = ({ comment }) => {
	return (
		<div className='bg-gray-100 rounded-md my-2 p-3 shadow-lg mb-4'>
			<p className='text-lg font-medium capitalize'>{comment.username}</p>
			<p className='capitalize'>{comment.comment}</p>
		</div>
	);
};

export default Suggestion;
