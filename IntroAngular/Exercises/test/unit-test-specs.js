/*
 * Build a set of unit tests for the controller you completed in the last
 * exercise. The structure should look something like this:
 *
 * describe // Top-level for the TeamApp module
 *   declare variables for testScope, which will be shared
 *   throughout the application.
 *
 *   beforeEach // Load the teamApp module
 *              // Inject the controller lookup service and
 *              // instantiate a scope into testScope
 *   describe // Check functionality in TeamCtrl
 *     it: Check data in TeamCtrl
 *        expect: Make sure that $scope.teams has ten elements
 *        expect: Make sure that the third element is "Red Sox"
 *     it: Check the function delTeam
 *       expect: Should verify that a team has been deleted
 *       expect: Should verify that the teams list is shorter
 *     it: Check restoreTeams
 *       expect: verify deletes, as above
 *       expect: verify that deleted teams have come back
 */

describe( 'Unit Test Exercise', function () {

  it('Should be a basic test', function() {
    expect( 1 ).toBeTruthy();
  });

  /*  var testScope;

  // Setup for the tests
  beforeEach( testSetup );

  describe( 'Testing TeamCtrl', function () {

    // Covering data
    it('Testing data', testData);

    // Covering delTeam
    xit();

    // Covering restoreTeams
    xit();

  } );

  function testData() {
    expect( testScope.teams.length ).toBe( 10 );
  }

  function testSetup() {
    module( 'teamApp' );
    inject( function ($rootScope, $controller) {
      testScope = $rootScope.$new();

      $controller( 'TeamCtrl', {
        $scope: testScope
      } );

    } );
  }*/

} );
