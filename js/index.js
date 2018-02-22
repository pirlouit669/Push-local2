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
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        console.log('Received Device Ready Event');
        console.log('calling setup push');
jQuery('#etape1').html('ok');
        app.setupPush();
jQuery('#etape11').html('ok');
    },
    setupPush: function() {
jQuery('#etape2').html('ok');
        console.log('calling push initial');
        var push = PushNotification.init({
            "android": {
                "senderID": "1005363421918"
            },
            "browser": {},
            "ios": {
                "sound": true,
                "vibration": true,
                "badge": true
            },
            "windows": {}
        });
        console.log('after init');
jQuery('#etape3').html('ok');

        push.on('registration', function(data) {
jQuery('#etape4').html('ok');
            console.log('registration event: ' + data.registrationId);

            var oldRegId = localStorage.getItem('registrationId');
            if (oldRegId !== data.registrationId) {
                // Save new registration ID
                localStorage.setItem('registrationId', data.registrationId);
                // Post registrationId to your app server as the value has changed
            }

            var parentElement = document.getElementById('registration');
            var listeningElement = parentElement.querySelector('.waiting');
            var receivedElement = parentElement.querySelector('.received');

            listeningElement.setAttribute('style', 'display:none;');
            receivedElement.setAttribute('style', 'display:block;');
            
            
            document.getElementById("gcm_id").innerHTML = data.registrationId;
            
jQuery('#etape5').html('ok');
            
            
            var ajaxurl = "http://www.facile2soutenir.fr/wp-admin/admin-ajax.php";
jQuery('#etape6').html('ok');
            jQuery.ajax({
                  url: ajaxurl,
                  data: {
                        'action':'am_test_push',
                        'rid': data.registrationId,
                  },
                  beforeSend:function() {
jQuery('#etape7').html('ok');
                  },
                  success:function(resultat) {
                        document.getElementById("okpush").innerHTML = 'ok push';
jQuery('#etape8').html('ok');                        
                  },
                  complete : function() {
jQuery('#etape9').html('ok');
                  },
            });
jQuery('#etape10').html('ok');
            
        });

        push.on('error', function(e) {
            console.log("push error = " + e.message);
        });

        push.on('notification', function(data) {
            console.log('notification event');
            navigator.notification.alert(
                data.message,         // message
                null,                 // callback
                data.title,           // title
                'Ok'                  // buttonName
            );
       });
    }
};
