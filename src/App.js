import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import SearchForm from './Components/SearchForm';
import GifList from './Components/GifList';

import OAuth from 'oauth';

const KEY = '6b256933e2094b038bc88e8722b32cc1';
const SECRET = '27cd51aafde145e89c2d998892584736';

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      gifs: [],
      loading: true
    };
  }

  componentDidMount() {

    this.performSearch();

    // Playing around with OAuth here, not working :(
    // var oauth = new OAuth.OAuth(
    // 	'http://api.thenounproject.com',
    // 	'http://api.thenounproject.com',
    // 	KEY,
    // 	SECRET,
    // 	'1.0A',
    // 	null,
    // 	'HMAC-SHA1',
    // 	undefined,
    // 	{"Accept": "application/json"}
    // )
    // oauth.get(
    // 	'http://api.thenounproject.com/icon/4',
    // 	KEY,
    // 	SECRET,
    // 	function (e, data, res){
    // 		if (e) console.error(e)
    // 		console.log(require('util').inspect(data))
    // 	}
    // )


    // Another Axios API GET method call
    // axios({
    //   method: 'get',
    //   url: 'http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC',
    // }).then( response => {
    //   this.setState({
    //     gifs: response.data.data
    //   })
    // })
    // .catch( error => {
    //   console.log('Error fethcing and parsing data', error);
    // });

    // Axios GET giphy API request here:
    // axios.get('http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC')
    // .then( response => {
    //   this.setState({
    //     gifs: response.data.data
    //   })
    // })
    // .catch( error => {
    //   console.log('Error fethcing and parsing data', error);
    // });

    // Fetch API method used first, should still work!
    // fetch('http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC')
    //   .then(response => response.json())
    //   .then(responseData => {
    //     this.setState({ gifs: responseData.data });
    //   })
    //   .catch(error => {
    //     console.log('Error fetching and parsing data', error);
    //   });
  }

  performSearch = (query = 'dogs') => {
    axios.get(`http://api.giphy.com/v1/gifs/search?q=${query}&limit=24&api_key=dc6zaTOxFJmzC`)
    .then( response => {
      this.setState({
        gifs: response.data.data,
        loading: false
      })
    })
    .catch( error => {
      console.log('Error fethcing and parsing data', error);
    });
  }

  render() {
    console.log(this.state.gifs);
    return (
      <div>
        <div className="main-header">
          <div className="inner">
            <h1 className="main-title">GifSearch</h1>
            <SearchForm onSearch={this.performSearch} />
          </div>
        </div>
        <div className="main-content">
          {
            (this.state.loading)
            ? <p>Loading...</p>
            : <GifList  data={this.state.gifs} />
          }
        </div>
      </div>
    );
  }
}
