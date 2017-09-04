/*!
 *
 *  Web Starter Kit
 *  Copyright 2015 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */
/* eslint-env browser */

(function() {
  'use strict';

  // Check to make sure service workers are supported in the current browser,
  // and that the current page is accessed from a secure origin. Using a
  // service worker from an insecure origin will trigger JS console errors. See
  // http://www.chromium.org/Home/chromium-security/prefer-secure-origins-for-powerful-new-features
  var isLocalhost = Boolean(window.location.hostname === 'localhost' ||
      // [::1] is the IPv6 localhost address.
      window.location.hostname === '[::1]' ||
      // 127.0.0.1/8 is considered localhost for IPv4.
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      )
    );

  if ('serviceWorker' in navigator &&
      (window.location.protocol === 'https:' || isLocalhost)) {
    navigator.serviceWorker.register('service-worker.js')
    .then(function(registration) {
      // updatefound is fired if service-worker.js changes.
      registration.onupdatefound = function() {
        // updatefound is also fired the very first time the SW is installed,
        // and there's no need to prompt for a reload at that point.
        // So check here to see if the page is already controlled,
        // i.e. whether there's an existing service worker.
        if (navigator.serviceWorker.controller) {
          // The updatefound event implies that registration.installing is set:
          // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-container-updatefound-event
          var installingWorker = registration.installing;

          installingWorker.onstatechange = function() {
            switch (installingWorker.state) {
              case 'installed':
                // At this point, the old content will have been purged and the
                // fresh content will have been added to the cache.
                // It's the perfect time to display a "New content is
                // available; please refresh." message in the page's interface.
                break;

              case 'redundant':
                throw new Error('The installing ' +
                                'service worker became redundant.');

              default:
                // Ignore
            }
          };
        }
      };
    }).catch(function(e) {
      console.error('Error during service worker registration:', e);
    });
  }

  function createCookie(name,value,days) {
    if (days) {
      var date = new Date();
      date.setTime(date.getTime()+(days*24*60*60*1000));
      var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
  }

  function eraseCookie(name) {
    createCookie(name,"",-1);
  }

  document.getElementById("loginButton").onclick = function()
  {
    alert("Login button");

    var cookies = document.cookie.split(";");
    //for (var i = 0; i < cookies.length; i++)
    eraseCookie(cookies[0].split("=")[0]);

    //check if there is already a user connected to the website
    var currentCookie = document.cookie;
    if (currentCookie.startsWith("username=")) {
      var currentUserName = currentCookie.substring(9, currentCookie.indexOf('&'));
      alert("You are already connected as: ".concat(currentUserName));
    }
    //if there is not user connected to the website
    else {

      var username = document.getElementById("username").value;
      var password = document.getElementById("password").value;
      var http = new XMLHttpRequest();
      var url = "http://79.181.158.67:3101/stsm/user_management/authenticate?user=".concat(username).concat("&password=").concat(password);
      http.open("GET", url, true);

      //Send the proper header information along with the request
      http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

      http.onreadystatechange = function () {//Call a function when the state changes.
        if (http.readyState == 4 && http.status == 200) {
          alert(http.responseText);
        }
      }
      http.send(null);
      //get the response and act accordingly
      alert(http.responseText);

      //set up the cookie of the current user that was just logged in
      document.cookie = "username=".concat(username).concat("&password=").concat(password);
      document.getElementById("currentUserNameConnectedLabel").innerHTML = "Hello, ".concat(username);

      //add the current user name in a text box at the top of the page

    }
  }


//*****************************************

  //document.getElementById("uploadfiles").onclick = function() {
    //alert("in upload files");

    /*
    var fileInput = document.getElementById("files"),

      readFile = function () {
        var reader = new FileReader();
        reader.onload = function () {
          //document.getElementById('out').innerHTML = reader.result;
          alert(reader.result);
        };
        // start reading the file. When it is done, calls the onload event defined above.
        reader.readAsBinaryString(fileInput.files[0]);
      };

    fileInput.addEventListener('change', readFile);
    */
  //};

    //return result; //JavaScript object
    //return JSON.stringify(result); //JSON

    // Select your input type file and store it in a variable
    //const input = document.getElementById('files');

    // This will upload the file after having read it
    //const upload = (e) => {
    //fetch('www.example.net', { // Your POST endpoint
    //  method: 'POST',
    //  headers: {
    //    "Content-Type": "multipart/form-data;"
    //  },
    //  body: e.currentTarget.result // This is the content of your file
    //})


// Event handler executed when a file is selected
    //const onSelectFile = (files) => {
    // Files is a list because you can select several files
    // We just upload the first selected file
    //const file = input.files[0];
    //const reader = new FileReader();

    // We read the file and call the upload function with the result
    //reader.onload = upload;
    //reader.readAsText(file);
  //};

      //var file = this.files[0];
      //var xhr = new XMLHttpRequest();
      //(xhr.upload || xhr).addEventListener('progress', function(e) {
      //  var done = e.position || e.loaded
      //  var total = e.totalSize || e.total;
      //  console.log('xhr progress: ' + Math.round(done/total*100) + '%');
      //});
      //xhr.addEventListener('load', function(e) {
      //  console.log('xhr upload complete', e, this.responseText);
      //});
      //xhr.open('post', 'http://79.181.158.67:3101/stsm/upload', true);
      //xhr.send(file);

      //var result;
      //var fileData = "C:/testUploadData.csv";
      //var xhr = new XMLHttpRequest();
      //var serviceURL = "http://79.181.158.67:3101/stsm/upload";

      //xhr.onreadystatechange = function (Evt) {
      //  if (xhr.readyState == 4 && xhr.status == 200) {
      //    Data = JSON.parse(xhr.responseText);
      //    result = Data.IsSuccess;
      //    if (result == true) {
      //      alert('CSV uploaded successfully');
      //    }
//
      //    }
      //  }

      //xhr.open('POST', serviceURL, true);

      //xhr.send(fileData);

      //*****

      //var username = document.getElementById("about").val
      //var http = new XMLHttpRequest();
      //var url = "http://79.181.158.67:3101/stsm/upload";
      //var params = "lorem=ipsum&name=binny";
      //http.open("POST", url, true);

      //Send the proper header information along with the request
      //http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

      //http.onreadystatechange = function() {//Call a function when the state changes.
      //  if(http.readyState == 4 && http.status == 200) {
      //    alert(http.responseText);
      //  }
      //}
      //var formData = new FormData();
      //formData.append("testUpload", "C:/testUploadData.csv");
      //http.send(formData);
      //alert(http.responseText);
   // }
  //}

  //- Using an anonymous function:
  //document.getElementById("clickMe").onclick = function ()
  //{
    //alert("hey");
    // remove all is-active classes from tabs
    //document.getElementById("about").className = "mdl-layout__tab";
    //document.getElementById("about").className = "mdl-layout__tab is-active";
    //document.getElementById("signInTab").setAttribute("is-active", true);
    //$('a.mdl-layout__tab').removeClass('is-active');
    // activate desired tab
    //$('a[href="#signin"]').addClass('is-active');
    //alert('hello!');
  //};

})();
