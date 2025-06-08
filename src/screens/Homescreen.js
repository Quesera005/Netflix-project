import React from 'react'
import "./HomeScreen.css";
import Nav from '../Nav.js';
import Banner from "../Banner.js"
import requests from '../Requests.js';
import Row from '../Row.js';

//Once loggged in Homescreen is made up of the Navigation Bar, the Movie banner and the Netflix titles and Images
//The Movie row gets rendered here and is styles in Row.css
function HomeScreen() {
  return <div className='HomeScreen'>
    <Nav/>

    <Banner/>
    <Row
        title='Netflix Originals'
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow
    />
    <Row
        title='Trending Now'
        fetchUrl={requests.fetchTrending}
    />
    <Row
        title='Top Rated'
        fetchUrl={requests.fetchTopRated}
    />
    <Row
        title='Action Movies'
        fetchUrl={requests.fetchActionMovies}
    />
    <Row
        title='Comedy Movies'
        fetchUrl={requests.fetchComedyMovies}
    />
    <Row
        title='Horror Movies'
        fetchUrl={requests.fetchHorrorMovies}
    />
<Row
        title='Romance Movies'
        fetchUrl={requests.fetchRomanceMovies}
    />
<Row
        title='Documentaries'
        fetchUrl={requests.fetchDocumentaries}
    />
  </div>;
  
}


export default HomeScreen