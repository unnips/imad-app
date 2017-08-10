// Counter code
var button = document.getElementById('ctrbtn');

button.onclick = function () {
    // Creae a request object
    var request = new XMLHttpRequest();
    
    // Capture the response and store it in a variable
    request.onreadystatechange = function (){
         console.log('Inside function');
        if(request.readyState === XMLHttpRequest.DONE) {
            //Take action
                    console.log('Inside if');
            if (request.status === 200) {
                        console.log('Inside inner loop');
                var counter = request.responseText;
                var span = document.getElementById('count');
                span.innerHTML = counter.toString();
                console.log('Done');
            }
        }
    };
    // Render the variable in the correct span
    request.open('GET', 'http://unni6e.imad.hasura-app.io/counter', true);
    request.send(null);
};

var nameInput = document.getElementById('name');
var name = nameInput.value;
var submit = document.getElementById('submit_btn');

submit.onclick = function () {
    // Make a request to the server and send the name
    var request = new XMLHttpRequest();
    
    // Capture the response and store it in a variable
    request.onreadystatechange = function (){
        console.log('Inside function');
        if(request.readyState === XMLHttpRequest.DONE) {
            //Take action
            if (request.status === 200) {
                var names = request.responseText;
                names = JSON.parse(names);
        
            var list = '';
            for (var i=0; i < names.length; i++)
                list += "<li>"+names[i]+'</li>';
            }
            var ul = document.getElementById('namelist');
            ul.innerHTML = list;
        }
    };
    // Render the variable in the correct span
    request.open('GET', 'http://unni6e.imad.hasura-app.io/submit-names?name', true);
    request.send(null);
};