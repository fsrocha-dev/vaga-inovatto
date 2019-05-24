<template>
  <q-page>
    <div class="q-pa-md fixed-center"  style="width: 70%; min-width: 350px;">
      <div class="q-py-md">
        <span class="text-h4">Issues</span>
      </div>
      <div v-for="issue in issues" :key="issue.id" class="row no-wrap items-center q-mt-md q-pa-sm bg-grey-3 rounded-borders">
        <div>Titulo: {{ issue.title }}</div>
        <q-space />
        <q-avatar>
          <img :src="issue.user.avatar_url">
        </q-avatar>
      </div>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
import axios from 'axios'

export default {
  name: 'Issues',
  data () {
    return {
      issues: null
    }
  },
  methods: {
    getIssues() {
      axios.get('https://api.github.com/search/issues?q=author:fsrocha-dev repo:fsrocha-dev/vaga-inovatto').then(response => {
        this.issues = response.data.items
        console.log(response.data.items)
      }).catch(error => {
        console.log('falhou')
      })
    }
  },
  created() {
    this.getIssues()
  }
}
</script>
