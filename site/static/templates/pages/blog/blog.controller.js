(function(){
    angular
        .module('MB')
        .controller('BlogCtrl', BlogCtrl)
        .directive('blogPost', PostDir)
        .directive('fbComments', FBComments);

    BlogCtrl.$inject = ['BlogService', '$stateParams'];

    function BlogCtrl(BlogService, $stateParams){
        var vm = this;
        vm.currentPost = BlogService.getPostData($stateParams.titlePath);
        vm.posts = BlogService.getPostMetaData();
    }

    function PostDir() {
      return {
        restrict: 'E',
        transclude: true,
        scope: {
          name: "=",
          author: "=",
          date: "=",
          tags: '=',
          category: '=',
          datePath: '=',
          titlePath: '='
        },
        templateUrl: 'templates/pages/blog/post.html'
      };
    }

    function FBComments() {
      function createHTML(href) {
        return '<div class="fb-comments" ' +
          'data-href="' + href + '" ' +
          'data-width="100%" data-numposts="5">' +
          '</div>';
      }
      return {
        restrict: 'E',
        scope: {},
        link: function(scope, elem, attrs) {
          attrs.$observe('pageHref', function (newValue) {
            if (newValue) {
              var href = newValue;
              elem.html(createHTML(href));
              FB.XFBML.parse(elem[0]);
            } else {
              element.html("<div></div>");
            }
          })
        }
      }
    }

}());
