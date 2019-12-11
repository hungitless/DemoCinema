let app = angular.module('myApp', []);

app.controller('detailMovieController', function ($scope, $http) {
    
    $scope.moviwOfUser = false;
    // if(!checkCookie('user'))
    $scope.data = $('#id').text().trim();

    $scope.btnSignUp = false;
    $scope.btnLogin = false;
    $scope.btnCreate = true;
    $scope.btnLogout = true;
    $scope.btnProfile = true;

    $scope.delete_cookie = function(cname) {
        document.cookie = cname + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    };
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
            window.location.href = '/users/login';
        }
    }
    $scope.getCookie = function(cname){
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
            c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
            }
        }
        return "";
    }
    $scope.changeLayout = function(){
        $scope.btnSignUp = false;
        $scope.btnLogin = false;
        $scope.btnCreate = true;
        $scope.btnLogout = true;
        $scope.btnProfile = true;
    }

    $scope.checkCookie = function() {
        var username = $scope.getCookie("user");
        if (username != "") {
            $scope.changeLayout();
            //alert("Welcome again " + username);
        } else {
            // username = prompt("Please enter your id:", "");
          if (username != "" && username != null) {
            setCookie("user", username, 365);
          }
        }
    }

    $scope.deleteMovie = function(data){
        var result = confirm("Bạn có chắc muốn xoá?");
        if(result == true){
            $scope.id = data;
            console.log(data);
            $http.post('/api/v1/movie/delete/' + $scope.id).then(function(res){
                window.location.href = '/';
            }).catch(function(error) {
                console.log(error);
            })
        }
    }
  
    $http.get('/api/v1/movie/detail/'+ $scope.data).then(function(res){
        $scope.detail = res.data.listMovie;
        // console.log($scope.detail.byUser)
        if($scope.detail.byUser == $scope.getCookie('user')){
            $scope.moviwOfUser = true;
        }
        console.log($scope.detail);
        //console.log(res.data.listMovie);\
        //$scope.listMovie = res.data.listMovie
    }).catch(function(err){
        console.log(err);
    })

});