
        // Client ID and API key from the Developer Console
        var CLIENT_ID = '631614975802-j3rau124ortqfk2inac97f0vbedvcdth.apps.googleusercontent.com';
        var API_KEY = 'AIzaSyBZ0B-ZQ69vyCF-lV45vKJe2oeP-JBVrfk';

        // Array of API discovery doc URLs for APIs used by the quickstart
        var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

        // Authorization scopes required by the API; multiple scopes can be
        // included, separated by spaces.
        //   var SCOPES = "https://www.googleapis.com/auth/calendar.readonly";
        var SCOPES = 'https://www.googleapis.com/auth/calendar';


        var authorizeButton = document.getElementById('authorize_button');
        var signoutButton = document.getElementById('signout_button');
        var newRecapButton = document.getElementById('new_recap');
        /**
         *  On load, called to load the auth2 library and API client library.
         */
        function handleClientLoad() {
            gapi.load('client:auth2', initClient);
        }

        /**
         *  Initializes the API client library and sets up sign-in state
         *  listeners.
         */
        function initClient() {
            gapi.client.init({
                apiKey: API_KEY,
                clientId: CLIENT_ID,
                discoveryDocs: DISCOVERY_DOCS,
                scope: SCOPES
            }).then(function () {
                // Listen for sign-in state changes.
                gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

                // Handle the initial sign-in state.
                updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
                authorizeButton.onclick = handleAuthClick;
                signoutButton.onclick = handleSignoutClick;
                newRecapButton.onclick = newRecap;
            }, function (error) {
                appendPre(JSON.stringify(error, null, 2));
            });
        }

        /**
         *  Called when the signed in status changes, to update the UI
         *  appropriately. After a sign-in, the API is called.
         */
        function updateSigninStatus(isSignedIn) {
            if (isSignedIn) {
                authorizeButton.style.display = 'none';
                signoutButton.style.display = 'block';
                newRecapButton.style.display = 'block';

                listUpcomingEvents();
                listCalendar();
            } else {
                authorizeButton.style.display = 'block';
                signoutButton.style.display = 'none';
                newRecapButton.style.display = 'none';
            }
        }

        /**
         *  Sign in the user upon button click.
         */
        function handleAuthClick(event) {
            gapi.auth2.getAuthInstance().signIn();
        }

        /**
         *  Sign out the user upon button click.
         */
        function handleSignoutClick(event) {
            gapi.auth2.getAuthInstance().signOut();
        }

        /**
         * Append a pre element to the body containing the given message
         * as its text node. Used to display the results of the API call.
         *
         * @param {string} message Text to be placed in pre element.
         */
        function appendPre(message) {
            var pre = document.getElementById('content');
            var textContent = document.createTextNode(message + '\n');
            pre.appendChild(textContent);
        }

        /**
         * Print the summary and start datetime/date of the next ten events in
         * the authorized user's calendar. If no events are found an
         * appropriate message is printed.
         */
        function listUpcomingEvents() {
            gapi.client.calendar.events.list({
                'calendarId': 'primary',
                'timeMin': (new Date()).toISOString(),
                'showDeleted': false,
                'singleEvents': true,
                'maxResults': 10,
                'orderBy': 'startTime'
            }).then(function (response) {
                var events = response.result.items;
                appendPre('Upcoming events:');

                if (events.length > 0) {
                    for (i = 0; i < events.length; i++) {
                        var event = events[i];
                        var when = event.start.dateTime;
                        if (!when) {
                            when = event.start.date;
                        }
                        appendPre(event.summary + ' (' + when + ')')
                    }
                } else {
                    appendPre('No upcoming events found.');
                }
            });
        }


        function listCalendar() {
            var request = gapi.client.calendar.calendarList.list();

            request.execute(function (resp) {
                var calendars = resp.items;
                console.log(calendars);
            });
        }

        function newRecapTest() {
            let whatYouLearn = document.getElementById('what_you_learn').value;
            console.log('whatYouLearn', whatYouLearn);
            let startDate = document.getElementById('start_date').value;
            console.log('startDate', startDate);
            let hour = document.getElementById('hour').value;
            console.log('hour:', hour)
            let notes = document.getElementById('notes').value;
            console.log('notes', notes);
            let emailConfirmation = document.getElementById('email_confirmation').value;
            console.log('emailConfirmation', emailConfirmation);
        }

        function newRecap() {
            let whatYouLearn = document.getElementById('what_you_learn').value;
            console.log('whatYouLearn', whatYouLearn);
            let startDate = document.getElementById('start_date').value;
            console.log('startDate', startDate);
            let startTime = document.getElementById('start_time').value;
            console.log('startTime', startTime)
            let notes = document.getElementById('notes').value;
            console.log('notes', notes);
            let emailConfirmation = document.getElementById('email_confirmation').value;
            console.log('emailConfirmation', emailConfirmation);

            let startDateTime = startDate + 'T' + startTime + '+01:00';
            console.log('startDateTime:', startDateTime)
            //END HERE 
            let extraHour = startTime;

            let myTime = new Date();
            console.log(myTime.getTimezoneOffset())

            let convertDateStart = new Date(startDateTime);
            console.log('convertDateStart:', convertDateStart)
            let convertDateEnd = convertDateStart;
            console.log('convertDateEnd:', convertDateEnd.toISOString());
            converDateEnd = convertDateEnd.setMinutes(convertDateEnd.getMinutes() + 15);
            console.log('convertDateEnd:', convertDateEnd.toISOString());

            function ISODateString(d) {
                function pad(n) { return n < 10 ? '0' + n : n }
                return d.getUTCFullYear() + '-'
                    + pad(d.getUTCMonth() + 1) + '-'
                    + pad(d.getUTCDate()) + 'T'
                    + pad(d.getUTCHours()) + ':'
                    + pad(d.getUTCMinutes()) + ':'
                    + pad(d.getUTCSeconds()) + '+01:00'
            }
            
            console.log('ISODateString(convertDateStart)', ISODateString(convertDateStart))
            


            recapDayBreak.map(dayBreak => {

            })
            

        }

   

    async defer src="https://apis.google.com/js/api.js" onload="this.onload=function(){};handleClientLoad()"
        onreadystatechange="if (this.readyState === 'complete') this.onload()"





