// The Weather Accurate - Professional Weather App
// Enhanced with dynamic weather animations and high-visibility search

const state = {
  unit: 'celsius', // 'celsius' | 'fahrenheit'
  location: null, // {lat, lon, name, country}
  weather: null, // API response
  chart: null, // Chart.js instance
  currentAnimation: null, // Current weather animation
  animationFrame: null
};

// Enhanced WMO weather codes with animation types
const WEATHER_CODES = {
  0: {desc: 'Clear sky', emoji: '☀️', cat: 'clear', animation: 'sunny'},
  1: {desc: 'Mainly clear', emoji: '🌤️', cat: 'clear', animation: 'sunny'},
  2: {desc: 'Partly cloudy', emoji: '⛅', cat: 'cloudy', animation: 'cloudy'},
  3: {desc: 'Overcast', emoji: '☁️', cat: 'cloudy', animation: 'cloudy'},
  45: {desc: 'Fog', emoji: '🌫️', cat: 'cloudy', animation: 'cloudy'},
  48: {desc: 'Rime fog', emoji: '🌫️', cat: 'cloudy', animation: 'cloudy'},
  51: {desc: 'Light drizzle', emoji: '🌦️', cat: 'rain', animation: 'rain'},
  53: {desc: 'Moderate drizzle', emoji: '🌦️', cat: 'rain', animation: 'rain'},
  55: {desc: 'Dense drizzle', emoji: '🌧️', cat: 'rain', animation: 'rain'},
  56: {desc: 'Light freezing drizzle', emoji: '🌧️', cat: 'rain', animation: 'rain'},
  57: {desc: 'Dense freezing drizzle', emoji: '🌧️', cat: 'rain', animation: 'rain'},
  61: {desc: 'Slight rain', emoji: '🌦️', cat: 'rain', animation: 'rain'},
  63: {desc: 'Moderate rain', emoji: '🌧️', cat: 'rain', animation: 'rain'},
  65: {desc: 'Heavy rain', emoji: '🌧️', cat: 'rain', animation: 'rain'},
  66: {desc: 'Light freezing rain', emoji: '🌧️', cat: 'rain', animation: 'rain'},
  67: {desc: 'Heavy freezing rain', emoji: '🌧️', cat: 'rain', animation: 'rain'},
  71: {desc: 'Slight snow', emoji: '🌨️', cat: 'snow', animation: 'snow'},
  73: {desc: 'Moderate snow', emoji: '🌨️', cat: 'snow', animation: 'snow'},
  75: {desc: 'Heavy snow', emoji: '❄️', cat: 'snow', animation: 'snow'},
  77: {desc: 'Snow grains', emoji: '🌨️', cat: 'snow', animation: 'snow'},
  80: {desc: 'Rain showers', emoji: '🌧️', cat: 'rain', animation: 'rain'},
  81: {desc: 'Rain showers', emoji: '🌧️', cat: 'rain', animation: 'rain'},
  82: {desc: 'Violent showers', emoji: '⛈️', cat: 'rain', animation: 'rain'},
  85: {desc: 'Snow showers', emoji: '🌨️', cat: 'snow', animation: 'snow'},
  86: {desc: 'Snow showers', emoji: '❄️', cat: 'snow', animation: 'snow'},
  95: {desc: 'Thunderstorm', emoji: '⛈️', cat: 'thunderstorm', animation: 'thunderstorm'},
  96: {desc: 'Thunderstorm hail', emoji: '⛈️', cat: 'thunderstorm', animation: 'thunderstorm'},
  99: {desc: 'Thunderstorm heavy hail', emoji: '⛈️', cat: 'thunderstorm', animation: 'thunderstorm'}
};

// Default location fallback
const DEFAULT_LOCATION = {
  name: "Kulgam",
  lat: 33.6307,
  lon: 75.0186,
  country: "India"
};

// DOM utilities
const $ = (id) => document.getElementById(id);
const $$ = (selector) => document.querySelectorAll(selector);

// Utility functions
const convertTemp = (c) => state.unit === 'fahrenheit' ? (c * 9/5) + 32 : c;
const formatTemp = (c) => `${Math.round(convertTemp(c))}`;

// CRITICAL FIX: Clear all weather animations before starting new ones
function clearAllAnimations() {
  if (state.animationFrame) {
    cancelAnimationFrame(state.animationFrame);
    state.animationFrame = null;
  }
  
  // Clear canvas
  const canvas = $('weatherAnimationCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  
  // Remove any existing animation classes or elements
  document.querySelectorAll('.weather-animation').forEach(el => el.remove());
  
  state.currentAnimation = null;
  console.log('All weather animations cleared');
}

// Enhanced weather animation system
function updateWeatherAnimations(weatherCode) {
  console.log('Updating weather animations for code:', weatherCode);
  
  // CRITICAL: Clear previous animations first
  clearAllAnimations();
  
  const meta = WEATHER_CODES[weatherCode] || {cat: 'clear', animation: 'sunny'};
  const animationType = meta.animation;
  
  // Update body class for background
  const body = document.body;
  const currentClasses = ['weather-clear', 'weather-cloudy', 'weather-rain', 'weather-snow', 'weather-thunderstorm'];
  currentClasses.forEach(cls => body.classList.remove(cls));
  
  setTimeout(() => {
    body.classList.add(`weather-${meta.cat}`);
    
    // Start appropriate animation
    switch(animationType) {
      case 'sunny':
        createLensGlareEffect();
        break;
      case 'rain':
        createRainAnimation();
        break;
      case 'snow':
        createSnowAnimation();
        break;
      case 'thunderstorm':
        createThunderstormAnimation();
        break;
      case 'cloudy':
        createCloudyAnimation();
        break;
      default:
        break;
    }
    
    state.currentAnimation = animationType;
    console.log(`Started ${animationType} animation`);
  }, 100);
}

// Lens glare effect for sunny weather
function createLensGlareEffect() {
  const canvas = $('weatherAnimationCanvas');
  if (!canvas) return;
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext('2d');
  
  const rays = [];
  for (let i = 0; i < 6; i++) {
    rays.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      length: Math.random() * 200 + 100,
      angle: Math.random() * Math.PI * 2,
      opacity: Math.random() * 0.3 + 0.1,
      speed: Math.random() * 0.02 + 0.01
    });
  }
  
  function animateLensGlare() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    rays.forEach(ray => {
      ray.angle += ray.speed;
      ray.opacity = Math.sin(Date.now() * 0.001 + ray.angle) * 0.2 + 0.2;
      
      ctx.save();
      ctx.translate(ray.x, ray.y);
      ctx.rotate(ray.angle);
      
      const gradient = ctx.createLinearGradient(-ray.length/2, 0, ray.length/2, 0);
      gradient.addColorStop(0, `rgba(255, 255, 255, 0)`);
      gradient.addColorStop(0.5, `rgba(255, 255, 255, ${ray.opacity})`);
      gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);
      
      ctx.fillStyle = gradient;
      ctx.fillRect(-ray.length/2, -2, ray.length, 4);
      ctx.restore();
    });
    
    if (state.currentAnimation === 'sunny') {
      state.animationFrame = requestAnimationFrame(animateLensGlare);
    }
  }
  
  animateLensGlare();
}

// Rain animation
function createRainAnimation() {
  const canvas = $('weatherAnimationCanvas');
  if (!canvas) return;
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext('2d');
  
  const raindrops = [];
  for (let i = 0; i < 80; i++) {
    raindrops.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      speed: Math.random() * 6 + 4,
      length: Math.random() * 20 + 10,
      opacity: Math.random() * 0.6 + 0.3
    });
  }
  
  function animateRain() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    raindrops.forEach(drop => {
      drop.y += drop.speed;
      drop.x -= drop.speed * 0.1; // Slight diagonal fall
      
      if (drop.y > canvas.height) {
        drop.y = -drop.length;
        drop.x = Math.random() * canvas.width;
      }
      
      ctx.save();
      ctx.globalAlpha = drop.opacity;
      ctx.strokeStyle = '#1fb8cd';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(drop.x, drop.y);
      ctx.lineTo(drop.x - 2, drop.y - drop.length);
      ctx.stroke();
      ctx.restore();
    });
    
    if (state.currentAnimation === 'rain') {
      state.animationFrame = requestAnimationFrame(animateRain);
    }
  }
  
  animateRain();
}

// Snow animation
function createSnowAnimation() {
  const canvas = $('weatherAnimationCanvas');
  if (!canvas) return;
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext('2d');
  
  const snowflakes = [];
  for (let i = 0; i < 60; i++) {
    snowflakes.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 4 + 2,
      speed: Math.random() * 2 + 1,
      drift: Math.random() * 0.5 - 0.25,
      opacity: Math.random() * 0.8 + 0.3,
      rotation: 0,
      rotationSpeed: Math.random() * 0.02 - 0.01
    });
  }
  
  function animateSnow() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    snowflakes.forEach(flake => {
      flake.y += flake.speed;
      flake.x += flake.drift;
      flake.rotation += flake.rotationSpeed;
      
      if (flake.y > canvas.height) {
        flake.y = -flake.size;
        flake.x = Math.random() * canvas.width;
      }
      
      ctx.save();
      ctx.translate(flake.x, flake.y);
      ctx.rotate(flake.rotation);
      ctx.globalAlpha = flake.opacity;
      ctx.fillStyle = 'white';
      ctx.beginPath();
      ctx.arc(0, 0, flake.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
    
    if (state.currentAnimation === 'snow') {
      state.animationFrame = requestAnimationFrame(animateSnow);
    }
  }
  
  animateSnow();
}

// Thunderstorm animation with lightning effects
function createThunderstormAnimation() {
  const canvas = $('weatherAnimationCanvas');
  if (!canvas) return;
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext('2d');
  
  let lightningTimer = 0;
  let showLightning = false;
  let lightningOpacity = 0;
  
  // Rain for thunderstorm
  const raindrops = [];
  for (let i = 0; i < 100; i++) {
    raindrops.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      speed: Math.random() * 8 + 6,
      length: Math.random() * 25 + 15,
      opacity: Math.random() * 0.7 + 0.4
    });
  }
  
  function animateThunderstorm() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Animate rain
    raindrops.forEach(drop => {
      drop.y += drop.speed;
      drop.x -= drop.speed * 0.15;
      
      if (drop.y > canvas.height) {
        drop.y = -drop.length;
        drop.x = Math.random() * canvas.width;
      }
      
      ctx.save();
      ctx.globalAlpha = drop.opacity;
      ctx.strokeStyle = '#74b9ff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(drop.x, drop.y);
      ctx.lineTo(drop.x - 3, drop.y - drop.length);
      ctx.stroke();
      ctx.restore();
    });
    
    // Lightning effect
    lightningTimer++;
    if (lightningTimer > 180 && Math.random() < 0.03) { // Random lightning
      showLightning = true;
      lightningOpacity = 1;
      lightningTimer = 0;
    }
    
    if (showLightning) {
      lightningOpacity -= 0.1;
      if (lightningOpacity <= 0) {
        showLightning = false;
        lightningOpacity = 0;
      }
      
      // Flash effect
      ctx.save();
      ctx.globalAlpha = lightningOpacity * 0.3;
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Lightning bolt
      ctx.globalAlpha = lightningOpacity;
      ctx.strokeStyle = '#f0f0f0';
      ctx.lineWidth = 3;
      ctx.beginPath();
      
      const startX = Math.random() * canvas.width;
      const segments = 8;
      let currentX = startX;
      let currentY = 0;
      
      ctx.moveTo(currentX, currentY);
      for (let i = 0; i < segments; i++) {
        currentX += (Math.random() - 0.5) * 60;
        currentY += canvas.height / segments;
        ctx.lineTo(currentX, currentY);
      }
      ctx.stroke();
      ctx.restore();
    }
    
    if (state.currentAnimation === 'thunderstorm') {
      state.animationFrame = requestAnimationFrame(animateThunderstorm);
    }
  }
  
  animateThunderstorm();
}

// Cloudy animation with moving clouds
function createCloudyAnimation() {
  const canvas = $('weatherAnimationCanvas');
  if (!canvas) return;
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext('2d');
  
  const clouds = [];
  for (let i = 0; i < 4; i++) {
    clouds.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height * 0.6,
      size: Math.random() * 100 + 80,
      speed: Math.random() * 0.5 + 0.2,
      opacity: Math.random() * 0.2 + 0.1
    });
  }
  
  function animateClouds() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    clouds.forEach(cloud => {
      cloud.x += cloud.speed;
      if (cloud.x > canvas.width + cloud.size) {
        cloud.x = -cloud.size;
      }
      
      ctx.save();
      ctx.globalAlpha = cloud.opacity;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.beginPath();
      ctx.arc(cloud.x, cloud.y, cloud.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
    
    if (state.currentAnimation === 'cloudy') {
      state.animationFrame = requestAnimationFrame(animateClouds);
    }
  }
  
  animateClouds();
}

// Element visibility utilities
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
  overlay.style.pointerEvents = 'none';
  overlay.classList.add('slide-out');
  
  setTimeout(() => {
    overlay.style.display = 'none';
    overlay.classList.add('hidden');
    console.log('Overlay dismissed successfully');
  }, 600);
}

// Enhanced geolocation
async function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      return reject(new Error('Geolocation not supported on this device'));
    }
    
    const options = {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 300000
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

// FIXED API functions with better error handling
async function fetchWeather(lat, lon) {
  console.log(`Fetching weather for: ${lat}, ${lon}`);
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,wind_direction_10m,apparent_temperature&hourly=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code,precipitation_sum&timezone=auto&forecast_days=7`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Weather service unavailable (${response.status})`);
    }
    
    const data = await response.json();
    console.log('Weather data fetched successfully:', data);
    return data;
  } catch (error) {
    console.error('Weather fetch error:', error);
    throw error;
  }
}

async function geocodeCities(query) {
  console.log(`Searching for: ${query}`);
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=en&format=json`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Search service unavailable');
    }
    
    const data = await response.json();
    console.log('Search results:', data.results);
    return data.results || [];
  } catch (error) {
    console.error('Geocoding error:', error);
    throw error;
  }
}

// Rendering functions
function renderCurrent() {
  if (!state.weather?.current) return;
  
  const current = state.weather.current;
  const meta = WEATHER_CODES[current.weather_code] || {desc: '—', emoji: '❓'};
  
  console.log('Rendering current weather:', current);
  
  // Animate temperature change
  const tempEl = $('currentTemp');
  if (tempEl) {
    const newTemp = formatTemp(current.temperature_2m || 0);
    animateNumber(tempEl, parseInt(tempEl.textContent) || 0, parseInt(newTemp));
  }
  
  // Update other elements
  const updates = [
    {el: $('currentLocation'), value: state.location?.name || 'Current location'},
    {el: $('currentTime'), value: new Date().toLocaleString()},
    {el: $('currentDescription'), value: meta.desc},
    {el: $('currentIcon'), value: meta.emoji},
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
  
  // CRITICAL: Update weather animations
  updateWeatherAnimations(current.weather_code);
}

// Smooth number animation
function animateNumber(element, from, to) {
  const duration = 800;
  const start = Date.now();
  
  function update() {
    const elapsed = Date.now() - start;
    const progress = Math.min(elapsed / duration, 1);
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
  console.log('Rendering hourly forecast');
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
    const meta = WEATHER_CODES[code] || {emoji: '❓'};
    const temp = formatTemp(hourly.temperature_2m[i] || 0);

    const div = document.createElement('div');
    div.className = 'hourly-item glass';
    div.style.animationDelay = `${shown * 0.1}s`;
    div.innerHTML = `
      <div class="hourly-time">${hourStr}</div>
      <div class="hourly-icon">${meta.emoji}</div>
      <div class="hourly-temp">${temp}°</div>
    `;
    
    container.appendChild(div);
    shown++;
  }
}

function renderDaily() {
  console.log('Rendering daily forecast');
  const container = $('dailyForecast');
  if (!container || !state.weather?.daily) return;
  
  container.innerHTML = '';
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const {daily} = state.weather;
  
  daily.time.forEach((time, i) => {
    const date = new Date(time);
    const dayLabel = i === 0 ? 'Today' : days[date.getDay()];
    const code = daily.weather_code[i] || 0;
    const meta = WEATHER_CODES[code] || {emoji: '❓', desc: '—'};
    const high = formatTemp(daily.temperature_2m_max[i] || 0);
    const low = formatTemp(daily.temperature_2m_min[i] || 0);
    const precip = daily.precipitation_sum[i] || 0;

    const div = document.createElement('div');
    div.className = 'daily-item glass';
    div.style.animationDelay = `${i * 0.1}s`;
    div.setAttribute('tabindex', '0');
    div.innerHTML = `
      <div class="daily-day">${dayLabel}</div>
      <div class="daily-icon">${meta.emoji}</div>
      <div class="daily-desc">${meta.desc}</div>
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
  console.log('Rendering temperature chart');
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
  console.log('Rendering all components');
  clearStates();
  
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

let searchTimer;
async function onSearchInput(e) {
  const query = e.target.value.trim();
  const resultsBox = $('searchResults');
  if (!resultsBox) return;
  
  console.log(`Search input: "${query}"`);
  
  if (searchTimer) clearTimeout(searchTimer);
  
  if (query.length < 2) { 
    hide(resultsBox); 
    return; 
  }
  
  searchTimer = setTimeout(async () => {
    try {
      console.log('Starting geocoding search...');
      const cities = await geocodeCities(query);
      
      if (cities.length === 0) { 
        resultsBox.innerHTML = '<div class="search-result">No results found</div>'; 
        show(resultsBox); 
        return; 
      }
      
      console.log(`Found ${cities.length} cities`);
      
      resultsBox.innerHTML = cities.map(city => `
        <div class="search-result" 
             data-lat="${city.latitude}" 
             data-lon="${city.longitude}" 
             data-name="${city.name}" 
             data-country="${city.country || city.admin1 || ''}" 
             tabindex="0" 
             role="option">
          <span class="result-name">${city.name}</span>, 
          <span class="result-country">${city.country || city.admin1 || ''}</span>
        </div>
      `).join('');
      
      // Add event listeners to search results
      resultsBox.querySelectorAll('.search-result').forEach(item => {
        item.addEventListener('click', (e) => {
          e.preventDefault();
          selectCity(item);
        });
        item.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            selectCity(item);
          }
        });
      });
      
      show(resultsBox);
      console.log('Search results displayed');
      
    } catch (error) { 
      console.error('Search error:', error);
      resultsBox.innerHTML = '<div class="search-result">Search unavailable</div>';
      show(resultsBox);
    }
  }, 300);
}

function selectCity(item) {
  console.log('City selected:', item);
  const lat = parseFloat(item.dataset.lat);
  const lon = parseFloat(item.dataset.lon);
  const name = item.dataset.name;
  const country = item.dataset.country;
  
  state.location = {lat, lon, name, country};
  
  const searchInput = $('citySearch');
  if (searchInput) {
    searchInput.value = `${name}, ${country}`;
    searchInput.blur();
  }
  
  hide($('searchResults'));
  
  // CRITICAL: Clear animations before fetching new weather
  clearAllAnimations();
  fetchAndRender();
}

function onSearchBlur() {
  // Delay hiding to allow click events to fire
  setTimeout(() => hide($('searchResults')), 200);
}

// Main fetch and render
async function fetchAndRender() {
  if (!state.location) return;
  
  console.log('Fetching and rendering weather data...');
  clearStates();
  show($('loadingState'));
  
  try {
    const {lat, lon} = state.location;
    state.weather = await fetchWeather(lat, lon);
    console.log('Weather data loaded, rendering...');
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

// Load default location on startup
async function loadDefaultLocation() {
  console.log('Loading default location...');
  state.location = DEFAULT_LOCATION;
  await fetchAndRender();
}

// Initialization
function init() {
  console.log('Initializing The Weather Accurate...');
  
  // Initialize canvas
  const canvas = $('weatherAnimationCanvas');
  if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  // Overlay handlers
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
    skipBtn.addEventListener('click', async () => {
      console.log('Skip clicked - loading default location');
      dismissOverlay();
      clearStates();
      show($('loadingState'));
      
      // Load default location instead of just showing search
      await loadDefaultLocation();
    });
  }

  // UI event handlers
  const unitToggle = $('unitToggle');
  if (unitToggle) {
    unitToggle.addEventListener('click', onUnitToggle);
  }
  
  const citySearch = $('citySearch');
  if (citySearch) {
    citySearch.addEventListener('input', onSearchInput);
    citySearch.addEventListener('blur', onSearchBlur);
    
    // Prevent form submission
    citySearch.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
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
  
  // Responsive canvas
  window.addEventListener('resize', () => {
    const canvas = $('weatherAnimationCanvas');
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  });
  
  console.log('The Weather Accurate initialized successfully');
}

// Bootstrap
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Cleanup
window.addEventListener('beforeunload', () => {
  clearAllAnimations();
  if (state.chart) {
    state.chart.destroy();
  }
});