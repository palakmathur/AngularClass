(function ( angular ) {

  function titleCase( word ) {
    var wordArray = word.split( '' );
    wordArray[0] = wordArray[0].toUpperCase();
    return wordArray.join( '' );
  }

  function getBaseDAO( singular, plural, idField, $http ) {
    /*
     * Create a dao object, add two properties to it:
     *   records, an empty array
     *   recordsByID, an empty object
     */

    dao.refresh = function () {
      dao.records.splice( 0, dao.records.length );
      var dataIds = [];

      $http( {
        url    : 'http://localhost:8001/northwind/' + plural,
        method : 'get'
      } )
        .success( function ( data ) {
          /*
           * Iterate over data, pushing each record onto dao.records
           * And adding a key-value pair to dao.recordsByID such that
           * dao.recordsByID[5] returns a full object with the ID 5
           */

        } );
    };

    dao['get' + titleCase( singular )] = function ( id ) {
      if ( dao.recordsByID[id] ) {
        return dao.recordsByID[id];
      } else {
        var result = {};
        $http( {
          url : 'http://localhost:8001/northwind/products/' + id
        } )
          .success( function ( record ) {
            Object.keys( record ).forEach( function ( key ) {
              result[key] = record[key];
            } )
          } );

        return result;
      }
    };

    /*
     * Build a function that is dao.getThings (where Things is the title
     * cased plural value). It should return dao.records.
     */


    return dao;
  }

  var mod = angular.module( 'productDataAccess', [] );

  mod.factory( 'productDAO', function ( $http, filterFilter ) {
    var dao = getBaseDAO( 'product', 'products', 'productID', $http );
    dao.getProducts = function ( params ) {
      if ( params ) {
        $http({
          url: 'http://localhost:8001/northwind/products/',
          method: 'get',
          params: params
        } )
          .success(function(data) {
            dao.records.splice( 0, dao.records.length );
            data.forEach(function(record) {
              dao.records.push( record );
            })
          });
      }

      return dao.records;
    };

    dao.refresh();
    return dao;
  } );

  /*
   * Build two factories, categoryDAO and supplierDAO
   * They can both be generated by basic calls to getBaseDAO with no
   * overrides
   * though don't forget to call dao.refresh() before you return the dao
   */


})( angular );
