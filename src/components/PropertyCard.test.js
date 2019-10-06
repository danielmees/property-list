import React from 'react';
import { mount } from 'enzyme';
import PropertyCard from './PropertyCard';

it('renders correct property details and button according to props', () => {
  const props = {
    property: {
      price: '$726,500',
      agency: {
        brandingColors: {
           primary: '#ffe512'
        },
        logo: '1.gif'
      },
      id: 1,
      mainImage: 'main.jpg'
    },
    buttonType: 'Remove'
  }

  const wrapper = mount(<PropertyCard {...props} />);
  expect(wrapper.find('div')).toHaveLength(2);
  expect(wrapper.find('img')).toHaveLength(2);
  expect(wrapper.find('button')).toHaveLength(1);
  expect(wrapper.find('img').at(0).prop('src')).toEqual('1.gif');
  expect(wrapper.find('img').at(1).prop('src')).toEqual('main.jpg');
  expect(wrapper.find('button').text()).toEqual('Remove Property');
});
