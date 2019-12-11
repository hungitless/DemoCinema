let app = angular.module('myApp', []);

app.controller('editeUserController', function ($scope, $http) {

    // $scope.data.name = "Hung";
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
    $scope.errName = false;
    $scope.checkCookie();

    
    $http.get('/api/v1/user/profile').then(function(res){
        console.log(res.data.info);
        $scope.info = res.data.info;
        $scope.ten = $scope.info.name;
    }).catch(function(err){
        console.log(err);
    })

    $scope.checkName = function(){
        if(!$scope.info.name){
            $scope.errName = true;
            return false;
        }
        else{
            $scope.errName = false;
            return true;
        }
    }
    $scope.data = {
        id: "",
        name: ''
    }
    // $scope.editUser = function(){
    //     $scope.checkName();
    //     if( $scope.checkName() == true){
    //         $scope.data.id = $scope.getCookie('user');
    //         $scope.data.name = $scope.info.name;
    //         $http.post('/api/v1/user/edituser', $scope.data).then(function(res){
    //             if(res.data.status === 200){
    //                 alert(res.data.message);
    //                 window.location.href = '/users/profile';
    //             }
    //         }).catch(function(error) {
    //             console.log(error);
    //         })
    //     }
    // }
    //ham chinh
    $scope.editUser = function(req, res) {
        if ($scope.checkName() == true) {
          let formData = new FormData()
        //   $scope.data;
          var myFile = $('#img-film').prop('files')[0];
          $scope.data.id = $scope.getCookie('user');
          $scope.data.name = $scope.info.name;
          console.log(myFile);
          formData.append('image', myFile);
          formData.append('name', new Date().getTime())
          //console.log(formData);
          setTimeout(() => {
            $.ajax({
              url: "https://api.imgbb.com/1/upload?key=869aee1c7e7e9fb302537b76dc2f4bc2",
              data: formData,
              processData: false,
              contentType: false,
              type: 'POST',
              success: function (res) {
                // console.log("aaa" + res);
                $scope.data.cover = res.data.display_url
                $http.post('/api/v1/user/edituser', $scope.data).then(function (res) {
                    window.location = "/users/profile"
                }).catch(function (error) {
                    //alert('456');
                })
                }
              })
          }, 500);
          
        }
      }
});