import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './app.scss';
import PropertyCard from './components/PropertyCard';

function App() {
  const [loading, setLoading] = useState(true);
  const [resultsProperties, setResultsProperties] = useState([]);
  const [savedProperties, setSavedProperties] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => fetchData(), []);

  const fetchData = () => {
    axios.get('http://localhost:3000/db/property.json')
      .then(res => {
        setLoading(false);
        setResultsProperties(res.data.results);
        setSavedProperties(res.data.saved);
      })
      .catch(() => {
        setLoading(false);
        setError('Oops, something went wrong!');
      });
  }

  const renderResultsList = () => {
    return (
      resultsProperties.map(property =>
        <PropertyCard key={property.id} id={property.id} property={property} buttonType='Add' addProperty={addProperty} />
      )
    );
  }

  const renderSavedList = () => {
    return (
      savedProperties.map(property =>
        <PropertyCard key={property.id} id={property.id} property={property} buttonType='Remove' removeProperty={removeProperty} />
      )
    );
  }

  const addProperty = (id) => {
    if (id) {
      const isPropertyExist = savedProperties.filter(property => property.id === id).length > 0;
      if (!isPropertyExist) {
        const propertyToAdd = resultsProperties.filter(property => property.id === id)[0];
        const newSavedProperties = [...savedProperties];
        newSavedProperties.push(propertyToAdd);
        setSavedProperties(newSavedProperties);
      }
    }
  }

  const removeProperty = (id) => {
    if (id) {
      const leftProperties = savedProperties.filter(property => property.id !== id);
      setSavedProperties(leftProperties);
    }
  }

  return (
    <div className='container'>
       { loading &&
         <h3 className='loading'>Loading... Please wait</h3>
       }
       { (!loading && !error) &&
         <>
           <div className='property-list'>
             <h2>Results</h2>
             {renderResultsList()}
           </div>
           <div className='property-list'>
             <h2>Saved Properties</h2>
             {renderSavedList()}
           </div>
         </>
       }
       { (!loading && error) &&
         <h3 className='error'>{error}</h3>
       }
    </div>
  );
  
}

export default App;
