/*eslint-disable*/
const body = document.body;

body.classList.add('no-cursor');

const lerp = (a, b, n) => (1 - n) * a + n * b;

const getMousePos = (e) => {
    let posx = 0;
    let posy = 0;
    if (!e) e = window.event;
    if (e.pageX || e.pageY) {
        posx = e.pageX;
        posy = e.pageY - window.scrollY;
    }
    else if (e.clientX || e.clientY)    {
        posx = e.clientX + body.scrollLeft + document.documentElement.scrollLeft;
        posy = e.clientY + body.scrollTop + document.documentElement.scrollTop;
    }
    return { x : posx, y : posy }
}


class CursorFx {
    constructor(el) {
        this.DOM = {el};
        this.DOM.dot = this.DOM.el.querySelector('.cursor__inner--dot');
        this.DOM.circle = this.DOM.el.querySelector('.cursor__inner--circle');
        this.bounds = {dot: this.DOM.dot.getBoundingClientRect(), circle: this.DOM.circle.getBoundingClientRect()};
        this.scale = 1;
        this.opacity = 1;
        this.mousePos = {x:800, y:-400}; // set position outside screen
        this.lastMousePos = {dot: {x:0, y:0}, circle: {x:0, y:0}};
        this.lastScale = 1;
        this.lastOpacity = 1;
        
        this.initEvents();
        requestAnimationFrame(() => this.render());
    }

    initEvents() {
        window.addEventListener('mousemove', ev => this.mousePos = getMousePos(ev));
    }

    render() {
        this.lastMousePos.dot.x = lerp(this.lastMousePos.dot.x, this.mousePos.x - 800, 1);
        this.lastMousePos.dot.y = lerp(this.lastMousePos.dot.y, this.mousePos.y + 400, 1);
        this.lastMousePos.circle.x = lerp(this.lastMousePos.circle.x, this.mousePos.x-4-800, 0.15);
        this.lastMousePos.circle.y = lerp(this.lastMousePos.circle.y, this.mousePos.y-4+400, 0.15);
        this.lastScale = lerp(this.lastScale, this.scale, 0.15);
        this.lastOpacity = lerp(this.lastOpacity, this.opacity, 0.1);
        this.DOM.dot.style.transform = `translateX(${(this.lastMousePos.dot.x)}px) translateY(${this.lastMousePos.dot.y}px)`;
        this.DOM.circle.style.transform = `translateX(${(this.lastMousePos.circle.x)}px) translateY(${this.lastMousePos.circle.y}px) scale(${this.lastScale})`;
        this.DOM.circle.style.opacity = this.lastOpacity
        requestAnimationFrame(() => this.render());
    }

    enter() {
        this.scale = 1.5;
        this.DOM.dot.style.background = "#0000ff";
    }

    leave() {
        this.scale = 1;
        this.DOM.dot.style.background = "#ff5500";
    }

    click() {
        this.lastScale = 1;
        this.lastOpacity = 0;
    }
}

const cursor = new CursorFx(document.querySelector('.cursor'));
[...document.querySelectorAll('[data-hover]')].forEach((link) => {
    link.addEventListener('mouseenter', () => cursor.enter() );
    link.addEventListener('mouseleave', () => cursor.leave() );
    link.addEventListener('click', () => cursor.click() );
});
