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
  $scope.errImg = false;

  $scope.theLoai = ['Hành Động', 'Tình Cảm', 'Viễn Tưởng', 'Chiến Tranh', 'Kinh Dị'];
  // $scope.theloai = 'Chọn Thể Loại';
  $scope.data = {
    tenPhim: '',
    theLoai: '',
    moTa: '',
    img: ''
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
        //console.log('sucess');
        //$scope.data.ngayChieu = formatDateToTimeStamp($('#chossedate').val());
  
        let formData = new FormData()
        $scope.data;
        var myFile = $('#img-film').prop('files')[0];
        $scope.data.theLoai = $('#type').val();
        $scope.data.ngayChieu = formatDateToTimeStamp($('#chossedate').val());
        $scope.data.tenPhim = $('#usr').val();
        $scope.data.moTa = $('#comment').val();
        $scope.data.byUser = $scope.getCookie('user');
        console.log(myFile);
        formData.append('image', myFile);
        formData.append('name', new Date().getTime())
        // formData.append('tenPhim', tenPhim);
        // formData.append('theLoai', theLoai);
        // formData.append('ngayChieu', ngayChieu);
        // formData.append('moTa', moTa);
        // formData.append('byUser', byUser);
        console.log(formData);
        // $.ajax({
        // url: 'api/v1/movie',
        // data: formData,
        // type: 'POST',
        // contentType: false, 
        //   processData: false, 
        //   success: function (res) {
        //     console.log(res.status)
        //     if(res.status === 200){
        //       //alert('1');
        //       window.location.href = "/";
        //     }
        //   }
        //   });
        setTimeout(() => {
          $.ajax({
            url: "https://api.imgbb.com/1/upload?key=869aee1c7e7e9fb302537b76dc2f4bc2",
            data: formData,
            processData: false,
            contentType: false,
            type: 'POST',
            success: function (res) {
              $scope.data.cover = res.data.display_url
              $http.post('/api/v1/movie', $scope.data).then(function (res) {
                  window.location = "/"
              }).catch(function (error) {
                  // var x = document.getElementById("snackbar");
                  // x.className = "show";
                  // setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
                  // $scope.error = error.data.errorMessage
              })
              }
            })
        }, 500);
        
      }
    }

  $scope.checkName = function () {
    if (!$scope.data.tenPhim) {
      // alert('Thiếu tên phim');
      $scope.errName = true;
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

  $scope.checkImg = function () {
    var myFile = $('#img-film').prop('files')[0];
    if (!myFile) {
      $scope.errImg = true;
      return false;
    }
    else {
      $scope.errImg = false;
      return true;
    }
  }

  $scope.checkCreate = function () {
    $scope.checkImg();
    $scope.checkName();
    $scope.checkDes();
    $scope.checkKind();
    $scope.checkImg();
    if ($scope.checkName() == true && $scope.checkDes() == true && $scope.checkKind() == true && $scope.checkImg() == true) {
      return true;
    }
    else {
      return false;
    }
  }
})
  