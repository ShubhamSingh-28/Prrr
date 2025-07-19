// Advanced Animations and Effects
class AnimationController {
  constructor() {
    this.observers = [];
    this.init();
  }
  
  init() {
    this.setupIntersectionObserver();
    this.setupParallaxEffects();
    this.setupMouseFollowEffects();
    this.setupTypewriterEffect();
  }
  
  // Intersection Observer for scroll animations
  setupIntersectionObserver() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          this.triggerElementAnimation(entry.target);
        }
      });
    }, observerOptions);
    
    // Observe all service cards and portfolio items
    document.querySelectorAll('.service-card, .portfolio-item, .notification-card').forEach(el => {
      observer.observe(el);
    });
    
    this.observers.push(observer);
  }
  
  // Parallax effects for background elements
  setupParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.hero-gradient, .iot-circles, .decorative-elements');
    
    const handleParallax = throttle(() => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      
      parallaxElements.forEach(element => {
        element.style.transform = `translateY(${rate}px)`;
      });
    }, 16);
    
    window.addEventListener('scroll', handleParallax);
  }
  
  // Mouse follow effects for floating elements
  setupMouseFollowEffects() {
    const floatingElements = document.querySelectorAll('.icon-frame, .device-img');
    
    document.addEventListener('mousemove', throttle((e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      floatingElements.forEach((element, index) => {
        const rect = element.getBoundingClientRect();
        const elementX = rect.left + rect.width / 2;
        const elementY = rect.top + rect.height / 2;
        
        const deltaX = (mouseX - elementX) * 0.02;
        const deltaY = (mouseY - elementY) * 0.02;
        
        element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
      });
    }, 16));
  }
  
  // Typewriter effect for headlines
  setupTypewriterEffect() {
    const typewriterElements = document.querySelectorAll('.main-headline, .iot-title');
    
    typewriterElements.forEach(element => {
      const text = element.textContent;
      element.textContent = '';
      element.style.borderRight = '2px solid #A25AFF';
      
      let i = 0;
      const typeWriter = () => {
        if (i < text.length) {
          element.textContent += text.charAt(i);
          i++;
          setTimeout(typeWriter, 100);
        } else {
          // Remove cursor after typing is complete
          setTimeout(() => {
            element.style.borderRight = 'none';
          }, 1000);
        }
      };
      
      // Start typewriter effect when element is visible
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setTimeout(typeWriter, 500);
            observer.unobserve(entry.target);
          }
        });
      });
      
      observer.observe(element);
    });
  }
  
  // Trigger specific animations for different elements
  triggerElementAnimation(element) {
    if (element.classList.contains('service-card')) {
      this.animateServiceCard(element);
    } else if (element.classList.contains('portfolio-item')) {
      this.animatePortfolioItem(element);
    } else if (element.classList.contains('notification-card')) {
      this.animateNotification(element);
    }
  }
  
  animateServiceCard(card) {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px) scale(0.9)';
    
    setTimeout(() => {
      card.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0) scale(1)';
      
      // Animate tags with stagger
      const tags = card.querySelectorAll('.tag');
      tags.forEach((tag, index) => {
        setTimeout(() => {
          tag.style.opacity = '0';
          tag.style.transform = 'translateX(-20px)';
          tag.style.transition = 'all 0.3s ease';
          
          setTimeout(() => {
            tag.style.opacity = '1';
            tag.style.transform = 'translateX(0)';
          }, 50);
        }, index * 100);
      });
    }, 100);
  }
  
  animatePortfolioItem(item) {
    const delay = Math.random() * 300;
    
    setTimeout(() => {
      item.style.opacity = '0';
      item.style.transform = 'scale(0) rotate(180deg)';
      item.style.transition = 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
      
      setTimeout(() => {
        item.style.opacity = '1';
        item.style.transform = 'scale(1) rotate(0deg)';
      }, 50);
    }, delay);
  }
  
  animateNotification(notification) {
    notification.style.opacity = '0';
    notification.style.transform = 'translateX(-100px)';
    notification.style.transition = 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    
    setTimeout(() => {
      notification.style.opacity = '1';
      notification.style.transform = 'translateX(0)';
    }, 200);
  }
}

// Particle System for Background
class ParticleSystem {
  constructor() {
    this.canvas = this.createCanvas();
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.init();
  }
  
  createCanvas() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '0';
    canvas.style.opacity = '0.3';
    document.body.appendChild(canvas);
    return canvas;
  }
  
  init() {
    this.resize();
    this.createParticles();
    this.animate();
    
    window.addEventListener('resize', () => this.resize());
  }
  
  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
  
  createParticles() {
    const particleCount = Math.floor((this.canvas.width * this.canvas.height) / 15000);
    
    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2
      });
    }
  }
  
  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.particles.forEach(particle => {
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // Wrap around edges
      if (particle.x < 0) particle.x = this.canvas.width;
      if (particle.x > this.canvas.width) particle.x = 0;
      if (particle.y < 0) particle.y = this.canvas.height;
      if (particle.y > this.canvas.height) particle.y = 0;
      
      // Draw particle
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(162, 90, 255, ${particle.opacity})`;
      this.ctx.fill();
    });
    
    requestAnimationFrame(() => this.animate());
  }
}

// Loading Animation
class LoadingAnimation {
  constructor() {
    this.createLoader();
  }
  
  createLoader() {
    const loader = document.createElement('div');
    loader.id = 'page-loader';
    loader.innerHTML = `
      <div class="loader-content">
        <div class="loader-logo">Xenotix Tech</div>
        <div class="loader-spinner"></div>
        <div class="loader-text">Loading Innovation...</div>
      </div>
    `;
    
    const styles = `
      #page-loader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(180deg, #C0C5F8 15.38%, #FFFFFF 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
      }
      
      .loader-content {
        text-align: center;
      }
      
      .loader-logo {
        font-family: 'Kaisei Tokumin', serif;
        font-size: 32px;
        font-weight: 700;
        color: #A25AFF;
        margin-bottom: 20px;
      }
      
      .loader-spinner {
        width: 50px;
        height: 50px;
        border: 3px solid rgba(162, 90, 255, 0.3);
        border-top: 3px solid #A25AFF;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 20px;
      }
      
      .loader-text {
        font-family: 'Inter', sans-serif;
        font-size: 14px;
        color: #666;
      }
      
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
    document.body.appendChild(loader);
    
    // Hide loader after page load
    window.addEventListener('load', () => {
      setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
          loader.remove();
          styleSheet.remove();
        }, 500);
      }, 1000);
    });
  }
}

// Initialize all animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new LoadingAnimation();
  new AnimationController();
  new ParticleSystem();
});

// Utility function for throttling
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
