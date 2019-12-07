let app = angular.module('myApp', []);

app.controller('detailMovieController', function ($scope, $http) {
    $scope.data = $('#id').text().trim();

    $scope.btnSignUp = false;
    $scope.btnLogin = false;
    $scope.btnCreate = true;
    $scope.btnLogout = true;
    $scope.btnProfile = true;
    
    $scope.logOut = function(){
        //alert('123');
        let valueConfirm = confirm("Bạn có muốn đăng xuất");
        //alert(valueConfirm);
        if(valueConfirm == true)
        {
            $scope.delete_cookie('user');
            $scope.checkCookie();
            $scope.btnSignUp = true;
            $scope.btnLogin = true;
            $scope.btnCreate = false;
            $scope.btnLogout = false;
            $scope.btnProfile = false;
        }
    }
  
    $http.get('/api/v1/movie/detail/'+ $scope.data).then(function(res){
        $scope.detail = res.data.listMovie;
        console.log($scope.detail);
        //console.log(res.data.listMovie);
        //$scope.listMovie = res.data.listMovie
    }).catch(function(err){
        console.log(err);
    })

});