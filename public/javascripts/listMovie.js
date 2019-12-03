let app = angular.module('myApp', []);

app.controller('myCrtlListMovie', function($scope, $http){
     $scope.showListMovie = function(){
        $http.get('api/v1/movie').then(function(res){
            console.log(res.data.listMovie);
            $scope.listMovie = res.data.listMovie
        }).catch(function(err){
            console.log(err);
        })
    }
    $scope.sortMovie = 'name';
})
      