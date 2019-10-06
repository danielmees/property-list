import React from 'react';
import './propertycard.scss';

const PropertyCard = ({ property }) => {

  const { price, agency, mainImage } = property;

  return (
    <div className='property-card'>
    <div className='property-card__header' style={{ backgroundColor: agency.brandingColors.primary }}>
      <img src={agency.logo} alt='agency logo' />
    </div>
    <img className='property-card__main-image' src={mainImage} alt='agency logo' />
    <h2 className='property-card__price'>{price}</h2>
    </div>
  )
}

export default PropertyCard;
