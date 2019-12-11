let app = angular.module('myApp', []);

app.controller('editMovieController', function ($scope, $http) {

  $scope.idMovie = $('#id').text().trim();

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

  $http.get('/api/v1/movie/detail/'+ $scope.idMovie).then(function(res){
    $scope.detail = res.data.listMovie;
    console.log($scope.detail);
  }).catch(function(err){
      console.log(err);
  })
  $scope.updateMovie = function(req, res) {
      // $scope.checkCreate();
      if ($scope.checkCreate() == true) {
        let formData = new FormData()
        $scope.data = {};
        $scope.data.id = $scope.idMovie;
        $scope.data.theLoai = $('#type').val();
        $scope.data.ngayChieu = formatDateToTimeStamp($('#chossedate').val());
        $scope.data.tenPhim = $('#usr').val();
        $scope.data.moTa = $('#comment').val();
        $scope.data.byUser = $scope.getCookie('user');
        console.log($scope.data.byUser);
        var myFile = $('#img-film').prop('files')[0];
        if(myFile){
          formData.append('image', myFile);
          formData.append('name', new Date().getTime());
          setTimeout(() => {
            $.ajax({
              url: "https://api.imgbb.com/1/upload?key=869aee1c7e7e9fb302537b76dc2f4bc2",
              data: formData,
              processData: false,
              contentType: false,
              type: 'POST',
              success: function (res) {
                $scope.data.cover = res.data.display_url
                $http.post('/api/v1/movie/update', $scope.data).then(function (res) {
                  // alert('2');
                  window.location = "/"
                }).catch(function (error) {
                  var x = document.getElementById("snackbar");
                  x.className = "show";
                  setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
                  $scope.error = error.data.errorMessage
                })
                }
              })
          }, 500);
        } 
        else{
          $scope.data.img = $scope.detail.img;
          //console.log($scope.data.img);
          $http.post('/api/v1/movie/update', $scope.data).then(function (res) {
            window.location = "/"
          })
        }
      }
    }

  $scope.checkName = function () {
    if (!$scope.detail.name) {
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
    if (!$scope.detail.kind) {
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
    if (!$scope.detail.description) {
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
    if (!$scope.detail.date) {
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
    // $scope.checkImg();
    $scope.checkName();
    $scope.checkDes();
    $scope.checkKind();
    // $scope.checkImg();
    if ($scope.checkName() == true && $scope.checkDes() == true && $scope.checkKind() == true) {
      return true;
    }
    else {
      return false;
    }
  }
})
  