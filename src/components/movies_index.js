import React, { Component } from 'react';
import { ROOT_URL, API_KEY } from '../actions';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import SearchMovieBar from './search_movie_bar';
import axios from 'axios';

class MoviesIndex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: {},
      movie_genres: {},
      search: '',
      keywords: '',
      order: 'popularity.asc',
      year: '2016',
      genres: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.searchMovies = this.searchMovies.bind(this);
  }

  componentDidMount() {
    axios.get(`${ ROOT_URL }/genre/movie/list${ API_KEY }`).then(
      (response) => {
        const { genres } = response.data;

        this.setState({
          movie_genres: genres
        })
      }
    )

    axios.get(`${ ROOT_URL }/discover/movie${ API_KEY }`).then(
      (response) => {
        const { results } = response.data;

        this.setState({
          movies: results
        })
      }
    )

  }

  handleSubmit(event) {
    const { keywords, order, year, genres } = this.state;
    const criteria = {
      with_keywords: keywords,
      primary_release_year: year,
      sort_by: order,
      with_genres: genres
    }

    this.searchMovies(criteria);
    event.preventDefault();
  }

  searchMovies(filter) {
    if (!_.isObject(filter)){
      axios.get(`${ ROOT_URL }/search/movie${ API_KEY }&query=${ filter }`).then(
        (response) => {
          const { results } = response.data;
          console.log(this)
          this.setState({
            movies: results
          })
        }
      )
    }else{
      const criteria = !_.isEmpty(filter) ? `&${ queryString.stringify(filter) }` : '';
      axios.get(`${ ROOT_URL }/discover/movie${ API_KEY }${ criteria }`).then(
        (response) => {
          const { results } = response.data;

          this.setState({
            movies: results
          })
        }
      )
    }
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  renderMovies(){
    const { movies } = this.state;

    if (_.isEmpty(movies)) {
      return <div>Loading...</div>
    } else {
      return _.map(movies, movie => {
        const image = !_.isEmpty(movie.poster_path) ? `https://image.tmdb.org/t/p/w154${ movie.poster_path }` : console.log(movie.poster_path)
        return(
          <div key={ movie.id } className='col-md-6 row'>
            <div className='text-left'>
              <div className='col-md-6'>
                <img src={ image } alt='' />
              </div>
              <div>
                <p>
                  <Link to={ `/movies/${ movie.id }` }>
                    { movie.original_title }
                  </Link>
                </p>
                <p>
                  { movie.vote_average }
                </p>
              </div>
            </div>
          </div>
        )
      })
    }
  }

  renderYearField() {
    return(
      <div className='form-group'>
        <label>Year</label>
        <select name='year' onChange={ this.handleChange } value={ this.state.year }>
          <option value='2017'>2017</option>
          <option value='2016'>2016</option>
        </select>
      </div>
    )
  }

  renderGenresField() {
    const genres = this.state.movie_genres;

    if (_.isEmpty(genres)) {
      return <div>Loading...</div>
    } else {
      const options = _.map(genres, genre => {
        return <option key={ genre.id } value={ genre.id }>{ genre.name }</option>
      })

      return(
        <div className='form-group'>
          <label>Genres</label>
          <select name='genres' onChange={ this.handleChange } value={ this.state.genres }>
            <option>Select a Genre</option>
            { options }
          </select>
        </div>
      )
    }
  }

  renderOrderField() {
    return(
      <div className='form-group'>
        <label>Order by</label>
        <select name='order' onChange={ this.handleChange } value={ this.state.order }>
          <option value='popularity.asc'>Popularity ascendent</option>
          <option value='popularity.desc'>Popularity descendent</option>
          <option value='vote_average.asc'>Rating ascendent</option>
          <option value='vote_average.desc'>Rating descendent</option>
        </select>
      </div>
    )
  }

  renderKeywordsField() {
    return(
      <div className='form-group'>
        <label>Keywords</label>
        <input type='text' name='keywords' value={ this.state.keywords } onChange={ this.handleChange } placeholder='Search by keywords...'/>
      </div>
    )
  }

  renderFindField() {
    return(
      <div className='form-group'>
        <input type='text' name='search' value={ this.state.search } onChange={ this.handleChange } placeholder='Search...'/>
      </div>
    )
  }

  render() {
    return (
      <div>
        <h3>Movies Index - with state</h3>

        <div className='form-inline'>
          <SearchMovieBar onSearchMovieSubmit={ this.searchMovies } />
          <form onSubmit={ this.handleSubmit }>
            { this.renderYearField() }
            { this.renderGenresField() }
            { this.renderOrderField() }
            { this.renderKeywordsField() }
            <button className='sr-only' type='submit'>ok</button>
          </form>
        </div>
        <div className='container-fluid'>
          { this.renderMovies() }
        </div>
      </div>
    )
  }
}

export default MoviesIndex;
