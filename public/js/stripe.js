import axios from 'axios'
import { showAlert } from './alerts'
const stripe = Stripe(
  'pk_test_51HZxalGz8TH7Q1bJZzRSTVSYBCfN9bFDWgxFgeC8yO0khCnlxU6i41quDzTBzltzHAyHXBzQpXPBbDQ9ALygfcwU00M57s4MxA'
)

export const bookTour = async (tourId) => {
  try {
    // 1) Get the session from API
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`
    )

    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    })
  } catch (err) {
    console.log(err)
    showAlert('error', err)
  }
}
