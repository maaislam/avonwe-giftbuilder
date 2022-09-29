import React from 'react';

import './UnitPrice.css';

const UnitPrice = ({ unitPrice, unitPriceInfo, measureUnit }) => {
  return (
    <div className='unit-price'>
      <span className='unit-price-info'>{unitPriceInfo}</span>
      {unitPrice && measureUnit ? <span className='unit-price-details'>{` (${unitPrice} / ${measureUnit})`}</span> : ''}
    </div>
  );
};

export default UnitPrice;
