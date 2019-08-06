const headerText = document.querySelector('.header__text');
const headerLogo = document.querySelector('.header__logo');
const headerCV = document.querySelector('.header__cv');
const skills = document.querySelector('.skills');


function handler(entries) {
  const entry = entries;
    console.log(entry);

    alert(entry.getBoundingRect());

}


const observer = new IntersectionObserver(handler);
observer.observe(skills);