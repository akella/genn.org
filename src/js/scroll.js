const hello = document.querySelector('.hello');
const header = document.querySelector('.header');
const headerWelcome = document.querySelector('.header__text__welcome');
const logo = document.querySelector('.logo');

const skillsRect = document.querySelector('.skills').getBoundingClientRect();
const clientsRect = document.querySelector('.clients').getBoundingClientRect();
const industriesRect = document.querySelector('.industries').getBoundingClientRect();
const contactRect = document.querySelector('.contact').getBoundingClientRect();
const bodyRect = document.body.getBoundingClientRect();

const helloText = document.querySelector('.hello__text');

window.addEventListener("scroll", function (event) {
	const scroll = this.scrollY;
    const helloOpacity = 1-scroll/600;
    const skillsTop = skillsRect.top-bodyRect.top-window.innerHeight/2-48;
    const skillsBottom =skillsRect.bottom-bodyRect.top-window.innerHeight/2+48;

    if(helloOpacity>0) {
        // if(hello.style.visibility === "hidden") hello.style.visibility = "visible";
            hello.style.opacity = helloOpacity;
            helloText.style.transform = `translateZ(${(1-helloOpacity)*-40}px)`;
    } else {
            hello.style.opacity = 0;
        //    hello.style.visible = "hidden";
    }

    if(scroll>skillsTop && scroll<skillsBottom) {
    	logo.style.fill='#ffffff';
    } else logo.style.fill='#ff5500';

    if(scroll<skillsRect.top-bodyRect.top){
    	headerWelcome.innerText='Hello, I am Genn';;
    } else if(scroll>=skillsRect.top-bodyRect.top && scroll<clientsRect.top-bodyRect.top){
    	headerWelcome.innerText='Designing Stuff';
    } else if(scroll>=clientsRect.top-bodyRect.top && scroll<industriesRect.top-bodyRect.top){
    	headerWelcome.innerText='Challenges hungry';
    } else if(scroll>=industriesRect.top-bodyRect.top && scroll<contactRect.top-bodyRect.top){
    	headerWelcome.innerText='Love to communicate';
    } else if(scroll>=contactRect.top-bodyRect.top) {
    	headerWelcome.innerText='Cheers, Genn';
    }
});