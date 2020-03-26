import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouteMatch, useHistory } from 'react-router-dom';
import MovieCard from './MovieCard';

function Movie({ addToSavedList, setMovieList }) {
  const { push } = useHistory();

  const [movie, setMovie] = useState(null);
  const match = useRouteMatch();

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(match.params.id);
  }, [match.params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  };

  const routeToEditForm = e => {
    e.preventDefault();
    push(`/update-movie/${movie.id}`);
  }

  const deleteMovie = e => {
    e.preventDefault();
    axios.delete(`http://localhost:5000/api/movies/${movie.id}`)
    .then(res => {
      console.log('line 40 res: ', res);
      axios.get("http://localhost:5000/api/movies")
      .then(res => {
        console.log("res: ", res);
        setMovieList(res.data);
        push('/')
      })
    })
    .catch(err => {
      console.log('error: ', err);
    })
  };

  return (
    <div className='save-wrapper'>
      <MovieCard movie={movie} />

      <div className='save-button' onClick={saveMovie}>
        Save
      </div>
      <div onClick={routeToEditForm}>
        Edit
      </div>
      <div onClick={deleteMovie}>
        Delete
      </div>
    </div>
  );
}

export default Movie;
