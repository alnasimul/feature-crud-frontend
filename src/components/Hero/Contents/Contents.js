import React from "react";
import { Link } from "react-router-dom";
import SingleContent from "./SingleContent/SingleContent";

const Contents = ({ features, loggedInUser, getComments }) => {
  return (
    <div className="column column-50 ">
      <div className="dropdown float-right">
        <button
          className="btn btn-dark dropdown-toggle"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Actions
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li>
            <a href="" className="dropdown-item pe-auto" onClick={() => ``}>
              Votes
            </a>
          </li>
          <li>
            <Link href="" className="dropdown-item pe-auto" onClick={getComments}>
              Comments
            </Link>
          </li>
          <li>
            <a href="" className="dropdown-item pe-auto" onClick={() => ``}>
              Alphabetically
            </a>
          </li>
        </ul>
      </div>
      {features.length > 0 ? (
        features.map((feature) => (
          <SingleContent
            feature={feature}
            key={feature._id}
            loggedInUser={loggedInUser}
          />
        ))
      ) : (
        <div>
          <h4>No Published Content Found</h4>
        </div>
      )}
    </div>
  );
};

export default Contents;
