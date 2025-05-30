import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const reviewRequest = async (status, requestId) => {
    try {
      await axios.post(
        BASE_URL + "/request/review/" + status + "/" + requestId,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(requestId));
    } catch (err) {
      console.error(err);
    }
  };
  const getRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/recieved", {
        withCredentials: true,
      });
      //   console.log(res);
      dispatch(addRequests(res?.data?.data));
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getRequests();
  }, []);
  if (!requests) return;
  if (requests.length === 0)
    return (
      <p className="text-center text-2xl my-50">
        "No Connection Requests Recieved ☹️"
      </p>
    );
  return (
    <div>
      <h1 className="text-center my-4 text-2xl font-semibold">
        Connection Requests
      </h1>
      <div className="min-h-[75vh] my-6">
        <ul className="list bg-base-200 rounded-box shadow-lg w-1/2 mx-auto my-8">
          {requests.map((request) => {
            const {
              _id,
              firstName,
              lastName,
              age,
              gender,
              about,
              photoURL,
              skills,
            } = request.fromUserId;
            return (
              <li className="list-row" key={_id}>
                <div>
                  <img
                    className="size-12 rounded-box bg-base-300"
                    src={photoURL}
                  />
                </div>
                <div>
                  <div className="font-semibold">
                    {firstName + " " + lastName}
                  </div>
                  {gender && age && (
                    <div className="text-xs uppercase font-semibold opacity-60">
                      {gender + ", " + age}
                    </div>
                  )}
                  <p>{about}</p>
                </div>
                <button
                  className="btn btn-active btn-primary"
                  onClick={() => {
                    reviewRequest("accepted", request._id);
                  }}
                >
                  Accept
                </button>
                <button
                  className="btn btn-active btn-secondary"
                  onClick={() => {
                    reviewRequest("rejected", request._id);
                  }}
                >
                  Reject
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Requests;
