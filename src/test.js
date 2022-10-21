(function () {
  const init = () => {
    const offerUrlContents = [
      '20417',
      '20488',
      '20418',
      '20489',
      '20419',
      '20490',
      '20491',
      '20519',
      '20520',
      '20521',
      '20522',
      '20523',
      '20524',
      '20525',
      '20526',
      '20527',
      '20513',
      '20514',
      '20515',
      '20516',
      '20517',
      '20518',
      '20499',
      '20500',
      '20501',
      '20502',
      '20503',
      '20504',
      '20505',
      '20420',
      '20482',
      '20483',
      '20484',
      '20421',
      '20485',
      '20422',
      '20486',
      '20487',
      '20506',
      '20507',
      '20508',
      '20509',
      '20510',
      '20511',
      '20512',
    ];

    const isValidOfferProduct = () =>
      offerUrlContents.some(
        (urlContent) => window.location.pathname.includes(urlContent) || window.location.pathname.includes('/cart')
      );

    if (isValidOfferProduct()) {
      const cartBtnContainer = document.querySelector('.add-to-cart-container');
      cartBtnContainer && cartBtnContainer.classList.add('giftbuilder-hide');
    }

    const isCartPage = () => window.location.pathname.includes('/cart');

    if (isCartPage()) {
      //check if user has offer items in Cart
      const cartPromo = document.querySelector('.Cart_Promotion');
      const allCartProducts = document.querySelectorAll('.Cart-Product');
      cartPromo.classList.add('giftbuilder-hide');

      //   const offerProdCount = [...allCartProducts].map((cartProduct) => {
      //     //check if this is a offer product

      //     const prodyctUrl = cartProduct.querySelector('.Cart-ProductName > a').getAttribute('href');

      //     return offerUrlContents.some((item) => prodyctUrl.includes(item));
      //   }).length;

      //   let unEvenCount;

      //   if (offerProdCount % 3 !== 0 && offerProdCount < 3) {
      //     return;
      //   } else if (offerProdCount % 3 !== 0 && offerProdCount > 3) {
      //     unEvenCount = offerProdCount - (offerProdCount % 3);
      //   }

      //   console.log(unEvenCount);
      allCartProducts.length > 0 &&
        allCartProducts.forEach((cartProduct, index) => {
          //check if this is a offer product

          const prodyctUrl = cartProduct.querySelector('.Cart-ProductName > a').getAttribute('href');

          const isOfferUrl = offerUrlContents.some((item) => prodyctUrl.includes(item));
          if (isOfferUrl) {
            cartProduct.classList.add('giftbuider-disabled');
          }
        });
    }
  };

  init();
  // Select the node that will be observed for mutations
  const targetNode = document.querySelector('body');

  // Options for the observer (which mutations to observe)
  const config = { attributes: true, childList: true, subtree: true };

  // Callback function to execute when mutations are observed
  const callback = (mutationList) => {
    for (const mutation of mutationList) {
      if (mutation.type === 'childList') {
        console.log('A child node has been added or removed.');
        init();
      }
    }
  };

  // Create an observer instance linked to the callback function
  const observer = new MutationObserver(callback);

  // Start observing the target node for configured mutations
  observer.observe(targetNode, config);
})();
