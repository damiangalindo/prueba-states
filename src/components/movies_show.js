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
          <img src={ `https://image.tmdb.org/t/p/w500${ person.profile_path }` } className='img-thumbnail' alt=''/>
        </li>
      )
    })
  }

  renderTags(tags) {
    return _.map(tags, tag => {
      return(
        <span key={ tag.id } className='label label-default'>{ tag.name }</span>
      )
    })
  }

  renderVideos(videos) {
    return _.map(videos, video => {
      return(
        <li key={ video.id } className='list-group-item col-md-3'>
          <iframe title={ video.key } className='embed-responsive-item' src={ `https://www.youtube.com/embed/${ video.key }` }></iframe>
        </li>
      )
    })
  }

  render() {
    const { movie } = this.props;
    const { casts, keywords, videos } = movie;

    console.log(movie)

    if(_.isEmpty(movie) || _.isEmpty(casts)) {
      return <div>Loading...</div>
    } else {
      return(
        <div>
          <Link to='/'>Back to Index</Link>
          <h3>Movie Show</h3>
          <div>
            <div className='col-md-12'>
              <p className='col-md-6 pull-left'>
                <img src={ `https://image.tmdb.org/t/p/w500${ movie.poster_path }` } alt=''/>
              </p>
              <p className='col-md-6 pull-right'>
                { movie.vote_average }
              </p>
              <p>
                Keywords
                { this.renderTags(keywords.keywords) }
              </p>
              <p>
                Genres
                { this.renderTags(movie.genres) }
              </p>
            </div>
            <div className='col-md-12'>
              { movie.overview }
              { movie.budget }
              <ul className='list-group'>
                { this.renderPersonal(casts.cast) }
              </ul>
            </div>
            <div>
              Videos
              <ul className='list-group'>
                { this.renderVideos(videos.results) }
              </ul>
            </div>
          </div>
        </div>
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    movie: state.movies
  }
}

export default connect(mapStateToProps, { fetchMovie })(MoviesShow);
