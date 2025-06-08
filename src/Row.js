import React, {useEffect, useState} from 'react'
import './Row.css'
import axios from './axios';

/* state that kepps track of movies */
function Row({title, fetchUrl, isLargeRow=false}) {
    const [movies,setMovies] = useState([]); /* contains all the movies */

    const base_url = "https://image.tmdb.org/t/p/original/";

    //fetches the movies in the genres- can check in console logg for the names
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl); //use local axios, not global. Check on import
            setMovies(request.data.results); 
            return request;
        }
        fetchData();

    },[fetchUrl]);

    //render out the posters
    //iterating through the movies
  return (
    <div className='row'>
        
        { <h2>{title}</h2>}
{/*  */}
        <div className="row_posters">

            { movies.map( /*For every movies, return the image */
                (movie) =>
                ((isLargeRow && movie.poster_path) || (!isLargeRow && movie.backdrop_path)) && (

                    <img 
                        className={`row_poster ${isLargeRow && "row_posterLarge"}`}
                        key={movie.id}
                        src={`${base_url}${
                            //two images are returned on the request. For the rows we use movies poster
                            isLargeRow ? movie.poster_path : movie.backdrop_path
                }`} 
                alt={movie.name}
                />
            )
          
            )} 

        </div>
        
    </div>
  );
}

export default Row;