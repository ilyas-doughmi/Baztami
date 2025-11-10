import { login, register, disconnect } from "./modules/auth.js";
import { addbenif } from "./modules/benif.js";
import { load } from "./modules/storage.js";
import { transfer } from "./modules/transfer.js";

// components
const register_btn = document.querySelector(".register");
const login_btn = document.querySelector(".login");
const email_inp = document.querySelector(".email");
const password_inp = document.querySelector(".password");
const fullname_inp = document.querySelector(".fullname");
const tel_inp = document.querySelector(".tel");
const cin_inp = document.querySelector(".cin");
const transfer_btn = document.querySelector(".transfer");
const disconnect_btn = document.querySelector(".disconnect");

// benif
const benif_name = document.querySelector(".benif_name");
const benif_rib = document.querySelector(".benif_rib");
const benif_btn = document.querySelector(".benif_btn");
const benifs = document.querySelector(".benifs");

const user = load();
const benifs_array = user?.beneficiaries || [];

// Show/hide disconnect
disconnect_btn.hidden = !(user && user.session.isLoggedIn);

// Events
register_btn.addEventListener('click', () => {
    register(email_inp.value, password_inp.value, fullname_inp.value, tel_inp.value, cin_inp.value);
});

login_btn.addEventListener('click', () => {
    login(email_inp.value, password_inp.value);
});

transfer_btn.addEventListener('click', () => {
    transfer();
});

disconnect_btn.addEventListener('click', () => {
    disconnect();
});

benif_btn.addEventListener('click', () => {
    addbenif(benif_name.value, benif_rib.value);
});

benifs.innerHTML = benifs_array
  .map(e => `${e.name} — ${e.rib}`)
  .join("<br>");
