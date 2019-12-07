let app = angular.module('myApp', []);

app.controller('myController', function ($scope, $http) {
  $scope.btnSignUp = false;
  $scope.btnLogin = false;
  $scope.btnCreate = true;
  $scope.btnLogout = true;
  $scope.btnProfile = true;

  $scope.errName = false;
  $scope.errDescription = false;
  $scope.errKind = false;
  $scope.errDate = false;

  $scope.theLoai = ['Hành Động', 'Tình Cảm', 'Viễn Tưởng', 'Chiến Tranh', 'Kinh Dị'];
  // $scope.theloai = 'Chọn Thể Loại';
  $scope.data = {
    tenPhim: '',
    theLoai: '',
    moTa: '',
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
        window.location.href = '/login';
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

  function formatDateToTimeStamp(date) {
    if (isNaN(date)) {
      var dateParts = date.split('/')
      var dateObject = new Date(
        +dateParts[2],
        dateParts[1] - 1,
        +dateParts[0]
      )
      return dateObject.getTime()
    } else {
      return date;
    }
  }

  $scope.retartInput = function () {
    $scope.data = {
      tenPhim: '',
      theLoai: '',
      moTa: '',
    }
  }

  $scope.createMovie = function(req, res) {
    if ($scope.checkCreate() == true) {
      console.log('sucess');
      $scope.data.ngayChieu = formatDateToTimeStamp($('#chossedate').val());
      // $scope.data.ngayChieu = $('#chossedate').val();
      //console.log($scope.data);
      $http.post('api/v1/movie', $scope.data).then(function (res, req) {
        alert("Tạo Thành Công");
        window.location.href = '/';
        $scope.retartInput();
        console.log(res.data.movie);
      }).catch(function (err) {
        console.log(err);
      })
    }
  }

  $scope.checkName = function () {
    if (!$scope.data.tenPhim) {
      // alert('Thiếu tên phim');
      $scope.errName = tårue;
      return false;
    }
    else {
      $scope.errName = false;
      return true;
    }
  }

  $scope.checkKind = function () {
    if (!$scope.data.theLoai) {
      // alert('Thiếu thể loại')
      $scope.errKind = true;
      return false;
    }
    else {
      $scope.errKind = false;
      return true;
    }
  }
  $scope.checkDes = function () {
    if (!$scope.data.moTa) {
      // alert('Thiếu mô tả')
      $scope.errDescription = true;
      return false;
    }
    else {
      $scope.errDescription = false;
      return true;
    }
  }

  $scope.checkDate = function () {
    if (!$scope.data.ngayChieu) {
      // alert('Thiếu mô tả')
      $scope.errDate = true;
      return false;
    }
    else {
      $scope.errDate = false;
      return true;
    }
  }

  $scope.checkCreate = function () {
    //console.log($scope.data.tenPhim);
    // console.log($scope.myForm.data.tenPhim.$valid);
    $scope.checkName();
    $scope.checkDes();
    $scope.checkKind();
    // $scope.checkDate();
    if ($scope.checkName() == true && $scope.checkDes() == true && $scope.checkKind() == true) {
      return true;
    }
    else {
      return false;
    }
  }
})
