
let app = angular.module('myApp', []);
app.controller('signUpController', function ($scope, $http) {
    $scope.errUserName = false;
    $scope.errEmail = false;
    $scope.errPasswordAgain = false;
    $scope.errPassword = false;
    // $scope.errPasswordAgain2 = false;
    // $scope.errEmailAready = false;

    $scope.btnSignUp = true;
    $scope.btnLogin = true;
    $scope.btnCreate = false;
    $scope.btnLogout = false;
    $scope.btnProfile = false;

    $scope.data = {
        userName: null,
        email: null,
        password: null
    }

    $scope.setCookie = function(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    $scope.signUp = function () {
        //alert('1');
        $scope.errEmailAready = false;
        $scope.checkName();
        $scope.checkEmail();
        $scope.checkPassword();
        $scope.checkPasswordAgain();
        console.log(" aa " + $scope.checkEmail());
        if ($scope.checkEmail() == true && $scope.checkName() == true && $scope.checkPassword() == true && $scope.checkPasswordAgain() == true) {
            console.log('sucess');
            $http.post('/api/v1/user', $scope.data).then(function (req, res) {
                //console.log("id user + " + req.data.users._id);
                //console.log(req.data)
                if(req.data.status == 200)
                {
                    window.location.href = "/";
                    $scope.setCookie('user', req.data.user._id, 1);
                    // alert("Tạo Thành Công Tài Khoản: " + $scope.data.userName);
                }
                if(req.data.status === 400)
                {
                    var x = document.getElementById("snackbar");
                    x.className = "show";
                    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
                    $scope.showContentError = req.data.message;
                }
                
            }).catch(function (err) {
                //alert('123');
                console.log(err);
            });
        }
        // else {
        //     alert("Tạo Thất Bại Tài Khoản");
        // }
    }

    $scope.checkEmail = function () {
        // console.log(!!$scope.myForm.email.$error.required);
        if (!!$scope.myForm.email.$error.required == true || $scope.myForm.email.$error.email == true) {
            $scope.errEmail = true;
            return false;
        }
        else {
            //console.log("b");
            $scope.errEmail = false;
            return true;
        }
    }
    $scope.checkName = function () {
        if ($scope.data.userName != null) {
            $scope.errUserName = false;
            return true;
        }
        else {
            //alert('2');
            $scope.errUserName = true;
            return false;
        }
    }

    

    $scope.checkPassword = function () {
        if ($scope.data.password != null) {
            //alert('1');
            $scope.errPassword = false;
            return true;
        }
        else {
            //alert('2');
            $scope.errPassword = true;
            return false;
        }
    }

    $scope.checkPasswordAgain = function () {
        // alert($scope.passwordAgain);
        // alert($scope.password);
        if (!$scope.passwordAgain) {
            $scope.errPasswordAgain = true;
            //$scope.errPasswordAgain2 = false;
            return false;
        }else if($scope.passwordAgain != $scope.data.password){
            //$scope.errPasswordAgain2 = true;
            $scope.errPasswordAgain = false;
            var x = document.getElementById("snackbar");
            x.className = "show";
            setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
            $scope.showContentError = "Nhập lại mật khẩu không đúng.";
            return false;
        }
        else {
            $scope.errPasswordAgain = false;
            //$scope.errPasswordAgain2 = false;
            return true;
        }
    }

    $scope.clearInfo = function () {
        $scope.data = null;
        $scope.passwordAgain = null;
    }
})