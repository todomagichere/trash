const canvas = document.getElementById("arena");
const ctx = canvas.getContext("2d");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");
const scoreEl = document.getElementById("score");
const timerEl = document.getElementById("timer");
const accuracyEl = document.getElementById("accuracy");
const bestStreakEl = document.getElementById("bestStreak");
const messageEl = document.getElementById("message");

const state = {
  target: null,
  score: 0,
  shots: 0,
  hits: 0,
  streak: 0,
  bestStreak: 0,
  timeLeft: 45,
  playing: false,
  timerId: null,
};

function resizeCanvas() {
  const { width } = canvas.getBoundingClientRect();
  canvas.width = width;
  canvas.height = Math.max(260, window.innerHeight * 0.6);
  draw();
}
window.addEventListener("resize", resizeCanvas);

function spawnTarget() {
  const minRadius = 18;
  const maxRadius = 36 + Math.min(state.streak * 2, 36);
  const radius = Math.max(minRadius, Math.min(maxRadius, 60));
  const padding = radius + 10;
  const x = padding + Math.random() * (canvas.width - padding * 2);
  const y = padding + Math.random() * (canvas.height - padding * 2);
  state.target = { x, y, radius };
  draw();
}

function formatSeconds(value) {
  return `${value.toFixed(1)}s`;
}

function updateHud() {
  scoreEl.textContent = state.score;
  timerEl.textContent = formatSeconds(Math.max(state.timeLeft, 0));
  const accuracy = state.shots === 0 ? 100 : Math.round((state.hits / state.shots) * 100);
  accuracyEl.textContent = `${accuracy}%`;
  bestStreakEl.textContent = state.bestStreak;
}

function drawTarget(target) {
  const { x, y, radius } = target;
  ctx.save();
  const gradient = ctx.createRadialGradient(x - radius * 0.3, y - radius * 0.3, radius * 0.2, x, y, radius);
  gradient.addColorStop(0, "rgba(124, 240, 141, 0.9)");
  gradient.addColorStop(1, "rgba(101, 214, 255, 0.3)");
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();

  ctx.lineWidth = 3;
  ctx.strokeStyle = "rgba(255, 255, 255, 0.9)";
  ctx.stroke();

  ctx.lineWidth = 1;
  ctx.setLineDash([4, 6]);
  ctx.beginPath();
  ctx.arc(x, y, radius * 0.55, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

function drawCrosshair(target) {
  ctx.save();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.6)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(target.x - target.radius - 12, target.y);
  ctx.lineTo(target.x + target.radius + 12, target.y);
  ctx.moveTo(target.x, target.y - target.radius - 12);
  ctx.lineTo(target.x, target.y + target.radius + 12);
  ctx.stroke();
  ctx.restore();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  for (let i = 0; i < 40; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    ctx.fillRect(x, y, 1, 1);
  }

  if (state.target) {
    drawTarget(state.target);
    drawCrosshair(state.target);
  }
}

function startGame() {
  if (state.playing) return;
  state.playing = true;
  state.timeLeft = 45;
  state.score = 0;
  state.shots = 0;
  state.hits = 0;
  state.streak = 0;
  messageEl.textContent = "";
  spawnTarget();
  updateHud();

  const startTime = performance.now();
  clearInterval(state.timerId);
  state.timerId = setInterval(() => {
    const elapsed = (performance.now() - startTime) / 1000;
    state.timeLeft = Math.max(0, 45 - elapsed);
    updateHud();
    if (state.timeLeft <= 0) {
      endGame();
    }
  }, 100);
}

function endGame() {
  clearInterval(state.timerId);
  state.playing = false;
  messageEl.textContent = `Tiempo agotado. Puntuación: ${state.score} · Precisión: ${accuracyEl.textContent}`;
}

function resetGame() {
  clearInterval(state.timerId);
  state.playing = false;
  state.score = 0;
  state.shots = 0;
  state.hits = 0;
  state.streak = 0;
  state.bestStreak = 0;
  state.timeLeft = 45;
  state.target = null;
  messageEl.textContent = "Pulsa \"Comenzar\" y dispara con tu mano.";
  updateHud();
  draw();
}

function getPosition(evt) {
  const rect = canvas.getBoundingClientRect();
  const x = evt.clientX - rect.left;
  const y = evt.clientY - rect.top;
  return { x, y };
}

function flash(text, color = "#65d6ff") {
  messageEl.textContent = text;
  messageEl.style.color = color;
  messageEl.style.opacity = 1;
  setTimeout(() => {
    messageEl.style.transition = "opacity 0.5s ease";
    messageEl.style.opacity = 0.1;
    setTimeout(() => {
      messageEl.style.transition = "";
    }, 600);
  }, 120);
}

function handleShot(evt) {
  if (!state.playing || !state.target) return;
  state.shots += 1;
  const { x, y } = getPosition(evt);
  const dx = x - state.target.x;
  const dy = y - state.target.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance <= state.target.radius) {
    state.hits += 1;
    state.score += Math.max(1, Math.floor(3 + state.streak * 0.6));
    state.streak += 1;
    state.bestStreak = Math.max(state.bestStreak, state.streak);
    flash("¡Impacto limpio!", "#7cf08d");
    spawnTarget();
  } else {
    state.streak = 0;
    flash("Fallaste. Sigue apuntando", "#ff6b8a");
  }

  updateHud();
}

canvas.addEventListener("pointerdown", handleShot);
startBtn.addEventListener("click", startGame);
resetBtn.addEventListener("click", resetGame);

resetGame();
resizeCanvas();

