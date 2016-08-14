angular.module('starter.controllers', ['ngCordova','ionic'])

.controller('LoginCtrl', function($scope, ionicMaterialInk, $window, LoginService, $ionicPopup, $ionicLoading, $state) {
    ionicMaterialInk.displayEffect();
    $scope.data = {};
 
    $scope.login = function() {
		$ionicLoading.show({
			content: 'Login...',
			animation: 'fade-in',
			showBackdrop: true,
		});
		if($scope.data.username==""){
			$ionicLoading.hide();
			var alertPopup = $ionicPopup.alert({
				title: 'Login failed!',
				template: 'Please fill your username'
			});

		}
		else if($scope.data.username!=""){
			LoginService.loginUser($scope.data.username,$scope.data.password).success(function(data) {
				//var loginResult = data;
				console.log(data);
				$ionicLoading.hide();
				localStorage.setItem("username",data.username);
				localStorage.setItem("userid",data.userId);
				localStorage.setItem("token",data.id);
				$state.go('app.home');

			}).error(function(data) {
				$ionicLoading.hide();
				var alertPopup = $ionicPopup.alert({
					title: 'Login Failed!',
					template: 'Your username is not in our database'
				});
			});
		}
		else{
			$ionicLoading.hide();
			var alertPopup = $ionicPopup.alert({
				title: 'Login Failed!',
				template: 'Please fill your username'
			});
		}
	}
})

.controller('MainCtrl', function($scope, $ionicPopup,$ionicTabsDelegate,$ionicLoading,$ionicPopover, $state,ProfileService) {
	if(localStorage.getItem("username")==null || localStorage.getItem("username")==""){
		$state.go('login');
	}
	$scope.menuProfile = {};
	$scope.currentLocation = {};

	//do before main view loaded
	$scope.$on('$ionicView.beforeEnter', function(){
		//get user profile data
	
		ProfileService.getProfile(localStorage.getItem("userid"),localStorage.getItem("token")).success(function(data) {
			$scope.menuProfile = data;
			console.log(data);
			$scope.menuProfile.password="";
			$ionicLoading.hide();
		}).error(function(data) {
			$ionicLoading.hide();
			var alertPopup = $ionicPopup.alert({
				title: 'Request Failed!',
				template: 'Error get user profile data'
			});
		});
		$scope.role="customer";
		//get user current location
		if(navigator.geolocation) {
			browserSupportFlag = true;
			navigator.geolocation.getCurrentPosition(function(position) {
				$scope.currentLocation = {"coordinates": [position.coords.longitude,position.coords.latitude],"type": "Point"};
			}, function() {
				$scope.currentLocation = {"coordinates": [112.531359+(Math.random()/100),-7.88016],"type": "Point"};
			});
		}
		else {
			$scope.currentLocation = {"coordinates": [112.531359+(Math.random()/100),-7.88016],"type": "Point"};
		};
	});
	$scope.back = function(){
		$state.go('app.home');
	}
	$scope.logout = function(){
		localStorage.removeItem("username");
		$state.go('login');
	};
})
.controller('HomeCtrl', function($scope, $state, $stateParams, $ionicPopup, $ionicPlatform,$ionicLoading, PostService) {  
	$ionicLoading.show({
		content: 'Loading',
		animation: 'fade-in',
		showBackdrop: true,
	});
	$scope.doRefresh = function() {
		$scope.$broadcast('scroll.refreshComplete');
		setTimeout(function (){
			$state.go($state.current, {}, {reload: true});
		}, 500);
	};
	$ionicLoading.hide();

	$scope.dataPost={};
	$scope.$on('$ionicView.enter', function(){
		PostService.getAll(localStorage.getItem("token")).success(function(data) {
			console.log(data);
			$scope.dataPost=data;
		})
		.error(function(data) {
			$ionicLoading.hide();
			var alertPopup = $ionicPopup.alert({
				title: 'Get Data Failed!',
				template: 'Gagal ambil data post'
			});
		});
	});


})

.controller('PostDetailCtrl', function($scope, $state, $ionicPopup, $ionicPlatform,$ionicLoading) {  
	//implement logic here
})
.controller('Create_postCtrl', function($scope, $state, $ionicPopup, $ionicPlatform,$ionicLoading) {  
	//implement logic here
})
.controller('Forgot_passwordCtrl', function($scope, $state, $ionicPopup, $ionicPlatform,$ionicLoading) {  
	//implement logic here
})

.controller('RegisterCtrl', function($scope, $state, RegisterService, $ionicPopup, $ionicPlatform,$ionicLoading) {  
	//implement logic here
	$scope.data={};
	$scope.register = function(){
		RegisterService.tambahUser($scope.data).success(function(data) {
			$ionicLoading.hide();
			var alertPopup = $ionicPopup.alert({
				title: 'Succes!',
				template: 'Berhasil register'
			});

			$state.go('login');
		}).error(function(data) {
			$ionicLoading.hide();
			var alertPopup = $ionicPopup.alert({
				title: 'Post Data Failed!',
				template: 'Gagal register'
			});
		});
	}
})

.controller('Create_postCtrl', function($scope, $state, PostService, $ionicPopup, $ionicPlatform,$ionicLoading, LoginService) {  
	//implement logic here
	$scope.data={};
	//$scope.data.employee = localStorage.getItem("username");
$scope.profile = {};
	$ionicLoading.show({
		content: 'Loading',
		animation: 'fade-in',
		showBackdrop: true,
	
	});
	
	LoginService.getUser(localStorage.getItem("userid"),localStorage.getItem("token")).success(function(data) {
		$scope.profile = data;
		console.log(data);
		$scope.profile.password="";
		localStorage.setItem("profile_data", JSON.stringify(data));
		$ionicLoading.hide();
	}).error(function(data) {
		$ionicLoading.hide();
		var alertPopup = $ionicPopup.alert({
			title: 'Error!',
			template: 'Tidak dapat mengambil profil!'
		});
	});

	$scope.tambahPost = function(){
		console.log($scope.data)

		PostService.tambahPost($scope.data).success(function(data) {
			
			$ionicLoading.hide();
			var alertPopup = $ionicPopup.alert({
				title: 'Succes!',
				template: 'Berhasil buat post'
			});
			//$state.go($state.current, {}, {reload: true});
			$state.go('app.home');
		}).error(function(data) {
			$ionicLoading.hide();
			console.log(data)
			var alertPopup = $ionicPopup.alert({
				title: 'Post Data Failed!',
				template: 'Gagal buat post'
			});
		});
	}
})

.controller('ProfileCtrl', function($scope, $state, $ionicPopup, $ionicPlatform, $ionicLoading, LoginService) {  
	//implement logic here
	$scope.profile = {};
	$ionicLoading.show({
		content: 'Loading',
		animation: 'fade-in',
		showBackdrop: true,
	
	});
	
	LoginService.getUser(localStorage.getItem("userid"),localStorage.getItem("token")).success(function(data) {
		$scope.profile = data;
		console.log(data);
		$scope.profile.password="";
		localStorage.setItem("profile_data", JSON.stringify(data));
		$ionicLoading.hide();
	}).error(function(data) {
		$ionicLoading.hide();
		var alertPopup = $ionicPopup.alert({
			title: 'Error!',
			template: 'Tidak dapat mengambil profil!'
		});
	});
})