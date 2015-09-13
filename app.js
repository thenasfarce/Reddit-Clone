var app = angular.module("pagodaApp", ['ui.router']);

app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $stateProvider.state('home', {
            url:'/home',
            templateUrl:'/home.html',
            controller:'MainController'
        });
        
        $stateProvider.state('posts', {
            url: '/posts/{id}',
            templateUrl: '/posts.html',
            controller: 'PostsCtrl'
        });
        
        $urlRouterProvider.otherwise('home');
    }]);

app.factory('posts', [function(){
	var o = {
		posts: []
	};
	return o;
}]);

app.controller("MainController", [
	'$scope', 
    'posts', 
    function($scope, posts){
        var date = new Date();
		$scope.posts = posts.posts;
        $scope.month = date.getMonth()+1;
		$scope.year = date.getFullYear();
        
		$scope.addPost = function(){
			if(!$scope.title || $scope.title ==='') return;
			$scope.posts.push({
                title: $scope.title,
                link: $scope.link,
                month: $scope.month, 
                year: $scope.year, 
                upvotes: 0,
                comments: [
                    {author: 'Joe', body: 'Cool post!', upvotes: 0},
                    {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
                ]
            })
			$scope.title = '';
            $scope.link ='';
		}

		$scope.incrementUpvotes = function(post) {
			post.upvotes += 1;
		}

		$scope.decrementUpvotes = function(post) {
			if(post.upvotes<=0)return;
			post.upvotes -= 1;
		}
	}]);

app.controller("PostsCtrl", [
    '$scope', 
    '$stateParams', 
    'posts', 
    function($scope, $stateParams, posts){
        $scope.post = posts.posts[$stateParams.id]
        
        $scope.addComment = function(){
            if($scope.body === '') return;
            $scope.post.comments.push({
                body: $scope.body,
                author: 'user',
                upvotes: 0
            })
            $scope.body = '';
        };
        
        $scope.incrementUpvotes = function(post) {
			post.upvotes += 1;
		}

		$scope.decrementUpvotes = function(post) {
			if(post.upvotes<=0)return;
			post.upvotes -= 1; };
    }])