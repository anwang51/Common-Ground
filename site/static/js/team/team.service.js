(function(){
  angular
    .module('MB')
    .factory('TeamService', TeamService);

  TeamService.$inject = ['$http', '$log'];

  function TeamService(Dropbox, $http, $log){
    var factory = {
      getAll: getAll,
      getOfficers: getOfficers,
      getDevelopers: getDevelopers,
      getAlumni: getAlumni,
      getPastMembers: getPastMembers
    }

    var team = {
      officers: [
        {
          "name": "Arsh Zahed",
          "position": "President",
          "website": "https://github.com/azahed98",
          "header": "",
          "subheader": "",
          "image": "/img/team/officers/arsh_zahed.jpg",
          "semester": 'Spring 2018'
        },
        {
          'name': 'Elina Yon',
          'position': 'External Vice President',
          'website': '',
          'header': '',
          'subheader': '',
          'image': '/img/team/officers/elina_yon.jpg',
          'semester': 'Spring 2018'
        },
        {
          'name': 'Moira Huang',
          'position': 'Internal Vice President',
          'website': '',
          'header': '',
          'subheader': '',
          'image': '/img/team/officers/moira_huang.jpg',
          'semester': 'Spring 2018'
        },
        {
          'name': 'Laura Smith',
          'position': 'Vice President of Operations',
          'website': '',
          'header': '',
          'subheader': '',
          'image': '/img/team/officers/laura_smith.jpg',
          'semester': 'Spring 2018'
        },
        {
          "name": "Felix Su",
          "position": "Project Leader",
          "website": "http://felixsu.com",
          "header": "Robotics",
          "subheader": "",
          "image": "/img/team/officers/felix_su.jpg",
          "semester": 'Spring 2018'
        },
        {
          "name": "Hank O'Brien",
          "position": "Project Leader",
          "website": "https://github.com/hjobrien",
          "header": "",
          "subheader": "",
          "image": "/img/team/officers/hank_obrien.jpg",
          "semester": 'Spring 2018'
        },
        {
          'name': 'Alex Wu',
          'position': 'Project Leader',
          'website': '',
          'header': '',
          'subheader': '',
          'image': '/img/team/officers/alex_wu.jpg',
          'semester': 'Spring 2018'
        },
        {
          'name': 'An Wang',
          'position': 'Project Leader',
          'website': '',
          'header': '',
          'subheader': '',
          'image': '/img/team/officers/an_wang.jpg',
          'semester': 'Spring 2018'
        },
        {
          'name': 'Jonathan Lin',
          'position': 'Project Leader',
          'website': '',
          'header': '',
          'subheader': '',
          'image': '/img/team/officers/jonathan_lin.jpg',
          'semester': 'Spring 2018'
        }
      ],
      developers: [
        {'header': '',
        'image': '/img/team/members/developers/alex_shi.jpg',
        'name': 'Alex Shi',
        'position': 'Project Developer',
        'semester': 'Spring 2018',
        'header': 'Team TBA',
        'website': ''},
       {'header': '',
        'image': '/img/team/members/developers/arjun_khare.jpg',
        'name': 'Arjun Khare',
        'position': 'Project Developer',
        'semester': 'Spring 2018',
        'header': 'Team TBA',
        'website': ''},
       {'header': '',
        'image': '/img/team/members/developers/daniel_zeng.jpg',
        'name': 'Daniel Zeng',
        'position': 'Project Developer',
        'semester': 'Spring 2018',
        'header': 'Team TBA',
        'website': ''},
       {'header': '',
        'image': '/img/team/members/developers/helen_yang.jpg',
        'name': 'Helen Yang',
        'position': 'Project Developer',
        'semester': 'Spring 2018',
        'header': 'Team TBA',
        'website': ''},
       {'header': '',
        'image': '/img/team/members/developers/nicholas_truong.jpg',
        'name': 'Nicholas Truong',
        'position': 'Project Developer',
        'semester': 'Spring 2018',
        'header': 'Team TBA',
        'website': ''},
       {'header': '',
        'image': '/img/team/members/developers/ryan_hsu.jpg',
        'name': 'Ryan Hsu',
        'position': 'Project Developer',
        'semester': 'Spring 2018',
        'header': 'Team TBA',
        'website': ''},
       {'header': '',
        'image': '/img/team/members/developers/sahil_sancheti.jpg',
        'name': 'Sahil Sancheti',
        'position': 'Project Developer',
        'semester': 'Spring 2018',
        'header': 'Team TBA',
        'website': ''},
       {'header': '',
        'image': '/img/team/members/developers/timothy_liu.jpg',
        'name': 'Timothy Liu',
        'position': 'Project Developer',
        'semester': 'Spring 2018',
        'header': 'Team TBA',
        'website': ''},
       {'header': '',
        'image': '/img/team/members/developers/william_fang.jpg',
        'name': 'William Fang',
        'position': 'Project Developer',
        'semester': 'Spring 2018',
        'header': 'Team TBA',
        'website': ''},
       {'header': '',
        'image': '/img/team/members/developers/yijin_hua.jpg',
        'name': 'Yijin Hua',
        'position': 'Project Developer',
        'semester': 'Spring 2018',
        'header': 'Team TBA',
        'website': ''
        }
      ],
      alumni: [
         {
          "name": "Caleb Siu",
          "position": "Vice President",
          "website": "https://www.linkedin.com/in/calebsiu",
          "header": "",
          "subheader": "",
          "image": "/img/team/alumni/caleb_siu.jpg",
          "semester": 'Fall 2017 / Spring 2018'
        },
        {
          "name": "Nipun Ramakrishnan",
          "position": "Project Leader - MuseCage",
          "website": "https://www.linkedin.com/in/nipun-ramakrishnan-001a40116",
          "header": "MuseCage",
          "subheader": "",
          "image": "/img/team/alumni/nipun_ramakrishnan.jpg",
          "semester": 'Fall 2017 / Spring 2018'
        },
        {'header': '',
          'image': '/img/team/alumni/andy_zhang.jpg',
          'name': 'Andy Zhang',
          'position': 'Project Developer - MuseCage',
          'semester': 'Fall 2017',
          'header': 'MuseCage',
          'website': ''
        },
        {
          'header': '',
          'image': '/img/team/alumni/jerry_wu.jpg',
          'name': 'Jerry Wu',
          'position': 'Project Developer - DeepBeat',
          'semester': 'Fall 2017',
          'header': 'DeepBeat',
          'website': ''
        },
        {
          'header': '',
          'image': '/img/team/alumni/sean_meng.jpg',
          'name': 'Sean Meng',
          'position': 'Project Developer - MuseCage',
          'semester': 'Fall 2017',
          'header': 'MuseCage',
          'website': ''
        },
        {
          'header': '',
          'image': '/img/team/alumni/victor_chan.jpg',
          'name': 'Victor Chan',
          'position': 'Project Developer - UAV Robotics',
          'semester': 'Fall 2017',
          'header': 'UAV Robotics',
          'website': ''
        },
        {
          "name": "Peter Lee",
          "position": "President / Project Leader",
          "website": "http://peterlee.tech",
          "header": "Microsoft SDE Intern",
          "subheader": "",
          "image": "/img/team/alumni/peter_lee.png",
          "semester": "Spring 2017"
        },
        {
          "name": "Katie Li",
          "position": "External Vice President",
          "website": "http://linkedin.com/in/katienli",
          "header": "Project Manager at",
          "subheader": "",
          "image": "/img/team/alumni/katie_li.jpg",
          "semester": "Spring 2017"
        },
        {
          "name": "Michelle Huang",
          "position": "Internal Vice President",
          "website": "http://linkedin.com/in/michellerhuang",
          "header": "Business Analyst at",
          "subheader": "",
          "image": "/img/team/alumni/michelle_huang.jpg",
          "semester": "Spring 2017"
        },
        {
          "name": "Aditya Gandhi",
          "position": "Business Developer",
          "website": "https://www.linkedin.com/in/adigandhi1",
          "header": "",
          "subheader": "",
          "image": "/img/team/alumni/aditya_gandhi.jpg",
          "semester": "Spring 2017"
        },
        {
          "name": "Jim Xu",
          "position": "Business Developer",
          "website": "https://www.linkedin.com/in/zijingxu",
          "header": "",
          "subheader": "",
          "image": "/img/team/alumni/jim_xu.jpg",
          "semester": "Spring 2017"
        },
        {
          "name": "Annie Wang",
          "position": "Project Developer - Stella",
          "website": "https://www.linkedin.com/in/annieyueyiwang",
          "header": "",
          "subheader": "",
          "image": "/img/team/alumni/annie_wang.jpg",
          "semester": "Spring 2017"
        },
        {
          "name": "Darren Lee",
          "position": "Project Developer - Sherlock",
          "website": "http://darrenklee.me/",
          "header": "",
          "subheader": "",
          "image": "/img/team/alumni/darren_lee.png",
          "semester": "Spring 2017"
        },
        {
          "name": "Evan Limanto",
          "position": "Project Developer - Stella",
          "website": "http://evanlimanto.github.io/",
          "header": "",
          "subheader": "",
          "image": "/img/team/alumni/evan_limanto.jpg",
          "semester": "Spring 2017"
        },
        {
          "name": "George Zhang",
          "position": "Project Developer - Sherlock",
          "website": "",
          "header": "",
          "subheader": "",
          "image": "/img/team/alumni/george_zhang.jpg",
          "semester": "Spring 2017"
        },
        {
          "name": "Harika Kalidhindi",
          "position": "Project Developer - Sherlock",
          "website": "https://github.com/jrharika",
          "header": "",
          "subheader": "",
          "image": "/img/team/alumni/harika_kalidhindi.jpg",
          "semester": "Spring 2017"
        },
        {
          "name": "Lenny Dong",
          "position": "Project Developer - Stella",
          "website": "http://lennyd.me/",
          "header": "",
          "subheader": "",
          "image": "/img/team/alumni/lenny_dong.jpg",
          "semester": "Spring 2017"
        },
        {
          "name": "Michael Fan",
          "position": "Project Developer - Stella",
          "website": "https://github.com/mqfan",
          "header": "",
          "subheader": "",
          "image": "/img/team/alumni/michael_fan.jpg",
          "semester": "Spring 2017"
        },
        {
          "name": "Nate Young",
          "position": "Project Developer - Stella",
          "website": "https://github.com/natetyoung",
          "header": "",
          "subheader": "",
          "image": "/img/team/alumni/nate_young.jpg",
          "semester": "Spring 2017"
        },
        {
          "name": "Nick Zoghb",
          "position": "Project Developer - Sherlock",
          "website": "https://github.com/nzoghb",
          "header": "",
          "subheader": "",
          "image": "/img/team/alumni/nick_zoghb.jpg",
          "semester": "Spring 2017"
        },
        {
          "name": "Nina Chang",
          "position": "Project Developer - Sherlock",
          "website": "https://www.linkedin.com/in/nina-chang-100133118",
          "header": "",
          "subheader": "",
          "image": "/img/team/alumni/nina_chang.jpg",
          "semester": "Spring 2017"
        },
        {
          "name": "Vishal Satish",
          "position": "Project Developer - Sherlock",
          "website": "https://github.com/visatish",
          "header": "",
          "subheader": "",
          "image": "/img/team/alumni/vishal_satish.jpg",
          "semester": "Spring 2017"
        }
      ]
    }

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
      return team.officers
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
}());
