import React, { Component } from 'react';
import { ROOT_URL, API_KEY } from '../actions';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import axios from 'axios';

class MoviesShow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedMovie: ''
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    axios.get(`${ ROOT_URL }/movie/${ id }${ API_KEY }&append_to_response=casts,keywords,videos`).then(
      (response) => {
        const { data } = response;
        this.setState({
          selectedMovie: data
        })
      }
    );
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
    const movie = this.state.selectedMovie;
    const { casts, keywords, videos } = movie;

    if(_.isEmpty(movie) || _.isEmpty(casts)) {
      return <div>Loading...</div>
    } else {
      return(
        <div>
          <Link to='/'>Back to Index</Link>
          <h3>Movie Show</h3>
          <div>
            <div className='col-md-12'>
              <div className='col-md-6 pull-left'>
                <img src={ `https://image.tmdb.org/t/p/w342${ movie.poster_path }` } alt=''/>
              </div>
              <div className='col-md-6 pull-right'>
                <p>
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

export default MoviesShow;
