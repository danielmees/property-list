import React from 'react';
import './propertycard.scss';

const PropertyCard = ({ id, property, buttonType, addProperty, removeProperty }) => {

  const { price, agency, mainImage } = property;

  return (
    <div className='property-card'>
      <div className='property-card__header' style={{ backgroundColor: agency.brandingColors.primary }}>
        <img src={agency.logo} alt='agency logo' />
      </div>
      <img className='property-card__main-image' src={mainImage} alt='property' />
      <h2 className='property-card__price'>{price}</h2>
      {(buttonType === 'Add') &&
        <button
          className='btn btn--add'
          onClick={() => addProperty(id)}
        >Add Property</button>
      }
      {(buttonType === 'Remove') &&
        <button
          className='btn btn--remove'
          onClick={() => removeProperty(id)}
        >Remove Property</button>
      }
    </div>
  )
}

export default PropertyCard;
