import _ from 'lodash';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';

import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const yaml = require('yamljs');
const config = yaml.load('../secrets.yaml');

const API_KEY = config.YOUTUBE_API

//Create a new component.  This component should produce some HTML
class App extends Component { //The Arrow is fat, stands for function.
  constructor(props){
    super(props);
    this.state = {
      videos: [],
      selectedVideo: null    
    };

    this.videoSearch('surfboards');    
  }

  videoSearch(term){
    YTSearch({key: API_KEY, term: term}, (videos) => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      });
    });
  }

  render(){
    const videoSearch = _.debounce((term) => {this.videoSearch(term)},500);

    return (
      <div>
        <SearchBar onSearchTermChange = {videoSearch} />
        <VideoDetail video={this.state.selectedVideo} />   
        <VideoList 
          onVideoSelect = {selectedVideo => this.setState({selectedVideo})}        
          videos={this.state.videos} />
      </div>
    );
  }
}

//Take this component's generated HTML and put it on the page (in the DOM)
ReactDOM.render(<App />, document.querySelector('.container'));
