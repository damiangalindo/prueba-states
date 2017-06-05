import React, { Component } from 'react';
import { fetchMovies, fetchLists, searchMovies } from '../actions';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import queryString from 'query-string';

class MoviesIndex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
      keywords: '',
      order: 'pop_asc',
      year: '2016',
      genres: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { page } = queryString.parse(this.props.location.search);
    this.props.fetchMovies(page || 1);
    this.props.fetchLists();
  }

  handleSubmit(event) {
    const { search, keywords, order, year, genres } = this.state;
    const criteria = {
      with_keywords: keywords,
      primary_release_year: year,
      sort_by: order,
      with_genres: genres
    }

    // this.props.searchMovies(this.state.search);
    this.props.fetchMovies(criteria);
    this.props.fetchLists();
    event.preventDefault();
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  renderMovies(){
    const { movies } = this.props;

    if (_.isEmpty(movies)) {
      return <div>Loading...</div>
    } else {
      return _.map(movies, movie => {
        const image = !_.isEmpty(movie.poster_path) ? `https://image.tmdb.org/t/p/w500${ movie.poster_path }` : console.log(movie.poster_path)
        return(
          <li key={ movie.id } className='list-group-item'>
            <Link to={ `/movies/${ movie.id }` }>
              { movie.original_title }
            </Link>
            { movie.vote_average }
            <img src={ image } alt='' />
          </li>
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
    const { genres } = this.props;

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
        <h3>Movies Index</h3>

        <div className='form-inline'>
          <form onSubmit={ this.handleSubmit }>
            { this.renderFindField() }
            { this.renderYearField() }
            { this.renderGenresField() }
            { this.renderOrderField() }
            { this.renderKeywordsField() }
            <button className='sr-only' type='submit'>ok</button>
          </form>
        </div>
        <ul className='list-group'>
          { this.renderMovies() }
        </ul>
      </div>
    )
  }
}

// const selector = formValueSelector('SearchMovieForm');

function mapStateToProps(state) {
  return {
    movies: state.movies.list,
    genres: state.genres
  }
}

export default connect(mapStateToProps, { fetchMovies, fetchLists, searchMovies })(MoviesIndex);
