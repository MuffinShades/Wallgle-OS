//app ghost thing

function ghost(e) {
    let clone = e.cloneNode(true);
    if (clone) {
        document.getElementById('ghost-con').appendChild(clone);
    }

    //adjusting to make ghost
    clone.style.opacity = '50%';
    clone.style.background = 'none';
    clone.style.border = 'none';
    clone.style['z-index'] = '-1';
    clone.style.transition = 'none';
    clone.style.top = parseInt(e.style.top) + 'px';
    clone.style.left = parseInt(e.style.left) + 'px';
    return clone;
}

var ghost_id = 0;
var dragging = false;
var dragGhost = void 0;
var offX = 0;
var offY = 0;
var cal = false;
var dragLook = false;
var di = 0;

function dragStart(id) {
    dragLook = true;
    di = id;
}

function dragEnd() {
    let  kids = document.getElementById('app-box').children;
    let good = 0;
    for (let i = 0; i < kids.length; i++) {
        //console.log(i+'  '+parseInt(kids[i].style.top)+'   '+(Math.round(parseInt(dragGhost.style.top) / 82) *82+5)+'   '+parseInt(kids[i].style.left)+'   '+(Math.round(parseInt(dragGhost.style.left) / 73) *73+5));
        if (parseInt(kids[i].style.top) != Math.round(parseInt(dragGhost.style.top) / 82) *82+5 || parseInt(kids[i].style.left) != Math.round(parseInt(dragGhost.style.left) / 73) *73+5) {
            good++;
        } else if (kids[i].id == 'apps_'+ghost_id) {
            good++;
        }
    }
    if (good >= kids.length) {
        //document.getElementById('app_'+ghost_id).style.transition = 'none';
        document.getElementById('app_'+ghost_id).style.top = Math.round(parseInt(dragGhost.style.top) / 82) *82+5 + 'px';
        document.getElementById('app_'+ghost_id).style.left = Math.round(parseInt(dragGhost.style.left) / 73) *73+5 + 'px';
        //document.getElementById('app_'+ghost_id).style.transition = 'all ease-in-out 0.05s';
    }
    dragging = false;
    dragGhost.parentNode.removeChild(dragGhost);
    //dragGhost = void(0);
    offX = 0;
    offY = 0;
}

mouseup.push(function(e) {
    dragLook = false;
    if (dragging) {
        dragEnd();
    }
});
mousemove.push(function(e) {
    if (dragging) {
        if (dragGhost) {
            if (cal == true) {
                //offSets
                offY = parseInt(dragGhost.style.top) - e.pageY;
                offX = parseInt(dragGhost.style.left) - e.pageX;

                cal=false;
            }

            /*console.log(dragGhost.style.top);
            console.log(offY+'   '+offX);*/

            dragGhost.style.top = (e.pageY + offY) + 'px';
            dragGhost.style.left = (e.pageX + offX) + 'px';
        }
    }
    if (dragLook == true) {
        ghost_id = di;
        let drag = ghost(document.getElementById('app_'+di));
        dragging = true;
        dragGhost = drag;
        cal = true;
        dragLook = false;
    }
});