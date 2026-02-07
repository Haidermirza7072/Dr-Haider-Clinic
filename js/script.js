const form = document.getElementById("appointmentForm");
const popup = document.getElementById("popup");

// 🔴 yahan apna n8n PRODUCTION webhook URL paste karna
const WEBHOOK_URL = "PASTE_YOUR_N8N_WEBHOOK_URL_HERE";

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  popup.style.display = "none";

  const formData = {
    name: form[0].value,
    email: form[1].value,
    phone: form[2].value,
    date: form[3].value,
    time: form[4].value,
    problem: form[5].value,
  };

  // 🧠 Sunday check (frontend level)
  const selectedDate = new Date(formData.date);
  if (selectedDate.getDay() === 0) {
    showPopup("Appointments are not available on Sundays ❌", "error");
    return;
  }

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    // 🟢 n8n se message aaya
    if (result.status === "success") {
      showPopup(result.message || "Appointment confirmed ✅", "success");
      form.reset();
    } else {
      showPopup(result.message || "Slot not available ❌", "error");
    }

  } catch (error) {
    showPopup("Server error. Please try again later ❌", "error");
  }
});

function showPopup(message, type) {
  popup.innerText = message;
  popup.className = `popup ${type}`;
  popup.style.display = "block";
}
let currentSlide = 0;
const slides = document.querySelectorAll(".slide");

setInterval(() => {
  slides[currentSlide].classList.remove("active");
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add("active");
}, 3000);
AOS.init({
  duration: 1000,
  once: true
});
