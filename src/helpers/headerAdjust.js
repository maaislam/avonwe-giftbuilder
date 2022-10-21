const headerAdjust = () => {
  const htmlStr = `<div class="meal-deal-breadcrumb"ng-repeat="breadcrumb in ShopContext.Breadcrumbs"ng-if="breadcrumb.Text"class="ng-scope"><a class="vi-breadrucmb-link ng-scope"ng-if="::breadcrumb.Url"ng-href="/pages/build-a-gift"href="/pages/build-a-gift"><span class="ng-binding">Back</span></a></div>`;

  const breadcrumbContainer = document.querySelector('#Breadcrumbs');
  const backBreadcrumb = document.querySelector('.meal-deal-breadcrumb');

  document.querySelector('.appwrapper').classList.add('giftbuilder');
  !backBreadcrumb && (breadcrumbContainer.innerHTML = htmlStr);
};

export default headerAdjust;
