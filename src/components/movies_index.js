import React, { Component } from 'react';
import { fetchMovies, fetchLists } from '../actions';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import queryString from 'query-string';
// , formValueSelector
class MoviesIndex extends Component {
  componentDidMount() {
    const { page } = queryString.parse(this.props.location.search);
    this.props.fetchMovies(page || 1);
    this.props.fetchLists();
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

  onSubmit(values){
    console.log(values)
  }

  filterByField(field) {
    console.log(field)
    // console.log()
    // this.props.submit(this .onSubmit())
  }

  renderField(field) {
    const { name } = field.input;
    switch (name) {
      case 'genres':
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
              <select id='genres'>
                <option>Select a Genre</option>
                { options }
              </select>
            </div>
          )
        }
      case 'year':
        return(
          <div className='form-group'>
            <label>Year</label>
            <select id='year'>
              <option value='2016'>2016</option>
            </select>
          </div>
        )
      case 'order':
        return(
          <div className='form-group'>
            <label>Order by</label>
            <select id='order' onChange={ event => this.filterByField(event.target.value) }>
              <option value='pop_asc'>Popularity ascendent</option>
              <option value='pop_desc'>Popularity descendent</option>
              <option value='rating_asc'>Rating ascendent</option>
              <option value='rating_desc'>Rating descendent</option>
            </select>
          </div>
        )
      case 'keywords':
        return(
          <div className='form-group'>
            <label>Keywords</label>
            <input id='keywords' name='keywords' placeholder='Search by keywords...'/>
          </div>
        )
      case 'find':
        return(
          <div className='form-group'>
            <input id='find' name='find' placeholder='Search...'/>
          </div>
        )
      default:
        return <div>{ name }</div>
    }
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <h3>Movies Index</h3>
        <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
          <Field
            name='find'
            component={ this.renderField.bind(this) }
          />
          <div className='form-inline'>
            <Field
              name='year'
              component={ this.renderField.bind(this) }
            />
            <Field
              name='order'
              component={ this.renderField.bind(this) }
            />
            <Field
              name='genres'
              component={ this.renderField.bind(this) }
            />
            <Field
              name='keywords'
              component={ this.renderField }
            />
            <button type='submit' className='btn btn-primary'>Submit</button>
          </div>
        </form>
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
    movies: state.movies,
    genres: state.genres
  }
}

function validate() {
  const errors = {}
  return errors;
}

export default reduxForm({
  validate,
  form: 'SearchMovieForm'
})(connect(mapStateToProps, { fetchMovies, fetchLists })(MoviesIndex));
