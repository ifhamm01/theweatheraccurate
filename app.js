// The Weather Accurate - Professional Weather App
// With Critical Bug Fixes and Enhanced Animations

const state = {
  unit: 'celsius', // 'celsius' | 'fahrenheit'
  location: null, // {lat, lon, name, country}
  weather: null, // API response
  chart: null, // Chart.js instance
  weatherAnimations: null, // Weather animation system
  searchTimeout: null
};

// Enhanced WMO weather codes with animation mapping
const WEATHER_CODES = {
  0: {description: 'Clear sky', icon: '☀️', animation: 'sunny'},
  1: {description: 'Mainly clear', icon: '🌤️', animation: 'sunny'}, 
  2: {description: 'Partly cloudy', icon: '⛅', animation: 'cloudy'},
  3: {description: 'Overcast', icon: '☁️', animation: 'cloudy'},
  45: {description: 'Fog', icon: '🌫️', animation: 'cloudy'},
  48: {description: 'Depositing rime fog', icon: '🌫️', animation: 'cloudy'},
  51: {description: 'Light drizzle', icon: '🌦️', animation: 'rain'},
  53: {description: 'Moderate drizzle', icon: '🌦️', animation: 'rain'},
  55: {description: 'Dense drizzle', icon: '🌦️', animation: 'rain'},
  56: {description: 'Light freezing drizzle', icon: '🌦️', animation: 'rain'},
  57: {description: 'Dense freezing drizzle', icon: '🌦️', animation: 'rain'},
  61: {description: 'Slight rain', icon: '🌧️', animation: 'rain'},
  63: {description: 'Moderate rain', icon: '🌧️', animation: 'rain'},
  65: {description: 'Heavy rain', icon: '🌧️', animation: 'rain'},
  66: {description: 'Light freezing rain', icon: '🌧️', animation: 'rain'},
  67: {description: 'Heavy freezing rain', icon: '🌧️', animation: 'rain'},
  71: {description: 'Slight snow', icon: '🌨️', animation: 'snow'},
  73: {description: 'Moderate snow', icon: '🌨️', animation: 'snow'},
  75: {description: 'Heavy snow', icon: '🌨️', animation: 'snow'},
  77: {description: 'Snow grains', icon: '🌨️', animation: 'snow'},
  80: {description: 'Slight rain showers', icon: '🌦️', animation: 'rain'},
  81: {description: 'Moderate rain showers', icon: '🌦️', animation: 'rain'},
  82: {description: 'Violent rain showers', icon: '🌦️', animation: 'rain'},
  85: {description: 'Slight snow showers', icon: '🌨️', animation: 'snow'},
  86: {description: 'Heavy snow showers', icon: '🌨️', animation: 'snow'},
  95: {description: 'Thunderstorm', icon: '⛈️', animation: 'thunderstorm'},
  96: {description: 'Thunderstorm with slight hail', icon: '⛈️', animation: 'thunderstorm'},
  99: {description: 'Thunderstorm with heavy hail', icon: '⛈️', animation: 'thunderstorm'}
};

// DOM utilities
const $ = (id) => document.getElementById(id);
const $$ = (selector) => document.querySelectorAll(selector);

// Utility functions
const convertTemp = (c) => state.unit === 'fahrenheit' ? (c * 9/5) + 32 : c;
const formatTemp = (c) => `${Math.round(convertTemp(c))}`;

// CRITICAL FIX: Weather Animation System with Proper Cleanup
class WeatherAnimations {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.animationId = null;
    this.currentWeather = null;
    this.lightningTimer = 0;
    this.lightningInterval = 3000;
    this.isFlashing = false;
    this.setupCanvas();
  }
  
  setupCanvas() {
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());
  }
  
  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
  
  // CRITICAL: Clear all animations before starting new ones
  clearAnimations() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    this.particles = [];
    this.lightningTimer = 0;
    this.isFlashing = false;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    console.log('Previous animations cleared');
  }
  
  startAnimation(weatherCode) {
    this.clearAnimations(); // Always clear first
    
    const weatherInfo = WEATHER_CODES[weatherCode];
    if (!weatherInfo) return;
    
    this.currentWeather = weatherInfo.animation;
    console.log('Starting animation:', this.currentWeather);
    
    switch (weatherInfo.animation) {
      case 'sunny':
        this.createLensGlare();
        break;
      case 'rain':
        this.createRain();
        break;
      case 'snow':
        this.createSnow();
        break;
      case 'thunderstorm':
        this.createThunderstorm();
        break;
      case 'cloudy':
        this.createClouds();
        break;
    }
    
    this.animate();
  }
  
  // THUNDERSTORM ANIMATION - Complete Implementation
  createThunderstorm() {
    console.log('Creating thunderstorm animation');
    
    // Lightning flash system
    this.lightningTimer = 0;
    this.lightningInterval = Math.random() * 3000 + 2000; // 2-5 seconds
    this.isFlashing = false;
    
    // Storm clouds
    for (let i = 0; i < 8; i++) {
      this.particles.push({
        type: 'cloud',
        x: Math.random() * this.canvas.width,
        y: Math.random() * 100,
        size: Math.random() * 80 + 40,
        opacity: Math.random() * 0.3 + 0.2,
        speed: Math.random() * 0.5 + 0.2
      });
    }
    
    // Heavy rain drops
    for (let i = 0; i < 200; i++) {
      this.particles.push({
        type: 'rain',
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        speed: Math.random() * 8 + 12,
        opacity: Math.random() * 0.6 + 0.4
      });
    }
  }
  
  // LENS GLARE ANIMATION - New Implementation
  createLensGlare() {
    console.log('Creating lens glare animation');
    
    // Sun rays
    for (let i = 0; i < 6; i++) {
      this.particles.push({
        type: 'sunray',
        angle: (i * 60) * Math.PI / 180,
        length: Math.random() * 100 + 50,
        opacity: Math.random() * 0.3 + 0.1,
        rotation: 0,
        centerX: this.canvas.width * 0.8,
        centerY: this.canvas.height * 0.2
      });
    }
    
    // Lens flare spots
    for (let i = 0; i < 4; i++) {
      this.particles.push({
        type: 'lensflare',
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height * 0.5,
        size: Math.random() * 30 + 10,
        opacity: Math.random() * 0.2 + 0.1,
        pulsePhase: Math.random() * Math.PI * 2,
        color: `hsl(${45 + Math.random() * 30}, 70%, 60%)`
      });
    }
  }
  
  createRain() {
    for (let i = 0; i < 100; i++) {
      this.particles.push({
        type: 'rain',
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        speed: Math.random() * 5 + 8,
        opacity: Math.random() * 0.8 + 0.2
      });
    }
  }
  
  createSnow() {
    for (let i = 0; i < 80; i++) {
      this.particles.push({
        type: 'snow',
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 4 + 2,
        speed: Math.random() * 2 + 1,
        opacity: Math.random() * 0.8 + 0.2,
        drift: Math.random() * 2 - 1
      });
    }
  }
  
  createClouds() {
    for (let i = 0; i < 5; i++) {
      this.particles.push({
        type: 'cloud',
        x: Math.random() * this.canvas.width,
        y: Math.random() * 150,
        size: Math.random() * 60 + 30,
        opacity: Math.random() * 0.4 + 0.1,
        speed: Math.random() * 0.3 + 0.1
      });
    }
  }
  
  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    if (this.currentWeather === 'thunderstorm') {
      this.animateThunderstorm();
    } else if (this.currentWeather === 'sunny') {
      this.animateSunny();
    } else if (this.currentWeather === 'rain') {
      this.animateRain();
    } else if (this.currentWeather === 'snow') {
      this.animateSnow();
    } else if (this.currentWeather === 'cloudy') {
      this.animateClouds();
    }
    
    this.animationId = requestAnimationFrame(() => this.animate());
  }
  
  animateThunderstorm() {
    // Lightning flash logic
    this.lightningTimer += 16; // ~60fps
    
    if (this.lightningTimer >= this.lightningInterval && !this.isFlashing) {
      this.triggerLightning();
      this.lightningTimer = 0;
      this.lightningInterval = Math.random() * 4000 + 1000;
    }
    
    // Draw storm effects
    this.particles.forEach(particle => {
      if (particle.type === 'cloud') {
        this.ctx.fillStyle = `rgba(40, 40, 60, ${particle.opacity})`;
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        this.ctx.fill();
        
        particle.x += particle.speed;
        if (particle.x > this.canvas.width + particle.size) {
          particle.x = -particle.size;
        }
      } else if (particle.type === 'rain') {
        this.ctx.strokeStyle = `rgba(150, 200, 255, ${particle.opacity})`;
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(particle.x, particle.y);
        this.ctx.lineTo(particle.x - 3, particle.y + 15);
        this.ctx.stroke();
        
        particle.y += particle.speed;
        if (particle.y > this.canvas.height) {
          particle.y = -10;
          particle.x = Math.random() * this.canvas.width;
        }
      }
    });
  }
  
  triggerLightning() {
    this.isFlashing = true;
    
    // Create lightning flash overlay
    const flashOverlay = document.createElement('div');
    flashOverlay.className = 'lightning-flash';
    flashOverlay.style.opacity = '1';
    document.body.appendChild(flashOverlay);
    
    // Draw lightning bolt on canvas
    this.drawLightningBolt();
    
    // Remove flash after brief moment
    setTimeout(() => {
      flashOverlay.style.opacity = '0';
      setTimeout(() => {
        if (document.body.contains(flashOverlay)) {
          document.body.removeChild(flashOverlay);
        }
      }, 100);
      this.isFlashing = false;
    }, 150);
  }
  
  drawLightningBolt() {
    const startX = Math.random() * this.canvas.width;
    const startY = 0;
    
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
    this.ctx.lineWidth = 3;
    this.ctx.beginPath();
    this.ctx.moveTo(startX, startY);
    
    let currentX = startX;
    let currentY = startY;
    
    for (let i = 0; i < 8; i++) {
      currentX += (Math.random() - 0.5) * 60;
      currentY += this.canvas.height / 10;
      this.ctx.lineTo(currentX, currentY);
    }
    
    this.ctx.stroke();
    
    // Add glow effect
    this.ctx.shadowColor = 'white';
    this.ctx.shadowBlur = 10;
    this.ctx.stroke();
    this.ctx.shadowBlur = 0;
  }
  
  animateSunny() {
    this.particles.forEach(particle => {
      if (particle.type === 'sunray') {
        particle.rotation += 0.01;
        
        this.ctx.save();
        this.ctx.translate(particle.centerX, particle.centerY);
        this.ctx.rotate(particle.angle + particle.rotation);
        
        const gradient = this.ctx.createLinearGradient(0, 0, particle.length, 0);
        gradient.addColorStop(0, `rgba(255, 255, 150, ${particle.opacity})`);
        gradient.addColorStop(1, 'rgba(255, 255, 150, 0)');
        
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, -2, particle.length, 4);
        this.ctx.restore();
      } else if (particle.type === 'lensflare') {
        particle.pulsePhase += 0.05;
        const pulse = Math.sin(particle.pulsePhase) * 0.3 + 0.7;
        
        this.ctx.save();
        this.ctx.globalAlpha = particle.opacity * pulse;
        
        const gradient = this.ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size
        );
        gradient.addColorStop(0, particle.color);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        this.ctx.fillStyle = gradient;
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.size * pulse, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.restore();
      }
    });
  }
  
  animateRain() {
    this.particles.forEach(particle => {
      this.ctx.strokeStyle = `rgba(100, 150, 255, ${particle.opacity})`;
      this.ctx.lineWidth = 1;
      this.ctx.beginPath();
      this.ctx.moveTo(particle.x, particle.y);
      this.ctx.lineTo(particle.x - 2, particle.y + 10);
      this.ctx.stroke();
      
      particle.y += particle.speed;
      if (particle.y > this.canvas.height) {
        particle.y = -10;
        particle.x = Math.random() * this.canvas.width;
      }
    });
  }
  
  animateSnow() {
    this.particles.forEach(particle => {
      this.ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fill();
      
      particle.y += particle.speed;
      particle.x += particle.drift;
      
      if (particle.y > this.canvas.height) {
        particle.y = -particle.size;
        particle.x = Math.random() * this.canvas.width;
      }
      if (particle.x > this.canvas.width) particle.x = 0;
      if (particle.x < 0) particle.x = this.canvas.width;
    });
  }
  
  animateClouds() {
    this.particles.forEach(particle => {
      this.ctx.fillStyle = `rgba(200, 200, 200, ${particle.opacity})`;
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fill();
      
      particle.x += particle.speed;
      if (particle.x > this.canvas.width + particle.size) {
        particle.x = -particle.size;
      }
    });
  }
}

// CRITICAL FIX: Search functionality with working dropdown
let searchTimeout;
const searchInput = $('citySearch');
const searchResults = $('searchResults');

async function searchCities(query) {
  try {
    showSearchLoading();
    console.log('Searching for:', query);
    
    const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=en&format=json`);
    const data = await response.json();
    
    if (data.results && data.results.length > 0) {
      displaySearchResults(data.results);
    } else {
      showNoResults();
    }
  } catch (error) {
    console.error('Search failed:', error);
    showSearchError();
  }
}

function displaySearchResults(results) {
  searchResults.innerHTML = '';
  searchResults.classList.add('visible');
  
  results.forEach(result => {
    const item = document.createElement('div');
    item.className = 'search-result-item';
    item.textContent = `${result.name}, ${result.country}`;
    item.addEventListener('click', () => selectLocation(result));
    searchResults.appendChild(item);
  });
  
  console.log('Search results displayed:', results.length);
}

function selectLocation(result) {
  console.log('Location selected:', result);
  
  state.location = {
    lat: result.latitude,
    lon: result.longitude, 
    name: result.name,
    country: result.country
  };
  
  searchInput.value = `${result.name}, ${result.country}`;
  hideSearchResults();
  fetchAndRender();
}

function showSearchLoading() {
  searchResults.innerHTML = '<div class="search-loading">Searching...</div>';
  searchResults.classList.add('visible');
}

function showNoResults() {
  searchResults.innerHTML = '<div class="search-no-results">No locations found</div>';
  searchResults.classList.add('visible');
}

function showSearchError() {
  searchResults.innerHTML = '<div class="search-no-results">Search failed. Please try again.</div>';
  searchResults.classList.add('visible');
}

function hideSearchResults() {
  searchResults.classList.remove('visible');
  setTimeout(() => {
    if (!searchResults.classList.contains('visible')) {
      searchResults.innerHTML = '';
    }
  }, 300);
}

// Enhanced body class management with smooth transitions
const setBodyClassForCode = (code) => {
  const body = document.body;
  const currentClasses = ['weather-clear', 'weather-cloudy', 'weather-rain', 'weather-snow', 'weather-thunderstorm'];
  
  // Remove all weather classes
  currentClasses.forEach(cls => body.classList.remove(cls));
  
  // Add new class with animation delay
  setTimeout(() => {
    const meta = WEATHER_CODES[code] || {animation: 'sunny'};
    let weatherClass = 'weather-clear';
    
    switch (meta.animation) {
      case 'sunny': weatherClass = 'weather-clear'; break;
      case 'cloudy': weatherClass = 'weather-cloudy'; break;
      case 'rain': weatherClass = 'weather-rain'; break;
      case 'snow': weatherClass = 'weather-snow'; break;
      case 'thunderstorm': weatherClass = 'weather-thunderstorm'; break;
    }
    
    body.classList.add(weatherClass);
    
    // CRITICAL: Start weather animations
    if (state.weatherAnimations) {
      state.weatherAnimations.startAnimation(code);
    }
  }, 100);
};

// Element visibility with animations
const show = (el, animation = 'fade-in') => {
  if (!el) return;
  el.classList.remove('hidden');
  el.classList.add(animation);
};

const hide = (el) => {
  if (!el) return;
  el.classList.add('hidden');
  el.classList.remove('fade-in', 'slide-down', 'rise-in');
};

// Clear all states
function clearStates() {
  hide($("loadingState"));
  hide($("errorState"));  
  hide($("dashboard"));
}

// Fixed overlay dismissal function
function dismissOverlay() {
  const overlay = $('landingOverlay');
  if (!overlay) return;
  
  console.log('Dismissing overlay...');
  
  // Prevent further interactions
  overlay.style.pointerEvents = 'none';
  
  // Add slide-out animation
  overlay.classList.add('slide-out');
  
  // Remove overlay after animation completes
  setTimeout(() => {
    overlay.style.display = 'none';
    overlay.classList.add('hidden');
    console.log('Overlay dismissed successfully');
  }, 600);
}

// Enhanced geolocation with better error handling
async function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      return reject(new Error('Geolocation not supported on this device'));
    }
    
    const options = {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 300000 // 5 minutes
    };
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('Location acquired:', position.coords);
        resolve(position);
      },
      (error) => {
        let message = 'Location access denied';
        switch(error.code) {
          case error.PERMISSION_DENIED:
            message = 'Location access denied. Please enable location services.';
            break;
          case error.POSITION_UNAVAILABLE:
            message = 'Location information unavailable.';
            break;
          case error.TIMEOUT:
            message = 'Location request timed out.';
            break;
        }
        reject(new Error(message));
      },
      options
    );
  });
}

// API functions with enhanced error handling
async function fetchWeather(lat, lon) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,wind_direction_10m,apparent_temperature&hourly=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code,precipitation_sum&timezone=auto&forecast_days=7`;
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Weather service unavailable (${response.status})`);
  }
  
  const data = await response.json();
  console.log('Weather data fetched:', data);
  return data;
}

// Enhanced rendering functions
function renderCurrent() {
  if (!state.weather?.current) return;
  
  const current = state.weather.current;
  const meta = WEATHER_CODES[current.weather_code] || {description: '—', icon: '❓'};
  
  // Animate temperature change
  const tempEl = $('currentTemp');
  if (tempEl) {
    const newTemp = formatTemp(current.temperature_2m || 0);
    animateNumber(tempEl, parseInt(tempEl.textContent) || 0, parseInt(newTemp));
  }
  
  // Update other elements with stagger animation
  const updates = [
    {el: $('currentLocation'), value: state.location?.name || 'Current location'},
    {el: $('currentTime'), value: new Date().toLocaleString()},
    {el: $('currentDescription'), value: meta.description},
    {el: $('currentIcon'), value: meta.icon},
    {el: $('feelsLike'), value: `${formatTemp(current.apparent_temperature || current.temperature_2m || 0)}°`},
    {el: $('humidity'), value: `${current.relative_humidity_2m || 0}%`},
    {el: $('windSpeed'), value: `${Math.round(current.wind_speed_10m || 0)} km/h`},
    {el: $('windDirection'), value: `${Math.round(current.wind_direction_10m || 0)}°`}
  ];
  
  updates.forEach((update, index) => {
    if (update.el) {
      setTimeout(() => {
        update.el.textContent = update.value;
        update.el.style.animation = 'fadeIn 0.4s ease-out';
      }, index * 50);
    }
  });
  
  // Update unit labels
  $$('.temp-unit').forEach(el => {
    el.textContent = state.unit === 'celsius' ? '°C' : '°F';
  });
  
  setBodyClassForCode(current.weather_code);
}

// Smooth number animation
function animateNumber(element, from, to) {
  const duration = 800;
  const start = Date.now();
  
  function update() {
    const elapsed = Date.now() - start;
    const progress = Math.min(elapsed / duration, 1);
    
    // iOS-style easing
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(from + (to - from) * eased);
    
    element.textContent = current;
    
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }
  
  update();
}

function renderHourly() {
  const container = $('hourlyForecast');
  if (!container || !state.weather?.hourly) return;
  
  container.innerHTML = '';
  const {hourly} = state.weather;
  const now = Date.now();
  let shown = 0;
  
  for (let i = 0; i < hourly.time.length && shown < 24; i++) {
    const time = new Date(hourly.time[i]);
    if (time.getTime() < now - 60*60*1000) continue;
    
    const hourStr = time.getHours() === 0 ? '12 AM' : 
                   time.getHours() === 12 ? '12 PM' : 
                   time.getHours() > 12 ? `${time.getHours() - 12} PM` : 
                   `${time.getHours()} AM`;
    
    const code = hourly.weather_code[i] || 0;
    const meta = WEATHER_CODES[code] || {icon: '❓'};
    const temp = formatTemp(hourly.temperature_2m[i] || 0);

    const div = document.createElement('div');
    div.className = 'hourly-item glass';
    div.style.animationDelay = `${shown * 0.1}s`;
    div.innerHTML = `
      <div class="hourly-time">${hourStr}</div>
      <div class="hourly-icon">${meta.icon}</div>
      <div class="hourly-temp">${temp}°</div>
    `;
    
    container.appendChild(div);
    shown++;
  }
}

function renderDaily() {
  const container = $('dailyForecast');
  if (!container || !state.weather?.daily) return;
  
  container.innerHTML = '';
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const {daily} = state.weather;
  
  daily.time.forEach((time, i) => {
    const date = new Date(time);
    const dayLabel = i === 0 ? 'Today' : days[date.getDay()];
    const code = daily.weather_code[i] || 0;
    const meta = WEATHER_CODES[code] || {icon: '❓', description: '—'};
    const high = formatTemp(daily.temperature_2m_max[i] || 0);
    const low = formatTemp(daily.temperature_2m_min[i] || 0);
    const precip = daily.precipitation_sum[i] || 0;

    const div = document.createElement('div');
    div.className = 'daily-item glass';
    div.style.animationDelay = `${i * 0.1}s`;
    div.setAttribute('tabindex', '0');
    div.innerHTML = `
      <div class="daily-day">${dayLabel}</div>
      <div class="daily-icon">${meta.icon}</div>
      <div class="daily-desc">${meta.description}</div>
      <div class="daily-precip">${precip ? precip.toFixed(1) + ' mm' : ''}</div>
      <div class="daily-temps">
        <span class="daily-high">${high}°</span>
        <span class="daily-low">${low}°</span>
      </div>
    `;
    
    container.appendChild(div);
  });
}

function renderChart() {
  const canvas = $('tempChart');
  if (!canvas || !state.weather?.hourly) return;
  
  if (state.chart) {
    state.chart.destroy();
    state.chart = null;
  }
  
  const {hourly} = state.weather;
  const labels = [];
  const temps = [];
  const now = Date.now();
  let shown = 0;
  
  for (let i = 0; i < hourly.time.length && shown < 24; i++) {
    const time = new Date(hourly.time[i]);
    if (time.getTime() < now - 60*60*1000) continue;
    labels.push(`${time.getHours()}:00`);
    temps.push(convertTemp(hourly.temperature_2m[i] || 0));
    shown++;
  }
  
  if (typeof Chart === 'undefined') {
    console.error('Chart.js not loaded');
    return;
  }
  
  const ctx = canvas.getContext('2d');
  state.chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Temperature',
        data: temps,
        borderColor: '#1fb8cd',
        backgroundColor: 'rgba(31, 184, 205, 0.1)',
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 8,
        pointBackgroundColor: '#1fb8cd',
        pointBorderColor: 'rgba(255, 255, 255, 0.8)',
        pointBorderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 1500,
        easing: 'easeOutQuart'
      },
      plugins: {
        legend: {display: false},
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: 'white',
          bodyColor: 'white',
          borderColor: 'rgba(255, 255, 255, 0.2)',
          borderWidth: 1,
          cornerRadius: 8
        }
      },
      scales: {
        x: {
          grid: {color: 'rgba(255, 255, 255, 0.1)'},
          ticks: {color: 'rgba(255, 255, 255, 0.8)'}
        },
        y: {
          grid: {color: 'rgba(255, 255, 255, 0.1)'},
          ticks: {
            color: 'rgba(255, 255, 255, 0.8)',
            callback: (value) => `${Math.round(value)}${state.unit === 'celsius' ? '°C' : '°F'}`
          }
        }
      }
    }
  });
}

function renderAll() {
  clearStates();
  
  // Stagger the rendering for smooth animation
  setTimeout(() => renderCurrent(), 100);
  setTimeout(() => renderHourly(), 200);
  setTimeout(() => renderChart(), 300);
  setTimeout(() => renderDaily(), 400);
  
  setTimeout(() => {
    show($('dashboard'), 'fade-in');
  }, 500);
}

// Event handlers
function onUnitToggle() {
  state.unit = state.unit === 'celsius' ? 'fahrenheit' : 'celsius';
  const toggleBtn = $('unitToggle');
  if (toggleBtn) {
    toggleBtn.textContent = state.unit === 'celsius' ? '°C / °F' : '°F / °C';
    toggleBtn.style.animation = 'pulse 0.3s ease-out';
  }
  
  if (state.weather) {
    renderAll();
  }
}

// CRITICAL FIX: Search input handler with proper dropdown
function onSearchInput(e) {
  const query = e.target.value.trim();
  
  if (searchTimeout) clearTimeout(searchTimeout);
  
  if (query.length < 2) { 
    hideSearchResults(); 
    return; 
  }
  
  searchTimeout = setTimeout(() => searchCities(query), 300);
}

function onSearchBlur() {
  setTimeout(() => hideSearchResults(), 200);
}

// Main fetch and render
async function fetchAndRender() {
  if (!state.location) return;
  
  clearStates();
  show($('loadingState'));
  
  try {
    const {lat, lon} = state.location;
    state.weather = await fetchWeather(lat, lon);
    renderAll();
  } catch (error) {
    console.error('Fetch error:', error);
    const errorMsg = $('errorMessage');
    if (errorMsg) {
      errorMsg.textContent = error.message || 'Failed to fetch weather data';
    }
    clearStates();
    show($('errorState'));
  }
}

// Initialization
function init() {
  console.log('Initializing The Weather Accurate...');
  
  // Initialize weather animations
  const canvas = $('weatherCanvas');
  if (canvas) {
    state.weatherAnimations = new WeatherAnimations(canvas);
  }
  
  // Overlay handlers with improved error handling
  const enableBtn = $('overlayEnableBtn');
  const skipBtn = $('overlaySkipBtn');
  
  if (enableBtn) {
    enableBtn.addEventListener('click', async () => {
      console.log('Enable location clicked');
      dismissOverlay();
      clearStates();
      show($('loadingState'));
      
      try {
        const position = await getCurrentPosition();
        state.location = {
          lat: position.coords.latitude, 
          lon: position.coords.longitude, 
          name: 'Current Location', 
          country: ''
        };
        await fetchAndRender();
      } catch (error) {
        console.error('Location error:', error);
        const errorMsg = $('errorMessage');
        if (errorMsg) {
          errorMsg.textContent = error.message;
        }
        clearStates();
        show($('errorState'));
      }
    });
  }
  
  if (skipBtn) {
    skipBtn.addEventListener('click', () => {
      console.log('Skip clicked');
      dismissOverlay();
      setTimeout(() => {
        const searchInput = $('citySearch');
        if (searchInput) searchInput.focus();
      }, 700);
    });
  }

  // UI event handlers
  const unitToggle = $('unitToggle');
  if (unitToggle) {
    unitToggle.addEventListener('click', onUnitToggle);
  }
  
  // CRITICAL FIX: Search event listeners
  if (searchInput) {
    searchInput.addEventListener('input', onSearchInput);
    searchInput.addEventListener('blur', onSearchBlur);
    searchInput.addEventListener('focus', () => {
      if (searchInput.value.trim().length >= 2) {
        searchCities(searchInput.value.trim());
      }
    });
  }

  const retryBtn = $('retryBtn');
  if (retryBtn) {
    retryBtn.addEventListener('click', () => {
      if (state.location) {
        fetchAndRender();
      } else {
        const overlay = $('landingOverlay');
        if (overlay) {
          overlay.classList.remove('slide-out', 'hidden');
          overlay.style.display = 'flex';
          overlay.style.pointerEvents = 'auto';
        }
        clearStates();
      }
    });
  }
  
  console.log('The Weather Accurate initialized successfully');
}

// Bootstrap
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  if (state.weatherAnimations) {
    state.weatherAnimations.clearAnimations();
  }
  if (state.chart) {
    state.chart.destroy();
  }
});
