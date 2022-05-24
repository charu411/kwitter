//YOUR FIREBASE LINKS

var firebaseConfig = {
      apiKey: "AIzaSyB551w7JZBMuswmV9hYfARyZNFhWYL0vCQ",
      authDomain: "kwitter-91911.firebaseapp.com",
      databaseURL: "https://kwitter-91911-default-rtdb.firebaseio.com",
      projectId: "kwitter-91911",
      storageBucket: "kwitter-91911.appspot.com",
      messagingSenderId: "881817927858",
      appId: "1:881817927858:web:f42d908ca3f042b24ec9ab"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name")
room_name = localStorage.getItem("room_name");

function send() {

      msg = document.getElementById("msg").value;
      firebase.database().ref(room_name).push({

            name: user_name,
            message: msg,
            like: 0
      });
      document.getElementById("msg").value = " ";
}

function getData() {
      firebase.database().ref("/" + room_name).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  childData = childSnapshot.val();
                  if (childKey != "purpose") {
                        firebase_message_id = childKey;
                        message_data = childData;
                        //Start code
                        console.log(firebase_message_id)
                        console.log(message_data);
                        name = message_data['name'];
                        message = message_data['message'];
                        like = message_data['like'];
                        row = "<h4> " + name + "<img class='user_tick' src='tick.png'></h4><h4 class='message_h4'>" + message + "</h4><button class='btn btn-warning' id='" + firebase_message_id + "' value='" + like + "' onclick='updateLike(this.id)'><span class='glyphicon glyphicon-thumbs-up'>Like: " + like + "</span></button><hr>";
                        
                        document.getElementById("output").innerHTML += row

                        //End code
                  }
            });
      });
}
getData();

function updateLike(message_id) {

      console.log(message_id)
      button_id = message_id
      like = document.getElementById(button_id).value
      updated_likes = Number(like) + 1
      firebase.database().ref(room_name).child(message_id).update({
            like: updated_likes
      })
}

function logout() {

      localStorage.removeItem("user_name")
      localStorage.removeItem("room_name")
      window.location.replace("index.html")
}