// Cecconi's Restaurant Website JavaScript

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", function () {
      mobileMenu.classList.toggle("hidden");

      // Toggle hamburger icon
      const icon = mobileMenuBtn.querySelector("svg path");
      if (mobileMenu.classList.contains("hidden")) {
        icon.setAttribute("d", "M4 6h16M4 12h16M4 18h16");
      } else {
        icon.setAttribute("d", "M6 18L18 6M6 6l12 12");
      }
    });

    // Close mobile menu when clicking outside
    document.addEventListener("click", function (event) {
      if (
        !mobileMenuBtn.contains(event.target) &&
        !mobileMenu.contains(event.target)
      ) {
        mobileMenu.classList.add("hidden");
        const icon = mobileMenuBtn.querySelector("svg path");
        icon.setAttribute("d", "M4 6h16M4 12h16M4 18h16");
      }
    });
  }

  // Gallery Slider Functionality
  const gallerySlider = document.getElementById("gallery-slider");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");

  if (gallerySlider && prevBtn && nextBtn) {
    let currentSlide = 0;
    const totalSlides = gallerySlider.children.length;

    function updateSlider() {
      const translateX = -currentSlide * 100;
      gallerySlider.style.transform = `translateX(${translateX}%)`;
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % totalSlides;
      updateSlider();
    }

    function prevSlide() {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      updateSlider();
    }

    // Event listeners for slider buttons
    nextBtn.addEventListener("click", nextSlide);
    prevBtn.addEventListener("click", prevSlide);

    // Touch support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    gallerySlider.addEventListener("touchstart", function (e) {
      touchStartX = e.changedTouches[0].screenX;
    });

    gallerySlider.addEventListener("touchend", function (e) {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });

    function handleSwipe() {
      const swipeThreshold = 50;
      if (touchEndX < touchStartX - swipeThreshold) {
        nextSlide();
      }
      if (touchEndX > touchStartX + swipeThreshold) {
        prevSlide();
      }
    }
  }

  // Contact Form Validation and Submission
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(contactForm);
      const firstName = formData.get("first-name");
      const lastName = formData.get("last-name");
      const email = formData.get("email");
      const phone = formData.get("phone");
      const subject = formData.get("subject");
      const message = formData.get("message");

      // Basic validation
      if (!firstName || !lastName || !email || !subject || !message) {
        showMessage("Please fill in all required fields.", "error");
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showMessage("Please enter a valid email address.", "error");
        return;
      }

      // Phone validation (if provided)
      if (phone) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ""))) {
          showMessage("Please enter a valid phone number.", "error");
          return;
        }
      }

      // Simulate form submission
      showMessage(
        "Thank you for your message! We will get back to you soon.",
        "success"
      );
      contactForm.reset();

      // In a real application, you would send the data to a server
      console.log("Form submitted:", {
        firstName,
        lastName,
        email,
        phone,
        subject,
        message,
      });
    });
  }

  // Function to show messages
  function showMessage(text, type) {
    // Remove existing message if any
    const existingMessage = document.querySelector(".form-message");
    if (existingMessage) {
      existingMessage.remove();
    }

    // Create message element
    const messageEl = document.createElement("div");
    messageEl.className = `form-message p-4 rounded-lg mb-4 ${
      type === "success"
        ? "bg-green-100 text-green-700 border border-green-200"
        : "bg-red-100 text-red-700 border border-red-200"
    }`;
    messageEl.textContent = text;

    // Insert message at the top of the form
    contactForm.insertBefore(messageEl, contactForm.firstChild);

    // Scroll to message
    messageEl.scrollIntoView({ behavior: "smooth", block: "center" });

    // Remove message after 5 seconds
    setTimeout(() => {
      messageEl.remove();
    }, 5000);
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Add animation on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-fade-in");
      }
    });
  }, observerOptions);

  // Observe elements for animation
  document.querySelectorAll(".bg-white, .grid > div").forEach((el) => {
    observer.observe(el);
  });

  // Image loading animations removed to prevent pulsing

  // Dynamic year in footer
  const currentYear = new Date().getFullYear();
  const copyrightElements = document.querySelectorAll("footer p");
  copyrightElements.forEach((el) => {
    if (el.textContent.includes("2025")) {
      el.textContent = el.textContent.replace("2025", currentYear);
    }
  });

  // Add hover effects to cards
  document.querySelectorAll(".bg-white").forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px)";
      this.style.transition = "transform 0.3s ease";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });

  // Initialize tooltips for social media links
  document.querySelectorAll('footer a[href*="facebook"]').forEach((link) => {
    link.title = "Follow us on Facebook";
  });

  document.querySelectorAll('footer a[href*="instagram"]').forEach((link) => {
    link.title = "Follow us on Instagram";
  });

  // Add keyboard navigation support
  document.addEventListener("keydown", function (e) {
    // Escape key closes mobile menu
    if (
      e.key === "Escape" &&
      mobileMenu &&
      !mobileMenu.classList.contains("hidden")
    ) {
      mobileMenu.classList.add("hidden");
      const icon = mobileMenuBtn.querySelector("svg path");
      icon.setAttribute("d", "M4 6h16M4 12h16M4 18h16");
    }

    // Arrow keys for gallery navigation
    if (gallerySlider) {
      if (e.key === "ArrowLeft") {
        prevSlide();
      } else if (e.key === "ArrowRight") {
        nextSlide();
      }
    }
  });

  // Lazy loading removed to prevent image pulsing issues

  // --- Shopping Cart (sessionStorage-based) ---
  const CART_KEY = "cecconis_cart";
  let cart = [];

  function loadCart() {
    try {
      const raw = sessionStorage.getItem(CART_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.error("Failed to load cart", e);
      return [];
    }
  }

  function saveCart() {
    try {
      sessionStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error("Failed to save cart", e);
    }
    updateCartCount();
    renderCart();
  }

  function updateCartCount() {
    const countEl = document.getElementById("cart-count");
    const countMobileEl = document.getElementById("cart-count-mobile");
    const total = cart.reduce((s, it) => s + (it.qty || 0), 0);
    if (countEl) countEl.textContent = total;
    if (countMobileEl) countMobileEl.textContent = total;
  }

  function formatPrice(n) {
    return "$" + Number(n || 0).toFixed(2);
  }

  function addToCart(name, price) {
    const existing = cart.find((c) => c.name === name && c.price === price);
    if (existing) {
      existing.qty = (existing.qty || 0) + 1;
    } else {
      cart.push({ name, price, qty: 1 });
    }
    saveCart();
  }

  function removeFromCart(index) {
    if (index >= 0 && index < cart.length) {
      cart.splice(index, 1);
      saveCart();
    }
  }

  function clearCart() {
    cart = [];
    saveCart();
  }

  function renderCart() {
    const container = document.getElementById("cart-items");
    const totalEl = document.getElementById("cart-total");
    if (!container || !totalEl) return;
    container.innerHTML = "";
    let total = 0;
    cart.forEach((it, idx) => {
      const row = document.createElement("div");
      row.className =
        "cart-item p-2 border rounded flex items-center justify-between";

      const meta = document.createElement("div");
      meta.className = "meta";
      const title = document.createElement("div");
      title.className = "text-sm font-medium";
      title.textContent = it.name;
      const subtitle = document.createElement("div");
      subtitle.className = "text-xs text-gray-500";
      subtitle.textContent = `${it.qty} × ${formatPrice(it.price)}`;
      meta.appendChild(title);
      meta.appendChild(subtitle);

      const actions = document.createElement("div");
      actions.className = "actions text-right";
      const sub = document.createElement("div");
      sub.className = "text-sm font-semibold mb-1";
      sub.textContent = formatPrice(it.qty * it.price);

      const removeBtn = document.createElement("button");
      removeBtn.className = "text-red-600 text-xs";
      removeBtn.textContent = "Remove";
      removeBtn.addEventListener("click", function () {
        removeFromCart(idx);
      });

      actions.appendChild(sub);
      actions.appendChild(removeBtn);

      row.appendChild(meta);
      row.appendChild(actions);
      container.appendChild(row);

      total += it.qty * it.price;
    });
    totalEl.textContent = formatPrice(total);
    updateCartCount();
  }

  // Wire up UI
  cart = loadCart();
  renderCart();

  const cartBtn = document.getElementById("cart-btn");
  const cartBtnMobile = document.getElementById("cart-btn-mobile");
  const cartPanel = document.getElementById("cart-panel");
  const closeCartBtn = document.getElementById("close-cart");
  const clearCartBtn = document.getElementById("clear-cart");

  if (cartBtn && cartPanel) {
    cartBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      cartPanel.classList.toggle("hidden");
    });
  }

  if (cartBtnMobile && cartPanel) {
    cartBtnMobile.addEventListener("click", function (e) {
      e.stopPropagation();
      cartPanel.classList.toggle("hidden");
      // Close mobile menu when opening cart
      if (mobileMenu) {
        mobileMenu.classList.add("hidden");
      }
    });
  }

  if (closeCartBtn && cartPanel) {
    closeCartBtn.addEventListener("click", function () {
      cartPanel.classList.add("hidden");
    });
  }

  if (clearCartBtn) {
    clearCartBtn.addEventListener("click", function () {
      clearCart();
    });
  }

  // Close cart when clicking outside
  document.addEventListener("click", function (e) {
    if (!cartPanel) return;
    if (cartPanel.classList.contains("hidden")) return;
    if (
      !cartPanel.contains(e.target) &&
      e.target !== cartBtn &&
      e.target !== cartBtnMobile &&
      !cartBtnMobile?.contains(e.target)
    ) {
      cartPanel.classList.add("hidden");
    }
  });

  // Hook menu item cards to add to cart on click
  // Select common card pattern used in menu: .bg-white.p-6.rounded-lg.shadow-md
  document
    .querySelectorAll(".bg-white.p-6.rounded-lg.shadow-md")
    .forEach((card) => {
      // Ensure hover cursor and menu-item class
      card.classList.add("menu-item");
      card.style.cursor = "pointer";
      card.addEventListener("click", function (e) {
        // If clicking an actual button/link inside the card, ignore
        const tag = e.target.tagName.toLowerCase();
        if (tag === "a" || tag === "button") return;

        const titleEl = card.querySelector("h3, .text-xl, .font-semibold");
        const priceEl = card.querySelector(
          ".text-accent, span.font-bold, span.text-accent"
        );
        const name = titleEl ? titleEl.innerText.trim() : "Item";
        let price = 0;
        if (priceEl) {
          price = parseFloat(priceEl.innerText.replace(/[^0-9\.]/g, "")) || 0;
        }
        addToCart(name, price);
        // brief visual feedback
        card.style.transform = "scale(0.995)";
        setTimeout(() => (card.style.transform = ""), 120);
      });
    });
});

// Utility functions
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

// Smooth page transitions
window.addEventListener("beforeunload", function () {
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.3s ease";
});

// Add CSS classes for animations
const style = document.createElement("style");
style.textContent = `
    .animate-fade-in {
        animation: fadeIn 0.6s ease-in-out;
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    /* Image loading styles removed to prevent pulsing */
`;
document.head.appendChild(style);
