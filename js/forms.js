// Form validation and submission handling
document.addEventListener("DOMContentLoaded", () => {
  // Contact form handling
  const contactForm = document.getElementById("contactForm")
  if (contactForm) {
    contactForm.addEventListener("submit", handleContactSubmit)
  }

  // Quote form handling
  const quoteForm = document.getElementById("quoteForm")
  if (quoteForm) {
    quoteForm.addEventListener("submit", handleQuoteSubmit)
  }

  // Service selection handling for quote form
  const serviceSelect = document.getElementById("service")
  const serviceDetails = document.getElementById("serviceDetails")
  if (serviceSelect && serviceDetails) {
    serviceSelect.addEventListener("change", handleServiceChange)
  }
})

function handleContactSubmit(e) {
  e.preventDefault()

  const form = e.target
  const formData = new FormData(form)

  // Basic validation
  if (!validateContactForm(formData)) {
    return
  }

  // Show loading state
  const submitBtn = form.querySelector('button[type="submit"]')
  const originalText = submitBtn.textContent
  submitBtn.textContent = "Sending..."
  submitBtn.disabled = true

  // Simulate form submission (replace with actual endpoint)
  setTimeout(() => {
    showSuccessMessage("Thank you! We'll contact you within 24 hours.")
    form.reset()
    submitBtn.textContent = originalText
    submitBtn.disabled = false
  }, 1500)
}

function handleQuoteSubmit(e) {
  e.preventDefault()

  const form = e.target
  const formData = new FormData(form)

  // Basic validation
  if (!validateQuoteForm(formData)) {
    return
  }

  // Show loading state
  const submitBtn = form.querySelector('button[type="submit"]')
  const originalText = submitBtn.textContent
  submitBtn.textContent = "Processing..."
  submitBtn.disabled = true

  // Simulate form submission (replace with actual endpoint)
  setTimeout(() => {
    showSuccessMessage("Quote request received! We'll provide your estimate within 2 business hours.")
    form.reset()
    submitBtn.textContent = originalText
    submitBtn.disabled = false
  }, 2000)
}

function validateContactForm(formData) {
  const name = formData.get("name")
  const email = formData.get("email")
  const phone = formData.get("phone")
  const message = formData.get("message")

  if (!name || name.length < 2) {
    showErrorMessage("Please enter a valid name")
    return false
  }

  if (!email || !isValidEmail(email)) {
    showErrorMessage("Please enter a valid email address")
    return false
  }

  if (!phone || !isValidPhone(phone)) {
    showErrorMessage("Please enter a valid phone number")
    return false
  }

  if (!message || message.length < 10) {
    showErrorMessage("Please enter a detailed message (at least 10 characters)")
    return false
  }

  return true
}

function validateQuoteForm(formData) {
  const name = formData.get("name")
  const email = formData.get("email")
  const phone = formData.get("phone")
  const service = formData.get("service")
  const location = formData.get("location")

  if (!name || name.length < 2) {
    showErrorMessage("Please enter a valid name")
    return false
  }

  if (!email || !isValidEmail(email)) {
    showErrorMessage("Please enter a valid email address")
    return false
  }

  if (!phone || !isValidPhone(phone)) {
    showErrorMessage("Please enter a valid phone number")
    return false
  }

  if (!service) {
    showErrorMessage("Please select a service")
    return false
  }

  if (!location) {
    showErrorMessage("Please select your location")
    return false
  }

  return true
}

function handleServiceChange(e) {
  const service = e.target.value
  const serviceDetails = document.getElementById("serviceDetails")

  if (!service) {
    serviceDetails.style.display = "none"
    return
  }

  serviceDetails.style.display = "block"

  // Update service-specific fields based on selection
  let detailsHTML = ""

  switch (service) {
    case "hvac":
      detailsHTML = `
                <div class="form-group">
                    <label for="hvacType">HVAC Service Type:</label>
                    <select id="hvacType" name="hvacType" required>
                        <option value="">Select service type</option>
                        <option value="installation">New Installation</option>
                        <option value="repair">Repair</option>
                        <option value="maintenance">Maintenance</option>
                        <option value="replacement">Replacement</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="systemAge">System Age (if applicable):</label>
                    <select id="systemAge" name="systemAge">
                        <option value="">Select age</option>
                        <option value="0-5">0-5 years</option>
                        <option value="6-10">6-10 years</option>
                        <option value="11-15">11-15 years</option>
                        <option value="16+">16+ years</option>
                    </select>
                </div>
            `
      break
    case "plumbing":
      detailsHTML = `
                <div class="form-group">
                    <label for="plumbingType">Plumbing Service Type:</label>
                    <select id="plumbingType" name="plumbingType" required>
                        <option value="">Select service type</option>
                        <option value="emergency">Emergency Repair</option>
                        <option value="installation">Installation</option>
                        <option value="drain-cleaning">Drain Cleaning</option>
                        <option value="water-heater">Water Heater Service</option>
                        <option value="fixture">Fixture Installation</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="urgency">Urgency Level:</label>
                    <select id="urgency" name="urgency" required>
                        <option value="">Select urgency</option>
                        <option value="emergency">Emergency (same day)</option>
                        <option value="urgent">Urgent (within 2 days)</option>
                        <option value="normal">Normal (within a week)</option>
                    </select>
                </div>
            `
      break
    case "landscaping":
      detailsHTML = `
                <div class="form-group">
                    <label for="landscapingType">Landscaping Service Type:</label>
                    <select id="landscapingType" name="landscapingType" required>
                        <option value="">Select service type</option>
                        <option value="design">Landscape Design</option>
                        <option value="maintenance">Lawn Maintenance</option>
                        <option value="installation">Plant Installation</option>
                        <option value="hardscaping">Hardscaping</option>
                        <option value="seasonal">Seasonal Cleanup</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="propertySize">Property Size:</label>
                    <select id="propertySize" name="propertySize">
                        <option value="">Select size</option>
                        <option value="small">Small (under 0.25 acres)</option>
                        <option value="medium">Medium (0.25-0.5 acres)</option>
                        <option value="large">Large (0.5-1 acre)</option>
                        <option value="xlarge">Extra Large (1+ acres)</option>
                    </select>
                </div>
            `
      break
    case "junk-removal":
      detailsHTML = `
                <div class="form-group">
                    <label for="junkType">Type of Items:</label>
                    <select id="junkType" name="junkType" required>
                        <option value="">Select type</option>
                        <option value="household">Household Items</option>
                        <option value="furniture">Furniture</option>
                        <option value="appliances">Appliances</option>
                        <option value="construction">Construction Debris</option>
                        <option value="yard-waste">Yard Waste</option>
                        <option value="mixed">Mixed Items</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="volume">Estimated Volume:</label>
                    <select id="volume" name="volume" required>
                        <option value="">Select volume</option>
                        <option value="small">Small (1-2 items)</option>
                        <option value="medium">Medium (pickup truck load)</option>
                        <option value="large">Large (small trailer load)</option>
                        <option value="xlarge">Extra Large (large trailer load)</option>
                    </select>
                </div>
            `
      break
  }

  serviceDetails.innerHTML = detailsHTML
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function isValidPhone(phone) {
  const phoneRegex = /^[+]?[1-9][\d]{0,15}$/
  const cleanPhone = phone.replace(/[\s\-$$$$.]/g, "")
  return cleanPhone.length >= 10 && phoneRegex.test(cleanPhone)
}

function showSuccessMessage(message) {
  const messageDiv = document.createElement("div")
  messageDiv.className = "success-message"
  messageDiv.textContent = message
  messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10b981;
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
      document.body.removeChild(messageDiv)
    }, 300)
  }, 5000)
}

function showErrorMessage(message) {
  const messageDiv = document.createElement("div")
  messageDiv.className = "error-message"
  messageDiv.textContent = message
  messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #ef4444;
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
      document.body.removeChild(messageDiv)
    }, 300)
  }, 5000)
}

// Add CSS animations
const style = document.createElement("style")
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`
document.head.appendChild(style)
