/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
var app = {

    // Application Constructor
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    // deviceready Event Handler
    //
    // The scope of `this` is the event. In order to call the `receivedEvent`
    // function, we must explicity call `app.receivedEvent(...);`
    onDeviceReady: function () {
        app.receivedEvent('deviceready');
        document.addEventListener("volumeupbutton", app.onVolumeUpKeyDown, false);
    },

    // Update DOM on a Received Event
    receivedEvent: function (id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },



    getNavigatorData: function () {
        this.setStateText('get navigator data...');
        navigator.compass.getCurrentHeading(this.onNavigateSuccess, this.onError);
    },
    onNavigateSuccess: function (heading) {
        this.setStateText('navigator data recieved');
        navigator.notification.alert('Heading: ' + heading.magneticHeading);
    },



    textButtonClicked: function () {
        this.setStateText('textbox text: ' + document.getElementById('txtSzoveg').value);

        var element = document.getElementById('deviceProperties');
        element.innerHTML = 'Device Name: ' + device.name + '<br />' +
                            'Device Cordova: ' + device.cordova + '<br />' +
                            'Device Platform: ' + device.platform + '<br />' +
                            'Device UUID: ' + device.uuid + '<br />' +
                            'Device Version: ' + device.version + '<br />';
    },



    onVolumeUpKeyDown: function () {
        navigator.notification.alert('halkító gomb megnyomva', null);
    },





    getPictureURI: function () {
        //this.setStateText('get image...');
        navigator.camera.getPicture(this.onPhotoURISuccess, this.onError,
        {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI
        });
    },
    onPhotoURISuccess: function (imageURI) {
        //this.setStateText('image recieved');
        var image = document.getElementById('myImage');
        image.src = imageURI;
    },

    getPictureString: function () {
        //this.setStateText('get image...');
        navigator.camera.getPicture(this.onPhotoStringSuccess, this.onError,
        {
            quality: 10,
            destinationType: Camera.DestinationType.DATA_URL
        });
    },
    onPhotoStringSuccess: function (imageData) {
        //this.setStateText('image recieved');
        var image = document.getElementById('myImage');
        image.src = "data:image/jpeg;base64," + imageData; ;
    },



    getGPSdata: function () {
        navigator.geolocation.getCurrentPosition(this.onGPSSuccess, this.onError);
    },
    onGPSSuccess: function (position) {
        navigator.notification.alert('Latitude: ' + position.coords.latitude + '\n' +
          'Longitude: ' + position.coords.longitude + '\n' +
          'Altitude: ' + position.coords.altitude + '\n' +
          'Accuracy: ' + position.coords.accuracy + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' +
          'Heading: ' + position.coords.heading + '\n' +
          'Speed: ' + position.coords.speed + '\n' +
          'Timestamp: ' + position.timestamp + '\n');
    },


    showMessage: function () {
        navigator.notification.alert('üzenet címe', this.onMessageConfirm, 'üzenet', 'saját szövegû gomb');
    },
    onMessageConfirm: function () {
        this.setStateText('message confirmed');
    },


    showChoise: function () {
        navigator.notification.confirm(
            'Vajon itt egy kérdés lesz?',  // message
            this.onChoiseConfirm,              // callback to invoke with index of button pressed
            'A Választás',            // title
            'elsõ,második,harmadik'          // buttonLabels
        );
    },
    onChoiseConfirm: function (buttonIndex) {
        //this.setStateText('button index: ' + buttonIndex);
        navigator.notification.alert('button index: ' + buttonIndex);
    },





    onError: function (error) {
        //this.setStateText('error occured');
        navigator.notification.alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
    },

    setStateText: function (message) {
        document.getElementById('statText').innerHTML = message;
    }
};
