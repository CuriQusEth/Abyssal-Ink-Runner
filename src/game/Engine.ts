import { GRAVITY, JUMP_FORCE, BASE_SPEED, COLORS, DASH_VELOCITY, INK_CONSUMPTION_RATE } from './constants';

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
};

type Obstacle = {
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'rock' | 'jelly' | 'void';
};

type Essence = {
  x: number;
  y: number;
  size: number;
};

export class GameEngine {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  
  // Game State Refs
  onGameOver: () => void;
  updateScore: (score: number) => void;
  updateInkMass: (mass: number) => void;

  isRunning = false;
  frameCount = 0;

  // Player state
  player = {
    x: 100,
    y: 0,
    vy: 0,
    radius: 12,
    mass: 100,
    isDashing: false,
    dashTimer: 0,
  };

  particles: Particle[] = [];
  obstacles: Obstacle[] = [];
  essences: Essence[] = [];
  
  score = 0;
  baseSpeedY = 0;

  constructor(
    canvas: HTMLCanvasElement, 
    onGameOver: () => void,
    updateScore: (score: number) => void,
    updateInkMass: (mass: number) => void
  ) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.width = canvas.width;
    this.height = canvas.height;
    
    this.onGameOver = onGameOver;
    this.updateScore = updateScore;
    this.updateInkMass = updateInkMass;
    
    this.player.y = this.height / 2;
  }

  start() {
    this.isRunning = true;
    this.score = 0;
    this.frameCount = 0;
    this.player.y = this.height / 2;
    this.player.vy = 0;
    this.player.mass = 100;
    this.obstacles = [];
    this.essences = [];
    this.particles = [];
    this.play();
  }

  stop() {
    this.isRunning = false;
  }

  jump() {
    if (!this.isRunning) return;
    this.player.vy = JUMP_FORCE;
    this.spawnParticles(10, true);
  }

  dash() {
    if (!this.isRunning || this.player.mass < 20 || this.player.isDashing) return;
    this.player.isDashing = true;
    this.player.dashTimer = 20; // frames
    this.player.mass -= 20;
    this.player.vy = 0;
    this.spawnParticles(30, true);
  }

  private spawnParticles(count: number, burst: boolean) {
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: this.player.x,
        y: this.player.y,
        vx: burst ? (Math.random() - 0.5) * 6 : (Math.random() - 1) * 2,
        vy: burst ? (Math.random() - 0.5) * 6 : (Math.random() - 0.5) * 2,
        life: 1,
        maxLife: burst ? 30 + Math.random() * 20 : 50 + Math.random() * 40,
        size: Math.random() * 6 + 2
      });
    }
  }

  private update() {
    this.frameCount++;
    const speedMultiplier = 1 + (this.score / 5000); // gets faster as you go deeper
    const currentSpeed = BASE_SPEED * speedMultiplier;

    // Player physics
    if (this.player.isDashing) {
      this.player.dashTimer--;
      if (this.player.dashTimer <= 0) {
        this.player.isDashing = false;
      }
    } else {
      this.player.vy += GRAVITY;
      this.player.y += this.player.vy;
    }

    // Ink Mass Consumption
    this.player.mass -= INK_CONSUMPTION_RATE;
    if (this.frameCount % 3 === 0) this.spawnParticles(1, false);

    // Death bounds
    if (this.player.y > this.height + this.player.radius || this.player.mass <= 0) {
      this.gameOver();
      return;
    }
    // Top bound
    if (this.player.y < 0) {
      this.player.y = 0;
      this.player.vy = 0;
    }

    // Procedural Generation (Obstacles & Essence)
    if (this.frameCount % Math.max(40, 100 - Math.floor(this.score/100)) === 0) {
      this.obstacles.push({
        x: this.width,
        y: Math.random() < 0.5 ? 0 : this.height - (Math.random() * 200 + 50),
        width: Math.random() * 60 + 40,
        height: Math.random() * 200 + 50,
        type: 'rock'
      });
    }

    if (this.frameCount % 120 === 0) {
      this.essences.push({
        x: this.width,
        y: Math.random() * (this.height - 100) + 50,
        size: 15
      });
    }

    // Update Obstacles
    for (let i = this.obstacles.length - 1; i >= 0; i--) {
      let obs = this.obstacles[i];
      obs.x -= currentSpeed;
      
      // Collision
      if (!this.player.isDashing) {
        if (
          this.player.x + this.player.radius > obs.x &&
          this.player.x - this.player.radius < obs.x + obs.width &&
          this.player.y + this.player.radius > obs.y &&
          this.player.y - this.player.radius < obs.y + obs.height
        ) {
          this.gameOver();
          return;
        }
      }

      if (obs.x + obs.width < 0) this.obstacles.splice(i, 1);
    }

    // Update Essence
    for (let i = this.essences.length - 1; i >= 0; i--) {
      let ess = this.essences[i];
      ess.x -= currentSpeed;

      // Collision
      const dx = this.player.x - ess.x;
      const dy = this.player.y - ess.y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      
      if (dist < this.player.radius + ess.size) {
        this.player.mass = Math.min(200, this.player.mass + 30); // Max mass 200
        this.score += 50; // Bonus points for essence
        this.essences.splice(i, 1);
        this.spawnParticles(15, true);
      } else if (ess.x + ess.size < 0) {
        this.essences.splice(i, 1);
      }
    }

    // Update Particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      let p = this.particles[i];
      p.x += p.vx - currentSpeed * 0.5; // parallax effect
      p.y += p.vy;
      p.life++;
      p.size *= 0.98;
      
      if (p.life > p.maxLife || p.size < 0.5) {
        this.particles.splice(i, 1);
      }
    }

    // Scoring
    this.score += currentSpeed * 0.05;
    
    // Updates
    if (this.frameCount % 10 === 0) {
      this.updateScore(Math.floor(this.score));
      this.updateInkMass(Math.floor(this.player.mass));
    }
  }

  private draw() {
    // Clear and draw background gradient
    const gradient = this.ctx.createLinearGradient(0, 0, 0, this.height);
    gradient.addColorStop(0, COLORS.bgTop);
    gradient.addColorStop(1, COLORS.bgBottom);
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.width, this.height);

    // Draw Particles (Ink Trail)
    this.ctx.globalCompositeOperation = 'screen';
    for (const p of this.particles) {
      const alpha = 1 - (p.life / p.maxLife);
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(14, 165, 233, ${alpha * 0.8})`;
      this.ctx.fill();
    }
    this.ctx.globalCompositeOperation = 'source-over';

    // Draw Essences (Bioluminescence)
    for (const ess of this.essences) {
      this.ctx.beginPath();
      this.ctx.arc(ess.x, ess.y, ess.size, 0, Math.PI * 2);
      this.ctx.fillStyle = COLORS.essence;
      this.ctx.shadowBlur = 20;
      this.ctx.shadowColor = COLORS.essence;
      this.ctx.fill();
      this.ctx.shadowBlur = 0; // reset
    }

    // Draw Obstacles (Ruins / Void)
    this.ctx.fillStyle = COLORS.obstacle;
    for (const obs of this.obstacles) {
      // Very slight glow on rocks to make them visible
      this.ctx.shadowBlur = 5;
      this.ctx.shadowColor = '#1e293b';
      this.ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
      this.ctx.shadowBlur = 0;
    }

    // Draw Player
    this.ctx.beginPath();
    this.ctx.arc(this.player.x, this.player.y, this.player.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = this.player.isDashing ? '#ffffff' : COLORS.player;
    this.ctx.shadowBlur = this.player.isDashing ? 30 : 15;
    this.ctx.shadowColor = COLORS.player;
    this.ctx.fill();
    this.ctx.shadowBlur = 0;
  }

  private gameOver() {
    this.isRunning = false;
    this.onGameOver();
  }

  private play = () => {
    if (!this.isRunning) return;
    this.update();
    this.draw();
    requestAnimationFrame(this.play);
  }

  resize(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.canvas.width = width;
    this.canvas.height = height;
  }
}
