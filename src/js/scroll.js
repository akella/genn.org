const hello = document.querySelector('.hello');
const header = document.querySelector('.header');
const headerWelcome = document.querySelector('.header__text__welcome');
const logo = document.querySelector('.logo');

const skillsRect = document.querySelector('.skills').getBoundingClientRect();
const clientsRect = document.querySelector('.clients').getBoundingClientRect();
const industriesRect = document.querySelector('.industries').getBoundingClientRect();
const contactRect = document.querySelector('.contact').getBoundingClientRect();


window.addEventListener("scroll", function (event) {
	const scroll = this.scrollY;
    // const helloHidden = this.scrollY-window.innerHeight/2;
/*    if(helloHidden > 0) {
    	header.classList.remove('header__pinned');
    } else {
    	header.classList.add('header__pinned');
    } */

    const helloOpacity = 1-scroll/400;

    if(helloOpacity>0) {hello.style.opacity = helloOpacity;}
    else {hello.style.opacity = 0;}



    if(scroll>skillsRect.top-window.innerHeight/2-48 && scroll<skillsRect.bottom-window.innerHeight/2+48) {
    	logo.style.fill='#ffffff';
    } else logo.style.fill='#ff5500';

    if(scroll<skillsRect.top){
    	headerWelcome.innerText='Hello, I am Genn';
//    	if(helloHidden > 0) logo.style.fill='white';
//    	else logo.style.fill='#ff5500';
    } else if(scroll>=skillsRect.top && scroll<clientsRect.top){
    	headerWelcome.innerText='Designing Stuff';
//    	logo.style.fill='#ff5500';
    } else if(scroll>=clientsRect.top && scroll<industriesRect.top){
    	headerWelcome.innerText='Challenges hungry';
    } else if(scroll>=industriesRect.top && scroll<contactRect.top){
    	headerWelcome.innerText='Love to communicate';
    } else if(scroll>=contactRect.top) {
    	headerWelcome.innerText='Cheers, Genn';
    }
});