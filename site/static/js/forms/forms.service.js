(function(){
  angular
    .module('MB')
    .factory('FormService', FormService);

  FormService.$inject = ['$http', '$log', 'Dropbox'];

  function FormService($http, $log, Dropbox){
    var factory = {
      checkFullSubmit: checkFullSubmit,
      sendMessage: sendMessage,
      sendToSheet: sendToSheet,
      submitApplication: submitApplication,
      updateTextArea: updateTextArea
    }

    function checkFullSubmit(object) {
      for(var key in object) {
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
      var spaces = text.replace( /([A-Z0-9])/g, " $1" );
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
        Dropbox.filesUpload({path: '/resumes/' + resume.name, contents: resume, mode: {".tag": "add"}, autorename: true})
        .then((response) => {
          $log.debug('File Uploaded to Dropbox: ' + JSON.stringify(response));
          messageObject.resume = response.name;
          sendToSheet(messageObject, sheetURL, errorMessage);
          return true;
        }).catch(function(error) {
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
          success: function(response) {
            $log.debug('Message Sent: ' + JSON.stringify(response));
          },
          error: function(request, textStatus, errorThrown) {
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

    var isWhitespace = (char) => {
      return char == ' ' || char == '\n';
    };

    function updateTextArea($event, vmObject, textObject, textKey, wordCountVar, wordLimit) {
      if (!isWhitespace(vmObject[textObject][textKey][0])) vmObject[wordCountVar] = 1;

      for (var i = 1; i < vmObject[textObject][textKey].length; i++) {
        if (!isWhitespace(vmObject[textObject][textKey][i]) && isWhitespace(vmObject[textObject][textKey][i-1])) {
          vmObject[wordCountVar]++;
          if (vmObject[wordCountVar] == wordLimit + 1) {
            vmObject[wordCountVar]--;
            vmObject[textObject][textKey] = vmObject[textObject][textKey].substring(0, i);
            return;
          } else if (!isWhitespace(vmObject[textObject][textKey][i]) && !isWhitespace(vmObject[textObject][textKey][i-1]) && vmObject[wordCountVar] == 0) {
            vmObject[wordCountVar] = 1;
          }
        }
      }

      if (vmObject[textObject][textKey].length == 0) vmObject[wordCountVar] = 0;
    }

    return factory;
  }
}());
