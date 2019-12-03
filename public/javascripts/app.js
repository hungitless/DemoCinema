let app = angular.module('myApp', []);

app.controller('myController', function($scope, $http){
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
        $scope.data.ngayChieu = formatDateToTimeStamp($('#chossedate').val());
        console.log($scope.data);
        $http.post('api/v1/movie', $scope.data).then(function(res){
            console.log(res.data.movie)
            // window.alert("OK")
			}).catch(function(err){
				console.log(err);
			})
    }
})
      