let app = angular.module('myApp', []);

app.controller('detailMovieController', function ($scope, $http) {
    $scope.data = $('#id').text().trim();;

        $http.get('/api/v1/movie/detail/'+ $scope.data).then(function(res){
            $scope.detail = res.data.listMovie;
            console.log($scope.detail);
            //console.log(res.data.listMovie);
            //$scope.listMovie = res.data.listMovie
        }).catch(function(err){
            console.log(err);
        })

});