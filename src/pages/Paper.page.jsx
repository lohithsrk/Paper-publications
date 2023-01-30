import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import Suggestion from '../components/paper/Suggestion.component';

import { getParticularPaper, updatePaper } from '../axios/paper.axios';
import { getSuggestion, requestSuggestion } from '../axios/suggestion.axios';

const Paper = () => {
	const { id_paper, id_user } = useParams({});

	const { user } = useSelector((state) => ({ ...state }));

	const [paper, setPaper] = useState('');
	const [suggestions, setSuggestions] = useState([]);
	const [isEditModeOn, setIsEditModeOn] = useState(false);
	const [paperChanged, setPaperChanged] = useState({});

	const fetchParticularPaper = async () => {
		await getParticularPaper(id_paper, id_user).then((res) => {
			setPaper(res.data);
		});
		getSuggestion(id_paper, user.token).then((res) => {
			setSuggestions(res.data);
		});
	};

	useEffect(() => {
		fetchParticularPaper(id_paper, id_user);
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		Object.keys(paper).forEach((key) => {
			formData.append(key, paper[key]);
		});
		paperChanged && formData.append('paper', paperChanged);

		updatePaper(formData, user && user.token).then((res) => {
			console.log(res.data);
		});
	};

	return (
    <section className="px-20 pt-10">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className={`text-3xl font-bold disabled:bg-transparent ${
            isEditModeOn &&
            "border border-dashed border-gray-300 rounded p-2 w-[500px] focus:outline-dashed"
          }`}
          value={paper && paper.title}
          onChange={(e) => setPaper({ ...paper, title: e.target.value })}
          disabled={!isEditModeOn}
        />
        <br />
        <textarea
          className={`disabled:bg-transparent resize-none mt-3 ${
            isEditModeOn &&
            "border border-dashed border-gray-300 rounded p-2 w-[500px] h-32 focus:outline-dashed"
          }`}
          onChange={(e) => setPaper({ ...paper, description: e.target.value })}
          value={paper.description}
          disabled={!isEditModeOn}
        ></textarea>
        <br />
        <div className="flex items-center">
          {!isEditModeOn ? (
            <div>
              <a
                href={`http://localhost:8080/api/${paper.link}`}
                target="_blank"
                rel="noreferrer"
                className="bg-[#354259] p-2 text-white rounded px-4 py-2.5 w-full shadow-xl hover:bg-[#C2DED1] hover:text-black transition duration-150 ease-in-out"
              >
                Download Paper
              </a>
            </div>
          ) : (
            <div>
              <input
                className="block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 my-4 p-3"
                id="file_input"
                type="file"
                onChange={(e) => setPaperChanged(e.target.files[0])}
              />
            </div>
          )}
          {!isEditModeOn && user.id_user === paper.id_user && (
            <button
              className="bg-[#354259] hover:bg-[#C2DED1] hover:text-black rounded flex text-white p-2 items-center px-4 ml-3 transition duration-150 ease-in-out"
              type="button"
              onClick={() => {
                requestSuggestion(
                  paper.id_paper,
                  paper.id_user,
                  user.token
                ).then((res) => {
                  getSuggestion(id_paper, user.token).then((res) => {
                    toast.success(res.data);
                    setSuggestions(res.data);
                  });
                });
              }}
            >
              Get Suggestions
            </button>
          )}
          {user.id_user === paper.id_user && (
            <button
              onClick={() => setIsEditModeOn(!isEditModeOn)}
              type={isEditModeOn ? "button" : "submit"}
              className="bg-[#354259] hover:bg-[#C2DED1] hover:text-black p-2 text-white rounded px-4 ml-3 shadow-xl transition duration-150 ease-in-out"
            >
              {!isEditModeOn ? "Edit Paper" : "Save"}
            </button>
          )}
        </div>
      </form>
      <br />
      <hr />
      <div>
        <h2 className="text-xl font-semibold my-3">Suggestions</h2>
        <div>
          {
            // isLoading ? (
            // 	<p>Loading...</p>
            // ) :
            suggestions ? (
              suggestions.comments ? (
                Object.keys(suggestions.comments).map((key) => (
                  <Suggestion
                    key={key}
                    user={key}
                    comment={suggestions.comments[key]}
                  />
                ))
              ) : (
                <p>You have no open suggestions</p>
              )
            ) : (
              <p>You have no open suggestions</p>
            )
          }
        </div>
      </div>
    </section>
  );
};

export default Paper;
