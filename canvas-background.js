(() => {
  const canvas = document.getElementById("canvas-background");
  const context = canvas.getContext("2d");
  let width = window.innerWidth;
  let height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;

  const numOfStars = 50;
  const numSnowflakes = 100; // how many snowflakes
  const snowflakes = [];

  const random = (min, max) => Math.random() * (max - min) + min;

  window.isLightMode = () => document.body.classList.contains("light-mode");

  const stars = [];

  const initStars = () => {
    stars.length = 0;
    for (let i = 0; i < numOfStars; i++) {
      stars.push({
        x: random(25, width - 50),
        y: random(25, height * 0.5),
        size: random(1, 4),
      });
    }
  };

  // Initialize snowflakes for light mode
  const initSnowflakes = () => {
    snowflakes.length = 0; // reset
    for (let i = 0; i < numSnowflakes; i++) {
      snowflakes.push({
        x: random(0, width),
        y: random(0, height),
        radius: random(1, 3),
        speed: random(1, 3),
      });
    }
  };

  const drawBackground = () => {
    const gradient = context.createRadialGradient(0, 0, height, 0, 0, width);

    if (isLightMode()) {
      gradient.addColorStop(0, "#87ceeb"); // sky blue top
      gradient.addColorStop(1, "#b0e0e6"); // pale turquoise bottom
    } else {
      gradient.addColorStop(0, "#002D62");
      gradient.addColorStop(0.5, "#0066b2");
      gradient.addColorStop(1, "#6699CC");
    }

    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);

    if (isLightMode()) {
      drawSunAndTrees();
    }
  };
  function drawStar(ctx, x, y, radius, points = 5, inset = 0.5) {
    ctx.beginPath();
    ctx.save();
    ctx.translate(x, y);
    ctx.moveTo(0, 0 - radius);
    for (let i = 0; i < points; i++) {
      ctx.rotate(Math.PI / points);
      ctx.lineTo(0, 0 - radius * inset);
      ctx.rotate(Math.PI / points);
      ctx.lineTo(0, 0 - radius);
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
  stars.push({
    x: random(25, width - 50),
    y: random(25, height * 0.5),
    size: random(5, 10), // bigger radius for bigger stars
  });

  const drawStars = () => {
    if (isLightMode()) return;

    context.fillStyle = "#E6E6FA";
    for (const star of stars) {
      drawStar(context, star.x, star.y, star.size);
    }
  };

  const drawSunAndTrees = () => {
    // Sun (same as before)
    const sunX = width * 0.85;
    const sunY = height * 0.15;
    const sunRadius = 50;

    context.beginPath();
    context.arc(sunX, sunY, sunRadius, 0, Math.PI * 2);
    context.fillStyle = "#FFD700";
    context.fill();

    // Sun rays
    const numRays = 12;
    const rayLength = 30;
    context.strokeStyle = "#FFD700";
    context.lineWidth = 3;

    for (let i = 0; i < numRays; i++) {
      const angle = (i / numRays) * (Math.PI * 2);
      const startX = sunX + Math.cos(angle) * sunRadius;
      const startY = sunY + Math.sin(angle) * sunRadius;
      const endX = sunX + Math.cos(angle) * (sunRadius + rayLength);
      const endY = sunY + Math.sin(angle) * (sunRadius + rayLength);

      context.beginPath();
      context.moveTo(startX, startY);
      context.lineTo(endX, endY);
      context.stroke();
    }

    // Snow trees
    const treeBaseX = 100;
    const treeBaseY = height * 0.95;

    context.fillStyle = "#fff";

    for (let i = 0; i < 5; i++) {
      const x = treeBaseX + i * 80;

      for (let j = 0; j < 3; j++) {
        context.beginPath();
        context.moveTo(x, treeBaseY - j * 30);
        context.lineTo(x + 40, treeBaseY - 20 - j * 30);
        context.lineTo(x - 40, treeBaseY - 20 - j * 30);
        context.closePath();
        context.fill();
      }
    }
  };

  // Animate snow
  const animateSnow = () => {
    for (const flake of snowflakes) {
      flake.y += flake.speed;

      if (flake.y > height) {
        flake.y = 0;
        flake.x = random(0, width);
      }
    }

    // Draw snowflakes
    context.fillStyle = "white";
    for (const flake of snowflakes) {
      context.beginPath();
      context.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
      context.fill();
    }
  };

  // Main draw + animate loop
  const loop = () => {
    context.clearRect(0, 0, width, height);
    drawBackground();
    drawStars();
    animateSnow();

    requestAnimationFrame(loop);
  };
  initStars();

  window.addEventListener("resize", () => {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    initSnowflakes();
    initStars();
  });

  // Initialize snowflakes first time
  initSnowflakes();

  // On resize, update sizes and reset snowflakes
  window.addEventListener("resize", () => {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    initSnowflakes();
  });

  // Expose redrawBackground if needed
  window.redrawBackground = () => {
    drawBackground();
    drawStars();
  };

  // Start the loop
  loop();
})();
