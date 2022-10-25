import React, { useState, useEffect, useContext } from 'react';
import { ChosenProductContext } from '../../contexts/ChosenProductContext';
import { PdpPopupContext } from '../../contexts/PdpPopupContext';
import { selectedProductContext } from '../../contexts/SelectedProductContext';
import getImages from '../../helpers/getImages';

import ProductButton from '../productButton/ProductButton';
import ProductImage from '../productImgBlock/ProductImage';
import ProductPrice from '../productPriceBlock/ProductPrice';
import Ratings from '../productRatings/Ratings';
import UnitPrice from '../unitPrice/UnitPrice';

import './Card.css';

const Card = ({ cardData, selectedVariant, children, position }) => {
  //console.log(cardData);
  const {
    Availability,
    Id,
    stepId,
    ListPrice,
    SalePrice,
    ProfileNumber,
    Name,
    PricePerUnitInformation,
    Rating,
    RatingCount,
    UnitPriceFormatted,
    UnitPriceMeasureUnit,
    VariantGroups,
  } = cardData;
  const { Variants } = VariantGroups[0];
  const [btnText, setBtnText] = useState('');
  const [cardImages, setCardImages] = useState([]);

  const { setPopupState } = useContext(PdpPopupContext);
  const { selectedProducts, setSelectedProducts } = useContext(selectedProductContext);
  const { setChosenProduct } = useContext(ChosenProductContext);

  useEffect(() => {
    const getImgs = async () => {
      const imgSrc = await getImages(ProfileNumber);

      setCardImages(imgSrc);
    };

    const btnType = Variants.length > 1 ? 'Choose' : 'Select';
    const isProductAdded = selectedProducts.some((item) => item.Id === Id);

    setBtnText(isProductAdded ? 'Remove' : btnType);

    getImgs();
  }, [Id, selectedProducts, Variants.length, ProfileNumber]);

  const btnClickHandler = (clickedBtnText) => {
    const popupContainer = document.getElementById('gift-builder-modal');
    //console.log(e.target.innerText);
    const btnType = Variants.length > 1 ? 'Choose' : 'Select';
    if (clickedBtnText === 'Select') {
      //setBtnText('Remove');
      const variantSelected = !selectedVariant || Object.keys(selectedVariant).length === 0 ? Variants[0] : selectedVariant;
      const selectionData = [...selectedProducts, { ...cardData, cardImages, Variants, variantSelected }];
      //remove duplicates\\
      const uniqueSelectionData = [];
      selectionData.forEach((element) => {
        const duplicateIdx = uniqueSelectionData.findIndex((item) => item.Id === element.Id || item.stepId === stepId);
        if (duplicateIdx >= 0) {
          //remove old item make space for new one

          uniqueSelectionData.splice(duplicateIdx, 1);
        }
        uniqueSelectionData.push(element);
      });
      //remove duplicates\\

      setSelectedProducts(uniqueSelectionData);
      setPopupState(false);
      popupContainer.classList.remove('active');
      setBtnText('Remove');
    } else if (clickedBtnText === 'Choose') {
      //const btnType = variants.length > 1 && !popupState ? 'Choose' : 'Select';
      const selectionData = [...selectedProducts];
      setSelectedProducts(selectionData);
      setPopupState(true);
      setChosenProduct({ ...cardData, cardImages, Variants });
      popupContainer.classList.add('active');
    } else if (clickedBtnText === 'Remove') {
      setBtnText(btnType);
      const updatedState = selectedProducts.filter((item) => item.Id !== Id);
      setSelectedProducts(updatedState);
    }
  };

  //console.log(cardImages);

  return (
    <div className='product-card'>
      <ProductImage images={cardImages} title={Name} position={position} />
      <div className='product-details-wrapper'>
        <Ratings rating={Rating} ratingCount={RatingCount} />
        <ProductPrice
          listPrice={ListPrice}
          salePrice={SalePrice}
          unitPriceInfo={PricePerUnitInformation}
          unitPrice={UnitPriceFormatted}
          measureUnit={UnitPriceMeasureUnit}
        >
          <UnitPrice unitPrice={UnitPriceFormatted} unitPriceInfo={PricePerUnitInformation} measureUnit={UnitPriceMeasureUnit} />
        </ProductPrice>

        {children}
        {Availability === 1 ? (
          <ProductButton btnText={`${children ? 'Select' : btnText}`} btnClickHandler={btnClickHandler} />
        ) : (
          <ProductButton btnText='Out of stock' />
        )}
      </div>
    </div>
  );
};

export default Card;
