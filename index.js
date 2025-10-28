const total_exp = document.getElementById("total-exp");
const total_inc = document.getElementById("total-inc");
const close_popup = document.getElementById("close_add_modal");
const add_popup = document.getElementById("popup");
const add_btn = document.getElementById("add_btn");

const cancel_btn = document.getElementById("Cancel_btn");

add_popup.hidden = true;

add_btn.onclick = function(){
    add_popup.hidden = false;
}

cancel_btn.onclick = function(){
    add_popup.hidden = true;
}



total_exp.textContent = "30";

total_inc.textContent = "100";