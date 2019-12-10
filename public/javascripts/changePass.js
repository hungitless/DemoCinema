let app = angular.module('myApp', []);

app.controller('changePassController', function ($scope, $http) {

    $scope.changeLayout = function(){
        $scope.btnSignUp = false;
        $scope.btnLogin = false;
        $scope.btnCreate = true;
        $scope.btnLogout = true;
        $scope.btnProfile = true;
    }

    $scope.checkChange = function(){
        $scope.checkPassOld();
        $scope.checkPassNew();
        //$scope.checkPassNew2();
        if($scope.checkPassOld() == false || $scope.checkPassNew() == false || $scope.checkPassNew2() == false){
            return false;
        }else{
            return true;
        }
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
            window.location.href = '/users/login';
            $scope.btnSignUp = true;
            $scope.btnLogin = true;
            $scope.btnCreate = false;
            $scope.btnLogout = false;
            $scope.btnProfile = false;
        }
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

    // $scope.data = $('#id').text().trim();
    

    $scope.btnSignUp = false;
    $scope.btnLogin = false;
    $scope.btnCreate = true;
    $scope.btnLogout = true;
    $scope.btnProfile = true;

    $scope.errPassOld = false;
    $scope.errPassNew = false;
    $scope.errPassNew2 = false;
    // $scope.errPassNew3 = false;
    // $scope.errPassOldNot = false;
    


    $scope.backProfile = function(){
        window.location.href = '/users/profile'
    }
    $scope.updatePass = function(){
        // $scope.errPassOldNot = false;
        if($scope.checkChange()==true){
            $scope.data.id = $scope.getCookie('user');
            $http.post('/api/v1/user/changePass', $scope.data).then(function(res, req){
                console.log(res.data);
                if(res.data.status === 200){
                    alert(res.data.message);
                    window.location.href = '/users/profile';
                }
                if(res.data.status === 400){     
                    var x = document.getElementById("snackbar");
                    x.className = "show";
                    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
                    $scope.showContentError = res.data.errorMessage;
                }
            }).catch(function(error) {
                console.log(error);
            })
        }
    }

    $scope.data = {
        passwordOld: '',
        passwordNew: '',
        passwordNew2: ''
    }

    $scope.checkPassOld = function(){
        // alert($scope.data.passwordOld);
        if(!$scope.data.passwordOld){
            $scope.errPassOld = true;
            return false;
        }
        else{
            $scope.errPassOld = false;
            return true;
        }
    }
    $scope.checkPassNew = function(){
        if(!$scope.data.passwordNew){
            $scope.errPassNew = true;
            return false;
        }
        else{
            $scope.errPassNew = false;
            return true;
        }
    }
    $scope.checkPassNew2 = function(){
        if(!$scope.data.passwordNew2){
            $scope.errPassNew2 = true;
            // $scope.errPassNew3 = false;
            return false;
        }
        else if($scope.data.passwordNew2 !== $scope.data.passwordNew){
            $scope.errPassNew2 = false;
            // $scope.errPassNew3 = true;
            var x = document.getElementById("snackbar");
            x.className = "show";
            setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
            $scope.showContentError = "Nhập lại mật khẩu không đúng.";
            return false;
        }
        else{
            $scope.errPassNew2 = false;
            // $scope.errPassNew3 = false;
            return true;
        }
    }
    
});