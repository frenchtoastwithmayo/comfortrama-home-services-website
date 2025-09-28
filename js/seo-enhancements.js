// SEO Enhancement JavaScript
document.addEventListener("DOMContentLoaded", () => {
  // Add structured data for page views
  trackPageView()

  // Enhance internal linking
  enhanceInternalLinks()

  // Add lazy loading for images
  implementLazyLoading()

  // Add click tracking for CTAs
  trackCTAClicks()

  // Implement breadcrumb navigation enhancement
  enhanceBreadcrumbs()
})

function trackPageView() {
  // Track page views for analytics (replace with actual analytics code)
  const pageData = {
    url: window.location.href,
    title: document.title,
    timestamp: new Date().toISOString(),
  }

  // Send to analytics service
  console.log("Page view tracked:", pageData)
}

function enhanceInternalLinks() {
  // Add rel attributes to internal links for better SEO
  const internalLinks = document.querySelectorAll('a[href^="/"], a[href^="./"], a[href^="../"]')

  internalLinks.forEach((link) => {
    // Add prefetch for important pages
    if (link.href.includes("/services/") || link.href.includes("/locations/")) {
      link.setAttribute("rel", "prefetch")
    }

    // Add title attributes for better accessibility and SEO
    if (!link.getAttribute("title") && link.textContent.trim()) {
      link.setAttribute("title", link.textContent.trim())
    }
  })
}

function implementLazyLoading() {
  // Add lazy loading to images for better performance
  const images = document.querySelectorAll("img[src]")

  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target
          if (img.dataset.src) {
            img.src = img.dataset.src
            img.removeAttribute("data-src")
          }
          img.classList.remove("lazy")
          imageObserver.unobserve(img)
        }
      })
    })

    images.forEach((img) => {
      if (img.getBoundingClientRect().top > window.innerHeight) {
        img.dataset.src = img.src
        img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E'
        img.classList.add("lazy")
        imageObserver.observe(img)
      }
    })
  }
}

function trackCTAClicks() {
  // Track CTA button clicks for conversion optimization
  const ctaButtons = document.querySelectorAll(".cta-button, .btn-primary, .quote-btn")

  ctaButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const ctaData = {
        text: this.textContent.trim(),
        url: this.href || window.location.href,
        position: this.getBoundingClientRect().top + window.scrollY,
        timestamp: new Date().toISOString(),
      }

      // Send to analytics service
      console.log("CTA clicked:", ctaData)
    })
  })
}

function enhanceBreadcrumbs() {
  // Enhance breadcrumb navigation with structured data
  const breadcrumb = document.querySelector(".breadcrumb")
  if (breadcrumb) {
    const breadcrumbItems = breadcrumb.querySelectorAll("li")
    const breadcrumbData = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [],
    }

    breadcrumbItems.forEach((item, index) => {
      const link = item.querySelector("a")
      const text = link ? link.textContent.trim() : item.textContent.trim()
      const url = link ? link.href : window.location.href

      breadcrumbData.itemListElement.push({
        "@type": "ListItem",
        position: index + 1,
        name: text,
        item: url,
      })
    })

    // Add structured data to page
    const script = document.createElement("script")
    script.type = "application/ld+json"
    script.textContent = JSON.stringify(breadcrumbData)
    document.head.appendChild(script)
  }
}

// Add meta description optimization
function optimizeMetaDescription() {
  const metaDescription = document.querySelector('meta[name="description"]')
  if (metaDescription && metaDescription.content.length > 160) {
    console.warn("Meta description is too long:", metaDescription.content.length, "characters")
  }
}

// Add heading structure validation
function validateHeadingStructure() {
  const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6")
  let previousLevel = 0

  headings.forEach((heading) => {
    const currentLevel = Number.parseInt(heading.tagName.charAt(1))

    if (currentLevel > previousLevel + 1) {
      console.warn("Heading structure issue: Skipped from h" + previousLevel + " to h" + currentLevel)
    }

    previousLevel = currentLevel
  })
}

// Run SEO validations
optimizeMetaDescription()
validateHeadingStructure()
