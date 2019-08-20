/* eslint-disable */
import {TweenMax,TimelineMax,Power1, Expo, Sine} from 'gsap';


console.log(Power1);

const {body} = document;
const docEl = document.documentElement;

const lineEq = (y2, y1, x2, x1, currentVal) => {
    // y = mx + b 
    const m = (y2 - y1) / (x2 - x1); const b = y1 - m * x1;
    return m * currentVal + b;
};

const lerp = (a,b,n) => (1 - n) * a + n * b;

const distance = (x1,x2,y1,y2) => {
    const a = x1 - x2;
    const b = y1 - y2;
    return Math.hypot(a,b);
};

const getMousePos = (e) => {
    let posx = 0;
    let posy = 0;
    if (!e) e = window.event;
    if (e.pageX || e.pageY) {
        posx = e.pageX;
        posy = e.pageY;
    }
    else if (e.clientX || e.clientY) 	{
        posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    return { x : posx, y : posy }
}

let winsize;
const calcWinsize = () => winsize = {width: window.innerWidth, height: window.innerHeight};
calcWinsize();
window.addEventListener('resize', calcWinsize);

const feDisplacementMapEl = document.querySelector('feDisplacementMap');

class Menu {
    constructor() {
        this.DOM = {
            svg: document.querySelector('svg.distort'),
            menu: document.querySelector('.js-imagelink')
        };
        this.DOM.imgs = [...this.DOM.svg.querySelectorAll('g > image')];
        this.DOM.menuLinks = [...document.querySelectorAll('.js-imagelink')];
        this.mousePos = {x: winsize.width/2, y: winsize.height/2};
        this.lastMousePos = {
            translation: {x: winsize.width/2, y: winsize.height/2},
            displacement: {x: 0, y: 0}
        };
        this.dmScale = 0;

        this.current = -1;
        
        this.initEvents();
        requestAnimationFrame(() => this.render());
    }

    initEvents() {
        window.addEventListener('mousemove', ev => this.mousePos = getMousePos(ev));

        this.DOM.menuLinks.forEach((item, pos) => {

            const mouseenterFn = () => {
                this.current = pos;
                console.log('enter');
                console.log(this.DOM.imgs[this.current]);
                TweenMax.to(this.DOM.imgs[this.current], 0.5, {
                    ease: Power1.easeOut,
                    opacity: 1
                });
                

            };

            const mouseleaveFn = () => {
                console.log('leave');
                TweenMax.to(this.DOM.imgs[this.current], 0.5, {ease: Power1.easeOut, opacity: 0});
            };
            item.addEventListener('mouseenter', mouseenterFn);
            item.addEventListener('mouseleave', mouseleaveFn);
        });
    }

    render() {
        this.lastMousePos.translation.x = lerp(this.lastMousePos.translation.x, this.mousePos.x, 0.15);
        this.lastMousePos.translation.y = lerp(this.lastMousePos.translation.y, this.mousePos.y, 0.15);
        this.DOM.svg.style.transform = `translateX(${(this.lastMousePos.translation.x-winsize.width/2)}px) translateY(${this.lastMousePos.translation.y-winsize.height/2}px)`;
        
        // Scale goes from 0 to 50 for mouseDistance values between 0 to 100
        this.lastMousePos.displacement.x = lerp(this.lastMousePos.displacement.x, this.mousePos.x, 0.07);
        this.lastMousePos.displacement.y = lerp(this.lastMousePos.displacement.y, this.mousePos.y, 0.07);
        const mouseDistance = distance(this.lastMousePos.displacement.x, this.mousePos.x, this.lastMousePos.displacement.y, this.mousePos.y);
        this.dmScale = Math.min(lineEq(50, 0, 100, 0, mouseDistance), 50);   
        feDisplacementMapEl.scale.baseVal = this.dmScale;

        requestAnimationFrame(() => this.render());
    }
}

new Menu();