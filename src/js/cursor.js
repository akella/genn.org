const body = document.querySelector('body');
const cursorCover = document.querySelector('.cursor');
const cursorPoint = document.querySelector('.cursor__point');
const cursorFrame = document.querySelector('.cursor__frame');

const getMousePos = (e) => {
    let posx = 0;
    let posy = 0;
    const offscreen = 100;

    if (e.pageX || e.pageY) {
        posx = e.pageX;
        posy = e.pageY;
    }
/*    else if (e.screenX || e.screenY) {
        posx = e.screenX; 
        posy = e.screenY;
    } */

    posx-=document.documentElement.scrollLeft;
    posy-=document.documentElement.scrollTop;

    cursorPoint.style.transform = `translate(${posx+offscreen-4}px,${posy+offscreen-4}px)`;
    cursorFrame.style.transform = `translate(${posx+offscreen-12}px,${posy+offscreen-12}px)`;
    return { x : posx, y : posy }
}

window.addEventListener('mousemove', getMousePos);