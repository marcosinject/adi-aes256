// ==================== THEME SYSTEM SCRIPT ====================

// Initialize theme system
(function() {
  'use strict';

  // Get saved theme from localStorage or use 'light' as default
  const savedTheme = localStorage.getItem('theme') || 'light';
  
  // Apply saved theme on page load
  setTheme(savedTheme);

  // Create and setup theme toggle button
  function createThemeToggleButton() {
    const header = document.querySelector('header.u-header');
    if (!header) return;

    const socialIcons = header.querySelector('.u-social-icons');
    if (!socialIcons) return;

    // Check if button already exists
    if (document.querySelector('.theme-toggle')) return;

    // Create theme toggle button
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'theme-toggle';
    toggleBtn.setAttribute('aria-label', 'Toggle theme');
    toggleBtn.setAttribute('title', 'Toggle Dark/Light Mode');
    toggleBtn.innerHTML = '<i class="fas fa-moon"></i>';

    // Insert button in the header
    socialIcons.parentNode.insertBefore(toggleBtn, socialIcons.nextSibling);

    // Add click event
    toggleBtn.addEventListener('click', toggleTheme);

    // Update button icon on theme change
    updateThemeIcon();
  }

  // Set theme function
  function setTheme(theme) {
    const html = document.documentElement;
    
    if (theme === 'dark') {
      html.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      html.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }

    // Apply theme to body for compatibility
    document.body.setAttribute('data-theme', theme);

    // Trigger theme change event
    window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
  }

  // Toggle theme function
  function toggleTheme() {
    const currentTheme = localStorage.getItem('theme') || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Add transition class for smooth effect
    document.body.style.opacity = '0.9';
    
    setTimeout(() => {
      setTheme(newTheme);
      updateThemeIcon();
      document.body.style.opacity = '1';
    }, 150);
  }

  // Update button icon based on current theme
  function updateThemeIcon() {
    const toggleBtn = document.querySelector('.theme-toggle');
    if (!toggleBtn) return;

    const currentTheme = localStorage.getItem('theme') || 'light';
    const icon = toggleBtn.querySelector('i');

    if (currentTheme === 'dark') {
      icon.className = 'fas fa-sun';
      toggleBtn.title = 'Switch to Light Mode';
    } else {
      icon.className = 'fas fa-moon';
      toggleBtn.title = 'Switch to Dark Mode';
    }
  }

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createThemeToggleButton);
  } else {
    createThemeToggleButton();
  }

  // Also create button after a short delay for dynamic content
  setTimeout(createThemeToggleButton, 500);

  // Listen for theme change events to update UI
  window.addEventListener('themeChanged', function(e) {
    const theme = e.detail.theme;
    console.log('Theme changed to:', theme);
    
    // You can add additional UI updates here if needed
  });

  // Respect system preference if no saved theme
  if (!localStorage.getItem('theme')) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');
  }

  // Listen for system theme preference changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });

  // Export functions to global scope
  window.themeSystem = {
    setTheme,
    toggleTheme,
    getCurrentTheme: () => localStorage.getItem('theme') || 'light'
  };

})();

// ==================== SMOOTH TRANSITIONS ====================

// Add smooth transition class on body for theme changes
document.addEventListener('DOMContentLoaded', function() {
  const style = document.createElement('style');
  style.textContent = `
    body {
      transition: background-color 0.3s ease, color 0.3s ease;
    }
  `;
  document.head.appendChild(style);
});
