var quark = new QuarkAnimation({
  id: "canvas",
  bounds: { x: 600, y: 600 },
  padding: 100
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

quark.start();
