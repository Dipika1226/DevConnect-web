import React from "react";
import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [gender, setGender] = useState(user.gender || "");
  const [age, setAge] = useState(user.age || "");
  const [photoURL, setPhotoURL] = useState(user.photoURL || "");
  const [skills, setSkills] = useState(user.skills || []);
  const [about, setAbout] = useState(user.about || "");
  const [error, setError] = useState();
  const [showToast, setShowToast] = useState(false);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setSkills(e.target.value.split(","));
  };

  const saveUpdates = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, age, skills, about, photoURL, gender },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
      console.log(res);
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };
  return (
    <div className="flex justify-center ">
      <div className="card bg-base-300 w-90 shadow-sm my-16 -mr-11.5">
        <div className="card-body items-center gap-[2.5rem]">
          <h2 className="card-title -ml-1">Update Profile</h2>
          <div className="flex flex-col gap-[0.7rem] w-full">
            <label htmlFor="firstname">FirstName</label>
            <input
              id="firstname"
              type="text"
              className="input"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
            <label htmlFor="lastname">LastName</label>
            <input
              id="lastname"
              type="text"
              className="input"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Gender</legend>
              <select
                className="select"
                value={gender}
                onChange={(e) => {
                  setGender(e.target.value);
                }}
              >
                <option>male</option>
                <option>female</option>
                <option>others</option>
              </select>
            </fieldset>
            <label htmlFor="age">Age</label>
            <input
              id="age"
              type="number"
              className="input"
              value={age}
              onChange={(e) => {
                setAge(e.target.value);
              }}
            />
            <label htmlFor="skills">Skills</label>
            <textarea
              id="skills"
              className="input"
              value={skills}
              onChange={handleChange}
            ></textarea>
            <label htmlFor="photoURL">photoURL</label>
            <input
              id="photoURL"
              type="url"
              className="input"
              value={photoURL}
              onChange={(e) => {
                setPhotoURL(e.target.value);
              }}
            />
            <fieldset className="fieldset">
              <legend className="fieldset-legend">About</legend>
              <textarea
                className="textarea h-24"
                value={about}
                onChange={(e) => {
                  setAbout(e.target.value);
                }}
              ></textarea>
            </fieldset>

            <p className="text-red-600">{error}</p>
          </div>
          <div className="card-actions">
            <button className="btn btn-primary" onClick={saveUpdates}>
              Save Updates
            </button>
          </div>
        </div>
      </div>
      <UserCard
        user={{ firstName, lastName, age, skills, about, photoURL, gender }}
      />
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile Updated successfully!</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
