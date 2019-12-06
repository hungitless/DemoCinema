
let app = angular.module('myApp', []);
app.controller('myCrtlSignUp', function($scope, $http){
    $scope.errUserName = false;
    $scope.errEmail = false;
    $scope.errPasswordAgain = false;
    $scope.errPassword = false;


    $scope.data = {
        userName: null,
        email: null,
        password: null
      }
    $scope.signUp = function(){
        $scope.checkName();
        $scope.checkEmail();
        $scope.checkPassword();
        $scope.checkPasswordAgain();
        if($scope.checkEmail() == true && $scope.checkName() == true && $scope.checkPassword() == true && $scope.checkPasswordAgain() == true){
            console.log('sucess');
            $http.post('/api/v1/user', $scope.data).then(function(res){
                alert("Tạo Thành Công Tài Khoản: " + $scope.data.userName);
                $scope.clearInfo();
                console.log(res.data.user);
                window.location.href = '/';
            }).catch(function(err){
                //alert('123');
                console.log(err);
            });
        }
        else{
            alert("Tạo Thất Bại Tài Khoản");
        }
    }

    $scope.checkEmail = function(){
        // console.log(!!$scope.myForm.email.$error.required);
        if(!!$scope.myForm.email.$error.required == true || $scope.myForm.email.$error.email == true){
            //console.log("a");
            $scope.errEmail = true;
            return false;
        }
        else{
            //console.log("b");
            $scope.errEmail = false;
            return true;
        }
    }
    $scope.checkName = function(){
		if($scope.data.userName != null)
		{
            $scope.errUserName = false;
			return true;
		}
		else
		{
            //alert('2');
            $scope.errUserName = true;
			return false;
		}
    }

    $scope.checkPassword = function(){
		if($scope.data.password != null)
		{
            alert('1');
            $scope.errPassword = false;
			return true;
		}
		else
		{
            alert('2');
            $scope.errPassword = true;
			return false;
		}
    }

    $scope.checkPasswordAgain = function(){
		if($scope.passwordAgain != null && $scope.passwordAgain == $scope.data.password)
		{
            // console.log('ok roi nha');
            $scope.errPasswordAgain = false;
			return true;
		}
		else
		{
            $scope.errPasswordAgain = true;
			return false;
		}
    }

    $scope.clearInfo = function(){
        $scope.data = null;
        $scope.passwordAgain = null;
    }
    // $scope.aaa = function(){
    //     console.log($scope.email);
    // }
})