'use strict';

(function ($) {
  angular.module('MB', ['ui.router', 'ui.materialize', 'ngAnimate', 'angularMoment']).run(['$rootScope', function ($rootScope) {
    $rootScope.$on('$stateChangeSuccess', function () {
      if (document.body.scrollTop != 0 || document.documentElement.scrollTop != 0) setTimeout(function () {
        $('html, body').animate({ scrollTop: 0 }, 300);
      }, 0);
    });
  }]).constant('Dropbox', new Dropbox({ accessToken: 'jxFO4XmR3oAAAAAAAAAADo6UZ3wEVJac19ppbs7teOK0kOuzfHIa1xvBID-FxSkG' })).constant('ContactSheetURL', 'https://script.google.com/macros/s/AKfycbwgfI7poKThVxhWtYTDCqAKJw5oqo_6sJMR46EGaoGiKZ92VRG-/exec').constant('ApplicationSheetURL', 'https://script.google.com/macros/s/AKfycbyWPGobTkBaiFxAqRsO4RgbVTqarcCPUm0fE4yZUGsv4ZsJR3k/exec').constant('CompanySheetURL', 'https://script.google.com/macros/s/AKfycbz94-rrAQFMYWIi98g96MZVF7pk6K0AIjJM7PzjH0NzJI7ZiA3g/exec').constant('NotificationSheetURL', 'https://script.google.com/macros/s/AKfycbw-Q19a8MpvSRHSUr-litBtbZ74CQkgakAN-C-J1tvIs4k-OVva/exec').constant('ShowcaseSheetURL', 'https://script.google.com/macros/s/AKfycbza4R4QbJabhrTOYYKUfWrTxmq_AEU8MSv03AtbUYzJ0jCYIx0/exec');
})(jQuery);
'use strict';

(function () {
  angular.module('MB').config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider.state('about', {
      url: '/',
      templateUrl: 'templates/pages/home/index.html',
      controller: 'HomeCtrl',
      controllerAs: 'vm'
    }).state('showcase', {
      url: '/showcase',
      templateUrl: 'templates/pages/showcase/index.html',
      controller: 'ShowcaseCtrl',
      controllerAs: 'vm'
    }).state('alumni', {
      url: '/alumni',
      templateUrl: 'templates/pages/alumni/index.html',
      controller: 'AlumniCtrl',
      controllerAs: 'vm'
    }).state('projects', {
      url: '/projects',
      templateUrl: 'templates/pages/projects/index.html'
    }).state('companies', {
      url: '/companies',
      templateUrl: 'templates/pages/companies/index.html',
      controller: 'CompaniesCtrl',
      controllerAs: 'vm'
    }).state('contact', {
      url: '/contact',
      templateUrl: 'templates/pages/contact/index.html',
      controller: 'ContactCtrl',
      controllerAs: 'vm'
    }).state('apply', {
      url: '/apply',
      templateUrl: 'templates/pages/apply/index.html',
      controller: 'ApplyCtrl',
      controllerAs: 'vm'
    }).state('blog', {
      url: '/blog',
      templateUrl: 'templates/pages/blog/index.html',
      controller: 'BlogCtrl',
      controllerAs: 'vm'
    }).state('post', {
      url: '/{datePath}/{titlePath}',
      controller: 'BlogCtrl',
      controllerAs: 'vm',
      templateUrl: function templateUrl(params) {
        return 'templates/pages/blog/posts/' + params.datePath + "/" + params.titlePath + '.html';
      }
    });

    // $locationProvider.html5Mode({enabled: true, requireBase: false, rewriteLinks: false});
  });
})();
'use strict';

(function () {
  angular.module('MB').factory('BlogService', BlogService);

  BlogService.$inject = ['DateService'];

  function BlogService(DateService) {
    var factory = {
      getPostMetaData: getPostMetaData,
      getPostData: getPostData
    };

    var postMetaData = [{
      datePath: "2-22-2017",
      titlePath: "nlp-with-stella",
      title: "Natural Language Processing with Stella",
      author: "Felix Su",
      date: DateService.blogDate(2, 22, 2017),
      timestamp: DateService.timestamp(2, 22, 2017),
      tags: ["Project Luna", "NLP", "Speech Recognition", "Hack Night"],
      category: "Hack Night 2",
      preview: "Last Saturday, our Luna developers dove into the Stella Demo to implement Natural Language Processing. If you checked our original source code, you would have seen an ugly jumble of if statements that hard coded mappings between commands and our API functions. To tackle this problem, we split into 2 teams to test which combinations of the NLP techniques we learned at Wednesday's Tech Tutorial could best allow Stella to understand and support commands that our engineers might not anticipate."
    }, {
      datePath: "2-26-2017",
      titlePath: "sherlock-facial-recognition",
      title: "Launchpad + Computer Vision: Face Detection in 20 Lines of Code",
      author: "Peter Lee",
      date: DateService.blogDate(2, 26, 2017),
      timestamp: DateService.timestamp(2, 26, 2017),
      tags: ["Project Sherlock", "Face Detection"],
      category: "Computer Vision Tutorial",
      preview: "In this tutorial, we'll showcase the power of OpenCV by writing a short python script that recognizes your face through a live webcam in real-time. This was a warmup exercise for our newest members of the Launchpad Team for Project Sherlock, a cloud API that provides optimized algorithms for human-centric computer vision."
    }, {
      datePath: "8-21-2017",
      titlePath: "music-autoencoders",
      title: "Autoencoders and Music Generation",
      author: "Arsh Zahed",
      date: DateService.blogDate(8, 21, 2017),
      timestamp: DateService.timestamp(8, 21, 2017),
      tags: ["DeepBeat", "Music", "Autoencoder", "Magenta"],
      category: "Preseason Demo",
      preview: "Google Brain recently added a new model to Magenta, their open-source project for generating music, audio and drawings. The key to Magenta is the use of Auto-Encoders, a special Neural Network architecture. In this tutorial, we will explore the fundamental concepts and implement some code to get a basic auto-encoder up an running."
    }, {
      datePath: "8-22-2017",
      titlePath: "stock-prediction",
      title: "Launchpad: Stock Prediction Attempt using LSTMs",
      author: "Caleb Siu",
      date: DateService.blogDate(8, 22, 2017),
      timestamp: DateService.timestamp(8, 22, 2017),
      tags: ["Preseason Demo", "LSTM", "Stock Prediction"],
      category: "Preseason Demo",
      preview: "One of the latest models to rise to prominence in the deep learning community has been the Long Short Term Memory network, more commonly known as LSTMs. The model is unique in that it is able to handle long-term dependencies. This is especially useful in solving problems that rely on contextual knowledge based on past inputs. More of what LSTMs are capable of can be read on Andrej Karpathy’s blog post, The Unreasonable Effectiveness of Recurrent Neural Networks."
    }, {
      datePath: "8-26-2017",
      titlePath: "music-image",
      title: "Music and Image Classification",
      author: "Nipun Ramakrishnan",
      date: DateService.blogDate(8, 26, 2017),
      timestamp: DateService.timestamp(8, 26, 2017),
      tags: ["Audio", "Image", "Music", "Classification"],
      category: "Preseason Demo",
      preview: "Music genre classification is a classic problem in which we try to identify the genre of a given piece of music. It’s a challenging task in the field of Music Information Retrieval with some pretty cool applications. For example, Pandora uses genre classifications to dynamically generate images that complement the music. But how does such a classification system work?"
    }];

    function parseText(text) {
      return text.replace(/^ +| +$/gm, "");
    }

    function cleanPostData(post) {
      post.preview = parseText(post.preview);
      return post;
    }

    function getPostMetaData() {
      var cleanData = postMetaData;
      for (var i = 0; i < cleanData.length; i++) {
        cleanData[i].preview = parseText(cleanData[i].preview);
      }
      return cleanData;
    }

    function getPostData(titlePath) {
      for (var i = 0; i < postMetaData.length; i++) {
        if (titlePath == postMetaData[i].titlePath) return cleanPostData(postMetaData[i]);
      }
      return null;
    }

    return factory;
  }
})();
'use strict';

(function () {
    angular.module('MB').factory('DateService', DateService);

    DateService.$inject = ['moment'];

    function DateService(moment) {
        var factory = {
            blogDate: blogDate,
            timestamp: timestamp
        };

        function blogDate(month, day, year) {
            return moment(new Date(year, month - 1, day)).format("MMM D, YYYY");
        }

        function timestamp(month, day, year) {
            return moment(new Date(year, month - 1, day)).format("x");
        }

        return factory;
    }
})();
'use strict';

(function () {
  angular.module('MB').factory('DropboxService', DropboxService);

  DropboxService.$inject = ['Dropbox', '$http', '$log'];

  function DropboxService(Dropbox, $http, $log) {
    var factory = {
      uploadFile: uploadFile
    };

    function uploadFile(filePath, fileContents) {
      Dropbox.filesUpload({ path: filePath, contents: fileContents, mode: { ".tag": "add" }, autorename: true }).then(function (response) {
        $log.debug('File Uploaded to Dropbox: ' + JSON.stringify(response));
        return true;
      }).catch(function (error) {
        $log.error(error);
        return false;
      });
      return true;
    }

    return factory;
  }
})();
'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

(function () {
  angular.module('MB').factory('TeamService', TeamService);

  TeamService.$inject = ['$http', '$log'];

  function TeamService(Dropbox, $http, $log) {
    var _ref, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _ref9, _ref10, _ref11, _ref12, _ref13, _ref14;

    var factory = {
      getAll: getAll,
      getOfficers: getOfficers,
      getDevelopers: getDevelopers,
      getAlumni: getAlumni,
      getPastMembers: getPastMembers
    };

    var team = {
      officers: [{
        "name": "Arsh Zahed",
        "position": "President",
        "website": "https://github.com/azahed98",
        "header": "",
        "subheader": "",
        "image": "/img/team/officers/arsh_zahed.jpg",
        "semester": 'Spring 2018'
      }, {
        'name': 'Elina Yon',
        'position': 'External Vice President',
        'website': '',
        'header': '',
        'subheader': '',
        'image': '/img/team/officers/elina_yon.jpg',
        'semester': 'Spring 2018'
      }, {
        'name': 'Moira Huang',
        'position': 'Internal Vice President',
        'website': '',
        'header': '',
        'subheader': '',
        'image': '/img/team/officers/moira_huang.jpg',
        'semester': 'Spring 2018'
      }, {
        'name': 'Laura Smith',
        'position': 'Vice President of Operations',
        'website': '',
        'header': '',
        'subheader': '',
        'image': '/img/team/officers/laura_smith.jpg',
        'semester': 'Spring 2018'
      }, {
        "name": "Felix Su",
        "position": "Project Leader",
        "website": "http://felixsu.com",
        "header": "Robotics",
        "subheader": "",
        "image": "/img/team/officers/felix_su.jpg",
        "semester": 'Spring 2018'
      }, {
        "name": "Hank O'Brien",
        "position": "Project Leader",
        "website": "https://github.com/hjobrien",
        "header": "",
        "subheader": "",
        "image": "/img/team/officers/hank_obrien.jpg",
        "semester": 'Spring 2018'
      }, {
        'name': 'Alex Wu',
        'position': 'Project Leader',
        'website': '',
        'header': '',
        'subheader': '',
        'image': '/img/team/officers/alex_wu.jpg',
        'semester': 'Spring 2018'
      }, {
        'name': 'An Wang',
        'position': 'Project Leader',
        'website': '',
        'header': '',
        'subheader': '',
        'image': '/img/team/officers/an_wang.jpg',
        'semester': 'Spring 2018'
      }, {
        'name': 'Jonathan Lin',
        'position': 'Project Leader',
        'website': '',
        'header': '',
        'subheader': '',
        'image': '/img/team/officers/jonathan_lin.jpg',
        'semester': 'Spring 2018'
      }],
      developers: [(_ref = { 'header': '',
        'image': '/img/team/members/developers/alex_shi.jpg',
        'name': 'Alex Shi',
        'position': 'Project Developer',
        'semester': 'Spring 2018'
      }, _defineProperty(_ref, 'header', 'Team TBA'), _defineProperty(_ref, 'website', ''), _ref), (_ref2 = { 'header': '',
        'image': '/img/team/members/developers/arjun_khare.jpg',
        'name': 'Arjun Khare',
        'position': 'Project Developer',
        'semester': 'Spring 2018'
      }, _defineProperty(_ref2, 'header', 'Team TBA'), _defineProperty(_ref2, 'website', ''), _ref2), (_ref3 = { 'header': '',
        'image': '/img/team/members/developers/daniel_zeng.jpg',
        'name': 'Daniel Zeng',
        'position': 'Project Developer',
        'semester': 'Spring 2018'
      }, _defineProperty(_ref3, 'header', 'Team TBA'), _defineProperty(_ref3, 'website', ''), _ref3), (_ref4 = { 'header': '',
        'image': '/img/team/members/developers/helen_yang.jpg',
        'name': 'Helen Yang',
        'position': 'Project Developer',
        'semester': 'Spring 2018'
      }, _defineProperty(_ref4, 'header', 'Team TBA'), _defineProperty(_ref4, 'website', ''), _ref4), (_ref5 = { 'header': '',
        'image': '/img/team/members/developers/nicholas_truong.jpg',
        'name': 'Nicholas Truong',
        'position': 'Project Developer',
        'semester': 'Spring 2018'
      }, _defineProperty(_ref5, 'header', 'Team TBA'), _defineProperty(_ref5, 'website', ''), _ref5), (_ref6 = { 'header': '',
        'image': '/img/team/members/developers/ryan_hsu.jpg',
        'name': 'Ryan Hsu',
        'position': 'Project Developer',
        'semester': 'Spring 2018'
      }, _defineProperty(_ref6, 'header', 'Team TBA'), _defineProperty(_ref6, 'website', ''), _ref6), (_ref7 = { 'header': '',
        'image': '/img/team/members/developers/sahil_sancheti.jpg',
        'name': 'Sahil Sancheti',
        'position': 'Project Developer',
        'semester': 'Spring 2018'
      }, _defineProperty(_ref7, 'header', 'Team TBA'), _defineProperty(_ref7, 'website', ''), _ref7), (_ref8 = { 'header': '',
        'image': '/img/team/members/developers/timothy_liu.jpg',
        'name': 'Timothy Liu',
        'position': 'Project Developer',
        'semester': 'Spring 2018'
      }, _defineProperty(_ref8, 'header', 'Team TBA'), _defineProperty(_ref8, 'website', ''), _ref8), (_ref9 = { 'header': '',
        'image': '/img/team/members/developers/william_fang.jpg',
        'name': 'William Fang',
        'position': 'Project Developer',
        'semester': 'Spring 2018'
      }, _defineProperty(_ref9, 'header', 'Team TBA'), _defineProperty(_ref9, 'website', ''), _ref9), (_ref10 = { 'header': '',
        'image': '/img/team/members/developers/yijin_hua.jpg',
        'name': 'Yijin Hua',
        'position': 'Project Developer',
        'semester': 'Spring 2018'
      }, _defineProperty(_ref10, 'header', 'Team TBA'), _defineProperty(_ref10, 'website', ''), _ref10)],
      alumni: [{
        "name": "Caleb Siu",
        "position": "Vice President",
        "website": "https://www.linkedin.com/in/calebsiu",
        "header": "",
        "subheader": "",
        "image": "/img/team/alumni/caleb_siu.jpg",
        "semester": 'Fall 2017 / Spring 2018'
      }, {
        "name": "Nipun Ramakrishnan",
        "position": "Project Leader - MuseCage",
        "website": "https://www.linkedin.com/in/nipun-ramakrishnan-001a40116",
        "header": "MuseCage",
        "subheader": "",
        "image": "/img/team/alumni/nipun_ramakrishnan.jpg",
        "semester": 'Fall 2017 / Spring 2018'
      }, (_ref11 = { 'header': '',
        'image': '/img/team/alumni/andy_zhang.jpg',
        'name': 'Andy Zhang',
        'position': 'Project Developer - MuseCage',
        'semester': 'Fall 2017'
      }, _defineProperty(_ref11, 'header', 'MuseCage'), _defineProperty(_ref11, 'website', ''), _ref11), (_ref12 = {
        'header': '',
        'image': '/img/team/alumni/jerry_wu.jpg',
        'name': 'Jerry Wu',
        'position': 'Project Developer - DeepBeat',
        'semester': 'Fall 2017'
      }, _defineProperty(_ref12, 'header', 'DeepBeat'), _defineProperty(_ref12, 'website', ''), _ref12), (_ref13 = {
        'header': '',
        'image': '/img/team/alumni/sean_meng.jpg',
        'name': 'Sean Meng',
        'position': 'Project Developer - MuseCage',
        'semester': 'Fall 2017'
      }, _defineProperty(_ref13, 'header', 'MuseCage'), _defineProperty(_ref13, 'website', ''), _ref13), (_ref14 = {
        'header': '',
        'image': '/img/team/alumni/victor_chan.jpg',
        'name': 'Victor Chan',
        'position': 'Project Developer - UAV Robotics',
        'semester': 'Fall 2017'
      }, _defineProperty(_ref14, 'header', 'UAV Robotics'), _defineProperty(_ref14, 'website', ''), _ref14), {
        "name": "Peter Lee",
        "position": "President / Project Leader",
        "website": "http://peterlee.tech",
        "header": "Microsoft SDE Intern",
        "subheader": "",
        "image": "/img/team/alumni/peter_lee.png",
        "semester": "Spring 2017"
      }, {
        "name": "Katie Li",
        "position": "External Vice President",
        "website": "http://linkedin.com/in/katienli",
        "header": "Project Manager at",
        "subheader": "",
        "image": "/img/team/alumni/katie_li.jpg",
        "semester": "Spring 2017"
      }, {
        "name": "Michelle Huang",
        "position": "Internal Vice President",
        "website": "http://linkedin.com/in/michellerhuang",
        "header": "Business Analyst at",
        "subheader": "",
        "image": "/img/team/alumni/michelle_huang.jpg",
        "semester": "Spring 2017"
      }, {
        "name": "Aditya Gandhi",
        "position": "Business Developer",
        "website": "https://www.linkedin.com/in/adigandhi1",
        "header": "",
        "subheader": "",
        "image": "/img/team/alumni/aditya_gandhi.jpg",
        "semester": "Spring 2017"
      }, {
        "name": "Jim Xu",
        "position": "Business Developer",
        "website": "https://www.linkedin.com/in/zijingxu",
        "header": "",
        "subheader": "",
        "image": "/img/team/alumni/jim_xu.jpg",
        "semester": "Spring 2017"
      }, {
        "name": "Annie Wang",
        "position": "Project Developer - Stella",
        "website": "https://www.linkedin.com/in/annieyueyiwang",
        "header": "",
        "subheader": "",
        "image": "/img/team/alumni/annie_wang.jpg",
        "semester": "Spring 2017"
      }, {
        "name": "Darren Lee",
        "position": "Project Developer - Sherlock",
        "website": "http://darrenklee.me/",
        "header": "",
        "subheader": "",
        "image": "/img/team/alumni/darren_lee.png",
        "semester": "Spring 2017"
      }, {
        "name": "Evan Limanto",
        "position": "Project Developer - Stella",
        "website": "http://evanlimanto.github.io/",
        "header": "",
        "subheader": "",
        "image": "/img/team/alumni/evan_limanto.jpg",
        "semester": "Spring 2017"
      }, {
        "name": "George Zhang",
        "position": "Project Developer - Sherlock",
        "website": "",
        "header": "",
        "subheader": "",
        "image": "/img/team/alumni/george_zhang.jpg",
        "semester": "Spring 2017"
      }, {
        "name": "Harika Kalidhindi",
        "position": "Project Developer - Sherlock",
        "website": "https://github.com/jrharika",
        "header": "",
        "subheader": "",
        "image": "/img/team/alumni/harika_kalidhindi.jpg",
        "semester": "Spring 2017"
      }, {
        "name": "Lenny Dong",
        "position": "Project Developer - Stella",
        "website": "http://lennyd.me/",
        "header": "",
        "subheader": "",
        "image": "/img/team/alumni/lenny_dong.jpg",
        "semester": "Spring 2017"
      }, {
        "name": "Michael Fan",
        "position": "Project Developer - Stella",
        "website": "https://github.com/mqfan",
        "header": "",
        "subheader": "",
        "image": "/img/team/alumni/michael_fan.jpg",
        "semester": "Spring 2017"
      }, {
        "name": "Nate Young",
        "position": "Project Developer - Stella",
        "website": "https://github.com/natetyoung",
        "header": "",
        "subheader": "",
        "image": "/img/team/alumni/nate_young.jpg",
        "semester": "Spring 2017"
      }, {
        "name": "Nick Zoghb",
        "position": "Project Developer - Sherlock",
        "website": "https://github.com/nzoghb",
        "header": "",
        "subheader": "",
        "image": "/img/team/alumni/nick_zoghb.jpg",
        "semester": "Spring 2017"
      }, {
        "name": "Nina Chang",
        "position": "Project Developer - Sherlock",
        "website": "https://www.linkedin.com/in/nina-chang-100133118",
        "header": "",
        "subheader": "",
        "image": "/img/team/alumni/nina_chang.jpg",
        "semester": "Spring 2017"
      }, {
        "name": "Vishal Satish",
        "position": "Project Developer - Sherlock",
        "website": "https://github.com/visatish",
        "header": "",
        "subheader": "",
        "image": "/img/team/alumni/vishal_satish.jpg",
        "semester": "Spring 2017"
      }]
    };

    function getAll() {
      var result = [];
      for (var key in team) {
        if (team.hasOwnProperty(key)) {
          result = result.concat(team[key]);
        }
      }
      return result;
    }

    function getAlumni() {
      return team.alumni;
    }

    function getOfficers() {
      return team.officers;
    }

    function getDevelopers() {
      return team.developers;
    }

    function getPastMembers() {
      return team.pastMembers;
    }

    function getMembers() {
      var result = [];
      for (var key in team) {
        if (team.hasOwnProperty(key)) {
          if (key != "officers" && key != "alumni" && key != "pastMembers") result = result.concat(team[key]);
        }
      }
      return result;
    }

    return factory;
  }
})();
'use strict';

(function () {
  angular.module('MB').factory('FormService', FormService);

  FormService.$inject = ['$http', '$log', 'Dropbox'];

  function FormService($http, $log, Dropbox) {
    var factory = {
      checkFullSubmit: checkFullSubmit,
      sendMessage: sendMessage,
      sendToSheet: sendToSheet,
      submitApplication: submitApplication,
      updateTextArea: updateTextArea
    };

    function checkFullSubmit(object) {
      for (var key in object) {
        if (object.hasOwnProperty(key)) {
          if (!object[key] && key != 'optional' && key != 'github') {
            console.log("Invalid key: " + key);
            return false;
          }
        }
      }
      return true;
    }

    function camelCaseToPretty(text) {
      var spaces = text.replace(/([A-Z0-9])/g, " $1");
      var pretty = spaces.charAt(0).toUpperCase() + spaces.slice(1);
      return pretty;
    }

    function renameProperty(object, oldName, newName) {
      if (oldName == newName) {
        return object;
      }
      if (object.hasOwnProperty(oldName)) {
        object[newName] = object[oldName];
        delete object[oldName];
      }
      return object;
    };

    function prettyObjectKeys(object) {
      for (var key in object) {
        if (object.hasOwnProperty(key)) object = renameProperty(object, key, camelCaseToPretty(key));
      }
      return object;
    }

    function sendMessage(messageObject, errorMessage, gFormURL) {
      var okay = checkFullSubmit(messageObject);
      var postData = $.param(messageObject);
      console.log(postData);

      if (okay) {
        $http({
          url: gFormURL,
          method: "POST",
          data: postData,
          dataType: "json"
        }).then(function successCallback(response) {
          $log.debug(response);
        }, function errorCallback(response) {
          $log.error(response);
        });
        return true;
      }
      if (!errorMessage) {
        Materialize.toast("Please complete all fields.", 2000);
      } else {
        Materialize.toast(errorMessage, 2000);
      }
      return false;
    }

    function submitApplication(messageObject, sheetURL, errorMessage, resume) {
      var okay = checkFullSubmit(messageObject);
      if (okay) {
        Dropbox.filesUpload({ path: '/resumes/' + resume.name, contents: resume, mode: { ".tag": "add" }, autorename: true }).then(function (response) {
          $log.debug('File Uploaded to Dropbox: ' + JSON.stringify(response));
          messageObject.resume = response.name;
          sendToSheet(messageObject, sheetURL, errorMessage);
          return true;
        }).catch(function (error) {
          $log.error(error);
          return false;
        });
        return true;
      }
      if (!errorMessage) {
        Materialize.toast("Please complete all fields.", 2000);
      } else {
        Materialize.toast(errorMessage, 2000);
      }
      return false;
    }

    function sendToSheet(messageObject, sheetURL, errorMessage) {
      var okay = checkFullSubmit(messageObject);
      var message = prettyObjectKeys(messageObject);
      var postData = $.param(messageObject);
      if (okay) {
        $.ajax({
          url: sheetURL,
          type: "post",
          data: postData,
          success: function success(response) {
            $log.debug('Message Sent: ' + JSON.stringify(response));
          },
          error: function error(request, textStatus, errorThrown) {
            $log.error("Status: " + textStatus);
            $log.error("Error: " + errorThrown);
          }
        });
        return true;
      }
      if (!errorMessage) {
        Materialize.toast("Please complete all fields.", 2000);
      } else {
        Materialize.toast(errorMessage, 2000);
      }
      return false;
    }

    var isWhitespace = function isWhitespace(char) {
      return char == ' ' || char == '\n';
    };

    function updateTextArea($event, vmObject, textObject, textKey, wordCountVar, wordLimit) {
      if (!isWhitespace(vmObject[textObject][textKey][0])) vmObject[wordCountVar] = 1;

      for (var i = 1; i < vmObject[textObject][textKey].length; i++) {
        if (!isWhitespace(vmObject[textObject][textKey][i]) && isWhitespace(vmObject[textObject][textKey][i - 1])) {
          vmObject[wordCountVar]++;
          if (vmObject[wordCountVar] == wordLimit + 1) {
            vmObject[wordCountVar]--;
            vmObject[textObject][textKey] = vmObject[textObject][textKey].substring(0, i);
            return;
          } else if (!isWhitespace(vmObject[textObject][textKey][i]) && !isWhitespace(vmObject[textObject][textKey][i - 1]) && vmObject[wordCountVar] == 0) {
            vmObject[wordCountVar] = 1;
          }
        }
      }

      if (vmObject[textObject][textKey].length == 0) vmObject[wordCountVar] = 0;
    }

    return factory;
  }
})();
'use strict';

(function () {
  angular.module('MB').controller('AlumniCtrl', AlumniCtrl).directive('alumniList', AlumniList);

  AlumniCtrl.$inject = ['TeamService'];

  function AlumniCtrl(TeamService) {
    var vm = this;
    vm.alumni = TeamService.getAlumni();

    var half = Math.ceil(vm.alumni.length / 2);
    vm.alumni_col_1 = vm.alumni.slice(0, half);
    vm.alumni_col_2 = vm.alumni.slice(half, vm.alumni.length);

    vm.connections = [{
      name: "Google",
      url: "https://www.google.com",
      image: "img/connections/google.png"
    }, {
      name: "Moxtra",
      url: "https://www.moxtra.com",
      image: "img/connections/moxtra.png"
    }, {
      name: "Amazon",
      url: "https://www.amazon.com",
      image: "img/connections/amazon.png"
    }, {
      name: "Cisco",
      url: "https://www.cisco.com",
      image: "img/connections/cisco.png"
    }, {
      name: "DE Shaw & Co",
      url: "https://www.deshaw.com",
      image: "img/connections/de_shaw.png"
    }, {
      name: "Microsoft",
      url: "https://www.microsoft.com",
      image: "img/connections/microsoft.png"
    }, {
      name: "Texas Instruments",
      url: "https://www.ti.com",
      image: "img/connections/texas_instruments.png"
    }, {
      name: "LinkedIn",
      url: "https://www.linkedin.com",
      image: "img/connections/linkedin.png"
    }, {
      name: "NASA",
      url: "https://www.nasa.gov",
      image: "img/connections/nasa.png"
    }, {
      name: "Brilliant",
      url: "https://www.brilliant.org",
      image: "img/connections/brilliant.png"
    }];

    vm.research = [{
      name: "Berkeley Deep Drive",
      url: "https://deepdrive.berkeley.edu/",
      image: "img/research/berkeley_deep_drive.png"
    }];
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
'use strict';

(function () {
  angular.module('MB').controller('CompaniesCtrl', CompaniesCtrl);

  CompaniesCtrl.$inject = ['FormService', 'CompanySheetURL'];

  function CompaniesCtrl(FormService, CompanySheetURL) {
    var vm = this;
    vm.submitted = false;

    vm.company = { organization: null, email: null, firstName: null, lastName: null, subject: null, message: null };

    vm.sendRequest = function () {
      var errMsg = "Error: Please complete all fields so we have enough information to proceed.";
      var sent = FormService.sendToSheet(vm.company, CompanySheetURL, errMsg);
      if (sent) {
        vm.submitted = true;
        return true;
      }
      return false;
    };
  }
})();
'use strict';

(function () {
  angular.module('MB').controller('ContactCtrl', ContactCtrl);
  ContactCtrl.$inject = ['FormService', '$http', '$log', 'ContactSheetURL'];

  function ContactCtrl(FormService, $http, $log, ContactSheetURL) {
    var vm = this;

    vm.submitted = false;
    vm.contact = { firstName: null, lastName: null, email: null, subject: null, message: null };

    vm.sendMessage = function () {
      var sent = FormService.sendToSheet(vm.contact, ContactSheetURL);
      if (sent) {
        vm.submitted = true;
        return true;
      }
      return false;
    };
  }
})();
'use strict';

(function () {
  angular.module('MB').controller('HomeCtrl', HomeCtrl).directive('membersList', MembersList);

  HomeCtrl.$inject = ['FormService', 'NotificationSheetURL', 'TeamService'];

  function HomeCtrl(FormService, NotificationSheetURL, TeamService) {
    var vm = this;

    vm.submitted = false;
    vm.notification = { firstName: null, lastName: null, email: null };

    vm.sendMessage = function () {
      var sent = FormService.sendToSheet(vm.notification, NotificationSheetURL);
      if (sent) {
        vm.submitted = true;
        return true;
      }
      return false;
    };

    vm.team = TeamService.getAll();
    vm.officers = TeamService.getOfficers();
    vm.developers = TeamService.getDevelopers();
    vm.alumni = TeamService.getAlumni();
  }

  function MembersList() {
    return {
      restrict: 'E',
      // transclude: true,
      scope: {
        name: "@",
        list: "="
      },
      templateUrl: 'templates/pages/home/members-list.html'
    };
  }
})();
'use strict';

(function () {
  angular.module('MB').controller('ShowcaseCtrl', ShowcaseCtrl);

  ShowcaseCtrl.$inject = ['FormService', 'ShowcaseSheetURL'];

  function ShowcaseCtrl(FormService, ShowcaseSheetURL) {
    var vm = this;
    vm.submitted = false;

    vm.company = { organization: null, email: null, firstName: null, lastName: null, message: null };
    console.log(ShowcaseSheetURL);

    vm.sendRequest = function () {
      var errMsg = "Error: Please complete all fields so we have enough information to proceed.";
      if (vm.company.message == null) {
        vm.company.message = ' ';
      }
      var sent = FormService.sendToSheet(vm.company, ShowcaseSheetURL, errMsg);
      if (sent) {
        vm.submitted = true;
        return true;
      }
      return false;
    };
  }
})();
'use strict';

(function () {
  angular.module('MB').controller('BlogCtrl', BlogCtrl).directive('blogPost', PostDir).directive('fbComments', FBComments);

  BlogCtrl.$inject = ['BlogService', '$stateParams'];

  function BlogCtrl(BlogService, $stateParams) {
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
      return '<div class="fb-comments" ' + 'data-href="' + href + '" ' + 'data-width="100%" data-numposts="5">' + '</div>';
    }
    return {
      restrict: 'E',
      scope: {},
      link: function link(scope, elem, attrs) {
        attrs.$observe('pageHref', function (newValue) {
          if (newValue) {
            var href = newValue;
            elem.html(createHTML(href));
            FB.XFBML.parse(elem[0]);
          } else {
            element.html("<div></div>");
          }
        });
      }
    };
  }
})();
'use strict';

(function () {
  angular.module('MB').controller('ApplyCtrl', ApplyCtrl);

  ApplyCtrl.$inject = ['FormService', '$http', '$log', 'Dropbox', 'DropboxService', 'ApplicationSheetURL'];

  function ApplyCtrl(FormService, $http, $log, Dropbox, DropboxService, ApplicationSheetURL) {
    var vm = this;
    var temp_deadline = new Date(Date.UTC(2018, 0, 26, -1, -1, -1));
    temp_deadline.setTime(temp_deadline.getTime() + temp_deadline.getTimezoneOffset() * 60 * 1000);
    var APP_DEADLINE = temp_deadline;
    var WORD_LIMIT = 200;
    vm.years = ["Freshman", "Sophomore", "Junior", "Senior", "Graduate"];
    vm.positions = ["Project Developer"];

    vm.submitted = false;
    vm.page = 1;
    vm.wordCount1 = 0;
    vm.wordCount2 = 0;
    vm.wordCount3 = 0;

    vm.basic = { firstName: null, lastName: null, year: null, major: null, email: null, phone: null, position: null, resume: null };
    vm.responses = { project: null, interest: null };
    vm.additional = { optional: null, github: null };

    vm.submitForm = function () {
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

    vm.changePage = function (page) {
      if (page <= 3 && page >= 0) {
        vm.page = page;
        return true;
      }
      return false;
    };

    vm.next = function (object) {
      vm.changePage(vm.page + 1, object);
    };
    vm.prev = function () {
      if (vm.page >= 0) vm.page -= 1;
    };

    vm.updateTextArea1 = function ($event) {
      FormService.updateTextArea($event, vm, 'responses', 'project', 'wordCount1', WORD_LIMIT);
    };
    vm.updateTextArea2 = function ($event) {
      FormService.updateTextArea($event, vm, 'responses', 'interest', 'wordCount2', WORD_LIMIT);
    };
    vm.updateTextArea3 = function ($event) {
      FormService.updateTextArea($event, vm, 'additional', 'optional', 'wordCount3', WORD_LIMIT);
    };

    vm.pastDeadline = function () {
      console.log(APP_DEADLINE);console.log(Date.now() > APP_DEADLINE);return Date.now() > APP_DEADLINE;
    };
  }
})();