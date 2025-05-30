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
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState();

  const handleLogin = async () => {
    setError("");
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
    }
  };
  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      console.log(res.data.savedUser);
      dispatch(addUser(res.data.savedUser));
      return navigate("/profile");
    } catch (err) {
      setError(err?.response?.data) || "Something went wrong";
    }
  };
  return (
    <div>
      <div className="card bg-base-300 w-90 shadow-sm right-[35%] left-[35%] my-16 ">
        <div className="card-body items-center gap-[2.5rem]">
          <h2 className="card-title -ml-1">
            {isLoginForm ? "Login" : "Sign Up"}
          </h2>
          <div className="flex flex-col gap-[0.7rem] w-full">
            {!isLoginForm && (
              <>
                <label htmlFor="firstname">firstName</label>

                <input
                  id="firstname"
                  type="text"
                  className="input"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
                <label htmlFor="lastName">LastName</label>
                <input
                  id="lastName"
                  type="text"
                  className="input"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </>
            )}
            <label htmlFor="email">EmailId</label>
            <input
              id="email"
              type="text"
              className="input"
              value={emailId}
              onChange={(e) => {
                setEmailId(e.target.value);
              }}
            />

            <label htmlFor="password">Password</label>
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
            <button
              className="btn btn-primary"
              onClick={isLoginForm ? handleLogin : handleSignUp}
            >
              {isLoginForm ? "Login" : "Sign Up"}
            </button>
          </div>
          <p
            className="-mt-5 cursor-pointer"
            onClick={() => {
              setIsLoginForm(!isLoginForm);
            }}
          >
            {isLoginForm
              ? "New User? SignUp here"
              : "Already a user?Login here"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
