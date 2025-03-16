import React from "react";

const UserCard = ({ user }) => {
  const { firstName, lastName, age, about, gender, photoURL, skills } = user;
  return (
    <div>
      {user && (
        <div className="card bg-base-300 w-84 max-h-[80vh] shadow-md left-[35%] top-[5%] my-[3%] ">
          <figure className="h-[50%] ">
            <img src={photoURL} alt="userPhoto" className="w-full h-full" />
          </figure>
          <div className="card-body gap-4">
            <h2 className="card-title ">
              {firstName + " " + lastName}
              {/* <div className="badge badge-secondary">NEW</div> */}
            </h2>
            {age && gender && (
              <span className="-mt-3.5">{age + " , " + gender}</span>
            )}

            <p>{about}</p>
            <p>{skills.join(" ,")}</p>
            <div className="card-actions justify-center gap-5">
              <button className="badge badge-error font-semibold p-3">
                Interested
              </button>
              <button className="badge badge-primary font-semibold p-3">
                Ignore
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserCard;
