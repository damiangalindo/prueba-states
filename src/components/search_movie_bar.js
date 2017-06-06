import React, { Component } from 'react';
import { searchForMovies } from '../actions';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Link } from 'react-router-dom';

class SearchMovieBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.searchForMovies();
  }

  handleChange(event) {
    const { value } = event.target;
    this.setState({ search: value });
    if (value){
      this.props.searchForMovies(value)
    }else {
      this.props.searchForMovies()
    }
  }

  handleSubmit(event) {
    const { search } = this.state;

    this.props.onSearchMovieSubmit(search);
    this.props.searchForMovies()
    event.preventDefault();
  }

  renderPredictiveList() {
    const { predicted_movies } = this.props;
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

function mapStateToProps(state) {
  return {
    predicted_movies: state.movies.predicted_movies
  }
}

export default connect(mapStateToProps, { searchForMovies })(SearchMovieBar);
