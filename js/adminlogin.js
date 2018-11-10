function login() {
    var email = document.getElementById('email_id').value;
    var pass = document.getElementById('pass_id').value;

    var user = firebase.auth().currentUser;
    if (user) {

        firebase.auth().signOut().then(function () {
            console.log('Signed Out');
        }, function (error) {
            console.error('Sign Out Error', error);
        });
    }


    firebase.auth().signInWithEmailAndPassword(email, pass).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        alert(errorMessage);
    });

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            window.location.href = "adminPage.html";
            // ...
        } else {
            // User is signed out.
            // ...
            console.log("unable to sign in");
        }
    });
}

$(document).ready(function(){
    var database = firebase.database();
     var victimRef = database.ref('rescuelocation');
    victimRef.on('value', function (snapshot) {
        var data = "<table class='table table-striped table-bordered table-hover'><thead class='bg-dark text-white'><th>Rescue requests</th><thead><tbody>";
        var count=0;
        snapshot.forEach(function (childSnapshot) {
         
            data += "<tr><td>"+JSON.stringify(childSnapshot.val().address)+"</td></tr>";
          
            count++;
        });
        data += "</body></table>";
          $("#hello").html(data);
        data = "<div class='col-md-12 mt-5 bg-dark text-white'><center><label>PEOPLE REQUESTING FOR HELP : </label> "+count+"</center></div>";
        $("#hello").append(data);
    });

});

