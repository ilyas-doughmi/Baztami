
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

var id = 0;

var money = 0;
var des;



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

let exp = 0;

function add() {

    
    des = description.value;
    console.log(money);
    if (amount.value != "" && description.value != "") {
        if (income_radio.checked) {
            money += Number(amount.value);
                    total_inc.textContent = money;
            add_popup.hidden = true;
            const card_green = ` <div class="h-[400px] w-[400px] bg-green-300">
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
              <h1 class="text-5xl text-center text-green-600 font-bold mr-3">+$${amount.value}</h1>
             </div>

          </div>
        </div>`
            container.insertAdjacentHTML('afterbegin', card_green);
        }
        else{
             exp += Number(amount.value);
            total_exp.textContent = exp;
            console.log(`exp is ${exp}`);

            const card_red = ` <div class="h-[400px] w-[400px] bg-red-300">
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

        }




    } else {
        
        window.alert("Problem :(");
    }
}



