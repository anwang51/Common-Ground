(function() {
  angular.module('MB')
    .config(function($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/');

      $stateProvider
        .state('about', {
          url: '/',
          templateUrl: 'templates/pages/home/index.html',
          controller: 'HomeCtrl',
          controllerAs: 'vm'
        })
        .state('showcase', {
          url: '/showcase',
          templateUrl: 'templates/pages/showcase/index.html',
          controller: 'ShowcaseCtrl',
          controllerAs: 'vm'
        })
        .state('alumni', {
          url: '/alumni',
          templateUrl: 'templates/pages/alumni/index.html',
          controller: 'AlumniCtrl',
          controllerAs: 'vm'
        })
        .state('projects', {
          url: '/projects',
          templateUrl: 'templates/pages/projects/index.html'
        })
        .state('companies', {
          url: '/companies',
          templateUrl: 'templates/pages/companies/index.html',
          controller: 'CompaniesCtrl',
          controllerAs: 'vm'
        })
        .state('contact', {
          url: '/contact',
          templateUrl: 'templates/pages/contact/index.html',
          controller: 'ContactCtrl',
          controllerAs: 'vm'
        })
        .state('apply', {
          url: '/apply',
          templateUrl: 'templates/pages/apply/index.html',
          controller: 'ApplyCtrl',
          controllerAs: 'vm'
        })
        .state('blog', {
          url: '/blog',
          templateUrl: 'templates/pages/blog/index.html',
          controller: 'BlogCtrl',
          controllerAs: 'vm'
        })
        .state('post', {
          url: '/{datePath}/{titlePath}',
          controller: 'BlogCtrl',
          controllerAs: 'vm',
          templateUrl: function (params) {
            return 'templates/pages/blog/posts/' + params.datePath + "/" + params.titlePath + '.html';
          }
        });

      // $locationProvider.html5Mode({enabled: true, requireBase: false, rewriteLinks: false});
    });
})();
