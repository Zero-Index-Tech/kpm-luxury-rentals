const fleetDetails = {
  suv: {
    title: "Luxury SUV",
    copy: "Best for airport delivery, VIP movement, family comfort, and clients who want a premium arrival with space.",
  },
  mover: {
    title: "People Mover",
    copy: "Best for group travel, corporate guests, event teams, family movement, and practical premium transport.",
  },
  hatch: {
    title: "Premium Compact",
    copy: "Best for agile city movement, short-term bookings, and clients who want a cleaner alternative to standard hire.",
  },
};

const detail = document.querySelector("#fleet-detail");
const fleetCards = [...document.querySelectorAll(".fleet-card")];
const promptButtons = [...document.querySelectorAll(".prompt-grid button")];
const chatResponse = document.querySelector("#chat-response");
const bookingForm = document.querySelector(".booking-form");

fleetCards.forEach((card) => {
  card.addEventListener("click", () => {
    const car = card.dataset.car;
    const selected = fleetDetails[car];
    if (!selected || !detail) return;

    fleetCards.forEach((item) => item.classList.remove("is-active"));
    card.classList.add("is-active");
    detail.querySelector("h3").textContent = selected.title;
    detail.querySelector("p").textContent = selected.copy;
  });
});

promptButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (!chatResponse) return;
    chatResponse.textContent = button.dataset.response;
  });
});

bookingForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const button = bookingForm.querySelector("button");
  button.textContent = "Enquiry Prepared";
  window.setTimeout(() => {
    button.textContent = "Prepare Enquiry";
  }, 2200);
});
