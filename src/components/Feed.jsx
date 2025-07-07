import React, { useEffect } from "react";
import UserCard from "./UserCard";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addToFeed } from "../utils/feedSlice";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  // const user = useSelector((store) => store.user);

  const dispatch = useDispatch();

  const getFeed = async () => {
    // if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      console.log(res);
      dispatch(addToFeed(res?.data));
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    dispatch(addToFeed(null));
    getFeed();
  }, []);
  // if (!feed) return;
  if (!feed)
    return (
      // <p className="text-center my-[40vh]">
      //   <span className="loading loading-spinner loading-xl"></span>
      // </p>
      <div className=" bg-base-300 rounded-lg relative w-84 h-[65vh] left-[35%] top-[5%] my-[3%] p-1 ">
        <div className="h-[55%] bg-base-100 m-2"></div>
        <div>
          <div className="bg-base-100 w-[65%] h-6 m-4"></div>
          <div className="bg-base-100 w-[55%] h-6 m-4"></div>
          <div className="bg-base-100 w-[55%] h-6 m-4"></div>
          <div className="bg-base-100 w-[45%] h-6 m-4"></div>
        </div>
      </div>
    );
  if (feed.length === 0)
    return (
      <p className="text-center text-2xl my-50">"No new users found!☹️"</p>
    );
  return (
    <div>
      <UserCard user={feed[0]} />
    </div>
  );
};

export default Feed;
