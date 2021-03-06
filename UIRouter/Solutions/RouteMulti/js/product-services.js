(function ( angular, _ ) {
  var mod = angular.module( 'productServices', [] );

  mod.factory( 'productDAO', function ( $http, $q, $log, filterFilter ) {
    var tmpObj = {
      loaded : false
    };

    tmpObj.products = [];

    var retObj = {
      getProduct : function ( id ) {
        return tmpObj.productById[id];
      },

      getProducts : function () {
        return tmpObj.products
      },

      getProductsBySupplier : function(supplier) {
        return tmpObj.productsBySupplier[supplier];
      },

      isLoaded : function () {
        return tmpObj.loaded;
      },

      getPromise : function () {
        return p;
      },

      success : function ( fn ) {
        p.then( fn );
      }
    };

    var promises = {};

    promises.products = $http.get( 'http://localhost:8001/northwind/products' );
    promises.suppliers = $http.get( 'http://localhost:8001/northwind/suppliers' );
    promises.categories = $http.get( 'http://localhost:8001/northwind/categories' );

    var p = $q.all( promises )
      .then( function ( res ) {

        tmpObj.products.splice( 0, tmpObj.products.length );
        tmpObj.productById = {};
        tmpObj.productsBySupplier = {};
        tmpObj.productsByCategory = {};

        res.products.data.forEach( function ( product ) {
          tmpObj.products.push( product );
          tmpObj.productById[product.productID] = product;
          product.supplier = filterFilter( res.suppliers.data, { supplierID : product.supplierID } )[0];
          product.category = _.findWhere( res.categories.data, { categoryID : product.categoryID } );


          if (! tmpObj.productsBySupplier[product.supplier.companyName]) {
            tmpObj.productsBySupplier[product.supplier.companyName] = [];
          }

          tmpObj.productsBySupplier[product.supplier.companyName].push(product);

          if (! tmpObj.productsByCategory[product.category.categoryName]) {
            tmpObj.productsByCategory[product.category.categoryName] = [];
          }

          tmpObj.productsByCategory[product.category.categoryName].push(product);

        } );


        tmpObj.loaded = true;

        return retObj;
      } );

    return retObj;

  } )

})( angular, _ );