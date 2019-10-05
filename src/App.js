import React, { Component } from 'react';
import axios from 'axios';
import './app.scss';

class App extends Component {
  state = {
    loading: true,
    resultsProperties: [],
    savedProperties: [],
    error: false
  };

  componentDidMount() {
    return axios.get('http://localhost:3000/db/property.json')
      .then(res => {
        this.setState({
          loading: false,
          resultsProperties: res.data.results,
          savedProperties: res.data.saved
        });
      })
      .catch(() => {
        this.setState({
          loading: false,
          error: 'Oops, something went wrong!',
        });
      });
  }

  render() {
    return (
      <div className="app">
      </div>
    );
  }
}

export default App;
