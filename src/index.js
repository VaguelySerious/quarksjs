function random(from, to) {
  return Math.floor(Math.random() * (to - from)) + from;
}

function randomFloat(from, to) {
  return Math.random() * (to - from) + from;
}

function ellipsePerimeter(x, y) {
  const a = Math.max(x, y);
  const b = Math.min(x, y);
  // TODO Better approx
  return 2 * Math.PI * Math.sqrt((a ** 2 + b ** 2) / 2);
}

class QuarkAnimation {
  constructor(options) {
    // TODO ID or Element
    this.canvas = document.getElementById(options.id);
    this.ctx = this.canvas.getContext("2d");
    this.bounds = Object.assign({ w: 100, h: 100 }, options.size || {});
    const size = Math.max(this.bounds.w, this.bounds.h);
    this.size = size;
    this.maxLength = size / 8;

    const count = 200;
    const points = [];
    this.points = points;

    for (let i = 0; i < count; i++) {
      const centerX = random(0, size);
      const centerY = random(0, size);
      const radiusX = random(0, Math.floor(size / 10));
      const radiusY = radiusX;
      // const radiusY = random(0, Math.floor(size / 10));
      const speed = random(size / 100, size / 50);
      const pos = randomFloat(0, 2 * Math.PI);
      const direction = Math.random() >= 0.5 ? 1 : -1;
      const perimeter = Math.PI * radiusX * 2;
      // const perimeter = ellipsePerimeter(point.radiusX, point.radiusY)
      points.push({
        centerX,
        centerY,
        radiusX,
        radiusY,
        speed,
        pos,
        direction,
        perimeter
      });
    }
  }

  tick() {
    this.points.forEach(p => {
      p.x = Math.cos(p.pos) * p.radiusX + p.centerX;
      p.y = Math.sin(p.pos) * p.radiusY + p.centerY;

      const change = p.direction * p.speed;
      p.pos = (p.pos + change / p.perimeter) % 360;
    });
  }

  draw() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, 1000, 1000);
    this.points.forEach(({ x, y }) => {
      ctx.fillRect(x - 1, y - 1, 3, 3);
      this.points.forEach(({ x: x2, y: y2 }) => {
        const distance = Math.sqrt(Math.pow(x - x2, 2) + Math.pow(y - y2, 2));
        const range = this.maxLength - distance;
        const intensity = range * (100 / this.maxLength);
        if (intensity > 0 && intensity < 100) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255,255,255,${intensity / 100})`;
          // ctx.strokeStyle = "#FF0000";
          ctx.moveTo(x, y);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }
      });
    });

    if (this.running) {
      this.tick();
      window.requestAnimationFrame(this.draw.bind(this));
    }
  }

  start() {
    console.log(this);
    this.running = true;
    window.requestAnimationFrame(this.draw.bind(this));
  }

  stop() {
    this.running = false;
  }
}

window.QuarkAnimation = QuarkAnimation;
var quark = new QuarkAnimation({
  id: "canvas",
  size: { w: 300, h: 300 }
});

document
  .getElementById("start")
  .addEventListener("click", quark.start.bind(quark));
document
  .getElementById("stop")
  .addEventListener("click", quark.stop.bind(quark));
document.getElementById("tick").addEventListener("click", () => {
  quark.tick();
  quark.draw();
});
document.getElementById("reload").addEventListener("click", () => {
  window.location.reload();
});

quark.tick();
quark.draw();
