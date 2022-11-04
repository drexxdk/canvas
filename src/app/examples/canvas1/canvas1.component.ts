import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';

interface Mouse {
  x: number;
  y: number;
}

class Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  ctx: CanvasRenderingContext2D;
  fillStyle: string;
  strokeStyle: string;
  lineWidth: number;

  constructor(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    fillStyle: string,
    strokeStyle: string,
    lineWidth: number,
    mouse?: Mouse
  ) {
    this.ctx = ctx;
    this.x = mouse?.x ?? Math.random() * canvas.width; //mouse?.x || canvas.width / 2;
    this.y = mouse?.y ?? Math.random() * canvas.height; //mouse?.y || canvas.height / 2;
    this.size = Math.random() * 15 + 1; // 1 to 16
    this.speedX = Math.random() * 3 - 1.5; // -1 to +1
    this.speedY = Math.random() * 3 - 1.5; // -1 to +1
    this.fillStyle = fillStyle;
    this.strokeStyle = strokeStyle;
    this.lineWidth = lineWidth;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.2) {
      this.size -= 0.1;
    }
  }

  draw() {
    this.ctx.fillStyle = this.fillStyle;
    this.ctx.strokeStyle = this.strokeStyle;
    this.ctx.lineWidth = this.lineWidth; // adds to inside and outside of element
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    this.ctx.fill(); // background color
    this.ctx.stroke(); // line color
  }
}

@Component({
  selector: 'app-canvas1',
  templateUrl: './canvas1.component.html',
  styleUrls: ['./canvas1.component.scss'],
})
export class Canvas1Component implements AfterViewInit {
  canvas?: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null = null;
  mouse?: Mouse;
  particles: Particle[] = [];
  hue: number = 0;

  @ViewChild('domCanvas') domCanvas!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit(): void {
    if (!this.domCanvas) {
      return;
    }
    this.canvas = this.domCanvas.nativeElement;
    if (!this.canvas) {
      return;
    }
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.ctx = this.canvas.getContext('2d');
    if (!this.ctx) {
      return;
    }

    this.initParticles();
    this.animate();
  }

  animate = (): void => {
    if (!this.canvas || !this.ctx) {
      return;
    }
    this.ctx.fillStyle = 'rgba(0,0,0,0.1)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.handleParticles();
    this.hue += 1;
    requestAnimationFrame(this.animate);
  };

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    if (!this.canvas) {
      return;
    }
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  initParticles(): void {
    if (!this.canvas || !this.ctx) {
      return;
    }
    for (let i = 0; i < 10; i++) {
      this.particles.push(
        new Particle(
          this.canvas,
          this.ctx,
          `hsl(${this.hue}, 100%, 50%)`,
          `hsl(${this.hue + 50}, 100%, 50%)`,
          1,
          this.mouse
        )
      );
    }
  }

  handleParticles(): void {
    if (!this.canvas || !this.ctx) {
      return;
    }
    for (let i = 0; i < this.particles.length; i++) {
      const particle1 = this.particles[i];
      particle1.update();
      particle1.draw();
      for (let j = i; j < this.particles.length; j++) {
        const particle2 = this.particles[j];
        const dx = particle1.x - particle2.x;
        const dy = particle1.y - particle2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 100) {
          this.ctx.beginPath();
          this.ctx.strokeStyle = particle1.strokeStyle;
          this.ctx.lineWidth = particle1.size / 10;
          this.ctx.moveTo(particle1.x, particle1.y);
          this.ctx.lineTo(particle2.x, particle2.y);
          this.ctx.stroke();
        }
      }

      if (particle1.size <= 0.3) {
        this.particles.splice(i, 1);

        this.particles.push(
          new Particle(
            this.canvas,
            this.ctx,
            `hsl(${this.hue}, 100%, 50%)`,
            `hsl(${this.hue + 50}, 100%, 50%)`,
            1,
            this.mouse
          )
        );
      }
    }
  }
}
