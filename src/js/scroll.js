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
const helloWords = helloText.querySelectorAll('span');

for (let i = 0; i < 7; i++) {
    console.log(helloWords[i]);
}

window.addEventListener("scroll", function (event) {
	const scroll = this.scrollY;
    const helloOpacity = 1-scroll/400;
    const skillsTop = skillsRect.top-bodyRect.top-window.innerHeight/2-48;
    const skillsBottom =skillsRect.bottom-bodyRect.top-window.innerHeight/2+48;

    if(helloOpacity>0) {hello.style.opacity = helloOpacity;}
    else {hello.style.opacity = 0;}

    if(scroll>skillsTop && scroll<skillsBottom) {
    	logo.style.fill='#ffffff';
        console.log('White logo');
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