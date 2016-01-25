(function ( angular ) {

  var mod = angular.module( 'uiRouterMod', ['ui.router', 'uiRouterControllers'] );

  mod.config( function ( $stateProvider, $urlRouterProvider ) {
    $urlRouterProvider.otherwise( '/products' );

    $stateProvider.state( 'products', {
      url         : '/products',
      templateUrl : 'partials/products-tpl.html',
      controller: 'ProductListCtrl'
    } )
      .state('products.detail', {
        url: '/:productID',
        templateUrl: 'partials/products-detail-tpl.html',
        controller: 'ProductDetailCtrl'
      })
      .state('products.detail.supplier', {
        url: '/supplier',
        templateUrl: 'partials/supplier-details-tpl.html',
        controller: 'SupplierDetailCtrl'
      })
  } )
})( angular );
