function createStars() {
  const container = document.querySelector('body');
  for (let i = 0; i < 500; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    const size = Math.random() * 2 + 1;
    star.style.width = size + 'px';
    star.style.height = size + 'px';
    star.style.top = Math.random() * 100 + '%';
    star.style.left = Math.random() * 100 + '%';
    star.style.opacity = Math.random();
    container.appendChild(star);
  }
}
createStars();
