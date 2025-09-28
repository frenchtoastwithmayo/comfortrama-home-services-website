// Blog functionality
document.addEventListener("DOMContentLoaded", () => {
  // Newsletter form handling
  const newsletterForm = document.getElementById("newsletterForm")
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", handleNewsletterSubmit)
  }

  // Smooth scrolling for category links
  const categoryLinks = document.querySelectorAll(".category-link")
  categoryLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href")
      if (href.startsWith("#")) {
        e.preventDefault()
        const target = document.querySelector(href)
        if (target) {
          target.scrollIntoView({ behavior: "smooth" })
        }
      }
    })
  })
})

function handleNewsletterSubmit(e) {
  e.preventDefault()

  const form = e.target
  const formData = new FormData(form)
  const email = formData.get("email")

  // Basic email validation
  if (!email || !isValidEmail(email)) {
    showMessage("Please enter a valid email address", "error")
    return
  }

  // Show loading state
  const submitBtn = form.querySelector('button[type="submit"]')
  const originalText = submitBtn.textContent
  submitBtn.textContent = "Subscribing..."
  submitBtn.disabled = true

  // Simulate newsletter subscription (replace with actual endpoint)
  setTimeout(() => {
    showMessage("Thank you for subscribing! You'll receive our next newsletter soon.", "success")
    form.reset()
    submitBtn.textContent = originalText
    submitBtn.disabled = false
  }, 1500)
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function showMessage(message, type) {
  const messageDiv = document.createElement("div")
  messageDiv.className = `message ${type}`
  messageDiv.textContent = message
  messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === "success" ? "#10b981" : "#ef4444"};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    `

  document.body.appendChild(messageDiv)

  setTimeout(() => {
    messageDiv.style.animation = "slideOut 0.3s ease-in"
    setTimeout(() => {
      if (document.body.contains(messageDiv)) {
        document.body.removeChild(messageDiv)
      }
    }, 300)
  }, 5000)
}
