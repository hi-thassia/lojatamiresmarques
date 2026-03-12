const qtyInput = document.getElementById("quantity")

const minusBtn = document.querySelector(".qty-minus")
const plusBtn = document.querySelector(".qty-plus")

if(minusBtn && plusBtn){

minusBtn.addEventListener("click", () => {

let current = parseInt(qtyInput.value)

if(current > 1){

qtyInput.value = current - 1

}

})


plusBtn.addEventListener("click", () => {

let current = parseInt(qtyInput.value)

qtyInput.value = current + 1

})

}