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

  //check on page load if a login cookie exists- if so- write the name of the user on the screen
  var currentCookies = document.cookie;
  if (currentCookies.startsWith("username") == false)
  {
    document.getElementById("currentUserNameConnectedLabel").innerText = "Not Connected";
  }
  else if (currentCookies.startsWith("username=;") == false)
  {
    var currentUserName = currentCookies.substring(9, currentCookies.indexOf('&'));
    document.getElementById("currentUserNameConnectedLabel").innerText = "Hello, ".concat(currentUserName);
  }

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

    //check if there is already a user connected to the website
    var currentCookie = document.cookie;
    if (((currentCookie.startsWith("username=;")) == false) && (currentCookie.startsWith("username") == true)) {
      var currentUserName = currentCookie.substring(9, currentCookie.indexOf('&'));
      alert("You are already connected as: ".concat(currentUserName).concat(". Please log out to sign in with a different user"));
    }
    //if there is not user connected to the website
    else {

      var username = document.getElementById("username").value;
      var password = document.getElementById("password").value;
      var http = new XMLHttpRequest();
      //var url = "http://79.182.78.71:3101/stsm/user_management/authenticate?user_name=".concat(username).concat("&password=").concat(password);
      //var url = "http://127.0.0.1:3101/stsm/user_management/authenticate?user_name=".concat(username).concat("&password=").concat(password);
      var url = "http://93.172.28.190:3101/stsm/user_management/authenticate?user_name=".concat(username).concat("&password=").concat(password);

      http.open("GET", url, true);

      //Send the proper header information along with the request
      http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

      http.onreadystatechange = function () {//Call a function when the state changes.
        if (http.readyState == 4 && http.status == 200) {
          //get the response and act accordingly
          //alert(http.responseText);
          var myObj = JSON.parse(http.responseText);
          if (myObj.success === false)
          {
            alert(myObj.msg);
          }
          else
          {
            //set up the cookie of the current user that was just logged in
            document.cookie = "username=".concat(username).concat("&password=").concat(password);
            //add the current user name in a text box at the top of the page
            document.getElementById("currentUserNameConnectedLabel").innerText = "Hello, ".concat(username);
          }
        }
      }
      http.send(null);
    }
  }

  document.getElementById("logoutButton").onclick = function()
  {
    alert("Logout button");
    //erase the previous authentication cookie by overriding
    document.cookie = "username=";
    //change the status to not connected!
    document.getElementById("currentUserNameConnectedLabel").innerText = "Not Connected";
  }

  function downloadCSV(csvData)
  {
    var data, filename, link;
    var csv = csvData;
    if (csv == null) return;

    filename = 'results.csv';

    if (!csv.match(/^data:text\/csv/i)) {
      csv = 'data:text/csv;charset=utf-8,' + csv;
    }
    data = encodeURI(csv);

    link = document.createElement('a');
    link.setAttribute('href', data);
    link.setAttribute('download', filename);
    link.click();
  }

  document.getElementById("uploadfiles").onclick = function()
  {
    var formData = new FormData();

    var i = 0;
    var fileArray = document.getElementById("myFileField").files;
    for (i; i < fileArray.length; i++) {
      formData.append(fileArray[i].name, fileArray[i]);
    }

    // formData.append("myFile", document.getElementById("myFileField").files[0]);
    // formData.append("myFile", document.getElementById("myFileField").files[1]);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://93.172.28.190:3101/stsm/prediction/uploadEegFiles/");

    xhr.onreadystatechange = function () {//Call a function when the state changes.
      if (xhr.readyState == 4 && xhr.status == 200) {
        //get the response and act accordingly
        alert(JSON.parse(xhr.responseText).msg);
        //add loader for a specific amount of time
        document.getElementById("loaderid").style.visibility='visible'
        //
        //downloadCSV(xhr.responseText);
      }
    }
    xhr.send(formData);
  }

})();
