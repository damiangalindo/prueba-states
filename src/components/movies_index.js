import React, { Component } from 'react';
import { fetchMovies } from '../actions';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Link } from 'react-router-dom';

class MoviesIndex extends Component {
  componentDidMount() {
    this.props.fetchMovies();
  }

  renderMovies(){
    return _.map(this.props.movies, movie => {
      return(
        <li key={ movie.id } className='list-group-item'>
          <Link to={ `/movies/${ movie.id }` }>
            { movie.original_title }
          </Link>
          { movie.vote_average }
          <img src={ `https://image.tmdb.org/t/p/w500${ movie.poster_path }` } />
        </li>
      )
    })
  }

  render() {
    return (
      <div>
        <h3>Movies Index</h3>
        <ul className='list-group'>
          { this.renderMovies() }
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { movies: state.movies }
}

export default connect(mapStateToProps, { fetchMovies })(MoviesIndex);
