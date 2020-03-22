function random(from, to) {
  return Math.floor(Math.random() * (to - from)) + from;
}

class QuarkAnimation {
  constructor(options) {
    // TODO ID or Element
    this.canvas = document.getElementById(options.id);
    const ctx = this.canvas.getContext("2d");
    this.ctx = ctx;
    ctx.fillStyle = "green";
    // ctx.fillRect(10, 10, 2000, 2000);

    const count = 200;
    const points = [];
    for (let i = 0; i < count; i++) {
      const x = random(0, 1000);
      const y = random(0, 1000);
      points.push({ x, y });
    }
    this.points = points;
  }

  draw() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, 1000, 1000);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    this.points.forEach(({ x, y }) => ctx.lineTo(x, y));
    ctx.stroke();

    if (this.running) {
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
  id: "canvas"
});

document
  .getElementById("start")
  .addEventListener("click", quark.start.bind(quark));
document
  .getElementById("stop")
  .addEventListener("click", quark.stop.bind(quark));
