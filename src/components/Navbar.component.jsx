import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Image from "../assets/book-icon-white.png";

const Navbar = () => {
	const { user } = useSelector((state) => ({ ...state }));
	const dispatch = useDispatch();
	const navigate = useNavigate();
	return (
    <nav className="flex w-full justify-between px-10 h-20 bg-[#354259] items-center shadow-xl">
      <div>
        <img src={Image} alt="" className="w-[45%]" />
      </div>
      <div>
        {user && user.token && (
          <p
            className="text-white cursor-pointer text-base"
            onClick={() => {
              dispatch({ type: "LOGOUT_USER" });
              navigate("/");
            }}
          >
            LOGOUT
          </p>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
