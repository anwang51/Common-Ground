(function($) {
  angular.module('MB', ['ui.router', 'ui.materialize', 'ngAnimate', 'angularMoment'])
  .run(['$rootScope', function($rootScope) {
    $rootScope.$on('$stateChangeSuccess', function() {
       if (document.body.scrollTop != 0 || document.documentElement.scrollTop != 0)
        setTimeout(() => {$('html, body').animate({scrollTop:0}, 300)}, 0);
    });
  }])
  .constant('Dropbox', new Dropbox({ accessToken: 'jxFO4XmR3oAAAAAAAAAADo6UZ3wEVJac19ppbs7teOK0kOuzfHIa1xvBID-FxSkG' }))
  .constant('ContactSheetURL', 'https://script.google.com/macros/s/AKfycbwgfI7poKThVxhWtYTDCqAKJw5oqo_6sJMR46EGaoGiKZ92VRG-/exec')
  .constant('ApplicationSheetURL', 'https://script.google.com/macros/s/AKfycbyWPGobTkBaiFxAqRsO4RgbVTqarcCPUm0fE4yZUGsv4ZsJR3k/exec')
  .constant('CompanySheetURL', 'https://script.google.com/macros/s/AKfycbz94-rrAQFMYWIi98g96MZVF7pk6K0AIjJM7PzjH0NzJI7ZiA3g/exec')
  .constant('NotificationSheetURL', 'https://script.google.com/macros/s/AKfycbw-Q19a8MpvSRHSUr-litBtbZ74CQkgakAN-C-J1tvIs4k-OVva/exec')
  .constant('ShowcaseSheetURL', 'https://script.google.com/macros/s/AKfycbza4R4QbJabhrTOYYKUfWrTxmq_AEU8MSv03AtbUYzJ0jCYIx0/exec');
})(jQuery);
