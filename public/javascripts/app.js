let app = angular.module('myApp', []);

app.controller('myController', function($scope, $http){
    $scope.createMovie = () =>{
        $scope.data
        $http.post('api/v1/movie', $scope.movie).then(function(res){
            window.alert("OK")
			}).catch(function(err){
				console.log(err)
			})
    }
})
      