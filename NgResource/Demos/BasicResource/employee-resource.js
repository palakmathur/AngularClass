(function ( angular ) {
  var mod = angular.module( 'employeeApp', ['ngMessages', 'ngResource'] );
  mod.controller( 'EmployeeMainCtrl',
    function ( $scope, $resource, $document, $log ) {

      var Employee = $resource( 'http://localhost:8001/northwind/employees/:id',
        { id : '@employeeID' } );

      $document.ready( function () {
        $scope.$watch( 'dbobj.firstName || dbobj.lastName', function () {
          $log.log( 'dbobj was updated' );
          $scope.employees = Employee.query( $scope.dbobj,
            function ( emps ) {
              emps.forEach( function ( emp ) {
                if ( emp.hireDate ) {
                  // Only because input[type="date"] in Chrome doesn't like
                  // date strings (2015-04-24T10:10:10.000Z)
                  emp.hireDate = new Date( emp.hireDate );
                  emp.birthDate = new Date( emp.birthDate );
                }
              } )
            } );
        } );

      } );

      $scope.showMessage = function ( model ) {
        if ( model && model.$touched && model.$error ) {
          return model.$error
        } else {
          return {
            valid : true
          }
        }
      };

      $scope.editEmployee = function ( employee ) {
        $scope.emp = angular.copy(employee);
      };

      $scope.createEmployee =function(employee) {
        employee.$save();
      };

      var usZip = new RegExp( '^\\d{5}$' );
      var ukPostcode = new RegExp( '^[A-Z]{2}\\d \\d[A-Z]{2}$' );
      $scope.postalCodePattern = usZip;

      $scope.$watch( 'emp.country', function ( newVal ) {
        switch ( newVal ) {
          case 'US':
            $scope.postalCodePattern = usZip;
            break;
          case 'UK':
            $scope.postalCodePattern = ukPostcode;
            break;
          default:
            $scope.postalCodePattern = '';
        }
      } );

    } );
})( angular );