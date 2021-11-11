/* 
    Context Menu Code

    Coded by James Weigand
*/

var mx = 0;
var my =  0;
var ctxHov = false;

var appId = -1;
var recentAppId = -1;

var ctxOpen = false;

var extras = document.querySelectorAll('.extra-ctx');

extras = Array.from(extras);

mousedown.push(function(e) {
    mx = e.pageX;
    my = e.pageY;
    if (!ctxHov) {
        closeCtxMen();
    }
});

mousemove.push(function(e) {
    mx = e.pageX;
    my = e.pageY;
});

mouseup.push(function(e) {
    mx = e.pageX;
    my = e.pageY;
});

window.addEventListener('contextmenu', function(e) {
    e.preventDefault();

    ctxHov = true;

    let m = document.getElementById('ctx-menu');

    m.style.top = my + 'px';
    m.style.left = mx + 'px';

    /*m.style.display = 'block';*/
    m.style.opacity = 1;

    //display extra optinos if a app
    if (appId == 0) {
        for (let i = 0; i < extras.length; i++) {
            if (extras[i].id && extras[i].id.toString().replace('type_', '') == 'app') {
                extras[i].style.display = 'block';
            }
        }
    }
});

function closeCtxMen() {
    let m = document.getElementById('ctx-menu');
    /*m.style.display = 'none';*/
    m.style.opacity = 0;
    for (let i = 0; i < extras.length; i++) {
        extras[i].style.display = 'none';
    }

    m.style.top = '-100px';
}

function ctxEnter(id) {
    appId = id;
    recentAppId = id;
}

function ctxLeave(id) {
    setTimeout(function (){
        if (appId == id && !ctxOpen) {
            appId = -1;
        }
    });
}

setTimeout(function() {
    closeCtxMen();
},10);

//context menu functions
function openCurApp() {
    if (recentAppId >= 0 ) {
        document.getElementById('app_'+recentAppId).ondblclick();
        closeCtxMen();
    }
}
let dg = 1;
function flipOut() {
    setInterval(function() {
        document.body.style['transform-origin'] = 'auto 50%';
        document.body.style.MozTransform = 'rotate('+dg+'deg)';
   document.body.style['-webkit-transform'] = 'rotate('+dg+'deg)';
   dg += 0.1;
    },1);
}