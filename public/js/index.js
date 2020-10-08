import '@babel/polyfill'
import { displayMap } from './mapbox'
import { login, logout } from './login'
import { updateSettings } from './updateSettings'
import { bookTour } from './stripe'

// DOM ELEMENTS
const mapBox = document.getElementById('map')
const loginForm = document.querySelector('#login')
const logoutBtn = document.querySelector('.nav__el--logout')
const updateUserDataForm = document.querySelector('#updateUserData')
const updateUserPasswordForm = document.querySelector('#updatePassword')
const bookBtn = document.querySelector('#bookTour')

// DELEGATION
if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations)
  displayMap(locations)
}

if (loginForm)
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    login(email, password)
  })

if (logoutBtn)
  logoutBtn.addEventListener('click', () => {
    logout()
  })

if (updateUserDataForm)
  updateUserDataForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const form = new FormData()
    form.append('name', document.querySelector('#name').value)
    form.append('email', document.querySelector('#email').value)
    form.append('photo', document.querySelector('#photo').files[0])

    updateSettings(form, 'Data')
  })

if (updateUserPasswordForm)
  updateUserPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    document.querySelector('#savePassword').textContent = 'Updating...'
    const passwordCurrent = document.querySelector('#password-current').value
    const password = document.querySelector('#password').value
    const passwordConfirm = document.querySelector('#password-confirm').value
    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'Password'
    )
    document.querySelector('#password-current').value = ''
    document.querySelector('#password').value = ''
    document.querySelector('#password-confirm').value = ''
    document.querySelector('#savePassword').textContent = 'Save password'
  })

if (bookBtn)
  bookBtn.addEventListener('click', (e) => {
    e.target.textContent = 'Processing...'
    const { tourId } = e.target.dataset
    bookTour(tourId)
  })
