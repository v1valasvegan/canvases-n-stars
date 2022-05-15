const colors = ['red', 'blue', 'green', 'yellow', 'black'];

const drawStar = (context, x, y, color) => {
  const path = new Path2D();
  // taken from SO https://stackoverflow.com/a/17279374/13079337
  const alpha = (2 * Math.PI) / 10;
  const radius = 32;
  for (let i = 11; i !== 0; i--) {
    var r = (radius * ((i % 2) + 1)) / 2;
    var omega = alpha * i;
    path.lineTo(r * Math.sin(omega) + x, r * Math.cos(omega) + y);
  }

  context.fillStyle = color;
  context.fill(path);
  return path;
};

const render = (color) => {
  const smallCanvas = document.getElementById('small-canvas');
  smallCanvas.style.backgroundColor = color;
};

const App = () => {
  const largeCanvas = document.getElementById('large-canvas');
  const context = largeCanvas.getContext('2d');
  let stars = [];

  colors.forEach((color, index) => {
    const row = Math.floor(index / 4);
    const column = index % 4;
    const offsetX = 100 + column * 100;
    const offsetY = 100 + row * 100;
    const star = drawStar(context, offsetX, offsetY, color);
    stars.push(star);
  });

  largeCanvas.addEventListener('click', (e) => {
    const index = stars.findIndex((s) =>
      context.isPointInPath(s, e.offsetX, e.offsetY)
    );
    const color = index === -1 ? '#fff' : colors[index];
    render(color);
  });
};

App();
