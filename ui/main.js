// Counter code
var button = document.getElementById('ctrbtn');

button.onclick = function () {
    // Creae a request object
    var request = new XMLHttpRequest();
    
    // Capture the response and store it in a variable
    request.onreadystatechange = function (){
        if(request.readystat === XMLHttpRequest.DONE) {
            //Take action
            if (request.status === 200) {
                var counter = request.responseText;
                var span = document.getElementById('count');
                span.innerHTML = counter.toString();
                console.log(counter);
            }
        }
    };
    // Render the variable in the correct span
    request.open('GET', 'http://unni6e.imad.hasura-app.io/counter', true);
    request.send(null);
};