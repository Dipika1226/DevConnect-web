import React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { FaHeart, FaTimes } from "react-icons/fa";

const UserCard = ({ user, onSwipe, index }) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-150, 150], [-10, 10]);

  const handleDragEnd = (_, info) => {
    if (info.offset.x > 100) {
      onSwipe("right", user);
    } else if (info.offset.x < -100) {
      onSwipe("left", user);
    }
  };

  const { firstName, lastName, age, about, gender, photoURL } = user;

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: -180, right: 180 }}
      dragElastic={0.2}
      onDragEnd={handleDragEnd}
      style={{
        x,
        rotate,
        zIndex: index,
      }}
      className="w-[320px] h-[480px] bg-[#1f2937] text-white rounded-xl shadow-xl absolute flex flex-col items-center p-5"
    >
      <img
        src={photoURL}
        alt="user"
        className="w-28 h-28 object-cover rounded-full shadow-md mt-4 border-4 border-white"
      />

      <div className="text-center mt-4">
        <h2 className="text-xl font-bold">
          {firstName} {lastName}, {age}
        </h2>
        <p className="text-sm text-gray-300 mt-1">{gender}</p>
        <p className="text-sm text-gray-200 mt-2 px-2 line-clamp-4">{about}</p>
      </div>

      <div className="mt-auto w-full flex flex-col items-center space-y-3">
        <p className="text-xs text-gray-400">
          👉 Swipe for Interested | 👈 to Ignore
        </p>

        <div className="flex justify-around w-full mt-2">
          <button
            className="w-12 h-12 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center shadow-md transition"
            onClick={() => onSwipe("left", user)}
          >
            <FaTimes className="text-white text-xl" />
          </button>

          <button
            className="w-12 h-12 bg-green-600 hover:bg-green-700 rounded-full flex items-center justify-center shadow-md transition"
            onClick={() => onSwipe("right", user)}
          >
            <FaHeart className="text-white text-xl" />
          </button>
        </div>

        <div className="mt-2 text-gray-500 text-xs italic">↩️ Undo</div>
      </div>
    </motion.div>
  );
};

export default UserCard;
