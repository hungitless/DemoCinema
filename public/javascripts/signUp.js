let app = angular.module('myApp', []);
app.controller('myCrtlSignUp', function($scope, $http){
    $scope.data = {
        userName: null,
        email: null,
        password: null
      }
    $scope.signUp = function(){
        // console.log($scope.checkEmail());
        // console.log($scope.checkName());
        // console.log($scope.checkPassword());
        // console.log($scope.checkPasswordAgain());
        if($scope.checkEmail() == true && $scope.checkName() == true && $scope.checkPassword() == true && $scope.checkPasswordAgain() == true){
            console.log('sucess');
            $http.post('api/v1/user', $scope.data).then(function(res){
                alert("Tạo Thành Công Tài Khoản: " + $scope.data.userName);
                $scope.clearInfo();
                console.log(res.data.user);
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
            //console.log("sai");
            return false;
        }
        else{
            //console.log("dung");
            return true;
        }
    }
    $scope.checkName = function(){
		if($scope.data.userName != null)
		{
			return true;
		}
		else
		{
			return false;
		}
    }

    $scope.checkPassword = function(){
		if($scope.data.password != null)
		{
			return true;
		}
		else
		{
			return false;
		}
    }

    $scope.checkPasswordAgain = function(){
		if($scope.passwordAgain != null && $scope.passwordAgain == $scope.data.password)
		{
            // console.log('ok roi nha');
			return true;
		}
		else
		{
			return false;
		}
    }

    $scope.clearInfo = function(){
        $scope.data = null;
        $scope.passwordAgain = null;
    }
})