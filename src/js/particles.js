import {TimelineMax} from 'gsap';
import Particle from './Particle';

const touchDevice = ("ontouchstart" in document.documentElement);

function loadImages(paths, whenLoaded) {
    const imgs = [];
    const imgO = []
    paths.forEach(function (path) {
        const img = new Image();
        img.onload = function () {
            imgs.push(img);
            imgO.push({path,img});
            if (imgs.length === paths.length) whenLoaded(imgO);
        };
        img.src = path;
    });
}

function inArray(target, array)
{

/* Caching array.length doesn't increase the performance of the for loop on V8 (and probably on most of other major engines) */

  for(let i = 0; i < array.length; i++) 
  {
    if(array[i] === target)
    {
      return true;
    }
  }

  return false; 
}

const unique = function(array) {
    const a = array.concat();
    for(let i=0; i<a.length; i+=1) {
        for(let j=i+1; j<a.length; j+=1) {
            if(a[i] === a[j])
                a.splice(j-=1, 1);
        }
    }

    return a;
};

export default class Sketch {
    constructor() {
        this.selector = '.fontain'
        this.number = 100;
        this.time = 0;
        this.parent = document.querySelector(this.selector);

        this.canvas = document.createElement('canvas');
        this.parent.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.active = false;

        this.particles = [];
        this.source = {
            x: this.width / 2,
            y: this.height
        };
        

        this.canvas.width = this.width;
        this.canvas.height = this.height;


        this.mouseOverItems = document.querySelectorAll('[data-img]');
        this.mouseOverItems = [...this.mouseOverItems]

        this.imageArray = []
        this.currentImageArray = [];
        this.mouseOverItems.forEach(e=>{
        	this.imageArray = this.imageArray.concat(JSON.parse(e.getAttribute('data-img')))
        })


        loadImages(unique(this.imageArray), (images) => {
        	console.log(images);
        	this.images = images;
            this.img = images[0].img;

            this.resize();
            this.mouse();
            this.mouseOver();
            this.addParticles();
            this.animate();

        })


    }

    mouseOver(){
        if(!touchDevice) {
        	this.mouseOverItems.forEach(e=>{
        		e.addEventListener('mouseenter',()=>{
        			const currentArray = JSON.parse(e.getAttribute('data-img'));
        			const currentPaths = this.images.filter(v=>{
        				 return inArray(v.path,currentArray)
        			});

        			this.currentImageArray = currentPaths.map(a=>a.img);
        			this.active = true;
        			this.time = 0;
        		})

        		e.addEventListener('mouseout',()=>{
        			this.active = false;

        		})
        	})
        }
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
                new Particle(this.img, this.width, this.height, this.number)
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
            	// eslint-disable-next-line
            	if(this.active) {
            		const newimg = this.currentImageArray[Math.floor(Math.random() * this.currentImageArray.length)]
            		this.particles[i].shoot(this.source, this.time, newimg);
            	} else{
            		// console.log('not active');
            	}
            }
        }
        const newar = this.particles.filter(e=>e.active);


        window.requestAnimationFrame(this.animate.bind(this))
    }
}

const b = new Sketch();