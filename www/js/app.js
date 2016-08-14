angular.module('starter', ['ionic', 'ionic-material', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      StatusBar.styleLightContent();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider,$compileProvider) {
  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
  // Enable Native Scrolling on Android
  $ionicConfigProvider.platform.android.scrolling.jsScrolling(false);
  $stateProvider
  
  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })

  .state('register', {
    url: '/register',
    templateUrl: 'templates/register.html',
    controller: 'RegisterCtrl'
  })
  
  // setup an abstract state for the side menu directive
  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/tabs.html',
    controller: 'MainCtrl'
  })

  // Each tab has its own nav history stack:

  .state('app.dash', {
    cache:false,
    url: '/dash',
    views: {
      'menuContent': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'MapCtrl'
      }
    }
  })
  .state('app.home', {
    url: '/home',
    views: {
      'home': {
        templateUrl: 'templates/home.html',
        controller: 'HomeCtrl'
      }
    }
  })
  .state('app.post', {
    url: '/home/:dataId',
    views: {
      'home': {
        templateUrl: 'templates/post.html',
        controller: 'PostDetailCtrl'
      }
    }
  })
  .state('app.post-view', {
    url: '/post-view',
    views: {
      'home': {
        templateUrl: 'templates/post-view.html',
        controller: 'PostDetailCtrl'
      }
    }
  })
  .state('app.profile', {
    url: '/profile',
    views: {
      'home': {
        templateUrl: 'templates/profile.html',
        controller: 'ProfileCtrl'
      }
    }
  })
  .state('app.create_post', {
    url: '/create_post',
    views: {
      'home': {
        templateUrl: 'templates/create_post.html',
        controller: 'Create_postCtrl'
      }
    }
  })
  .state('app.forgot_password', {
    url: '/forgot_password',
    views: {
      'home': {
        templateUrl: 'templates/forgot_password.html',
        controller: 'Forgot_passwordCtrl'
      }
    }
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');

});
