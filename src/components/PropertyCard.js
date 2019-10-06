import React from 'react';
import './propertycard.scss';

const PropertyCard = ({ property, buttonType }) => {

  const { price, agency, mainImage } = property;
  const buttonText = (buttonType === 'Add') ? 'Add Property' : 'Remove Property';
  const buttonClass = (buttonType === 'Add') ? 'btn btn--add' : 'btn btn--remove';

  return (
    <div className='property-card'>
      <div className='property-card__header' style={{ backgroundColor: agency.brandingColors.primary }}>
        <img src={agency.logo} alt='agency logo' />
      </div>
      <img className='property-card__main-image' src={mainImage} alt='property' />
      <h2 className='property-card__price'>{price}</h2>
      <button className={buttonClass}>{buttonText}</button>
    </div>
  )
}

export default PropertyCard;
