import Vector from './Vector.js';
// waarom {} het is geen import default
import { random } from '../functions/lib.js';

class Particle {
    constructor($canvas, mouse, x, y) {
        this.$canvas = $canvas;
        this.ctx = $canvas.getContext(`2d`);
        this.mouse = mouse;

        this.location = new Vector(x, y);
        // startsnelheid van o bij o 
        this.velocity = new Vector(0, 0);
        // versnelling klein in de y-richting/vandaar dat hij naar onder valt 
        this.acceleration = new Vector(0, 0.05);
        // 100 is hier de opacity 
        this.lifespan = 100;
        this.velocity = new Vector(random(-1, 1), random(-1, 1));

    }
    // we geven aan de draw functie de de context meegeven, maar kan ook in de constructor, dus hierboven
    draw(ctx) {
        this.acceleration = Vector.sub(this.mouse, this.location)
            .normalize()
            .mult(Math.random());

        // console.log(this.lifespan);
        // je gaat versnelling op u snelheid steken
        this.velocity.add(this.acceleration);
        // je snelheid op u locatie gaat aanpassen
        this.location.add(this.velocity);

        // 2 bij 2 hoog , 2 bij 2 breed
        ctx.fillRect(this.location.x - 1, this.location.y - 1, 2, 2);

        // fillStyle aanpassen, uw opacity verminderen 
        ctx.fillStyle = `rgba(255, 255, 255, ${this.lifespan / 100})`;

        // lifespan -1 en -- is hetzelfde
        // dus na iedere particle te tekenen gaat hij met 1 verminderen
        this.lifespan--;
    }

    // functie werkt als een property
    get isAlive() {
        return this.lifespan > 0;
    }

}

export default Particle;