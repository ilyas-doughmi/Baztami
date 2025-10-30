
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

var id = localStorage.length +1 ;

var money = 0;
var des;




add_btn.onclick = function () {
  add_popup.hidden = false;
}

cancel_btn.onclick = function () {
  add_popup.hidden = true;
}


x_btn.onclick = function () {
  add_popup.hidden = true;

}


fetch_data();
// GOOD THINGS ARE DOWN HERE :)
const amount = document.getElementById("amount");
const description = document.getElementById("description");
const container = document.querySelector(".container");
const total_net = document.getElementById("total-net");

let exp = 0;
let net = money - exp;


function add() {


  des = description.value;
  console.log(money);
  if (amount.value != "" && description.value != "") {
    if (income_radio.checked) {
      money += Number(amount.value);
      net = money - exp;

      total_net.textContent = net;

      total_inc.textContent = money;
      add_popup.hidden = true;
      const card_green = ` <div class="h-[300px] w-full bg-green-300">
          <div class="content flex flex-col ">
            <!-- card top -->
            <div class="top mt-5 ml-6 mr-6 flex justify-between  items-center"  >
              <div class="show flex  gap-3">
                <h1 class="font-bold text-xl hover:scale-110 cursor-pointer">Edit</h1>
                <h2 class="font-bold text-xl hover:scale-110 cursor-pointer">Delete</h2>
              </div>
              <!-- three points -->
              <i class="fa-solid fa-ellipsis-vertical text-xl font-bold hover:scale-110 cursor-pointer mt-1"></i>
            </div>

            <!-- card middle -->
             <div class="middle content-center items-center flex text-center mt-7 text-xl">
                <p class="text-center">${des}</p>
             </div>

             <!-- Card buttom -->

             <div class="flex content-center items-center justify-center mt-6 mr-2">
              <h1 class="text-5xl text-center text-green-600 font-bold mr-3">+$${amount.value}</h1>
             </div>

          </div>
        </div>`
      container.insertAdjacentHTML('afterbegin', card_green);
    }
    else {
      exp += Number(amount.value);
      net = money - exp;
      total_net.textContent = net;

      total_exp.textContent = exp;
      console.log(`exp is ${exp}`);

      const card_red = ` <div class="h-[300px] w-full bg-red-300">
          <div class="content flex flex-col">
            <!-- card top -->
            <div class="top mt-5 ml-6 mr-6 flex justify-between  items-center"  >
              <div class="show flex  gap-3">
                <h1 class="font-bold text-xl hover:scale-110 cursor-pointer">Edit</h1>
                <h2 class="font-bold text-xl hover:scale-110 cursor-pointer">Delete</h2>
              </div>
              <!-- three points -->
              <i class="fa-solid fa-ellipsis-vertical text-xl font-bold hover:scale-110 cursor-pointer mt-1"></i>
            </div>

            <!-- card middle -->
             <div class="middle content-center items-center flex text-center mt-7 text-xl">
                <p class="text-center">${des}</p>
             </div>

             <!-- Card buttom -->

             <div class="flex content-center items-center justify-center mt-6 mr-2">
              <h1 class="text-5xl text-center text-red-600 font-bold mr-3">-$${amount.value}</h1>
             </div>

          </div>
        </div>`
      container.insertAdjacentHTML('afterbegin', card_red);
      add_popup.hidden = true;

      let transaction = {
        id: id,
        description: description.value,
        amount: amount.value,
        income: false
      }


      localStorage.setItem("transaction_" + id, JSON.stringify(transaction));
      id += 1;
      console.log(id);
    }




  } else {

    window.alert("Problem :(");
  }
}




function fetch_data() {
  const container = document.querySelector(".container");

  for (let i = 1; i <= localStorage.length; i++) {
    let transaction_fetch = JSON.parse(localStorage.getItem("transaction_" + i));

    console.log(`income is ${transaction_fetch.income}`);
    if (! transaction_fetch.income) {
      money += Number(transaction_fetch.amount);


      add_popup.hidden = true;
      const card_red = ` <div class="h-[300px] w-full bg-red-300">
          <div class="content flex flex-col ">
            <!-- card top -->
            <div class="top mt-5 ml-6 mr-6 flex justify-between  items-center"  >
              <div class="show flex  gap-3">
                <h1 class="font-bold text-xl hover:scale-110 cursor-pointer">Edit</h1>
                <h2 class="font-bold text-xl hover:scale-110 cursor-pointer">Delete</h2>
              </div>
              <!-- three points -->
              <i class="fa-solid fa-ellipsis-vertical text-xl font-bold hover:scale-110 cursor-pointer mt-1"></i>
            </div>

            <!-- card middle -->
             <div class="middle content-center items-center flex text-center mt-7 text-xl">
                <p class="text-center">${transaction_fetch.description}</p>
             </div>

             <!-- Card buttom -->

             <div class="flex content-center items-center justify-center mt-6 mr-2">
              <h1 class="text-5xl text-center text-red-600 font-bold mr-3">-$${transaction_fetch.amount}</h1>
             </div>

          </div>
        </div>`
      container.insertAdjacentHTML('afterbegin', card_red);

      console.log("Spawnerd");
    }
    console.log("Hello");
    console.log(transaction_fetch);
  }
  console.log("Nothing");
}
