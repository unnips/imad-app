console.log('Loaded!');

var element = document.getElementById('Unique-ID');

element.innerHTML = 'New Value';

var img =  document.getElementById('madi');
var marginLeft = 0;
function moveRight() {
    marginLeft = marginLeft + 1;
    img.style.marginLeft = marginLeft + 'px';
    if (marginLeft == 600)
    {
       return;
    }
}

img.onclick = function () {
    var interval = setInterval(moveRight, 50);
};