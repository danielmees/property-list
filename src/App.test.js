import React from 'react';
import { shallow } from 'enzyme';
import axios from 'axios';
import App from './App';

jest.mock('axios', () => {
  const fakeResponse = {
    data: {
      results:[
        { id: '1', price: "$726,500" },
        { id: '2', price: "$560,520" }
      ],
      saved:[]
    }
  };
  return {
    get: jest.fn(() => Promise.resolve(fakeResponse)),
  };
});

it('fetches properties results on #componentDidMount and update states correctly', (done) => {
  const properties = [
    { id: '1', price: "$726,500" },
    { id: '2', price: "$560,520" }
  ];

  const wrapper = shallow(<App />);
  wrapper.instance()
    .componentDidMount()
    .then((response) => {
      expect(axios.get).toHaveBeenCalled();
      expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/db/property.json');
      expect(wrapper.state('loading')).toEqual(false);
      expect(wrapper.state('resultsProperties')).toEqual(properties);
      expect(wrapper.state('savedProperties')).toEqual([]);
      done();
    });
});
