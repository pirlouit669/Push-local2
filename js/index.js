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
        app.setupPush();
        
        
        
        
            $( "#log").append('<br>onDeviceReady');
            
            
        $( "#maj" ).on( "click", function(e) {
                  var valeur = localStorage.getItem('registrationId');
                  $('#rid').attr('href', 'http://www.facile2soutenir.fr/api/action/?rid='+valeur);                 
$( "#log").append('<BR>avant appel de maj_ajax');
                  maj_ajax();
$( "#log").append('<BR>apres appel de maj_ajax');
            });
        
        
        
        
            function maj_ajax() {
$( "#log").append('<br>maj_ajax');
                  var ajaxurl = "https://www.facile2soutenir.fr/wp-admin/admin-ajax.php";
                  var valeur = localStorage.getItem('registrationId');
$( "#log").append('<br><div style="max-width:250p">RID : '+valeur+'</div>');
                  $.ajax({
                        url: ajaxurl,
                        data: {
                              'action':'am_test_push',
                              'rid': valeur,
                        },
                        beforeSend : function() {
$( "#log").append('<br>before send ajax');
                        },
                        success:function(resultat) {
$( "#log").append('<br>Ajax est toujours un succes');
                              //document.getElementById("ok_push").innerHTML = 'ok push';      
                        },
                        error:function(error) {
$( "#log").append('<br>Ajax est toujours une erreur');
$( "#log").append(error);
                        },
                        complete:function() {
$( "#log").append('<br>ajax est fini');
                        }
                  });
            }  
        
        $( "#formrid" ).submit(function( event ) {
            event.preventDefault();
            $('#rid').val('1234');
            var yo = $('#rid').val();
            alert(yo);
            $( "#formrid" ).submit();
          });
        
        
        
        
        
        
        
        
        
        
        
        
        
    },
    setupPush: function() {
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

        push.on('registration', function(data) {
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

