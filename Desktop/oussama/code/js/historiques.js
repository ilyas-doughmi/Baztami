window.YCD_requireSession && window.YCD_requireSession();

const data = window.YCD_getData ? window.YCD_getData() : { transactions: [] };
const menuBtn = document.getElementById("menu-btn");
const menuIcon = document.getElementById("menu-icon");
const menu = document.getElementById("menu");

if (menuBtn && menuIcon && menu) {
  menuBtn.addEventListener("click", function () {
    if (menuIcon.classList.contains("fa-bars")) {
      menuIcon.className = "fa-solid fa-xmark";
      menu.classList.add("scale-y-100");
    } else {
      menuIcon.className = "fa-solid fa-bars";
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

const rawTransactions = Array.isArray(data.transactions) ? data.transactions : [];
const transactions = rawTransactions
  .map((tx, index) => ({
    ...tx,
    _uid: tx.id || `tx-${index}`
  }))
  .sort((a, b) => {
    const dateA = new Date(a.date || 0).getTime();
    const dateB = new Date(b.date || 0).getTime();
    return dateB - dateA;
  });

const listEl = document.getElementById("history-list");
const emptyEl = document.getElementById("history-empty");
const filterEl = document.getElementById("history-filter");
const countEl = document.getElementById("history-count");
const paginationWrapper = document.getElementById("history-pagination");
const prevBtn = document.getElementById("history-prev");
const nextBtn = document.getElementById("history-next");
const pageIndicator = document.getElementById("history-page");

const PAGE_SIZE = 5;
let currentFiltered = transactions;
let currentPage = 1;

function formatAmount(amount, currency = "MAD") {
  if (typeof Intl !== "undefined" && Intl.NumberFormat) {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency
    }).format(Number(amount) || 0);
  }
  return `${Number(amount || 0).toFixed(2)} ${currency}`;
}

function renderFilterOptions() {
  const types = Array.from(new Set(transactions.map((tx) => tx.type).filter(Boolean)));
  filterEl.innerHTML = `<option value="all">Toutes les opérations</option>`;
  types.forEach((type) => {
    const option = document.createElement("option");
    option.value = type;
    option.textContent = type;
    filterEl.appendChild(option);
  });
}

function updatePaginationControls(totalPages) {
  if (!paginationWrapper) return;
  const visible = currentFiltered.length > PAGE_SIZE;
  paginationWrapper.classList.toggle("hidden", !visible);
  if (!visible) return;
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage >= totalPages;
  if (pageIndicator) pageIndicator.textContent = `Page ${currentPage} / ${totalPages}`;
}

function renderTransactions() {
  listEl.innerHTML = "";
  const hasData = currentFiltered.length > 0;
  const totalPages = Math.max(1, Math.ceil(currentFiltered.length / PAGE_SIZE));
  if (currentPage > totalPages) currentPage = totalPages;

  if (countEl) countEl.textContent = currentFiltered.length;
  if (emptyEl) emptyEl.classList.toggle("hidden", hasData);
  updatePaginationControls(totalPages);

  if (!hasData) return;

  const start = (currentPage - 1) * PAGE_SIZE;
  const pageItems = currentFiltered.slice(start, start + PAGE_SIZE);

  pageItems.forEach((tx) => {
    const card = document.createElement("div");
    card.className =
      "bg-white rounded-3xl shadow-sm p-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between";

    const details = document.createElement("div");
    details.className = "flex flex-col gap-1";
    details.innerHTML = `
      <p class="text-sm text-gray-500">${tx.type || "Opération"}</p>
      <p class="text-lg font-semibold">${tx.beneficiaire || "N/A"}</p>
      <p class="text-sm text-gray-500">Date : ${tx.date || "-"}</p>
    `;

    const actions = document.createElement("div");
    actions.className = "flex flex-col sm:flex-row gap-3 sm:items-center";
    actions.innerHTML = `
      <span class="text-xl font-bold text-[#0C1821]">${formatAmount(tx.amount, tx.currency)}</span>
    `;

    card.appendChild(details);
    card.appendChild(actions);
    listEl.appendChild(card);
  });
}

function applyFilter() {
  const selected = filterEl.value;
  currentPage = 1;
  currentFiltered =
    selected === "all"
      ? transactions
      : transactions.filter((tx) => (tx.type || "").toLowerCase() === selected.toLowerCase());
  renderTransactions();
}

if (filterEl) {
  filterEl.addEventListener("change", applyFilter);
}

prevBtn?.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage -= 1;
    renderTransactions();
  }
});

nextBtn?.addEventListener("click", () => {
  const totalPages = Math.max(1, Math.ceil(currentFiltered.length / PAGE_SIZE));
  if (currentPage < totalPages) {
    currentPage += 1;
    renderTransactions();
  }
});

renderFilterOptions();
applyFilter();
