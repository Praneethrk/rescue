//
//var DataRef = firebase.database().ref("data/");
//
//DataRef.set(
//{
//    hair : "hello",
//    eyes : "wow"
//}
//);
//
//
//



$(document).ready(function () {

    $("#reqHelp").click(function () {
        firebase.auth().signInAnonymously().catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;

            alert(errorMessage);
        });


        initialize();
        var geocoder;

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
        }
        //Get the latitude and the longitude;
        function successFunction(position) {
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;
            codeLatLng(lat, lng);

//            alert("Your Location has been Noted. Help will arrive soon..");
            $("#reqHelp").click(function () {
                $('#resque').modal('show');
            });
        }
    });


});



function errorFunction() {
    alert("Geocoder failed");
}

function initialize() {
    geocoder = new google.maps.Geocoder();
}

function codeLatLng(lat, lng) {

    var latlng = new google.maps.LatLng(lat, lng);
    geocoder.geocode({
        'latLng': latlng
    }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            if (results[1]) {
                firebase.auth().onAuthStateChanged(function (user) {
                    if (user) {
                        var DataRef = firebase.database().ref("rescuelocation/" + user.uid + "/");

                        DataRef.set({
                            address: results[0].formatted_address

                        });
                    } else {
                       //fuck this part
                    }
                });

            } else {
                alert("No results found");
            }
        } else {
            alert("Geocoder failed due to: " + status);
        }
    });
}

