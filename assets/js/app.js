'use strict'

// shortcut
var $ = function(selector) {
  if (typeof selector === 'string') {
    return angular.element(document.querySelectorAll(selector))
  } else if (selector.nodeType === 1) {
    return angular.element(selector)
  } else {
    return null
  }
}

var app = angular.module('ANNO', [
  'ngRoute',
  'ANNO.controllers',
  'ANNO.directives',
  'ANNO.ui-directives',
  'ui.bootstrap'
]).config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: '/partials/login.html',
    controller: 'LoginCtrl'
  }).when('/', {
    templateUrl: '/partials/books.html',
    controller: 'BooksCtrl'
  }).when('/:uid/book/:bid', {
    templateUrl: '/partials/book.html',
    controller: 'BookCtrl'
  }).when('/:uid/book/:bid/new', {
    templateUrl: '/partials/edit.html',
    controller: 'EditorCtrl'
  }).when('/:uid/info', {
    templateUrl: '/partials/info.html',
    controller: 'InfoCtrl'
  }).when('/note/:nid', {
    templateUrl: '/partials/note.html',
    controller: 'NoteCtrl'
  }).when('/note/:nid/edit', {
    templateUrl: '/partials/edit.html',
    controller: 'EditorCtrl'
  }).when('/friends', {
    templateUrl: '/partials/friends.html',
    controller: 'FriendsCtrl'
  }).when('/fav', {
    templateUrl: '/partials/fav.html',
    controller: 'FavCtrl'
  }).when('/about', {
    templateUrl: '/partials/about.html'
  }).when('/:uid/', {
    templateUrl: '/partials/books.html',
    controller: 'BooksCtrl'
  }).otherwise({
    templateUrl: '/partials/error.html'
  })
}])
.config(['$httpProvider', function($httpProvider) {
  $httpProvider.interceptors.push('HttpLoadingIntercepter')
  $httpProvider.interceptors.push('HttpOAuthIntercepter')
}])
.config(['$compileProvider', function($compileProvider) {
  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|blob):|data:image\//)
}])
.run(function($route, $rootScope, $location, UserService) {
  $rootScope.$on( "$routeChangeStart", function(event, next, current) {
    if (next.templateUrl == "/partials/about.html" || next.templateUrl == "/partials/login.html") {
      return
    }
    UserService.isLoggedIn().catch(function() {
      $location.path('/login')
    })
  })
})
