console.log('Loaded!');

var element = document.getElementById('Unique-ID');

element.innerHTML = 'New Value';

var img =  document.getElementById('madi');
function moveRight() {
    marginLeft = marginLeft + 10;
    img.style.marginLeft = marginLeft + 'px';
    
}

img.onclick = function () {
    var interval = setInterval(moveRight, 50);
};