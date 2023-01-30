import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
	getAllSuggestion,
	updateSuggestion
} from '../../axios/suggestion.axios';

const OpenSuggestions = () => {
	const { user } = useSelector((state) => ({ ...state }));
	const navigate = useNavigate();

	const [current, setCurrent] = useState(null);

	const [suggestions, setSuggestions] = useState([]);

	useEffect(() => {
		getAllSuggestion(user.token).then((response) => {
			setSuggestions(response.data);
		});
	}, []);

	return (
    <div>
      {current && (
        <CommentDialog paper={current} setCurrent={setCurrent} user={user} />
      )}
      <div className="overflow-y-scroll">
        <div className="mr-5 ">
          <div className="rounded-lg overflow-hidden shadow-lg mb-6">
            <table className="w-full text-center h-full bg-[#ECE5C7]">
              <thead className=" bg-black">
                <tr>
                  <td className="py-3 font-semibold text-base text-white">
                    Title
                  </td>
                  <td className="py-3 font-semibold text-base text-white">
                    Date
                  </td>
                  <td className="py-3 font-semibold text-base text-white">
                    Status
                  </td>
                  <td className="py-3 font-semibold text-base text-white">
                    Suggest
                  </td>
                </tr>
              </thead>
              <tbody>
                {suggestions && suggestions.length > 0 ? (
                  suggestions.map((paper, index) => (
                    <tr
                      key={index}
                      className="border-b-[1px] border-gray-100 cursor-pointer"
                      onClick={(e) => {
                        navigate(`/paper/${paper.id_user}/${paper.id_paper}`);
                      }}
                    >
                      <td className="py-3">
                        {paper.title.charAt(0).toUpperCase() +
                          paper.title.slice(1)}
                      </td>
                      <td className="py-3">
                        {
                          new Date(paper.createdAt)
                            .toLocaleString()
                            .split(",")[0]
                        }
                        <br />
                        {
                          new Date(paper.createdAt)
                            .toLocaleString()
                            .split(",")[1]
                        }
                      </td>
                      <td
                        className={`py-3 font-semibold ${
                          paper.status === "Submitted"
                            ? "text-red-500"
                            : paper.status === "Revision"
                            ? "text-yellow-400"
                            : "text-green-400"
                        }`}
                      >
                        {paper.status}
                      </td>
                      <td className="py-3">
                        <button
                          className="bg-[#313A87] p-2 text-white rounded px-4 shadow-xl"
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrent(paper);
                          }}
                        >
                          Suggest
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td></td>
                    <td></td>
                    <td className="py-6">No suggestions found</td>
                    <td></td>
                    <td></td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const CommentDialog = ({ paper, setCurrent, user }) => {
	const [comment, setComment] = useState('');
	const handleSubmit = async (e) => {
		e.preventDefault();
		await updateSuggestion(
			comment,
			user.id_user,
			paper.id_paper,
			user.token
		).then(({ data }) => {
			setCurrent(null);
			toast.success('Suggested!');
		});
	};
	return (
		<div
			className='absolute w-full top-0 left-0 h-[calc(100vh-5rem)] bg-black bg-opacity-40 flex items-center justify-center backdrop-blur-sm'
			onClick={() => setCurrent(false)}
		>
			<div
				className='bg-white rounded-md p-8 shadow-xl w-2/4'
				onClick={(e) => e.stopPropagation()}
			>
				<div className='w-full flex justify-between items-center'>
					<h3 className=' font-bold uppercase text-xl inline'>SUGGEST</h3>
					<span
						className='text-4xl cursor-pointer'
						onClick={() => setCurrent(false)}
					>
						&times;
					</span>
				</div>
				<form
					className='flex flex-col items-center justify-center'
					onSubmit={(e) => handleSubmit(e)}
				>
					<div className='flex flex-col w-full mt-3'>
						<h3 className=' font-normal capitalize text-lg inline'>
							{paper.title}
						</h3>

						<textarea
							name='description'
							className='resize-none w-full border border-dashed border-gray-300 rounded h-32 mt-2 p-2'
							placeholder='Add suggession'
							required
							onChange={(e) => setComment(e.target.value)}
						></textarea>
					</div>
					<button className='bg-[#313A87] p-2 text-white rounded px-4 w-full shadow-xl mt-4'>
						SUGGEST
					</button>
				</form>
			</div>
		</div>
	);
};

export default OpenSuggestions;
