// Mobile Menu Toggle
document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuToggle = document.getElementById("mobileMenuToggle")
  const navMenu = document.getElementById("navMenu")

  if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active")

      // Animate hamburger menu
      const spans = mobileMenuToggle.querySelectorAll("span")
      if (navMenu.classList.contains("active")) {
        spans[0].style.transform = "rotate(45deg) translate(5px, 5px)"
        spans[1].style.opacity = "0"
        spans[2].style.transform = "rotate(-45deg) translate(7px, -6px)"
      } else {
        spans[0].style.transform = "none"
        spans[1].style.opacity = "1"
        spans[2].style.transform = "none"
      }
    })
  }

  // Close mobile menu when clicking outside
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".nav-container")) {
      navMenu.classList.remove("active")
      const spans = mobileMenuToggle.querySelectorAll("span")
      spans[0].style.transform = "none"
      spans[1].style.opacity = "1"
      spans[2].style.transform = "none"
    }
  })

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Add scroll effect to header
  let lastScrollTop = 0
  const header = document.querySelector(".header")

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop

    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Scrolling down
      header.style.transform = "translateY(-100%)"
    } else {
      // Scrolling up
      header.style.transform = "translateY(0)"
    }

    lastScrollTop = scrollTop
  })

  // Add loading animation for images
  const images = document.querySelectorAll("img")
  images.forEach((img) => {
    img.addEventListener("load", function () {
      this.style.opacity = "1"
    })

    // Set initial opacity for smooth loading
    img.style.opacity = "0"
    img.style.transition = "opacity 0.3s ease"

    // If image is already loaded (cached)
    if (img.complete) {
      img.style.opacity = "1"
    }
  })

  // Form validation and submission (for future forms)
  const forms = document.querySelectorAll("form")
  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault()

      // Basic form validation
      const requiredFields = form.querySelectorAll("[required]")
      let isValid = true

      requiredFields.forEach((field) => {
        if (!field.value.trim()) {
          isValid = false
          field.classList.add("error")
        } else {
          field.classList.remove("error")
        }
      })

      if (isValid) {
        // Here you would typically send the form data to your server
        console.log("Form submitted successfully")
        // Show success message
        showNotification("Thank you! We will contact you soon.", "success")
      } else {
        showNotification("Please fill in all required fields.", "error")
      }
    })
  })

  // Notification system
  function showNotification(message, type = "info") {
    const notification = document.createElement("div")
    notification.className = `notification notification-${type}`
    notification.textContent = message

    // Style the notification
    notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 5px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `

    // Set background color based on type
    switch (type) {
      case "success":
        notification.style.backgroundColor = "#28a745"
        break
      case "error":
        notification.style.backgroundColor = "#dc3545"
        break
      default:
        notification.style.backgroundColor = "#17a2b8"
    }

    document.body.appendChild(notification)

    // Animate in
    setTimeout(() => {
      notification.style.transform = "translateX(0)"
    }, 100)

    // Remove after 5 seconds
    setTimeout(() => {
      notification.style.transform = "translateX(100%)"
      setTimeout(() => {
        document.body.removeChild(notification)
      }, 300)
    }, 5000)
  }

  // Lazy loading for images (intersection observer)
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target
          img.src = img.dataset.src
          img.classList.remove("lazy")
          imageObserver.unobserve(img)
        }
      })
    })

    document.querySelectorAll("img[data-src]").forEach((img) => {
      imageObserver.observe(img)
    })
  }

  // Add animation on scroll for elements
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(".service-card, .area-card, .benefit-item")

    elements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top
      const elementVisible = 150

      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add("animate-in")
      }
    })
  }

  // Add CSS for animation
  const style = document.createElement("style")
  style.textContent = `
        .service-card, .area-card, .benefit-item {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .error {
            border-color: #dc3545 !important;
            box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25) !important;
        }
    `
  document.head.appendChild(style)

  // Run animation check on scroll
  window.addEventListener("scroll", animateOnScroll)
  animateOnScroll() // Run once on load

  // Phone number click tracking (for analytics)
  const gtag = window.gtag // Declare gtag variable
  document.querySelectorAll('a[href^="tel:"]').forEach((link) => {
    link.addEventListener("click", () => {
      // Track phone clicks for analytics
      if (typeof gtag !== "undefined") {
        gtag("event", "phone_call", {
          event_category: "contact",
          event_label: "header_phone",
        })
      }
    })
  })

  // CTA button click tracking
  document.querySelectorAll(".cta-primary, .cta-button").forEach((button) => {
    button.addEventListener("click", function () {
      // Track CTA clicks for analytics
      if (typeof gtag !== "undefined") {
        gtag("event", "cta_click", {
          event_category: "engagement",
          event_label: this.textContent.trim(),
        })
      }
    })
  })
})

// Performance optimization: Preload critical resources
window.addEventListener("load", () => {
  // Preload important pages
  const importantPages = ["/services/hvac.html", "/quote.html", "/contact.html"]

  importantPages.forEach((page) => {
    const link = document.createElement("link")
    link.rel = "prefetch"
    link.href = page
    document.head.appendChild(link)
  })
})

// Service Worker registration for caching (optional)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("ServiceWorker registration successful")
      })
      .catch((err) => {
        console.log("ServiceWorker registration failed")
      })
  })
}
