const total_exp = document.getElementById("total-exp");
const total_inc = document.getElementById("total-inc");
const close_popup = document.getElementById("close_add_modal");
const add_popup = document.getElementById("popup");
const add_btn = document.getElementById("add_btn");
const tran_btn = document.getElementById("tran_btn");
const cancel_btn = document.getElementById("Cancel_btn");
const x_btn = document.getElementById("x_btn");
const income_radio = document.getElementById("income_radio");

add_popup.hidden = true;

add_btn.onclick = function(){
    add_popup.hidden = false;
}

cancel_btn.onclick = function(){
    add_popup.hidden = true;
}

tran_btn.onclick = function(){
    if(income_radio.checked){
        window.alert("Hello")
    }
    else{
        window.alert("fucku");
    }
}

x_btn.onclick = function(){
        add_popup.hidden = true;

}

total_exp.textContent = "30";

total_inc.textContent = "100";