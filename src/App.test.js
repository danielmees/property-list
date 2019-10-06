import React from 'react';
import { shallow } from 'enzyme';
import axios from 'axios';
import App from './App';

jest.mock('axios', () => {
  const fakeResponse = {
    data: {
      results:[
        { id: 1, price: "$726,500" },
        { id: 2, price: "$560,520" }
      ],
      saved:[]
    }
  };
  return {
    get: jest.fn(() => Promise.resolve(fakeResponse)),
  };
});

const properties = [
  { id: 1, price: "$726,500" },
  { id: 2, price: "$560,520" }
];

it('fetches properties results on #componentDidMount and update states correctly', () => {
  const wrapper = shallow(<App />);
  wrapper.instance()
    .componentDidMount()
    .then((response) => {
      expect(axios.get).toHaveBeenCalled();
      expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/db/property.json');
      expect(wrapper.state('loading')).toEqual(false);
      expect(wrapper.state('resultsProperties')).toEqual(properties);
      expect(wrapper.state('savedProperties')).toEqual([]);
    });
});

it('Add a property card to "Saved Properties" when clicking on add button', () => {
  const wrapper = shallow(<App />);
  wrapper.instance()
    .componentDidMount()
    .then((response) => {
      wrapper.instance().addProperty(1);
      expect(wrapper.state('savedProperties')).toEqual([properties[0]]);
      wrapper.instance().addProperty(2);
      expect(wrapper.state('savedProperties')).toEqual(properties);
    });
});

it('should aviod adding duplicate property cards when clicking repeatedly on a same button', () => {
  const wrapper = shallow(<App />);
  wrapper.instance()
    .componentDidMount()
    .then((response) => {
      wrapper.instance().addProperty(1);
      wrapper.instance().addProperty(1);
      wrapper.instance().addProperty(1);
      wrapper.instance().addProperty(1);
      expect(wrapper.state('savedProperties')).toEqual(properties);
    });
});

it('remove a property card from "Saved Properties" when clicking on remove button', () => {
  const wrapper = shallow(<App />);
  wrapper.instance()
    .componentDidMount()
    .then((response) => {
      wrapper.instance().removeProperty(1);
      wrapper.instance().removeProperty(2);
      expect(wrapper.state('savedProperties')).toEqual([]);
    });
});

it('should do nothing if property id is not passed to add or remove function', () => {
  const wrapper = shallow(<App />);
  wrapper.instance()
    .componentDidMount()
    .then((response) => {
      const savedProperties = wrapper.state('savedProperties');
      wrapper.instance().addProperty();
      wrapper.instance().addProperty();
      expect(wrapper.state('savedProperties')).toEqual(savedProperties);
      wrapper.instance().removeProperty();
      wrapper.instance().removeProperty();
      expect(wrapper.state('savedProperties')).toEqual(savedProperties);
    });
});
