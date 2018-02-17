(function() {
  angular
  .module('MB')
  .controller('ApplyCtrl', ApplyCtrl);

  ApplyCtrl.$inject = ['FormService', '$http', '$log', 'Dropbox', 'DropboxService', 'ApplicationSheetURL'];

  function ApplyCtrl(FormService, $http, $log, Dropbox, DropboxService, ApplicationSheetURL){
    var vm = this;
    var temp_deadline = new Date(Date.UTC(2018, 0, 26, -1, -1, -1));
    temp_deadline.setTime( temp_deadline.getTime() + temp_deadline.getTimezoneOffset()*60*1000 );
    const APP_DEADLINE = temp_deadline;
    const WORD_LIMIT = 200;
    vm.years = ["Freshman", "Sophomore", "Junior", "Senior", "Graduate"];
    vm.positions = ["Project Developer"];

    vm.submitted = false;
    vm.page = 1;
    vm.wordCount1 = 0;
    vm.wordCount2 = 0;
    vm.wordCount3 = 0;

    vm.basic = { firstName: null, lastName: null, year: null, major: null, email: null, phone: null, position: null, resume: null };
    vm.responses = { project: null, interest: null, };
    vm.additional = { optional: null, github: null };

    vm.submitForm = () => {
      var fullForm = $.extend({}, Object.assign(vm.basic, vm.responses, vm.additional));
      var resume = document.getElementById('resume').files[0];
      $log.debug(fullForm);
      var errMsg = "Error: You must complete all previous fields to continue.";
      var sent = FormService.submitApplication(fullForm, ApplicationSheetURL, errMsg, resume);
      if (sent) {
        vm.submitted = true;
        return true;
      }
      $log.warn('Application not sent!');
      return false;
    };

    vm.changePage = (page) => {
      if (page <= 3 && page >= 0) {
        vm.page = page;
        return true;
      }
      return false;
    };

    vm.next = (object) => { vm.changePage(vm.page + 1, object); };
    vm.prev = () => { if (vm.page >= 0) vm.page -= 1; };

    vm.updateTextArea1 = ($event) => { FormService.updateTextArea($event, vm, 'responses', 'project', 'wordCount1', WORD_LIMIT); };
    vm.updateTextArea2 = ($event) => { FormService.updateTextArea($event, vm, 'responses', 'interest', 'wordCount2', WORD_LIMIT); };
    vm.updateTextArea3 = ($event) => { FormService.updateTextArea($event, vm, 'additional', 'optional', 'wordCount3', WORD_LIMIT); };

    vm.pastDeadline = () => { console.log(APP_DEADLINE); console.log(Date.now() > APP_DEADLINE); return Date.now() > APP_DEADLINE };
  }
})();
