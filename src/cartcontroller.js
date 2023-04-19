angular.module('mangaEcommerceApp', [])
  .controller('mangaController', function($scope, $http) {
    $http.get('/products')
      .then(function(response) {
        $scope.products = response.data;
      });
  });