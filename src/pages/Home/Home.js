import firebase from "firebase/app";
import React, { useEffect } from "react";
import { useContext, useState } from "react/cjs/react.development";
import { AuthContext } from "../../App";
import { initializeLoginFramework } from "../../components/Account/loginManager/loginManager";
import Header from "../../components/Header/Header";
import Hero from "../../components/Hero/Hero";

const Home = () => {
  const [search, setSearch] = useState("");
  const [features, setFeatures] = useState([]);
  const [loggedInUser, setLoggedInUser] = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  initializeLoginFramework();
  useEffect(() => {
    checkUserLoggedIn();
  }, []);
  const checkUserLoggedIn = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setLoggedInUser({
          isSignedIn: true,
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
          error: user.error ? user.error : "",
          success: true,
        });
      } else {
        loggedInUser({
          isSignedIn: false,
          name: "",
          email: "",
          photo: "",
          error: "",
          success: false,
        });
      }
    });
  };

  const getSearchResult = (searchTerm) => {
    setSearch(searchTerm);
  };

  useEffect(() => {
    fetch(`http://localhost:5000/getPublishedFeatures?search=${search}`)
      .then((res) => res.json())
      .then((data) => setFeatures(data));
  }, [search]);

  useEffect(() => {
    try {
      fetch("http://localhost:5000/getPublishedFeatures")
        .then((res) => res.json())
        .then((data) => setFeatures(data));
    } catch (error) {
      console.log(error);
    }
  }, []);

  const getComments = () => {
    try {
      fetch(`http://localhost:5000/comments`)
        .then((res) => res.json())
        .then((data) => {
          setComments(data);
          sortFeaturesByComments(data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const sortFeaturesByComments = (comments) => {
    let contentIds = [];
    comments.map((comment) => contentIds.push(...contentIds, comment.contentId));
    let uniqueContentIds = [...new Set(contentIds)];

    console.log(uniqueContentIds)

    let filteredData = uniqueContentIds.map((key) => {
      return comments.filter((comment) => comment.contentId === key);
    });

    const desc= filteredData.sort((a,b) => b.length - a.length );

    console.log(desc)
  };

  return (
    <>
      <Header getSearchResult={getSearchResult} />
      <Hero
        features={features}
        loggedInUser={loggedInUser}
        getComments={getComments}
      />
    </>
  );
};

export default Home;
