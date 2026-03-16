/* =========================
  WISHLIST
  ========================= */

const WISHLIST_KEY = 'tm_beauty_wishlist'

function getWishlist() {
  return JSON.parse(localStorage.getItem(WISHLIST_KEY)) || []
}

function saveWishlist(items) {
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(items))
}

function isInWishlist(id) {
  return getWishlist().some(i => i.id === id)
}

function addToWishlist(item) {
  const list = getWishlist()
  if (!list.find(i => i.id === item.id)) {
    list.push(item)
    saveWishlist(list)
    updateWishlistUI()
  }
}

function removeFromWishlist(id) {
  saveWishlist(getWishlist().filter(i => i.id !== id))
  updateWishlistUI()
}

function toggleWishlist(item) {
  if (isInWishlist(item.id)) {
    removeFromWishlist(item.id)
    return false
  }
  addToWishlist(item)
  return true
}

/* SIDEBAR */

function openWishlist() {
  document.getElementById('wishlistSidebar').classList.add('open')
  document.getElementById('wishlistOverlay').classList.add('open')
  document.body.style.overflow = 'hidden'
}

function closeWishlist() {
  document.getElementById('wishlistSidebar').classList.remove('open')
  document.getElementById('wishlistOverlay').classList.remove('open')
  document.body.style.overflow = ''
}

/* RENDERIZAÇÃO */

function renderWishlistItems() {
  const body = document.getElementById('wishlistBody')
  if (!body) return

  const list = getWishlist()
  const rootPath = typeof ROOT !== 'undefined' ? ROOT : ''

  if (list.length === 0) {
    body.innerHTML = '<p class="wishlist-empty">Sua Adicionar aos desejos está vazia.</p>'
    return
  }

  body.innerHTML = list.map(item => `
    <div class="wishlist-item">
      <img src="${rootPath}${item.img}" alt="${item.name}">
      <div class="wishlist-item-info">
        <span class="wishlist-item-name">${item.name}</span>
        <a href="${rootPath}${item.href}" class="wishlist-item-link">Ver produto</a>
      </div>
      <button class="wishlist-remove" onclick="removeFromWishlist('${item.id}')" aria-label="Remover ${item.name}">✕</button>
    </div>
  `).join('')
}

/* ATUALIZAÇÃO DE UI */

function updateWishlistUI() {
  const list = getWishlist()

  const countEl = document.getElementById('wishlistCount')
  if (countEl) {
    countEl.textContent = list.length
    countEl.style.display = list.length > 0 ? 'flex' : 'none'
  }

  document.querySelectorAll('[data-wishlist-id]').forEach(el => {
    const id = el.dataset.wishlistId
    const btn = el.querySelector('.btn-wishlist-card')
    if (!btn) return
    const inList = isInWishlist(id)
    btn.textContent = inList ? '♥' : '♡'
    btn.classList.toggle('active', inList)
    btn.setAttribute('aria-label', inList ? 'Remover da Adicionar aos desejos' : 'Adicionar à Adicionar aos desejos')
  })

  const productBtn = document.getElementById('productWishlistBtn')
  if (productBtn) {
    const inList = isInWishlist(productBtn.dataset.wishlistId)
    productBtn.classList.toggle('active', inList)
    productBtn.innerHTML = inList
      ? '♥ &nbsp;Na Adicionar aos desejos'
      : '♡ &nbsp;Adicionar aos desejos'
  }

  renderWishlistItems()
}

/* INICIALIZAÇÃO */

document.addEventListener('DOMContentLoaded', () => {

  const wishlistBtn = document.getElementById('wishlistBtn')
  if (wishlistBtn) wishlistBtn.addEventListener('click', openWishlist)

  const closeBtn = document.getElementById('wishlistClose')
  if (closeBtn) closeBtn.addEventListener('click', closeWishlist)

  const overlay = document.getElementById('wishlistOverlay')
  if (overlay) overlay.addEventListener('click', closeWishlist)

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeWishlist()
  })

  document.querySelectorAll('[data-wishlist-id]').forEach(el => {
    const btn = el.querySelector('.btn-wishlist-card')
    if (!btn) return
    btn.addEventListener('click', e => {
      e.preventDefault()
      e.stopPropagation()
      toggleWishlist({
        id: el.dataset.wishlistId,
        name: el.dataset.wishlistName,
        img: el.dataset.wishlistImg,
        href: el.dataset.wishlistHref
      })
    })
  })

  const productBtn = document.getElementById('productWishlistBtn')
  if (productBtn) {
    productBtn.addEventListener('click', () => {
      toggleWishlist({
        id: productBtn.dataset.wishlistId,
        name: productBtn.dataset.wishlistName,
        img: productBtn.dataset.wishlistImg,
        href: productBtn.dataset.wishlistHref
      })
    })
  }

  updateWishlistUI()
})
