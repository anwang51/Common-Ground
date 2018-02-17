(function() {
  angular
  .module('MB')
  .controller('AlumniCtrl', AlumniCtrl)
  .directive('alumniList', AlumniList);

  AlumniCtrl.$inject = ['TeamService'];

  function AlumniCtrl(TeamService) {
    var vm = this;
    vm.alumni = TeamService.getAlumni();

    var half = Math.ceil(vm.alumni.length/2);
    vm.alumni_col_1 = vm.alumni.slice(0, half);
    vm.alumni_col_2 = vm.alumni.slice(half, vm.alumni.length);

    vm.connections = [
      {
        name: "Google",
        url: "https://www.google.com",
        image: "img/connections/google.png"
      },
      {
        name: "Moxtra",
        url: "https://www.moxtra.com",
        image: "img/connections/moxtra.png"
      },
      {
        name: "Amazon",
        url: "https://www.amazon.com",
        image: "img/connections/amazon.png"
      },
      {
        name: "Cisco",
        url: "https://www.cisco.com",
        image: "img/connections/cisco.png"
      },
      {
        name: "DE Shaw & Co",
        url: "https://www.deshaw.com",
        image: "img/connections/de_shaw.png"
      },
      {
        name: "Microsoft",
        url: "https://www.microsoft.com",
        image: "img/connections/microsoft.png"
      },
      {
        name: "Texas Instruments",
        url: "https://www.ti.com",
        image: "img/connections/texas_instruments.png"
      },
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com",
        image: "img/connections/linkedin.png"
      },
      {
        name: "NASA",
        url: "https://www.nasa.gov",
        image: "img/connections/nasa.png"
      },
      {
        name: "Brilliant",
        url: "https://www.brilliant.org",
        image: "img/connections/brilliant.png"
      }
    ]

    vm.research = [
      {
        name: "Berkeley Deep Drive",
        url: "https://deepdrive.berkeley.edu/",
        image: "img/research/berkeley_deep_drive.png"
      }
    ]
  }

  function AlumniList() {
    return {
      restrict: 'E',
      // transclude: true,
      scope: {
        list: "="
      },
      templateUrl: 'templates/pages/alumni/alumni-list.html'
    };
  }

})();
