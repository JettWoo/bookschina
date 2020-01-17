/* 计算元素e的视口坐标 */
function getElementClientPos(elt) {
    var x = 0,
        y = 0;
    //循环以累加偏移量
    for (var e = elt; e != null; e = e.offsetParent) {
        x += e.offsetLeft;
        y += e.offsetTop;
    }

    //再次循环所有祖先元素，减去滚动的偏移量
    for (var e = elt.parentNode; e != null && e.nodeType == 1; e = e.parentNode) {
        x -= e.scrollLeft;
        y -= e.scrollTop;
    }
    return {
        x: x,
        y: y
    }
}


export {
    getElementClientPos
}