import React, { useEffect } from "react";
import UserCard from "./UserCard";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addToFeed } from "../utils/feedSlice";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const user = useSelector((store) => store.user);
  console.log(user);
  const dispatch = useDispatch();
  const getFeed = async () => {
    if (feed) return;
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
    getFeed();
  }, [{ user }]);
  if (!feed) return;
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
