  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAUdN3-2M73hU0SNFUf9IOGtvc5RVSyVGc",
    authDomain: "mtspushservice.firebaseapp.com",
    databaseURL: "https://mtspushservice.firebaseio.com",
    projectId: "mtspushservice",
    storageBucket: "mtspushservice.appspot.com",
    messagingSenderId: "132210475600",
    appId: "1:132210475600:web:17ebd2b4fde3e8c6"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// Customize notification handler
messaging.setBackgroundMessageHandler(function(payload) {
  console.log('Handling background message', payload);

  // Copy data object to get parameters in the click handler
  payload.data.data = JSON.parse(JSON.stringify(payload.data));

  return self.registration.showNotification(payload.data.title, payload.data);
});

self.addEventListener('notificationclick', function(event) {
  const target = event.notification.data.click_action || '/';
  event.notification.close();

  // This looks to see if the current is already open and focuses if it is
  event.waitUntil(clients.matchAll({
    type: 'window',
    includeUncontrolled: true
  }).then(function(clientList) {
    // clientList always is empty?!
    for (var i = 0; i < clientList.length; i++) {
      var client = clientList[i];
      if (client.url === target && 'focus' in client) {
        return client.focus();
      }
    }

    return clients.openWindow(target);
  }));
});
