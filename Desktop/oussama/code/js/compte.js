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

const data = window.YCD_getData ? window.YCD_getData() : null;
const accounts = data?.accounts || [];

const cpbutton = document.getElementById("button-cp");
const cebutton = document.getElementById("button-ce");
const typecompte = document.getElementById("typecompte");
const RIB = document.getElementById("RIB");
const amountElement = document.getElementById("amount");
const eyeicon = document.getElementById("eye");
const hidebtn = document.getElementById("hideshow");
const userNameElement = document.getElementById("user-name");
const userPhoneElement = document.getElementById("user-phone");
const userEmailElement = document.getElementById("user-email");
const operationType = document.getElementById("operation-type");
const operationBeneficiary = document.getElementById("operation-beneficiary");
const operationAmount = document.getElementById("operation-amount");
const operationDate = document.getElementById("operation-date");
const exportRibBtn = document.getElementById("export-rib");

const currencyRates = {
  MAD: 1,
  USD: 0.1,
  EUR: 0.09
};

let currentAccountIndex = 0;
let currentCurrency = "MAD";
let isAmountHidden = false;

function renderUserInfo() {
  if (!data?.user) return;
  if (userNameElement) userNameElement.textContent = data.user.name || "Utilisateur";
  if (userPhoneElement) userPhoneElement.textContent = data.user.phone || "--";
  if (userEmailElement) userEmailElement.textContent = data.user.email || "--";
}

function renderTransactions() {
  if (!data?.transactions || !data.transactions.length) return;
  const latest = data.transactions[0];
  if (operationType) operationType.textContent = latest.type;
  if (operationBeneficiary) operationBeneficiary.textContent = latest.beneficiaire;
  if (operationAmount) operationAmount.textContent = `${latest.amount} ${latest.currency}`;
  if (operationDate) operationDate.textContent = latest.date;
}

function renderAmount() {
  if (!amountElement) return;
  const activeAccount = accounts[currentAccountIndex];
  if (!activeAccount) {
    amountElement.textContent = "--";
    return;
  }
  if (isAmountHidden) {
    amountElement.textContent = "*****";
    return;
  }
  const rate = currencyRates[currentCurrency] || 1;
  const converted = (activeAccount.balanceMAD * rate).toFixed(2);
  amountElement.textContent = `${converted} ${currentCurrency}`;
}

function renderAccount(index) {
  if (!accounts[index]) {
    currentAccountIndex = 0;
    if (typecompte) typecompte.textContent = "Aucun compte disponible";
    if (RIB) RIB.textContent = "--";
    renderAmount();
    return;
  }
  currentAccountIndex = index;
  if (typecompte) typecompte.textContent = accounts[index].label;
  if (RIB) RIB.textContent = accounts[index].rib;
  renderAmount();
}

function highlightAccountButtons(isSavings) {
  if (!cpbutton || !cebutton) return;
  if (isSavings) {
    cebutton.classList.remove("text-[#CCC9DC]");
    cebutton.classList.add("text-[#05B013]");
    cpbutton.classList.remove("text-[#05B013]");
    cpbutton.classList.add("text-[#CCC9DC]");
  } else {
    cpbutton.classList.remove("text-[#CCC9DC]");
    cpbutton.classList.add("text-[#05B013]");
    cebutton.classList.remove("text-[#05B013]");
    cebutton.classList.add("text-[#CCC9DC]");
  }
}

if (cpbutton) {
  cpbutton.addEventListener("click", () => {
    highlightAccountButtons(false);
    renderAccount(0);
  });
}

if (cebutton) {
  cebutton.addEventListener("click", () => {
    highlightAccountButtons(true);
    renderAccount(1);
  });
}

if (hidebtn && eyeicon) {
  hidebtn.addEventListener("click", function () {
    isAmountHidden = !isAmountHidden;
    if (isAmountHidden) {
      eyeicon.className = "fa-solid fa-eye-slash";
    } else {
      eyeicon.className = "fa-regular fa-eye";
    }
    renderAmount();
  });
}

document.querySelectorAll(".currency-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const currency = btn.getAttribute("data-currency");
    if (!currency) return;
    currentCurrency = currency;
    renderAmount();
  });
});

function exportRib() {
  const account = accounts[currentAccountIndex];
  if (!account || !window.jspdf) {
    alert("Export indisponible pour le moment.");
    return;
  }
  const doc = new window.jspdf.jsPDF();
  doc.setFontSize(16);
  doc.text("Relevé d'identité bancaire", 20, 20);
  doc.setFontSize(12);
  doc.text(`Titulaire : ${data?.user?.name || "--"}`, 20, 40);
  doc.text(`Type de compte : ${account.label || "--"}`, 20, 50);
  doc.text(`RIB : ${account.rib || "--"}`, 20, 60);
  doc.text(`Solde : ${account.balanceMAD || 0} MAD`, 20, 70);
  doc.save(`rib-${(account.label || "compte").replace(/\s+/g, "-")}.pdf`);
}

if (exportRibBtn) {
  exportRibBtn.addEventListener("click", exportRib);
}

for (let i = 1; i < 4; i++) {
  const btn = document.getElementById(`btn-transaction${i}`);
  if (!btn) continue;
  btn.addEventListener("click", function () {
    for (let j = 1; j < 4; j++) {
      const otherBtn = document.getElementById(`btn-transaction${j}`);
      if (!otherBtn) continue;
      otherBtn.classList.remove("text-[#05B013]");
      otherBtn.classList.add("text-[#CCC9DC]");
    }
    this.classList.remove("text-[#CCC9DC]");
    this.classList.add("text-[#05B013]");
  });
}

const deconnect = document.getElementById("DECONNECT");
const usercirclebtn = document.getElementById("user-circle-btn");
if (usercirclebtn && deconnect) {
  usercirclebtn.addEventListener("click", function () {
    deconnect.classList.toggle("scale-y-100");
  });
}

const deconnectbtn = document.getElementById("DECONNECT-btn");
const deconnecticon = document.getElementById("deconnect-icon");
if (deconnectbtn && deconnecticon) {
  deconnectbtn.addEventListener("click", function () {
    deconnecticon.classList.remove("fa-toggle-on", "text-green-600");
    deconnecticon.classList.add("fa-toggle-off", "text-red-600");
    window.location.href = "connexion.html";
  });
}

renderUserInfo();
renderTransactions();
highlightAccountButtons(false);
renderAccount(0);
