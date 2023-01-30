import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { appPaper } from '../../axios/paper.axios';

const AddPaper = ({ fetchPapers, setIsDialogopened }) => {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [paper, setPaper] = useState('');

	const { user } = useSelector((state) => ({ ...state }));

	const handleSubmit = (e) => {
		e.preventDefault();

		const formData = new FormData();

		formData.append('title', title);
		formData.append('description', description);
		formData.append('userId', user.id_user);
		formData.append('paper', paper);

		appPaper(formData, user && user.token).then((res) => {
			fetchPapers(new Date().getFullYear());
			setIsDialogopened(false);
		});
	};

	return (
    <div
      className="absolute w-full top-0 left-0 h-[calc(100vh-5rem)] bg-black bg-opacity-40 flex items-center justify-center backdrop-blur-sm"
      onClick={() => setIsDialogopened(false)}
    >
      <div
        className="bg-white rounded-md p-8 shadow-xl w-2/4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full flex justify-between items-center">
          <h3 className=" font-bold uppercase text-xl inline">
            Upload your paper
          </h3>
          <span
            className="text-4xl cursor-pointer"
            onClick={() => setIsDialogopened(false)}
          >
            &times;
          </span>
        </div>
        <form
          className="flex flex-col items-center justify-center"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col w-full mt-3">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              className="border border-dashed border-gray-300 rounded mt-2 p-2"
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              required
            />
          </div>
          <div className="flex flex-col w-full mt-3">
            <label htmlFor="title">Description</label>
            <textarea
              name="description"
              className="resize-none w-full border border-dashed border-gray-300 rounded h-32 mt-2 p-2"
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              required
            ></textarea>
          </div>
          <div className="w-full">
            <input
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 my-4 p-3"
              id="file_input"
              type="file"
              onChange={(e) => setPaper(e.target.files[0])}
              required
            />
          </div>
          <button className="bg-[#354259] p-2 text-white rounded px-4 w-full shadow-xl">
            Upload
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPaper;
