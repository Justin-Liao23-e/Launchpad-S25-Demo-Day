// Enhanced fade‑in on scroll with subtle animations
const faders = document.querySelectorAll('.guest-card, .team h2, .team p, .contact-info');
const listItems = document.querySelectorAll('.value-list li');

// Make sure list items are visible by default
document.addEventListener('DOMContentLoaded', () => {
  listItems.forEach(item => {
    item.style.opacity = '1';
    item.style.transform = 'none';
  });
});

const appearOptions = { 
  threshold: 0.15, 
  rootMargin: '0px 0px -80px 0px' 
};

const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry, index) => {
    if (!entry.isIntersecting) return;
    
    setTimeout(() => {
      entry.target.classList.add('appear');
    }, index * 80);
    
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(el => appearOnScroll.observe(el));

// Immersive navbar and scroll to top button
const header = document.querySelector('.site-header');
const scrollTopBtn = document.querySelector('.scroll-top-btn');
const heroSection = document.querySelector('.hero');
let heroHeight;

// Calculate hero section height
const updateHeroHeight = () => {
  heroHeight = heroSection ? heroSection.offsetHeight : 300;
};

// Update on page load and resize
window.addEventListener('load', updateHeroHeight);
window.addEventListener('resize', updateHeroHeight);

// Handle scroll events for navbar and scroll-to-top button
window.addEventListener('scroll', () => {
  const scrollPos = window.scrollY;
  
  // Immersive navbar
  if (scrollPos > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  
  // Scroll to top button visibility
  if (scrollPos > heroHeight) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
  
  // Parallax effect on hero (keeping this from original code)
  if (heroSection && scrollPos < 600) {
    const translateY = scrollPos * 0.15;
    heroSection.style.transform = `translateY(${translateY}px)`;
    heroSection.style.opacity = 1 - (scrollPos * 0.002);
  }
});

// Scroll to top functionality
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Smooth scroll for internal links with refined animation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href').substring(1);
    if (!targetId) return;
    const target = document.getElementById(targetId);
    if (target) {
      e.preventDefault();
      window.scrollTo({
        top: target.offsetTop - 70, // Offset for fixed header
        behavior: 'smooth'
      });
    }
  });
});

// Button hover effects - simplified for a cleaner look
const buttons = document.querySelectorAll('.cta-btn');
buttons.forEach(button => {
  if (button.classList.contains('primary')) {
    button.addEventListener('mouseover', () => {
      button.style.transition = 'all 0.3s ease';
    });
    
    button.addEventListener('mouseleave', () => {
      button.style.transition = 'all 0.3s ease';
    });
  }
});

// Touch support for guest cards
const guestCards = document.querySelectorAll('.guest-card');
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

// Handle touch events for guest cards
if (isTouchDevice) {
  guestCards.forEach(card => {
    // Touch start - add active state
    card.addEventListener('touchstart', function(e) {
      // Don't prevent default to allow links to work
      this.classList.add('touched');
    });

    // Remove active state when touching elsewhere
    document.addEventListener('touchstart', function(e) {
      if (!e.target.closest('.guest-card')) {
        guestCards.forEach(c => c.classList.remove('touched'));
      }
    });
    
    // Handle touch end on the card itself
    card.addEventListener('touchend', function(e) {
      // If they're tapping a link, let it work normally
      if (e.target.tagName === 'A' || e.target.closest('a')) {
        return;
      }
      
      // Otherwise, toggle the touched state
      if (this.classList.contains('touched')) {
        // Keep the touched state for visual feedback
        e.preventDefault(); // Prevent simulated mouse events
      }
    });
  });
}

// Custom Video Player Functionality
document.addEventListener('DOMContentLoaded', () => {
  const video = document.getElementById('demoVideo');
  const playPauseOverlay = document.getElementById('playPauseOverlay');
  const playButton = document.getElementById('playButton');
  const playPauseBtn = document.getElementById('playPauseBtn');
  const progressBar = document.getElementById('progressBar');
  const progressFill = document.getElementById('progressFill');
  const progressHandle = document.getElementById('progressHandle');
  const currentTimeDisplay = document.getElementById('currentTime');
  const durationDisplay = document.getElementById('duration');
  const volumeBtn = document.getElementById('volumeBtn');
  const volumeSlider = document.getElementById('volumeSlider');
  const volumeFill = document.getElementById('volumeFill');
  const volumeHandle = document.getElementById('volumeHandle');
  const volumeSliderContainer = document.getElementById('volumeSliderContainer');
  const fullscreenBtn = document.getElementById('fullscreenBtn');
  const videoControls = document.querySelector('.video-controls');
  const customVideoPlayer = document.querySelector('.custom-video-player');

  if (!video) return; // Exit if video element doesn't exist

  let isPlaying = false;
  let controlsTimeout;
  let hasPlayedOnce = false; // Track if video has been played at least once

  // Initialize video controls state (paused by default)
  videoControls.classList.add('paused');

  // Format time helper function
  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  // Toggle play/pause
  function togglePlay() {
    if (video.paused) {
      const playPromise = video.play();
      
      if (playPromise !== undefined) {
        playPromise.then(() => {
          isPlaying = true;
          hasPlayedOnce = true;
          playPauseOverlay.classList.add('hidden');
          videoControls.classList.remove('paused');
          document.querySelector('.play-icon').style.display = 'none';
          document.querySelector('.pause-icon').style.display = 'block';
          
          // Remove poster after first play to prevent it from showing again
          if (hasPlayedOnce) {
            video.removeAttribute('poster');
          }
        }).catch(error => {
          console.log('Play was prevented:', error);
          // Reset UI state if play fails
          isPlaying = false;
          playPauseOverlay.classList.remove('hidden');
          videoControls.classList.add('paused');
          document.querySelector('.play-icon').style.display = 'block';
          document.querySelector('.pause-icon').style.display = 'none';
        });
      }
    } else {
      video.pause();
      isPlaying = false;
      playPauseOverlay.classList.remove('hidden');
      videoControls.classList.add('paused');
      document.querySelector('.play-icon').style.display = 'block';
      document.querySelector('.pause-icon').style.display = 'none';
    }
  }

  // Update progress bar
  function updateProgress() {
    if (video.duration) {
      const progress = (video.currentTime / video.duration) * 100;
      progressFill.style.width = `${progress}%`;
      currentTimeDisplay.textContent = formatTime(video.currentTime);
    }
  }

  // Set video time based on progress bar click
  function setProgress(e) {
    const rect = progressBar.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    video.currentTime = pos * video.duration;
  }

  // Show/hide controls with timeout
  function showControls() {
    if (!videoControls.classList.contains('paused')) {
      videoControls.classList.add('visible');
      clearTimeout(controlsTimeout);
      
      if (isPlaying) {
        controlsTimeout = setTimeout(() => {
          videoControls.classList.remove('visible');
        }, 3000);
      }
    }
  }

  // Handle video click for play/pause (YouTube-like behavior)
  function handleVideoClick(e) {
    // Don't interfere with control button clicks or progress bar clicks
    if (e.target.closest('.control-btn') || e.target.closest('.progress-bar')) {
      return;
    }
    togglePlay();
    showControls(); // Show controls briefly when toggling
  }

  // Handle play/pause button click specifically
  function handlePlayPauseClick(e) {
    e.stopPropagation(); // Prevent event bubbling to video container
    togglePlay();
    showControls();
  }

  // Toggle fullscreen
  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      customVideoPlayer.requestFullscreen().catch(err => {
        console.log(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  }

  // Toggle mute
  function toggleMute() {
    video.muted = !video.muted;
    updateVolumeIcon();
    updateVolumeSlider();
  }

  // Update volume icon based on volume level and mute state
  function updateVolumeIcon() {
    const volumeIcon = volumeBtn.querySelector('.volume-icon path');
    const volume = video.volume;
    
    if (video.muted || volume === 0) {
      // Muted icon
      volumeIcon.setAttribute('d', 'M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z');
    } else if (volume < 0.5) {
      // Low volume icon
      volumeIcon.setAttribute('d', 'M3 9v6h4l5 5V4l-5 5H3z');
    } else {
      // High volume icon (default)
      volumeIcon.setAttribute('d', 'M3 9v6h4l5 5V4l-5 5H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z');
    }
  }

  // Update volume slider visual state
  function updateVolumeSlider() {
    const volume = video.muted ? 0 : video.volume * 100;
    volumeFill.style.width = `${volume}%`;
  }

  // Set volume based on slider position
  function setVolume(e) {
    const rect = volumeSlider.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    
    video.volume = pos;
    if (pos > 0) {
      video.muted = false;
    }
    
    updateVolumeIcon();
    updateVolumeSlider();
  }

  // Show volume slider on hover/interaction
  function showVolumeSlider() {
    volumeSliderContainer.classList.add('visible');
  }

  // Hide volume slider after delay
  function hideVolumeSlider() {
    setTimeout(() => {
      if (!volumeSliderContainer.matches(':hover')) {
        volumeSliderContainer.classList.remove('visible');
      }
    }, 1000);
  }

  // Handle play/pause overlay click specifically  
  function handleOverlayClick(e) {
    e.stopPropagation(); // Prevent event bubbling to video container
    togglePlay();
    showControls();
  }

  // Event listeners
  playPauseOverlay.addEventListener('click', handleOverlayClick);
  playPauseBtn.addEventListener('click', handlePlayPauseClick);
  
  // YouTube-like click behavior - click anywhere on video to toggle play/pause
  video.addEventListener('click', handleVideoClick);
  
  // Also handle clicks on the video container for better UX
  customVideoPlayer.addEventListener('click', handleVideoClick);
  
  progressBar.addEventListener('click', setProgress);
  
  video.addEventListener('timeupdate', updateProgress);
  
  video.addEventListener('loadedmetadata', () => {
    durationDisplay.textContent = formatTime(video.duration);
    currentTimeDisplay.textContent = formatTime(0);
  });

  // Add error handling for video loading
  video.addEventListener('error', (e) => {
    console.log('Video error:', e);
    console.log('Video error code:', video.error ? video.error.code : 'unknown');
    
    // Show a user-friendly error message
    const errorMessage = document.createElement('div');
    errorMessage.className = 'video-error';
    errorMessage.innerHTML = `
      <div style="text-align: center; color: white; padding: 20px;">
        <p>Video could not be loaded.</p>
        <p>Please try refreshing the page.</p>
      </div>
    `;
    customVideoPlayer.appendChild(errorMessage);
  });

  video.addEventListener('ended', () => {
    isPlaying = false;
    playPauseOverlay.classList.remove('hidden');
    videoControls.classList.add('paused');
    document.querySelector('.play-icon').style.display = 'block';
    document.querySelector('.pause-icon').style.display = 'none';
    videoControls.classList.add('visible');
  });

  // Keep volume slider in sync with video volume changes
  video.addEventListener('volumechange', () => {
    updateVolumeSlider();
    updateVolumeIcon();
  });

  volumeBtn.addEventListener('click', toggleMute);
  
  // Volume slider event listeners
  volumeSlider.addEventListener('click', setVolume);
  volumeBtn.addEventListener('mouseenter', showVolumeSlider);
  volumeSliderContainer.addEventListener('mouseenter', showVolumeSlider);
  volumeSliderContainer.addEventListener('mouseleave', hideVolumeSlider);
  
  fullscreenBtn.addEventListener('click', toggleFullscreen);

  // Mouse movement and touch events
  customVideoPlayer.addEventListener('mousemove', showControls);
  customVideoPlayer.addEventListener('touchstart', showControls);
  
  // Keyboard controls
  document.addEventListener('keydown', (e) => {
    if (document.activeElement === video || customVideoPlayer.contains(document.activeElement)) {
      switch(e.code) {
        case 'Space':
          e.preventDefault();
          togglePlay();
          break;
        case 'KeyF':
          e.preventDefault();
          toggleFullscreen();
          break;
        case 'KeyM':
          e.preventDefault();
          toggleMute();
          break;
        case 'ArrowUp':
          e.preventDefault();
          video.volume = Math.min(1, video.volume + 0.1);
          video.muted = false;
          updateVolumeIcon();
          updateVolumeSlider();
          showVolumeSlider();
          hideVolumeSlider();
          break;
        case 'ArrowDown':
          e.preventDefault();
          video.volume = Math.max(0, video.volume - 0.1);
          updateVolumeIcon();
          updateVolumeSlider();
          showVolumeSlider();
          hideVolumeSlider();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          video.currentTime = Math.max(0, video.currentTime - 10);
          break;
        case 'ArrowRight':
          e.preventDefault();
          video.currentTime = Math.min(video.duration, video.currentTime + 10);
          break;
      }
    }
  });

  // Progress bar dragging functionality
  let isDragging = false;
  let isVolumeDragging = false;
  
  progressBar.addEventListener('mousedown', (e) => {
    isDragging = true;
    setProgress(e);
  });

  // Volume slider dragging functionality
  volumeSlider.addEventListener('mousedown', (e) => {
    isVolumeDragging = true;
    setVolume(e);
    showVolumeSlider();
  });

  // Touch support for volume slider
  volumeSlider.addEventListener('touchstart', (e) => {
    isVolumeDragging = true;
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent('mousedown', {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    setVolume(mouseEvent);
    showVolumeSlider();
    e.preventDefault();
  });

  document.addEventListener('mousemove', (e) => {
    if (isDragging) {
      setProgress(e);
    }
    if (isVolumeDragging) {
      setVolume(e);
    }
  });

  document.addEventListener('touchmove', (e) => {
    if (isVolumeDragging) {
      const touch = e.touches[0];
      const mouseEvent = new MouseEvent('mousemove', {
        clientX: touch.clientX,
        clientY: touch.clientY
      });
      setVolume(mouseEvent);
      e.preventDefault();
    }
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
    isVolumeDragging = false;
  });

  document.addEventListener('touchend', () => {
    isDragging = false;
    isVolumeDragging = false;
  });

  // Initial setup
  videoControls.classList.add('visible'); // Show controls initially for paused state
  updateVolumeSlider();
  updateVolumeIcon();
});
