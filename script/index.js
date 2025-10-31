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
var id = localStorage.length + 1;

const delete_popup = document.getElementById("delete_popup");
delete_popup.hidden = true;


var money = 0;
var des;
var exp = 0;
var net = 0;

const amount = document.getElementById("amount");
const description = document.getElementById("description");
const date = document.getElementById("date");
const container = document.querySelector(".container");
const total_net = document.getElementById("total-net");

add_btn.onclick = function () {
  add_popup.hidden = false;
};

cancel_btn.onclick = function () {
  add_popup.hidden = true;
};

x_btn.onclick = function () {
  add_popup.hidden = true;
};

fetch_data();

function add() {
  if (amount.value != "" && description.value != "" && date.value != "") {
    if (Number(amount.value) > 0.01) {
      if (income_radio.checked) {
        money += Number(amount.value);
        net = money - exp;
        total_net.textContent = net;
        total_inc.textContent = money;
        add_popup.hidden = true;

        const card_green = `
        <div class="h-[300px] w-full bg-green-300 border-2 border-black rounded-xl shadow p-5" id="${id}">
          <div class="flex justify-between items-start">
            <div class="flex items-center gap-2">
              <i class="fa-solid fa-arrow-trend-up text-green-700"></i>
              <span class="text-sm text-gray-700">${date.value}</span>
            </div>
            <div class="flex items-center gap-4">
              <span class="font-bold text-xl hover:scale-110 cursor-pointer" onclick="editcard(${id})">Edit</span>
              <span class="font-bold text-xl hover:scale-110 cursor-pointer" onclick="deletecard(${id})">Delete</span>
            </div>
          </div>
          <div class="text-center mt-6 text-xl">
            <p>${description.value}</p>
          </div>
          <div class="text-center mt-4">
            <h1 class="text-5xl text-green-600 font-bold">+$${amount.value}</h1>
          </div>
        </div>`;
        container.insertAdjacentHTML("afterbegin", card_green);

        let transaction = {
          id: id,
          description: description.value,
          amount: amount.value,
          date: date.value,
          income: true,
          deleted: false
        };
        localStorage.setItem("transaction_" + id, JSON.stringify(transaction));
        id++;
        Swal.fire({
          title: "Transaction Added Successfuly",

          icon: "success"
        });
      } else {
        exp += Number(amount.value);
        net = money - exp;
        total_net.textContent = net;
        total_exp.textContent = exp;
        const card_red = `
        <div class="h-[300px] w-full bg-red-300 border-2 border-black rounded-xl shadow p-5" id="${id}">
          <div class="flex justify-between items-start">
            <div class="flex items-center gap-2">
              <i class="fa-solid fa-arrow-trend-down text-red-700"></i>
              <span class="text-sm text-gray-700">${date.value}</span>
            </div>
            <div class="flex items-center gap-4">
              <span class="font-bold text-xl hover:scale-110 cursor-pointer" onclick="editcard(${id})">Edit</span>
              <span class="font-bold text-xl hover:scale-110 cursor-pointer" onclick="deletecard(${id})">Delete</span>
            </div>
          </div>
          <div class="text-center mt-6 text-xl">
            <p>${description.value}</p>
          </div>
          <div class="text-center mt-4">
            <h1 class="text-5xl text-red-600 font-bold">-$${amount.value}</h1>
          </div>
        </div>`;
        container.insertAdjacentHTML("afterbegin", card_red);
        add_popup.hidden = true;


        let transaction = {
          id: id,
          description: description.value,
          amount: amount.value,
          date: date.value,
          income: false,
          deleted: false
        };
        localStorage.setItem("transaction_" + id, JSON.stringify(transaction));
        id++;
        Swal.fire({
          title: "Transaction Added Successfuly",

          icon: "success"
        });
      }
    } else {
      document.getElementById("err_amount").hidden = false;
      Swal.fire({
        title: "Amount Too Low",
        text: "Amount must be at least 0.01!",
        icon: "error"
      });


    }
  } else {
    Swal.fire({
      title: "Incomplete Form",
      text: "Please make sure all fields are filled out before continuing.",
      icon: "error"
    });

  }
}

function fetch_data() {
  var expense = 0;
  var income = 0;
  container.innerHTML = "";

  for (let i = 1; i <= localStorage.length; i++) {
    let transaction_fetch = JSON.parse(localStorage.getItem("transaction_" + i));
    if (!transaction_fetch || transaction_fetch.deleted) continue;

    if (!transaction_fetch.income) {
      expense += Number(transaction_fetch.amount);
      total_exp.textContent = expense;
      const card_red = `
      <div class="h-[300px] w-full bg-red-300 border-2 border-black rounded-xl shadow p-5" id="${i}">
        <div class="flex justify-between items-start">
          <div class="flex items-center gap-2">
            <i class="fa-solid fa-arrow-trend-down text-red-700"></i>
            <span class="text-sm text-gray-700">${transaction_fetch.date || ""}</span>
          </div>
          <div class="flex items-center gap-4">
            <span class="font-bold text-xl hover:scale-110 cursor-pointer" onclick="editcard(${i})">Edit</span>
            <span class="font-bold text-xl hover:scale-110 cursor-pointer" onclick="deletecard(${i})">Delete</span>
          </div>
        </div>
        <div class="text-center mt-6 text-xl">
          <p>${transaction_fetch.description}</p>
        </div>
        <div class="text-center mt-4">
          <h1 class="text-5xl text-red-600 font-bold">-$${transaction_fetch.amount}</h1>
        </div>
      </div>`;
      container.insertAdjacentHTML("afterbegin", card_red);
    } else {
      income += Number(transaction_fetch.amount);
      total_inc.textContent = income;
      const card_green = `
      <div class="h-[300px] w-full bg-green-300 border-2 border-black rounded-xl shadow p-5" id="${i}">
        <div class="flex justify-between items-start">
          <div class="flex items-center gap-2">
            <i class="fa-solid fa-arrow-trend-up text-green-700"></i>
            <span class="text-sm text-gray-700">${transaction_fetch.date || ""}</span>
          </div>
          <div class="flex items-center gap-4">
            <span class="font-bold text-xl hover:scale-110 cursor-pointer" onclick="editcard(${i})">Edit</span>
            <span class="font-bold text-xl hover:scale-110 cursor-pointer" onclick="deletecard(${i})">Delete</span>
          </div>
        </div>
        <div class="text-center mt-6 text-xl">
          <p>${transaction_fetch.description}</p>
        </div>
        <div class="text-center mt-4">
          <h1 class="text-5xl text-green-600 font-bold">+$${transaction_fetch.amount}</h1>
        </div>
      </div>`;
      container.insertAdjacentHTML("afterbegin", card_green);
    }
  }

  total_exp.textContent = expense;
  total_inc.textContent = income;
  total_net.textContent = income - expense;
  money = income;
  exp = expense;
  net = income - expense;
}
// DELETE CARD 

function deletecard(transaction_id) {
  delete_popup.hidden = false;
  const delete_btn = document.getElementById("delete_btn");
  delete_btn.onclick = function () {
    delete_confirmed(transaction_id);
  };
}

function hide_delete() {
  delete_popup.hidden = true;
}

function delete_confirmed(id_transaction) {
  let transaction_fetch = JSON.parse(localStorage.getItem("transaction_" + id_transaction));
  if (transaction_fetch) {
    transaction_fetch.deleted = true;
    localStorage.setItem("transaction_" + id_transaction, JSON.stringify(transaction_fetch));
  }
  delete_popup.hidden = true;
  fetch_data();
  Swal.fire({
    title: "Deleted Success",
    icon: "error"
  });
}


// EDIT CARD 
const edit_pop = document.getElementById("edit_pop");
const amount_edit = document.getElementById("amount_edit");
const icome_edit = document.getElementById("icome_edit");
const expense_edit = document.getElementById("expense_edit");
const description_edit = document.getElementById("description_edit");
const date_edit = document.getElementById("date_edit");

const submit_edit = document.getElementById("submit_edit");

function editcard(transaction_id) {
  edit_pop.hidden = false;
  let transaction_fetch = JSON.parse(localStorage.getItem("transaction_" + transaction_id));
  console.log(transaction_fetch);
  amount_edit.value = transaction_fetch.amount;
  if (transaction_fetch.income == true) {
    icome_edit.checked = true;
  }
  else {
    expense_edit.checked = true;
  }


  description_edit.value = transaction_fetch.description;
  date_edit.value = transaction_fetch.date || "";

  submit_edit.onclick = function () {

    Modifie(transaction_id, transaction_fetch);
  };
}



function Modifie(transaction_id, transaction_fetch) {

  console.log(`Edit Clicked For ${transaction_fetch.id}`);
  let olddesc = transaction_fetch.description;
  console.log(`Old : ${olddesc}`);
  transaction_fetch.description = description_edit.value;
  transaction_fetch.amount = amount_edit.value;
  transaction_fetch.date = date_edit.value;

  console.log(`new : ${transaction_fetch.description}`);

  if (icome_edit.checked == true) {
    transaction_fetch.income = true;
  }
  else {
    transaction_fetch.income = false;
  }
  edit_pop.hidden = true;
  let newobject = {
    id: transaction_fetch.id,
    description: transaction_fetch.description,
    amount: transaction_fetch.amount,
    date: transaction_fetch.date,
    deleted: false,
    income: transaction_fetch.income

  }

  console.log(transaction_fetch.income);


  localStorage.setItem("transaction_" + transaction_id, JSON.stringify(newobject));

  fetch_data();

  Swal.fire({
    title: "Edited Success",
    icon: "success"
  });

}

function hide_edit() {
  edit_pop.hidden = true;
}
