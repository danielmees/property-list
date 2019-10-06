import React, { Component } from 'react';
import axios from 'axios';
import './app.scss';
import PropertyCard from './components/PropertyCard';

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
          error: 'Oops, something went wrong!'
        });
      });
  }

  renderResultsList() {
    return (
      this.state.resultsProperties.map(property =>
        <PropertyCard key={property.id} id={property.id} property={property} buttonType='Add' addProperty={this.addProperty} />
      )
    );
  }

  renderSavedList() {
    return (
      this.state.savedProperties.map(property =>
        <PropertyCard key={property.id} id={property.id} property={property} buttonType='Remove' removeProperty={this.removeProperty} />
      )
    );
  }

  addProperty = (id) => {
    if (id) {
      const isPropertyExist = this.state.savedProperties.filter(property => property.id === id).length > 0;
      if (!isPropertyExist) {
        const propertyToAdd = this.state.resultsProperties.filter(property => property.id === id)[0];
        const savedProperties = this.state.savedProperties;
        savedProperties.push(propertyToAdd);
        this.setState({ savedProperties });
      }
    }
  }

  removeProperty = (id) => {
    if (id) {
      const leftProperties = this.state.savedProperties.filter(property => property.id !== id);
      this.setState({ savedProperties: leftProperties });
    }
  }

  render() {
    const { loading, error } = this.state;

    return (
      <div className='container'>
         { loading &&
           <h3 className='loading'>Loading... Please wait</h3>
         }
         { (!loading && !error) &&
           <React.Fragment>
             <div className='property-list'>
               <h2>Results</h2>
               {this.renderResultsList()}
             </div>
             <div className='property-list'>
               <h2>Saved Properties</h2>
               {this.renderSavedList()}
             </div>
           </React.Fragment>
         }
         { (!loading && error) &&
           <h3 className='error'>{error}</h3>
         }
      </div>
    );
  }
}

export default App;
