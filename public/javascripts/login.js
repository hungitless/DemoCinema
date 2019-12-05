let app = angular.module('myApp', []);
app.controller('aaa', function($scope, $http){
    $scope.login = function(req){
        // alert("aa + " + session.user);
        $http.post('api/v1/login', $scope.data).then(function(req, res){
            console.log(req.data.message);
            if(req.data.status == 200)
            {
                window.location.href = '/';
            }
        }).catch(function(err){
            console.log(err);
        })
    }
});

