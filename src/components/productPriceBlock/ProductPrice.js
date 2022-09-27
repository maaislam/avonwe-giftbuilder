import React from 'react';
import formatPrice from '../../helpers/formatPrice';

import './ProductPrice.css';

const ProductPrice = ({ listPrice, salePrice }) => {
  return (
    <div className='product-price-container'>
      <div className='product-price'>
        <span className='current-price'>{formatPrice(salePrice || listPrice)}</span>
        {salePrice ? <span className='original-price '>{formatPrice(listPrice)}</span> : ''}
      </div>
      <span className='price-per-ml'></span>
    </div>
  );
};

export default ProductPrice;
