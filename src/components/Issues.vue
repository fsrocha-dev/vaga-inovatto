<template>
  <q-page>
    <div class="q-pa-md fixed-center"  style="width: 70%; min-width: 350px;">
      <div class="q-py-md">
        <span class="text-h4">Issues</span>
      </div>
      <div v-for="issue in issues" :key="issue.id" class="row no-wrap items-center q-mt-sm q-pa-sm bg-grey-3 rounded-borders">
        <q-expansion-item class="full-width">
          <template v-slot:header>
            <q-item-section avatar>
              <q-avatar>
                <img :src="issue.user.avatar_url">
              </q-avatar>
            </q-item-section>
            <q-item-section>
              {{issue.title}}
            </q-item-section>
            <q-item-section side>
              <div class="row items-center">
                <q-badge color="green" class="q-mx-md">{{ issue.state }}</q-badge>
              </div>
            </q-item-section>
          </template>
          <q-card>
            <q-card-section>
              <span class="block"><b>Criado por: </b> {{ issue.user.login }}</span>
              <span>
                <b>Comentário: </b>
                <a class="link" :href="issue.html_url" target="_blank">{{ issue.body }}</a>
              </span>
            </q-card-section>
          </q-card>
        </q-expansion-item>
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
