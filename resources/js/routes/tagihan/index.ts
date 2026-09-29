import bayar from './bayar'
import pembayaran from './pembayaran'
import waReminder from './wa-reminder'
const tagihan = {
    bayar: Object.assign(bayar, bayar),
pembayaran: Object.assign(pembayaran, pembayaran),
waReminder: Object.assign(waReminder, waReminder),
}

export default tagihan