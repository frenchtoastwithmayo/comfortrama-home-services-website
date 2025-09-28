// Performance monitoring and optimization
class PerformanceMonitor {
  constructor() {
    this.metrics = {}
    this.init()
  }

  init() {
    // Monitor Core Web Vitals
    this.measureCLS()
    this.measureFID()
    this.measureLCP()

    // Monitor custom metrics
    this.measurePageLoadTime()
    this.measureResourceLoadTimes()

    // Optimize images
    this.optimizeImages()

    // Implement service worker for caching
    this.registerServiceWorker()
  }

  measureCLS() {
    // Cumulative Layout Shift
    let clsValue = 0
    const clsEntries = []

    const observer = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value
          clsEntries.push(entry)
        }
      }
    })

    observer.observe({ type: "layout-shift", buffered: true })

    // Report CLS after page load
    window.addEventListener("beforeunload", () => {
      this.metrics.cls = clsValue
      this.reportMetrics()
    })
  }

  measureFID() {
    // First Input Delay
    const observer = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        this.metrics.fid = entry.processingStart - entry.startTime
        this.reportMetrics()
      }
    })

    observer.observe({ type: "first-input", buffered: true })
  }

  measureLCP() {
    // Largest Contentful Paint
    const observer = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries()
      const lastEntry = entries[entries.length - 1]
      this.metrics.lcp = lastEntry.startTime
    })

    observer.observe({ type: "largest-contentful-paint", buffered: true })

    // Report LCP after page load
    window.addEventListener("load", () => {
      setTimeout(() => this.reportMetrics(), 0)
    })
  }

  measurePageLoadTime() {
    window.addEventListener("load", () => {
      const navigation = performance.getEntriesByType("navigation")[0]
      this.metrics.pageLoadTime = navigation.loadEventEnd - navigation.fetchStart
      this.metrics.domContentLoaded = navigation.domContentLoadedEventEnd - navigation.fetchStart
      this.metrics.timeToFirstByte = navigation.responseStart - navigation.fetchStart
    })
  }

  measureResourceLoadTimes() {
    window.addEventListener("load", () => {
      const resources = performance.getEntriesByType("resource")
      const slowResources = resources.filter((resource) => resource.duration > 1000)

      this.metrics.slowResources = slowResources.map((resource) => ({
        name: resource.name,
        duration: resource.duration,
        size: resource.transferSize,
      }))
    })
  }

  optimizeImages() {
    // Implement progressive image loading
    const images = document.querySelectorAll("img[data-src]")

    if ("IntersectionObserver" in window) {
      const imageObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target
              img.src = img.dataset.src
              img.classList.remove("lazy")
              img.classList.add("loaded")
              imageObserver.unobserve(img)
            }
          })
        },
        {
          rootMargin: "50px 0px",
        },
      )

      images.forEach((img) => imageObserver.observe(img))
    }

    // Add WebP support detection
    this.detectWebPSupport()
  }

  detectWebPSupport() {
    const webP = new Image()
    webP.onload = webP.onerror = () => {
      const isWebPSupported = webP.height === 2
      document.documentElement.classList.toggle("webp", isWebPSupported)
      document.documentElement.classList.toggle("no-webp", !isWebPSupported)
    }
    webP.src =
      "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA"
  }

  registerServiceWorker() {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then((registration) => {
            console.log("SW registered: ", registration)
          })
          .catch((registrationError) => {
            console.log("SW registration failed: ", registrationError)
          })
      })
    }
  }

  reportMetrics() {
    // Send metrics to analytics service
    console.log("Performance Metrics:", this.metrics)

    // You can send this data to your analytics service
    // Example: analytics.track('performance', this.metrics)
  }
}

// Initialize performance monitoring
const performanceMonitor = new PerformanceMonitor()

// Mobile-specific optimizations
class MobileOptimizer {
  constructor() {
    this.init()
  }

  init() {
    this.optimizeTouchEvents()
    this.handleOrientationChange()
    this.optimizeViewport()
    this.preventZoom()
  }

  optimizeTouchEvents() {
    // Add touch feedback for better mobile UX
    const touchElements = document.querySelectorAll(".btn, .nav-link, .card")

    touchElements.forEach((element) => {
      element.addEventListener(
        "touchstart",
        function () {
          this.classList.add("touch-active")
        },
        { passive: true },
      )

      element.addEventListener(
        "touchend",
        function () {
          setTimeout(() => {
            this.classList.remove("touch-active")
          }, 150)
        },
        { passive: true },
      )
    })
  }

  handleOrientationChange() {
    window.addEventListener("orientationchange", () => {
      // Recalculate layout after orientation change
      setTimeout(() => {
        window.dispatchEvent(new Event("resize"))
      }, 100)
    })
  }

  optimizeViewport() {
    // Ensure proper viewport handling
    const viewport = document.querySelector('meta[name="viewport"]')
    if (!viewport) {
      const meta = document.createElement("meta")
      meta.name = "viewport"
      meta.content = "width=device-width, initial-scale=1.0, viewport-fit=cover"
      document.head.appendChild(meta)
    }
  }

  preventZoom() {
    // Prevent zoom on form inputs (iOS)
    const inputs = document.querySelectorAll("input, textarea, select")
    inputs.forEach((input) => {
      if (input.style.fontSize === "" || Number.parseFloat(input.style.fontSize) < 16) {
        input.style.fontSize = "16px"
      }
    })
  }
}

// Initialize mobile optimizations
const mobileOptimizer = new MobileOptimizer()

// Connection-aware loading
if ("connection" in navigator) {
  const connection = navigator.connection

  if (connection.effectiveType === "slow-2g" || connection.effectiveType === "2g") {
    // Reduce image quality for slow connections
    document.documentElement.classList.add("slow-connection")
  }

  if (connection.saveData) {
    // Respect data saver mode
    document.documentElement.classList.add("save-data")
  }
}
