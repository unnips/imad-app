// Submit username password to login
submit.onclick = function () {
    // Make a request to the server and send the name
    var request = new XMLHttpRequest();
    
    // Capture the response and store it in a variable
    request.onreadystatechange = function (){
        if(request.readyState === XMLHttpRequest.DONE) {
            //Take action
            if (request.status === 200) {
                console.log('User logged in');
                alert('Logged in Successfully');
            } else if (request.status === 403) {
                alert ('Username/Password is incorrect');
            } else if (request.statuts === 500) {
                alert('Something went wrong on the server');
            }
        }
    };
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    console.log(username);
    console.log(password);
    // Render the variable in the correct span
    request.open('POST', 'http://unni6e.imad.hasura-app.io/login', true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify({username: username, password: password}));
};