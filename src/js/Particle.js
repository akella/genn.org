const rand = function (max, min, _int) {
    const defmax = (max === 0 || max) ? max : 1;
    const defmin = min || 0;
    const gen = defmin + (defmax - defmin) * Math.random();

    return (_int) ? Math.round(gen) : gen;
};
const PI = 3.1415;

export default class Particle {
    constructor(img, w, h, number) {
        this.size = 40;
        this.w = w;
        this.h = h;
        this.img = img;
        this.active = false;
        this.number = number;
        

        this.delay = rand(this.number, .2, 1)*5;
        // console.log(this.delay);
        // this.delay = delay;
    }

    shoot(source, t, img) {
        this.source = source;
        this.t = t;
        this.img = img;
        /* check if time for shooting this particle has arrived */
        if (this.t - this.delay >= 0) {
            /* make it active */
            this.active = true;

            /* position it at the fountain source, 
             * but a bit lower, depending on its radius
             */
            this.pos = {
                x: this.source.x + rand(-10, 10),
                y: this.source.y - 12
            };

            /*
             * give it an acceleration considering gravity
             * and uniform friction (depending on its radius)
             */
            this.a = {
                x: 0,
                y: .3
            };

            /* generate a random angle at which it shoots up */
            this.angle = rand(PI / 8, -PI / 8) - PI / 2;

            /* Set up our confetti particle angle */
            this.c_angle = 0;
            this.angle_v = rand(-10, 10);

            /* generate random velocity absolute value in that direction */
            const h = 300;
            const val = rand(h / 21, h / 60);

            /* compute initial velocity components */
            this.v = {
                x: val * Math.cos(this.angle),
                y: val * Math.sin(this.angle)
            };
        }
    }

    update() {
        this.v.x += this.a.x;
        this.v.y += this.a.y;
        this.pos.x += Math.round(this.v.x);
        this.pos.y += Math.round(this.v.y);
        this.c_angle += this.angle_v;
        const w = this.width;
        const h = this.height;

        /* if it has landed = it's below canvas bottom edge */
        if (this.pos.y > this.h || this.pos.x < 0 || this.pos.x > this.w) {
            /* reset position to the initial one */
            this.pos = {
                x: this.source.x,
                y: this.source.y
            };
            /* ... and make this particle inactive */
            this.active = false;
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.pos.x, this.pos.y);
        ctx.rotate(this.c_angle * Math.PI / 180);
        ctx.drawImage(this.img, -this.size / 2, -this.size / 2, this.size, this.size);
        ctx.restore();

        this.update();
    }
}