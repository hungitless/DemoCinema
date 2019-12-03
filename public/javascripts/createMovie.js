let app = angular.module('myApp', []);

app.controller('myController', function($scope, $http){

  $scope.theLoai = ['Hành Động','Tình Cảm', 'Viễn Tưởng', 'Chiến Tranh', 'Kinh Dị'];
  $scope.theloai = 'Chọn Thể Loại';
  $scope.data = {
    tenPhim: '',
    theLoai: '',
    moTa: ''
  }
  function formatDateToTimeStamp (date) {
      if (isNaN(date)) {
        var dateParts = date.split('/')
        var dateObject = new Date(
          +dateParts[2],
          dateParts[1] - 1,
          +dateParts[0]
        )
        return dateObject.getTime()
      } else {
        return date
      }
    }
  $scope.createMovie = () =>{
    if($scope.checkCreate() == true){
      alert('hung');
      $scope.data.ngayChieu = formatDateToTimeStamp($('#chossedate').val());
      //console.log($scope.data);
      $http.post('api/v1/movie', $scope.data).then(function(res){
        console.log(res.data.movie);
      }).catch(function(err){
        console.log(err);
      })
    }
    else
    {
      alert('Thiếu dữ liệu !!!');
    }
  }
  $scope.checkCreate = function(){
    //console.log($scope.data.tenPhim);
    if(!$scope.data.tenPhim)
    {
      // alert('Thiếu tên phim');
      return false;
      
    }
    if(!$scope.data.moTa){
      // alert('Thiếu mô tả')
      return false;
    }
    else{
      return true;
    }
  }
})
      