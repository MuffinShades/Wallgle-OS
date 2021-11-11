var mousedown = [];
var mousemove = [];
var mouseup = [];

document.addEventListener('mousemove', function(e) {
    for (let i = 0; i < mousemove.length; i++) {
        mousemove[i](e);
    }
});
document.addEventListener('mousedown', function(e) {
    for (let i = 0; i < mousedown.length; i++) {
        mousedown[i](e);
    }
});
document.addEventListener('mouseup', function(e) {
    for (let i = 0; i < mouseup.length; i++) {
        mouseup[i](e);
    }
});