import {login, register} from "./modules/auth.js"
import { transfer } from "./modules/transfer.js";
const register_btn = document.querySelector(".register");
const login_btn = document.querySelector(".login");
const email_inp = document.querySelector(".email");
const password_inp = document.querySelector(".password");
const fullname_inp = document.querySelector(".fullname");
const tel_inp = document.querySelector(".tel");
const cin_inp = document.querySelector(".cin");
const transfer_btn = document.querySelector(".transfer");



register_btn.addEventListener('click',function(){
    register(email_inp.value,password_inp.value,fullname_inp.value,tel_inp.value,cin_inp.value);
})

login_btn.addEventListener('click',function(){
    login(email_inp.value,password_inp.value);
})

transfer_btn.addEventListener("click",function(){
    transfer();
})