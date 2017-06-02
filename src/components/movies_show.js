import React, { Component } from 'react';
import { fetchMovie } from '../actions';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Link } from 'react-router-dom';

class MoviesShow extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchMovie(id);
  }

  renderPersonal(personal) {
    return _.map(personal, person => {
      return(
        <li key={ person.id } className='list-group-item col-md-2'>
          Character { person.character }
          Actor { person.name }
          <img src={ `https://image.tmdb.org/t/p/w500${ person.profile_path }` } className='img-thumbnail'/>
        </li>
      )
    })
  }

  render() {
    const { movie } = this.props;

    if(_.isEmpty(movie)) {
      return <div>Loading...</div>
    }

    const { casts } = movie;

    return(
      <div>
        <h3>Movie Show</h3>
        <div>
          <div className='col-md-12'>
            <p className='col-md-6 pull-left'>
              <img src={ `https://image.tmdb.org/t/p/w500${ movie.poster_path }` } />
            </p>
            <p className='col-md-6 pull-right'>
              { movie.vote_average }
            </p>
          </div>
          <div className='col-md-12'>
            { movie.overview }
            { movie.budget }
            <ul className='list-group'>
              { this.renderPersonal(casts.cast) }
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { movie: state.movies }
}

export default connect(mapStateToProps, { fetchMovie })(MoviesShow);
