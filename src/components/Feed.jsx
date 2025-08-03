import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";
import { useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addToFeed } from "../utils/feedSlice";

const Feed = () => {
  const [feed, setFeed] = useState([]);
  const [swiped, setSwiped] = useState([]);
  const dispatch = useDispatch();

  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addToFeed(res.data));
      setFeed(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  const handleSwipe = async (direction, user) => {
    if (!user) return;
    try {
      const status = direction === "right" ? "interested" : "ignored";
      await axios.post(
        `${BASE_URL}/request/send/${status}/${user._id}`,
        {},
        {
          withCredentials: true,
        }
      );
      setSwiped([...swiped, user]);
      setFeed((prev) => prev.filter((u) => u._id !== user._id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleUndo = () => {
    if (swiped.length === 0) return;
    const last = swiped[swiped.length - 1];
    setSwiped(swiped.slice(0, -1));
    setFeed([last, ...feed]);
  };

  if (!feed)
    return (
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

  return (
    <div className="flex justify-center mt-10 relative h-[80vh]">
      {feed
        .slice(0)
        .reverse()
        .map((user, index) => (
          <UserCard
            key={user._id}
            user={user}
            onSwipe={handleSwipe}
            index={index}
          />
        ))}
      <button
        className="absolute top-4 right-4 btn btn-sm btn-outline"
        onClick={handleUndo}
      >
        Undo
      </button>
    </div>
  );
};

export default Feed;
