(function(){
  angular
    .module('MB')
    .factory('DropboxService', DropboxService);

  DropboxService.$inject = ['Dropbox', '$http', '$log'];

  function DropboxService(Dropbox, $http, $log){
    var factory = {
      uploadFile: uploadFile
    }

    function uploadFile(filePath, fileContents) {
      Dropbox.filesUpload({path: filePath, contents: fileContents, mode: {".tag": "add"}, autorename: true})
      .then((response) => {
        $log.debug('File Uploaded to Dropbox: ' + JSON.stringify(response));
        return true;
      }).catch(function(error) {
        $log.error(error);
        return false;
      });
      return true;
    }

    return factory;
  }
}());
