import React, { Component } from 'react';
import { ROOT_URL, API_KEY } from '../actions';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import axios from 'axios';

class SearchMovieBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
      predicted_movies: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { value } = event.target;
    this.setState({ search: value });
    if (value){
      this.searchForMovies(value)
    }else {
      this.searchForMovies()
    }
  }

  searchForMovies(criteria) {
    axios.get(`${ ROOT_URL }/search/movie${ API_KEY }&query=${ criteria }`).then(
      (response) => {
        const { results } = response.data;

        this.setState({
          predicted_movies: results
        })
      }
    )
  }

  handleSubmit(event) {
    const { search } = this.state;

    this.props.onSearchMovieSubmit(search);
    event.preventDefault();
  }

  renderPredictiveList() {
    const { predicted_movies } = this.state;
    if(!_.isEmpty(predicted_movies)) {
      return _.map(predicted_movies, movie => {
        return(
          <li
            className='list-group-item'
            key={ movie.id }
            >
            <img src={ `https://image.tmdb.org/t/p/w45${ movie.poster_path }` } alt=''/>
            <Link to={ `/movies/${ movie.id }` }>{ movie.title }</Link>
          </li>
        )
      })
    }
  }

  render() {
    return(
      <div className='form-inline'>
        <form onSubmit={ this.handleSubmit }>
          <div className='form-group'>
            <input
              type='text'
              name='search'
              value={ this.state.search }
              onChange={ this.handleChange } placeholder='Search...'
            />
          </div>
          <ul className='list-group predicted-result'>
            { this.renderPredictiveList() }
          </ul>
        </form>
      </div>
    )
  }
}

export default SearchMovieBar;
