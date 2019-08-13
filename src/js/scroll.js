const helloHeight = document.querySelector('.hello').clientHeight;
const header = document.querySelector('.header');

window.addEventListener("scroll", function (event) {
    const helloHidden = this.scrollY-window.innerHeight/2;
    if(helloHidden > 0) header.classList.remove('header__pinned');
    else {header.classList.add('header__pinned');}
    console.log(helloHidden);
});

// 388 1098 396