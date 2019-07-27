import Particle from './Particle';

function loadImages(paths, whenLoaded) {
    const imgs = [];
    paths.forEach(function (path) {
        const img = new Image();
        img.onload = function () {
            imgs.push(img);
            if (imgs.length === paths.length) whenLoaded(imgs);
        };
        img.src = path;
    });
}

export default class Sketch {
    constructor() {
        this.selector = '.fontain'
        this.time = 0;
        this.parent = document.querySelector(this.selector);

        this.canvas = document.createElement('canvas');
        this.parent.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.particles = [];
        this.source = {
            x: this.width / 2,
            y: this.height
        };
        this.number = 100;

        this.canvas.width = this.width;
        this.canvas.height = this.height;

        loadImages(['img/emoji.png'], (images) => {
            this.img = images;

            this.resize();
            this.mouse();
            this.addParticles();
            this.animate();

        })


    }

    mouse() {
        const that = this;
        document.addEventListener('mousemove', function (e) {

            /* move x coordinate of particle fountain source */
            that.source.x = e.clientX;
            that.source.y = e.clientY;
        }, false);
    }


    resize() {
        window.addEventListener('resize', () => {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.canvas.style.width = this.width;
            this.canvas.style.height = this.height;
            this.particles.forEach(p=>{
            	const newp = p;
            	newp.width = this.width;
            	newp.height = this.height;
            })
        })
    }

    addParticles() {
        for (let i = 0; i < this.number; i++) {
            this.particles.push(
                new Particle(this.img[0], this.width, this.height, this.number)
            );
        }
    }

    animate() {
        this.time += 1;
        this.ctx.clearRect(0, 0, this.width, this.height);



        for (let i = 0; i < this.number; i++) {
            if (this.particles[i].active) { // if it's active
                this.particles[i].draw(this.ctx); // draw it on canvas
            } else { // if not...
                this.particles[i].shoot(this.source, this.time); // try to make it shoot up
            }
        }
        const newar = this.particles.filter(e=>e.active);


        window.requestAnimationFrame(this.animate.bind(this))
    }
}

const b = new Sketch();