import Vue from 'vue'
import moment from 'moment'
import swal from 'sweetalert'

Vue.use({
  install(Vue, options) {
    Vue.prototype.$moment = moment
    Vue.prototype.$swal = swal
    Vue.prototype.$swal.success = function(msg) {
      swal(msg, {
        closeOnEsc: false,
        closeOnClickOutside: false,
        icon: 'success',
        buttons: false,
        timer: 1200
      })
    }
    Vue.prototype.$swal.error = function(msg) {
      swal(msg, {
        closeOnEsc: false,
        closeOnClickOutside: false,
        icon: 'error',
        buttons: false,
        timer: 1500
      })
    }
  }
})

Vue.filter('formatDate', function(value, format) {
  if (value === null) {
    return ''
  } else {
    return moment(value).format(format)
  }
})
