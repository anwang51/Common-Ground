(function(){
    angular
        .module('MB')
        .factory('DateService', DateService);

    DateService.$inject = ['moment'];

    function DateService(moment){
        var factory = {
            blogDate: blogDate,
            timestamp: timestamp
        }

        function blogDate(month, day, year) {
            return moment(new Date(year, month - 1, day)).format("MMM D, YYYY");
        }

        function timestamp(month, day, year) {
            return moment(new Date(year, month - 1, day)).format("x");
        }

        return factory;
    }
}());
