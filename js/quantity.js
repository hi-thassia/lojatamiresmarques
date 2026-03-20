/* CARROSSEL PRODUTO */

const imagens = typeof PRODUCT_IMAGES !== 'undefined'
  ? PRODUCT_IMAGES
  : [
      '../../img/products/calminol2.png',
      '../../img/products/calminol3.png',
      '../../img/products/calminol4.png',
      '../../img/products/calminol5.png'
    ]

let indiceImagem = 0

function proximaImagem() {
  indiceImagem = (indiceImagem + 1) % imagens.length
  document.getElementById('productImg').src = imagens[indiceImagem]
}

function imagemAnterior() {
  indiceImagem = (indiceImagem - 1 + imagens.length) % imagens.length
  document.getElementById('productImg').src = imagens[indiceImagem]
}

/* SWIPE (toque mobile) */
;(function () {
  const img = document.getElementById('productImg')
  if (!img) return
  let startX = 0
  img.addEventListener('touchstart', e => { startX = e.touches[0].clientX }, { passive: true })
  img.addEventListener('touchend', e => {
    const diff = startX - e.changedTouches[0].clientX
    if (Math.abs(diff) > 40) diff > 0 ? proximaImagem() : imagemAnterior()
  }, { passive: true })
})()


/* MODAL PLANOS */

const buyNowBtn = document.getElementById('buyNowBtn')
const buyModal = document.getElementById('buyModal')
const buyOverlay = document.getElementById('buyOverlay')
const buyModalClose = document.getElementById('buyModalClose')

let selectedPlan = null

function openBuyModal() {
  buyModal.classList.add('open')
  buyOverlay.classList.add('open')
  document.body.style.overflow = 'hidden'
}

function closeBuyModal() {
  buyModal.classList.remove('open')
  buyOverlay.classList.remove('open')
  document.body.style.overflow = ''
  document.querySelectorAll('.buy-option').forEach(o => o.classList.remove('selected-plan'))
  const container = document.getElementById('checkoutContainer')
  if (container) container.classList.remove('visible')
  selectedPlan = null
}

if (buyNowBtn && buyModal) {

  buyNowBtn.addEventListener('click', openBuyModal)
  buyModalClose.addEventListener('click', closeBuyModal)
  buyOverlay.addEventListener('click', closeBuyModal)

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeBuyModal()
  })

  document.querySelectorAll('.buy-option').forEach(option => {
    option.addEventListener('click', () => {
      document.querySelectorAll('.buy-option').forEach(o => o.classList.remove('selected-plan'))
      option.classList.add('selected-plan')
      selectedPlan = option.dataset.checkout
      const container = document.getElementById('checkoutContainer')
      if (container) {
        container.classList.add('visible')
        container.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }
    })
  })

  const btnFinalizar = document.getElementById('btnFinalizar')
  if (btnFinalizar) {
    btnFinalizar.addEventListener('click', () => {
      if (selectedPlan) {
        const url = selectedPlan
        closeBuyModal()
        window.location.href = url
      }
    })
  }

}


/* FAQ */

document.querySelectorAll('.faq-question').forEach(pergunta => {
  pergunta.addEventListener('click', () => {
    pergunta.closest('.faq-item').classList.toggle('open')
  })
})


/* WHATSAPP */

const formWhatsapp = document.getElementById('formWhatsapp')

if (formWhatsapp) {
  formWhatsapp.addEventListener('submit', function (e) {
    e.preventDefault()
    const nome = document.getElementById('nome').value
    const assunto = document.getElementById('assunto').value
    const mensagem = document.getElementById('mensagem').value
    const texto = `Olá, meu nome é ${nome}%0AAssunto: ${assunto}%0AMensagem: ${mensagem}`
    window.open(`https://wa.me/5518996762706?text=${texto}`, '_blank')
  })
}
