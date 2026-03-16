/* GALERIA DE IMAGENS */

const images = [
  '../../img/products/celuglow1.png',
  '../../img/products/celuglow2.png',
  '../../img/products/celuglow3.png'
]

let currentImage = 0

const productImage = document.getElementById('productImage')
const nextBtn = document.querySelector('.arrow.right')
const prevBtn = document.querySelector('.arrow.left')

if (nextBtn && prevBtn && productImage) {

  nextBtn.addEventListener('click', () => {
    currentImage = (currentImage + 1) % images.length
    productImage.src = images[currentImage]
  })

  prevBtn.addEventListener('click', () => {
    currentImage = (currentImage - 1 + images.length) % images.length
    productImage.src = images[currentImage]
  })

}
