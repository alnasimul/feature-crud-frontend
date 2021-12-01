import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../../App";
import Comment from './Comment/Comment';

const SingleContent = ({ feature }) => {
  const { _id, username, useremail, requestDate, title, description } = feature;
  const [loggedInUser, setLoggedInUser] = useContext(AuthContext);
  const [comment, setComment] = useState("");

  const [contentComments, setContentComments] = useState([]);

  useEffect(() => {
    try {
      fetch(`http://localhost:5000/getComments/${_id}`)
        .then((res) => res.json())
        .then((data) => setContentComments(data));
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const commentDate = new Date().toDateString();

    if (comment) {
      try {
        fetch(`http://localhost:5000/setUserComment`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contentId: _id,
            username: loggedInUser.name,
            useremail: loggedInUser.email,
            comment,
            commentDate
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data) {
              window.location.reload();
            }
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="bg-light p-5 rounded mb-5">
      <h3>{title}</h3>
      <p>
        <span>
          <strong>
            {username} | {useremail} | {requestDate}
          </strong>
        </span>
      </p>
      <hr />
      <p>{description}</p>

      <hr/>

      <div>
          {
              contentComments.map(comment => <Comment comment={comment} key={comment._id}/>)
          }
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Please leave your comment here"
            id="titleField"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          {loggedInUser.email ? (
            <input
              className="button-primary mt-3"
              type="submit"
              value="Leave a comment"
            />
          ) : (
            <Link to="/login">
              <a href="" className="button button-primary mt-3">
                Login for leavning comment
              </a>
            </Link>
          )}
        </form>
      </div>
    </div>
  );
};

export default SingleContent;
