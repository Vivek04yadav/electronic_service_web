window.addEventListener('DOMContentLoaded', () => {
  const selectedService = localStorage.getItem('selectedService');
  if (selectedService) {
    const input = document.getElementById('service-input');
    if (input) {
      input.value = selectedService;
      input.classList.add('border-success');
      setTimeout(() => input.classList.remove('border-success'), 1500);
    }
    localStorage.removeItem('selectedService');
  }
});

// Function to store service and redirect to booking page
function bookService(serviceName) {
  localStorage.setItem('selectedService', serviceName);
  window.location.href = 'booking.html';
}

// Real-time form validation
const inputs = {
  name: document.querySelector('input[name="name"]'),
  phone: document.querySelector('input[name="phone"]'),
  service: document.getElementById('service-input'),
  time: document.querySelector('input[name="time"]')
};

const errors = {
  name: document.getElementById('name-error'),
  phone: document.getElementById('phone-error'),
  service: document.getElementById('service-error'),
  time: document.getElementById('time-error')
};

Object.keys(inputs).forEach(key => {
  inputs[key].addEventListener('input', () => validateField(key));
});

function validateField(field) {
  const value = inputs[field].value.trim();
  const isValid = field === 'phone' ? /^[0-9]{10}$/.test(value) : value.length > 0;
  errors[field].classList.toggle('d-none', isValid);
  return isValid;
}

// Form submission
document.getElementById('booking-form').addEventListener('submit', async e => {
  e.preventDefault();
  const submitBtn = e.target.querySelector('button');
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Booking...';
  submitBtn.disabled = true;

  const valid = Object.keys(inputs).every(validateField);
  if (!valid) {
    submitBtn.innerHTML = 'Schedule Service';
    submitBtn.disabled = false;
    return;
  }

  const data = {
    name: inputs.name.value.trim(),
    phone: inputs.phone.value.trim(),
    service: inputs.service.value.trim(),
    time: inputs.time.value.trim()
  };

  try {
    const res = await fetch('/api/book', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await res.json();
    if (res.ok) {
      alert('✅ Booking Confirmed! We will contact you shortly.');
      e.target.reset();
    } else {
      alert(`❌ ${result.error}`);
    }
  } catch (err) {
    alert('⚠️ Network error. Please try again later.');
  }

  submitBtn.innerHTML = 'Schedule Service';
  submitBtn.disabled = false;
});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const responseBox = document.getElementById("contact-response");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const data = {
        name: form.name.value,
        phone: form.phone.value,
        email: "", // not used in form now
        message: form.message.value,
      };

      try {
        const res = await fetch("http://127.0.0.1:8000/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        const result = await res.json();
        responseBox.innerHTML = `<div class="alert alert-success">${result.message}</div>`;
        form.reset();
      } catch (err) {
        responseBox.innerHTML = `<div class="alert alert-danger">Something went wrong.</div>`;
        console.error(err);
      }
    });
  }
});
