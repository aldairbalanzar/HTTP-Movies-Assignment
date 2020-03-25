import React, {useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const initialMovie = {};

const UpdateForm = props => {
    const { id } = useParams();
    const { push } = useHistory();

    const [movie, setMovie] = useState(initialMovie);

    useEffect(() => {
        const movieToUpdate = props.movieList.find(e => `${e.id}` === id);
        if (movieToUpdate) {
            setMovie(movieToUpdate)
        }
    }, [props.movies, id]);

    const handleChange = e => {
        e.preventDefault();
        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        axios.put(`http://localhost:5000/api/movies/${id}`, movie)
        .then(res => {
            console.log('from handleSubmit: ', res.data);
            const newMovieList = props.movieList.map(e => {
                if(`${e.id}` === id) {
                    return movie
                } else {
                    return e;
                }
            })
            props.setMovieList(newMovieList);
            push('/');
        })
        .catch(err => {
            console.log('from handleSubmit: ', err)
        })
    };


    // const updateMovie = movie => {
    //     return axios
    //       .put(`${BASE_URL}/api/movies/${movie.id}`, movie)
    //       .then(res => {
    //         const updatedMovie = res.data;
    //         setMovieList(
    //           movieList.map(m => (m.id === updatedMovie.id ? updatedMovie : m))
    //         );
    //       })
    //       .catch(err => console.log(err.response));
    //   };

    return(
        <div>
            <h3> Update Movie </h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">
                    <input
                     type="text"
                     name="title"
                     id="title"
                     onChange={handleChange}
                     value={movie.title}
                     placeholder="movie title"
                     />
                </label>

                <label htmlFor="director">
                    <input
                     type="text"
                     name="director"
                     id="director"
                     onChange={handleChange}
                     value={movie.director}
                     placeholder="movie director"
                     />
                </label>

                <label htmlFor="metascore">
                    <input
                     type="text"
                     name="metascore"
                     id="metascore"
                     onChange={handleChange}
                     value={movie.metascore}
                     placeholder="movie metascore"
                     />
                </label>
                <button type="submit"> Update </button>
            </form>
        </div>
    )
};

export default UpdateForm;