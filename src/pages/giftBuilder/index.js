import React, { useState, useEffect, useContext } from 'react';
import PdpModal from '../../components/pdpPopup/PdpPopup';
import Card from '../../components/productCard/Card';

import { ChosenProductContext } from '../../contexts/ChosenProductContext';
import { PdpPopupContext } from '../../contexts/PdpPopupContext';
import ProductRows from './ProductRows';

import './giftbuilder.css';
import formatPrice from '../../helpers/formatPrice';
import OfferBar from '../../components/offerbar/OfferBar';
import Loader from '../../components/Loader';
import scrollToTop from '../../helpers/scrollTop';
import Variants from '../../components/variantsBlock/Variants';

const GiftBuilder = ({ pageData }) => {
  const { bundledPrice, dealTitle, allData } = pageData;
  //console.log(pageData);
  useEffect(() => {
    scrollToTop();
    window.location.hash = '#giftbuilder';
  }, []);

  const { chosenProduct } = useContext(ChosenProductContext);
  const { popupState } = useContext(PdpPopupContext);

  //const initialVariant = chosenProduct ? chosenProduct.variants[0] : {};

  const [selectedVariant, setSelectedVariant] = useState({});
  const onSelectionChange = (variant) => {
    setSelectedVariant(variant);
  };

  return (
    <div className='giftbuilder'>
      <div className='giftbuilder-wrapper'>
        <h4>
          <span>{dealTitle}</span>.
        </h4>
        {bundledPrice ? <h3>{`Offer price: ${formatPrice(bundledPrice)}`}</h3> : ''}
        {allData ? (
          <>
            <ProductRows rowsData={allData} />
            <OfferBar bundledPrice={bundledPrice} />
          </>
        ) : (
          <Loader />
        )}
        {popupState && (
          <PdpModal>
            <Card cardData={chosenProduct} selectedVariant={selectedVariant} position={'modal'}>
              <Variants variants={chosenProduct.Variants} selected={selectedVariant} onSelectionChange={onSelectionChange} />
            </Card>
          </PdpModal>
        )}
      </div>
    </div>
  );
};

export default GiftBuilder;
