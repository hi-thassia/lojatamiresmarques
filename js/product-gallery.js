const images = [
  "../img/produtos/celuglow1.jpg",
  "../img/produtos/celuglow2.jpg",
  "../img/produtos/celuglow3.jpg"
  ]
  
  let currentImage = 0
  
  const productImage = document.getElementById("productImage")
  
  const nextBtn = document.querySelector(".next")
  const prevBtn = document.querySelector(".prev")
  
  if(nextBtn && prevBtn){
  
  nextBtn.addEventListener("click", () => {
  
  currentImage++
  
  if(currentImage >= images.length){
  
  currentImage = 0
  
  }
  
  productImage.src = images[currentImage]
  
  })
  
  
  prevBtn.addEventListener("click", () => {
  
  currentImage--
  
  if(currentImage < 0){
  
  currentImage = images.length - 1
  
  }
  
  productImage.src = images[currentImage]
  
  })
  
  }