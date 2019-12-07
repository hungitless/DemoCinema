let app = angular.module('myApp', []);
app.controller('loginController', function($scope, $http){

    $scope.btnSignUp = true;
    $scope.btnLogin = true;
    $scope.btnCreate = false;
    $scope.btnLogout = false;
    $scope.btnProfile = false;

    $scope.login = function(){
        $http.post('/api/v1/login', $scope.data).then(function(req, res){
        console.log(req.data.user);
        console.log("a + " + req.data);
            if(req.data.status == 200)
            {
                window.location.href = '/';
                $scope.setCookie('user', req.data.user._id, 1);
            }
            else{
                alert(req.data.message);
            }
        }).catch(function(err){
            console.log(err);
        })
        //alert($scope.getCookie('user'));
    }
    $scope.setCookie = function(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
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
});

