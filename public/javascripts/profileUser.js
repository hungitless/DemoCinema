let app = angular.module('myApp', []);

app.controller('profileUserController', function ($scope, $http) {

    $scope.btnSignUp = true;
    $scope.btnLogin = true;
    $scope.btnCreate = false;
    $scope.btnLogout = false;
    $scope.btnProfile = false;

    $scope.changeLayout = function(){
        $scope.btnSignUp = false;
        $scope.btnLogin = false;
        $scope.btnCreate = true;
        $scope.btnLogout = true;
        $scope.btnProfile = true;
    }
    
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
    

    $scope.btnSignUp = false;
    $scope.btnLogin = false;
    $scope.btnCreate = true;
    $scope.btnLogout = true;
    $scope.btnProfile = true;

    $scope.checkCookie();

    
    
    $http.get('/api/v1/user/profile').then(function(res){
        console.log(res.data.info);
        $scope.info = res.data.info;
    }).catch(function(err){
        console.log(err);
    })

    

});