import React, { useEffect } from 'react';
import { useState } from 'react/cjs/react.development';
import Header from '../../components/Header/Header';
import Hero from '../../components/Hero/Hero';

const Home = () => {
    const [ search, setSearch ] = useState("")
    const [features, setFeatures] = useState([]);

   

    const getSearchResult = (searchTerm) => {
        setSearch(searchTerm)
    }

    useEffect(() => {
        fetch(`http://localhost:5000/getPublishedFeatures?search=${search}`)
        .then(res => res.json())
        .then(data => setFeatures(data))
    }, [search])

    useEffect(() => {
        try {
            fetch('http://localhost:5000/getPublishedFeatures')
            .then( res => res.json() )
            .then( data => setFeatures(data) )
        } catch (error) {
            console.log(error)
        }
    },[])

    return (
        <>
         <Header getSearchResult={getSearchResult}/>   
         <Hero features={features}/>
        </>
    );
};

export default Home;