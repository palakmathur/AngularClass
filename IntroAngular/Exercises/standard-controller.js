(function(angular){
    var control = angular.module("basicModule", []);
    control.controller("firstController", function($scope){
      $scope.users = ["Rama", "Venkata", "Naveen", "Lavanya","Gurjinder"];
      $scope.title = "Users";
    });
})(angular)
