import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      setError(err?.response?.data) || "Something went wrong";
      console.error(err);
    }
  };
  return (
    <div>
      <div className="card bg-base-300 w-90 shadow-sm right-[35%] left-[35%] my-16 ">
        <div className="card-body items-center gap-[2.5rem]">
          <h2 className="card-title -ml-1">Login</h2>
          <div className="flex flex-col gap-[0.7rem] w-full">
            <label for="email">EmailId</label>
            <input
              id="email"
              type="text"
              className="input"
              value={emailId}
              onChange={(e) => {
                setEmailId(e.target.value);
              }}
            />

            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="input"
              required
              minlength="8"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
            />
            <p className="text-red-600">{error}</p>
          </div>
          <div className="card-actions">
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
