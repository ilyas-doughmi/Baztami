window.YCD_requireSession && window.YCD_requireSession();

const hammenu = document.getElementById("menu-btn");
const icon = document.getElementById("menu-icon");
const menu = document.getElementById("menu");

if (hammenu && icon && menu) {
  hammenu.addEventListener("click", function () {
    if (icon.classList.contains("fa-bars")) {
      icon.className = "fa-solid fa-xmark";
      menu.classList.add("scale-y-100");
    } else {
      icon.className = "fa-solid fa-bars";
      menu.classList.remove("scale-y-100");
      menu.classList.add("scale-y-0");
    }
  });
}

const deconnect = document.getElementById("DECONNECT");
const usercirclebtn = document.getElementById("user-circle-btn");
const deconnectbtn = document.getElementById("DECONNECT-btn");
const deconnecticon = document.getElementById("deconnect-icon");

if (usercirclebtn && deconnect) {
  usercirclebtn.addEventListener("click", function () {
    deconnect.classList.toggle("scale-y-100");
  });
}

if (deconnectbtn && deconnecticon) {
  deconnectbtn.addEventListener("click", function () {
    deconnecticon.classList.remove("fa-toggle-on", "text-green-600");
    deconnecticon.classList.add("fa-toggle-off", "text-red-600");
    window.location.href = "connexion.html";
  });
}

const confirmationPopup = document.getElementById("confirmation-popup");
const confirmationText = document.getElementById("Confirmation-text");
const confirmYes = document.getElementById("oui");
const confirmNo = document.getElementById("non");
const closeBtn = document.getElementById("close");

const cardcontainers = [
  document.getElementById("cardcontainer1"),
  document.getElementById("cardcontainer2")
];

const cardVisuals = [document.getElementById("card1"), document.getElementById("card2")];
const cardTitles = [document.getElementById("card1-title"), document.getElementById("card2-title")];
const cardBalances = [document.getElementById("card1-balance"), document.getElementById("card2-balance")];
const cardStatuses = [document.getElementById("statut1"), document.getElementById("statut2")];
const cardNumbers = [document.getElementById("card1-number"), document.getElementById("card2-number")];
const cardHolders = [document.getElementById("card1-holder"), document.getElementById("card2-holder")];
const cardExpiry = [document.getElementById("card1-expiry"), document.getElementById("card2-expiry")];

const blockButtons = [document.getElementById("buttonbloquer1"), document.getElementById("buttonbloquer2")];
const detailsButtons = [document.getElementById("buttondetails1"), document.getElementById("buttondetails2")];
const opposeButtons = [document.getElementById("buttonoppose1"), document.getElementById("buttonoppose2")];

const leftarrowbutton = document.getElementById("leftarrow");
const mescartes = document.getElementById("mescartes");
const plafonds = document.getElementById("plafonds");
const dailySlider = document.getElementById("dailyLimit");
const dailyValue = document.getElementById("dailyValue");
const cardDetailsLabels = document.querySelectorAll(".card1details");
const noCardsMessage = document.getElementById("no-cards");

const appData = window.YCD_getData ? window.YCD_getData() : null;
const cards = appData?.cards || [];

let pendingCardIndex = null;
let detailCardIndex = null;

function formatBalance(amount) {
  return `${(amount || 0).toLocaleString("fr-FR")} MAD`;
}

function updateStatusStyles(element, status) {
  if (!element) return;
  element.textContent = `Statut : ${status || "--"}`;
  element.classList.remove("text-green-600", "text-red-600");
  if (status === "ACTIVE") {
    element.classList.add("text-green-600");
  } else {
    element.classList.add("text-red-600");
  }
}

function formatCardNumber(card) {
  const raw = (card?.maskedNumber || card?.numero || card?.number || "").toString();
  const digits = raw.replace(/\s+/g, "");
  if (!digits) return "---- ---- ---- ----";
  const groups = digits.match(/.{1,4}/g);
  return groups ? groups.join(" ") : raw;
}

function renderCard(index) {
  const card = cards[index];
  const container = cardcontainers[index];
  if (!container) return;
  if (!card) {
    container.classList.add("hidden");
    blockButtons[index]?.classList.add("hidden");
    detailsButtons[index]?.classList.add("hidden");
    return;
  }
  container.classList.remove("hidden");
  if (cardTitles[index]) cardTitles[index].textContent = card.label || "--";
  if (cardBalances[index]) cardBalances[index].textContent = `Solde : ${formatBalance(card.balanceMAD)}`;
  if (cardStatuses[index]) updateStatusStyles(cardStatuses[index], card.status);
  if (cardNumbers[index]) cardNumbers[index].textContent = formatCardNumber(card);
  if (cardHolders[index]) cardHolders[index].textContent = card.holder || appData?.user?.name || "--";
  if (cardExpiry[index]) cardExpiry[index].textContent = card.expiry || "--/--";
  if (blockButtons[index]) {
    blockButtons[index].classList.remove("hidden");
    blockButtons[index].textContent = card.status === "ACTIVE" ? "Bloquer" : "Débloquer";
  }
  detailsButtons[index]?.classList.remove("hidden");
  if (cardVisuals[index]) {
    cardVisuals[index].classList.toggle("blur-sm", card.status === "BLOQUE");
  }
}

function renderAllCards() {
  let hasCard = false;
  cardcontainers.forEach((_, idx) => {
    if (cards[idx]) hasCard = true;
    renderCard(idx);
  });
  if (noCardsMessage) {
    noCardsMessage.classList.toggle("hidden", hasCard);
  }
}

function openConfirm(index) {
  const card = cards[index];
  if (!card || !confirmationPopup || !confirmationText) return;
  pendingCardIndex = index;
  confirmationText.textContent =
    card.status === "ACTIVE"
      ? "Voulez-vous bloquer cette carte ?"
      : "Voulez-vous débloquer cette carte ?";
  confirmYes?.classList.remove("hidden");
  confirmNo?.classList.remove("hidden");
  confirmationPopup.classList.remove("hidden");
}

function toggleCardStatus() {
  if (pendingCardIndex === null) return;
  const card = cards[pendingCardIndex];
  if (!card) return;
  card.status = card.status === "ACTIVE" ? "BLOQUE" : "ACTIVE";
  window.YCD_setData(appData);
  renderCard(pendingCardIndex);
  pendingCardIndex = null;
}

function resetView() {
  detailCardIndex = null;
  renderAllCards();
  blockButtons.forEach((btn, idx) => {
    if (!cards[idx]) {
      btn?.classList.add("hidden");
    } else {
      btn?.classList.remove("hidden");
    }
  });
  detailsButtons.forEach((btn, idx) => {
    if (!cards[idx]) {
      btn?.classList.add("hidden");
    } else {
      btn?.classList.remove("hidden");
    }
  });
  leftarrowbutton?.classList.add("hidden");
  plafonds?.classList.add("hidden");
  cardDetailsLabels.forEach((label) => label.classList.add("hidden"));
  if (mescartes) mescartes.textContent = "Mes cartes";
}

function showDetails(index) {
  if (!cards[index]) return;
  detailCardIndex = index;
  cardcontainers.forEach((container, idx) => {
    if (!container) return;
    if (idx === index) {
      container.classList.remove("hidden");
    } else {
      container.classList.add("hidden");
    }
  });
  blockButtons.forEach((btn) => btn?.classList.add("hidden"));
  detailsButtons.forEach((btn) => btn?.classList.add("hidden"));
  cardDetailsLabels.forEach((label) => label.classList.remove("hidden"));
  plafonds?.classList.remove("hidden");
  leftarrowbutton?.classList.remove("hidden");
  if (mescartes) mescartes.textContent = "Card Details";
  updateSliderForCard(index);
}

function updateSliderForCard(index) {
  if (!dailySlider || !dailyValue) return;
  const card = cards[index];
  if (!card) {
    dailySlider.value = 0;
    dailyValue.textContent = "0";
    return;
  }
  dailySlider.value = card.limit || 0;
  dailyValue.textContent = card.limit || 0;
}

blockButtons.forEach((btn, index) => {
  if (!btn) return;
  btn.addEventListener("click", () => openConfirm(index));
});

detailsButtons.forEach((btn, index) => {
  if (!btn) return;
  btn.addEventListener("click", () => showDetails(index));
});

function opposeCard(index) {
  const card = cards[index];
  if (!card) return;
  card.status = "OPPOSEE";
  card.limit = 0;
  window.YCD_setData(appData);
  renderCard(index);
}

opposeButtons.forEach((btn, index) => {
  if (!btn) return;
  btn.addEventListener("click", () => {
    if (confirm("Déclarer cette carte comme opposée ?")) {
      opposeCard(index);
      alert("Une notification a été transmise à votre conseiller.");
    }
  });
});

leftarrowbutton?.addEventListener("click", () => {
  resetView();
});

confirmYes?.addEventListener("click", () => {
  toggleCardStatus();
  confirmationPopup.classList.add("hidden");
});

confirmNo?.addEventListener("click", () => {
  pendingCardIndex = null;
  confirmationPopup.classList.add("hidden");
});

closeBtn?.addEventListener("click", () => {
  pendingCardIndex = null;
  confirmationPopup.classList.add("hidden");
});

if (dailySlider) {
  dailySlider.addEventListener("input", () => {
    if (!dailyValue) return;
    dailyValue.textContent = dailySlider.value;
    if (detailCardIndex === null) return;
    const card = cards[detailCardIndex];
    if (!card) return;
    card.limit = Number(dailySlider.value);
    window.YCD_setData(appData);
  });
}

renderAllCards();
updateSliderForCard(0);
resetView();
