import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const getConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      console.log(res);
      dispatch(addConnections(res?.data?.data));
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getConnections();
  }, []);
  if (!connections) return;
  if (connections.length === 0)
    return (
      <p className="text-center text-2xl my-50">"No Connections found ☹️"</p>
    );
  return (
    <div>
      <h1 className="text-center my-4 text-2xl font-semibold">Connections</h1>
      <div className="min-h-[75vh] my-6">
        <ul className="list bg-base-200 rounded-box shadow-lg w-1/2 mx-auto my-8">
          {connections.map((connection) => {
            const {
              _id,
              firstName,
              lastName,
              age,
              gender,
              about,
              photoURL,
              skills,
            } = connection;
            return (
              <li className="list-row " key={_id}>
                <div>
                  <img
                    className="size-18 rounded-box bg-base-300"
                    src={photoURL}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="text-md font-semibold">
                    {firstName + " " + lastName}
                  </div>
                  {gender && age && (
                    <div className="text-xs uppercase font-semibold opacity-60">
                      {gender + " " + age}
                    </div>
                  )}
                  <p className="list-col-wrap text-sm">{about}</p>
                  <p className="list-col-wrap text-sm">{skills.join()}</p>
                </div>
                <Link to={"/chat/" + _id} className="my-auto">
                  <button className="btn btn-primary px-6">Chat</button>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Connections;
