

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

user_name=localStorage.getItem("user_name");
document.getElementById("user_name").innerHTML="Welcome" + user_name + "!"

function addRoom()
{

room_name=document.getElementById("room_name").value;
firebase.database().ref("/").child(room_name).update({
purpose: "adding room name"
});
localStorage.setItem("room_name",room_name);

window.location="kwitter_page.html"
}


function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
       Room_names = childKey;
      //Start code
console.log(Room_names);
row="<div class='room_name' id=" + Room_names + "onclick='redirectToRoomName(this.id)'> #" + Room_names + "</div> <hr>"
document.getElementById("output").innerHTML += row    
      //End code
      });});}
getData();

function redirectToRoomName(name)
{

console.log(name);

localStorage.setItem("room_name", name);

window.location="kwitter_page.html";


}

function logout() {

      localStorage.removeItem("user_name")
      localStorage.removeItem("room_name")
      window.location="index.html"
      }