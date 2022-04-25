import Page from "./Page"
import basketView from "../templates/basket.handlebars"
import basketItemView from '../templates/basket-item.handlebars'
import BasketService from "../services/BasketService"
import $ from "jquery"
import { listPrinters, printFormattedTextAndCut } from 'thermal-printer-cordova-plugin/www/thermal-printer'
import BasketLocalStorage from "../repositories/localstorage/BasketLocalStorage"
import TransactionApi from "../repositories/api/TransactionApi"
import Redirect from "../core/Redirect"

class PosBasket extends Page {
  constructor(params) {
    super(params)
  }

  async action() {
    const basketService = new BasketService()
    const viewBasket = (basketService) => {
      $('.basket-items').html(basketItemView({ items: basketService.items }))
      $('#total-sub').text('Rp' + basketService.totalSub.format())
      $('#total-discount').text('(Rp' + basketService.totalDiscount.format() + ')')
      $('#total').text('Rp' + basketService.total.format())
      $('#total-qty').text(basketService.totalQty.format())
      $('#total-round').text(basketService.totalRound.format())
    }

    let type_id = typeof basketService.discount.discount_type != "undefined" ? basketService.discount.discount_type : null
    let discount_note

    viewBasket(basketService)

    $('#print').on('click', () => {
      listPrinters({ type: 'bluetooth' }, res => {
        console.log(res)
        if (typeof res[0] != 'undefined') {
          const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']
          let time = new Date()
          time = [(time.getDate() < 10 ? '0' + time.getDate() : time.getDate()), months[time.getMonth()], time.getFullYear()].join(' ') + ' ' + [time.getHours(), time.getMinutes(), time.getSeconds()].join(':')

          let body = `[C]<b>HOTELMU POS</b>\n[C]${time}\n\n`

          for (const item of basketService.items) {
            body += `[L]${item.name}[R]${item.qty}[R]${item.total.format()}\n`
            if (item.note.length > 0) {
              body += `[L]*${item.note}\n\n`
            }
          }
          body += `\n`
          body += `[L][L]Jumlah item[R]${basketService.totalQty.format()}\n`
          body += `[L][L]Total[R]${basketService.totalSub.format()}\n`



          printFormattedTextAndCut({
            type: 'bluetooth',
            id: res[0].address,
            mmFeedPaper: 50,
            text: body
          })
        }
        else {
          alert("Printer tidak terdeteksi")
        }
      }, err => {
        console.log(err)
        alert("Printer tidak terdeteksi")
      })
    })

    $('#printKitchen').on('click', () => {
      listPrinters({ type: 'bluetooth' }, res => {
        console.log(res)
        if (typeof res[0] != 'undefined') {
          const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']
          let time = new Date()
          time = [(time.getDate() < 10 ? '0' + time.getDate() : time.getDate()), months[time.getMonth()], time.getFullYear()].join(' ') + ' ' + [time.getHours(), time.getMinutes(), time.getSeconds()].join(':')

          let body = `[C]<b>HOTELMU POS</b>\n[C]${time}\n\n`

          for (const item of basketService.items) {
            body += `[L]${item.name}[R]${item.qty}[R]${item.total.format()}\n`
            if (item.note.length > 0) {
              body += `[L]*${item.note}\n\n`
            }
          }
          body += `\n`
          body += `[L][L]Jumlah item[R]${basketService.totalQty.format()}\n`
          body += `[L][L]Total[R]${basketService.totalSub.format()}\n`



          printFormattedTextAndCut({
            type: 'bluetooth',
            id: res[0].address,
            mmFeedPaper: 50,
            text: body
          })
        }
        else {
          alert("Printer tidak terdeteksi")
        }
      }, err => {
        console.log(err)
        alert("Printer tidak terdeteksi")
      })
    })

    $('#printBeverage').on('click', () => {
      listPrinters({ type: 'bluetooth' }, res => {
        console.log(res)
        if (typeof res[0] != 'undefined') {
          const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']
          let time = new Date()
          time = [(time.getDate() < 10 ? '0' + time.getDate() : time.getDate()), months[time.getMonth()], time.getFullYear()].join(' ') + ' ' + [time.getHours(), time.getMinutes(), time.getSeconds()].join(':')

          let body = `[C]<b>HOTELMU POS</b>\n[C]${time}\n\n`

          for (const item of basketService.items) {
            body += `[L]${item.name}[R]${item.qty}[R]${item.total.format()}\n`
            if (item.note.length > 0) {
              body += `[L]*${item.note}\n\n`
            }
          }
          body += `\n`
          body += `[L][L]Jumlah item[R]${basketService.totalQty.format()}\n`
          body += `[L][L]Total[R]${basketService.totalSub.format()}\n`



          printFormattedTextAndCut({
            type: 'bluetooth',
            id: res[0].address,
            mmFeedPaper: 50,
            text: body
          })
        }
        else {
          alert("Printer tidak terdeteksi")
        }
      }, err => {
        console.log(err)
        alert("Printer tidak terdeteksi")
      })
    })

    $(document).on('click', '.btn-min', (event) => {
      let id = $(event.currentTarget).closest('li').data('id')

      basketService.qtyHandler(id, '-');
      viewBasket(basketService)
    })

    $(document).on('click', '.btn-plus', (event) => {
      let id = $(event.currentTarget).closest('li').data('id')

      basketService.qtyHandler(id, '+');
      viewBasket(basketService)
    })

    $(document).on('click', '.btn-delete-product', (event) => {
      let id = $(event.currentTarget).closest('li').data('id')

      basketService.removeItem(id)
      viewBasket(basketService)
    })

    $(document).on('click', '.item-select', (event) => {
      let id = $(event.currentTarget).closest('li').data('id')
      let item = BasketLocalStorage.get('items')
      $('#item_id').val(id)
      $('#modal-diskon').modal('show')

      item.forEach((menu, index) => {
        if (id == menu.id) {
          $('#diskon-item').val(menu.discount)
          $('#catatan_item').val(menu.note)
        }
      })
    })

    $('#discount-form').on('submit', (e) => {
      e.preventDefault()

      let item_id = $('#item_id').val()
      let discount = $('#diskon-item').val()
      let note = $('#catatan_item').val()

      basketService.discAndNoteHandler(item_id, parseFloat(discount || 0), note)
      $('.basket-items').html(basketItemView({ items: basketService.items }))

      $('#modal-diskon').modal('hide')

      $('#item_id').val('')
      $('#diskon-item').val('')
      $('#catatan_item').val('')

      viewBasket(basketService)
    })

    $(document).on('keyup', '#jumlah-tamu', () => {
      basketService.setNumberOfGuest(parseInt($('#jumlah-tamu').val()))
    })

    if (BasketLocalStorage.get('table')) {
      let table = BasketLocalStorage.get('table');
      let nama_meja = table.table_name;
      $('#nomor-meja').text(nama_meja)
    }

    if (BasketLocalStorage.get('numberOfGuest') !== 0) {
      $('#jumlah-tamu').val(BasketLocalStorage.get('numberOfGuest'))
    }

    const checkDiscount = () => {
      if ($('.type-disc').hasClass('active') && $('#jumlah-diskon').val().length > 0) {
        basketService.setDiscount({
          discount_type: type_id,
          discount: parseFloat($('#jumlah-diskon').val()),
          discount_note: discount_note
        })
        viewBasket(basketService)

        let jml_disc = $('#jumlah-diskon').val()
        if (type_id === 0) {
          if (parseInt(jml_disc) > 99) {
            $('#jumlah-diskon').val(100)
            $('#cat_diskon').removeClass('d-none')
          } else {
            $('#cat_diskon').addClass('d-none')
          }
        } else {
          if (parseInt(jml_disc) > basketService.totalSub) {
            $('#jumlah-diskon').val(basketService.totalSub)
            $('#cat_diskon').removeClass('d-none')
          } else {
            $('#cat_diskon').addClass('d-none')
          }
        }
      }
    }

    checkDiscount()

    $('.type-disc').on('click', (e) => {
      $('.type-disc').removeClass('active')
      $(e.currentTarget).addClass('active')
      type_id = $(e.currentTarget).data('type_id')
      checkDiscount();
    })

    $('.note-disc').on('click', (e) => {
      $('.note-disc').removeClass('active')
      $(e.currentTarget).addClass('active')
      discount_note = $(e.currentTarget).data('note_type')
      checkDiscount();
    })

    $(document).on('keyup', '#jumlah-diskon', () => {
      checkDiscount()

      let jml_disc = $('#jumlah-diskon').val()
      if (type_id === 0) {
        $('#jumlah-diskon').attr('maxlength', 3)
        if (parseInt(jml_disc) > 99) {
          $('#jumlah-diskon').val(100)
          $('#cat_diskon').removeClass('d-none')
        } else {
          $('#cat_diskon').addClass('d-none')
        }
      } else {
        $('#jumlah-diskon').attr('maxlength', basketService.totalSub.toString().length)
        if (parseInt(jml_disc) > basketService.totalSub) {
          $('#jumlah-diskon').val(basketService.totalSub)
          $('#cat_diskon').removeClass('d-none')
        } else {
          $('#cat_diskon').addClass('d-none')
        }
      }
    })

    if (BasketLocalStorage.get('discount').hasOwnProperty('discount')) {
      let disc_item = BasketLocalStorage.get('discount');

      $('#jumlah-diskon').val(disc_item.discount);

      $('.type-disc').each((index, item) => {
        if ($(item).data('type_id') === disc_item.discount_type) {
          $(item).addClass('active')
        }
      })

      $('.note-disc').each((index, item) => {
        if ($(item).data('note_type') === disc_item.discount_note) {
          $(item).addClass('active')
        }
      })

      basketService.setDiscount({
        discount_type: disc_item.discount_type,
        discount: disc_item.discount,
        discount_note: disc_item.discount_note
      })
    }

    $('#save-transaction').on('click', async (e) => {
      let is_room = BasketLocalStorage.get('type').isroom
      let table = BasketLocalStorage.get('table')
      let jumlah_tamu = BasketLocalStorage.get('numberOfGuest');
      e.preventDefault()
      console.log(table.hasOwnProperty('id'))

      if (!table.hasOwnProperty('id') && is_room !== "1") {
        alert('Silahkan Pilih Meja terlebih dahulu!')
      }

      if (jumlah_tamu === "0") {
        alert('Silahkan isi Jumlah Tamu terlebih dahulu!')
      }

      if (table.hasOwnProperty('id') && jumlah_tamu !== "0") {
        let res = await TransactionApi.save()

        if (res.status) {
          alert("Transaksi Berhasil Disimpan")
          basketService.clear()
          Redirect('/', true)
        } else {
          alert("Transaksi Gagal Disimpan")
          console.log(res);
        }
      }
    })
  }

  render() {
    return basketView()
  }
}

export default PosBasket