const total_exp = document.getElementById("total-exp");
const total_inc = document.getElementById("total-inc");
const close_popup = document.getElementById("close_add_modal");
const add_popup = document.getElementById("popup");
const add_btn = document.getElementById("add_btn");
const tran_btn = document.getElementById("tran_btn");
const cancel_btn = document.getElementById("Cancel_btn");
const x_btn = document.getElementById("x_btn");
const income_radio = document.getElementById("income_radio");
const three_points = document.getElementById("three-points");



three_points.onclick = function () {
    small_menu.style.opacity = 1000;
}

add_btn.onclick = function () {
    add_popup.hidden = false;
}

cancel_btn.onclick = function () {
    add_popup.hidden = true;
}


x_btn.onclick = function () {
    add_popup.hidden = true;

}



// GOOD THINGS ARE DOWN HERE :)
const amount = document.getElementById("amount");
const description = document.getElementById("description");
const container = document.querySelector(".container");

function add() {

    if (amount.value != "") {
        if (income_radio.checked) {
            let h1 = document.createElement("h1");
            h1.innerHTML = "$" + amount.value;
            h1.classList.add("text-green-600");
            container.appendChild(h1);
            add_popup.hidden = true;
        }
        else{
            let h1 = document.createElement("h1");
            h1.innerHTML = "$" + amount.value;
            h1.classList.add("text-red-600");
            container.appendChild(h1);
            add_popup.hidden = true;
        }


    } else {
        window.alert("Problem :(");
    }
}


