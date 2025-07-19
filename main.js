// Main JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all components
  initFloatingElements();
  initNotifications();
  initServiceCards();
  initPortfolioItems();
  initResponsiveHandling();
});

// Floating Elements Animation
function initFloatingElements() {
  const floatingIcons = document.querySelectorAll('.icon-frame');
  const deviceImages = document.querySelectorAll('.device-img');
  const codeBlocks = document.querySelectorAll('.code-block');
  
  // Add random animation delays to floating icons
  floatingIcons.forEach((icon, index) => {
    const delay = Math.random() * 2;
    icon.style.animationDelay = `${delay}s`;
    
    // Add hover effect
    icon.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-15px) scale(1.1)';
      this.style.transition = 'transform 0.3s ease';
    });
    
    icon.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });
  
  // Animate device images
  deviceImages.forEach((device, index) => {
    const delay = Math.random() * 3;
    device.style.animationDelay = `${delay}s`;
  });
  
  // Animate code blocks
  codeBlocks.forEach((block, index) => {
    const delay = index * 3;
    block.style.animationDelay = `${delay}s`;
  });
}

// Notification System
function initNotifications() {
  const notifications = document.querySelectorAll('.notification-card');
  
  notifications.forEach((notification, index) => {
    // Stagger notification appearances
    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transform = 'translateY(-20px)';
      
      setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
        notification.style.transition = 'all 0.5s ease-out';
      }, 100);
    }, index * 500);
    
    // Add click interaction
    notification.addEventListener('click', function() {
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = 'scale(1)';
      }, 150);
    });
    
    // Auto-hide and show notifications
    setInterval(() => {
      notification.style.opacity = '0.7';
      setTimeout(() => {
        notification.style.opacity = '1';
      }, 2000);
    }, 8000 + (index * 1000));
  });
}

// Service Cards Interactions
function initServiceCards() {
  const serviceCards = document.querySelectorAll('.service-card');
  
  serviceCards.forEach(card => {
    // Hover effects
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px) scale(1.02)';
      this.style.boxShadow = '0px 15px 40px rgba(0, 0, 0, 0.2)';
      this.style.transition = 'all 0.3s ease';
      
      // Animate service tags
      const tags = this.querySelectorAll('.tag');
      tags.forEach((tag, index) => {
        setTimeout(() => {
          tag.style.transform = 'scale(1.05)';
          tag.style.transition = 'transform 0.2s ease';
        }, index * 50);
      });
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
      this.style.boxShadow = '0px 4px 20px rgba(0, 0, 0, 0.1)';
      
      // Reset service tags
      const tags = this.querySelectorAll('.tag');
      tags.forEach(tag => {
        tag.style.transform = 'scale(1)';
      });
    });
    
    // Click effect
    card.addEventListener('click', function() {
      this.style.transform = 'translateY(-5px) scale(0.98)';
      setTimeout(() => {
        this.style.transform = 'translateY(-10px) scale(1.02)';
      }, 150);
    });
  });
  
  // Special interactions for specific cards
  const metaCard = document.querySelector('.meta-ads-card');
  if (metaCard) {
    const socialIcons = metaCard.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
      icon.addEventListener('click', function(e) {
        e.stopPropagation();
        this.style.transform = 'rotate(360deg) scale(1.2)';
        this.style.transition = 'transform 0.5s ease';
        setTimeout(() => {
          this.style.transform = 'rotate(0deg) scale(1)';
        }, 500);
      });
    });
  }
}

// Portfolio Items Interactions
function initPortfolioItems() {
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  
  portfolioItems.forEach((item, index) => {
    // Stagger initial animation
    setTimeout(() => {
      item.style.opacity = '0';
      item.style.transform = 'scale(0.8)';
      
      setTimeout(() => {
        item.style.opacity = '1';
        item.style.transform = 'scale(1)';
        item.style.transition = 'all 0.5s ease-out';
      }, 100);
    }, index * 200);
    
    // Hover effects
    item.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.1) rotate(2deg)';
      this.style.zIndex = '10';
      this.style.boxShadow = '0px 8px 25px rgba(0, 0, 0, 0.3)';
    });
    
    item.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1) rotate(0deg)';
      this.style.zIndex = '1';
      this.style.boxShadow = '0px 4px 4px rgba(0, 0, 0, 0.25)';
    });
    
    // Click effect
    item.addEventListener('click', function() {
      this.style.transform = 'scale(1.2) rotate(5deg)';
      setTimeout(() => {
        this.style.transform = 'scale(1.1) rotate(2deg)';
      }, 200);
    });
  });
}

// Responsive Handling
function initResponsiveHandling() {
  let resizeTimer;
  
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      handleResponsiveChanges();
    }, 250);
  });
  
  // Initial call
  handleResponsiveChanges();
}

function handleResponsiveChanges() {
  const width = window.innerWidth;
  const notifications = document.querySelectorAll('.notification-card');
  const codeBlocks = document.querySelectorAll('.code-block');
  
  if (width <= 480) {
    // Hide notifications on very small screens
    notifications.forEach(notification => {
      notification.style.display = 'none';
    });
    
    // Scale down code blocks
    codeBlocks.forEach(block => {
      block.style.transform = 'scale(0.5)';
    });
  } else if (width <= 768) {
    // Show notifications but smaller
    notifications.forEach(notification => {
      notification.style.display = 'flex';
      notification.style.transform = 'scale(0.8)';
    });
    
    codeBlocks.forEach(block => {
      block.style.transform = 'scale(0.7)';
    });
  } else {
    // Normal size
    notifications.forEach(notification => {
      notification.style.display = 'flex';
      notification.style.transform = 'scale(1)';
    });
    
    codeBlocks.forEach(block => {
      block.style.transform = 'scale(1)';
    });
  }
}

// Utility Functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Performance optimization
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

// Smooth scrolling for any internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});
