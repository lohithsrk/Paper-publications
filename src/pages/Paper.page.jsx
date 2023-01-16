import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import { getParticularPaper } from '../axios/paper.axios';

const Paperpage = () => {
	const { id_paper, id_user } = useParams({});

	const [paper, setPaper] = useState({});
	const [editedPaper, setEditedPaper] = useState({
		id_paper: '',
		title: '',
		description: '',
		id_user: '',
		status: '',
		suggesions: null,
		createdAt: '',
		updatedAt: ''
	});
	const [isEditModeOn, setIsEditModeOn] = useState(false);

	const fetchParticularPaper = async () => {
		await getParticularPaper(id_paper, id_user).then((res) => {
			setPaper(res.data);
			setEditedPaper(res.data);
		});
	};

	useEffect(() => {
		fetchParticularPaper(id_paper, id_user);
	}, []);

	return (
		<section className='px-20 pt-10'>
			<form>
				<input
					type='text'
					className='text-3xl font-bold disabled:bg-transparent'
					value={editedPaper.title}
					onChange={(e) =>
						setEditedPaper({ ...editedPaper, title: e.target.value })
					}
					disabled
				/>
				<br />
				<textarea
					className='disabled:bg-transparent resize-none mt-3'
					onChange={(e) =>
						setEditedPaper({ ...editedPaper, description: e.target.value })
					}
					value={editedPaper.description}
				>
					{/* {editedPaper.description} */}
				</textarea>
				<br />
				{!isEditModeOn ? (
					<a
						href={`http://localhost:8080/api/${paper.link}`}
						target='_blank'
						rel='noreferrer'
					>
						View Paper
					</a>
				) : (
					<input
						className='block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 my-4 p-3'
						id='file_input'
						type='file'
						onChange={(e) => setPaper(e.target.files[0])}
						required
					/>
				)}
			</form>
			<hr />
		</section>
	);
};

export default Paperpage;
