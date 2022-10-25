const headerAdjust = () => {
  const htmlStr = `<div class="meal-deal-breadcrumb">
    <a href="/"><span>Home </span></a>
    <span>/</span>
    <a href="/pages/build-a-gift"><span> Build a Gift</span></a>
  </div>`;

  const breadcrumbContainer = document.querySelector('#Breadcrumbs');
  const backBreadcrumb = document.querySelector('.meal-deal-breadcrumb');

  document.querySelector('.appwrapper').classList.add('giftbuilder');

  if (!document.querySelector('.Layout_Phone #Breadcrumbs')) {
    !backBreadcrumb && (breadcrumbContainer.innerHTML = htmlStr);
    return;
  }
  const mainWrapper = document.getElementById('MainContentWrapper');
  console.log('mainwrapper', mainWrapper);
  !backBreadcrumb && mainWrapper.insertAdjacentHTML('afterbegin', htmlStr);
};

export default headerAdjust;
