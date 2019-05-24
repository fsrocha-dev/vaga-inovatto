import Vue from 'vue'
import App from './App.vue'

import './styles/quasar.styl'
import '@quasar/extras/material-icons/material-icons.css'
import {
  Quasar, 
  QLayout,
  QHeader,
  QDrawer,
  QPageContainer,
  QPage,
  QToolbar,
  QToolbarTitle,
  QBtn,
  QIcon,
  QList,
  QItem,
  QItemSection,
  QItemLabel,
  QSpace,
  QBadge,
  QAvatar,
  QExpansionItem,
  QCard,
  QCardSection
} from 'quasar'

Vue.use(Quasar, {
  config: {},
  components: {
    QLayout,
    QHeader,
    QDrawer,
    QPageContainer,
    QPage,
    QToolbar,
    QToolbarTitle,
    QBtn,
    QIcon,
    QList,
    QItem,
    QItemSection,
    QItemLabel,
    QSpace,
    QBadge,
    QAvatar,
    QExpansionItem,
    QCard,
    QCardSection
  },
  directives: {
  },
  plugins: {
  }
 })

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
