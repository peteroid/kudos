// This is called with the results from from FB.getLoginStatus().
function fblogin() {
    FB.login(function(response) {
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
        $('.fblogin').hide();
        FB.api('/me?fields=id,name,email,permissions', function (response) {
            var fbname = response.name;
            var fbid = response.id;
            var fbemail = response.email;
            var fbDataString = 'fbname=' + fbname + '&fbid=' + fbid + '&fbemail=' + fbemail;
            $.ajax({
                type: "POST",
                data: fbDataString,
                url: "fb/fblogin.php",
                success: function(data) {
                    console.log('Ajax submit succeeded: ' + data);
                    $('.fbid').html(function(){
                        return fbid;
                    });
                    kudos();
                },
                error: function(data) {
                    console.log('Ajax submit failed: ' + data);
                }
            });
        });
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
        $('.fblogin').show();
        $('.kudosheart').click(function(e){
            e.preventDefault;
            FB.login(function(response) {
                if (response.authResponse) {
                    window.location.reload();
                }
            }, {scope: 'public_profile,email'});
            
        });
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
        $('.fblogin').show();
        $('.kudosheart').click(function(e){
            e.preventDefault;
            FB.login(function(response) {
                if (response.authResponse) {
                    window.location.reload();
                }
            }, {scope: 'public_profile,email'});
        });
    }
    }, {scope: 'public_profile,email'});
}

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {
    FB.getLoginStatus(function(response) {
    });
}

window.fbAsyncInit = function() {
FB.init({
    appId      : '415900055262325',
    cookie     : true,  // enable cookies to allow the server to access 
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.2' // use version 2.2
});

// Now that we've initialized the JavaScript SDK, we call 
// FB.getLoginStatus().  This function gets the state of the
// person visiting this page and can return one of three states to
// the callback you provide.  They can be:
//
// 1. Logged into your app ('connected')
// 2. Logged into Facebook, but not your app ('not_authorized')
// 3. Not logged into Facebook and can't tell if they are logged into
//    your app or not.
//
// These three cases are handled in the callback function.

FB.getLoginStatus(function(response) {
    fblogin(response);
    });
};

// Load the SDK asynchronously
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
