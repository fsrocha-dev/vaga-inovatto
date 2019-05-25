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
                <q-badge v-if="issue.state == 'open'" color="grenn" class="q-mx-md">{{ issue.state }}</q-badge>
                <q-badge v-else color="red" class="q-mx-md">{{ issue.state }}</q-badge>
              </div>
            </q-item-section>
          </template>
          <q-card>
            <q-card-section>
              <q-item-label lines="1">
                <span class="text-grey-8">Usuário - </span>
                <span class="text-weight-medium">[{{ issue.user.login }}]</span>
              </q-item-label>
              <q-item-label lines="1">
                <span class="text-grey-8">Comentário - </span>
                <span class="text-weight-medium">{{ issue.body }}</span>
              </q-item-label>
              <q-item-section top>
                <a class="q-mt-xs text-body2 text-weight-bold text-primary text-uppercase" :href="issue.html_url" target="_blank">
                  Abrir no Github
                </a>
              </q-item-section>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </div>
      <q-dialog v-model="dialogCreateIssue" persistent>
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">Nova Issue</div>
        </q-card-section>

        <q-card-section>
          <q-input dense v-model="issueData.title" autofocus placeholder="Título da issue" />
        </q-card-section>
        <q-card-section>
          <q-input dense v-model="issueData.body" autofocus placeholder="Mensagem da issue" />
        </q-card-section>
        <q-card-section>
          <span v-if="error.createIssue" class="text-red">*O Título é obrigarório</span>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancelar" @click="closeCreateIssue(false)" />
          <q-btn color="green" unelevated label="Adicionar" @click="createIssue()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
import axios from 'axios'

export default {
  name: 'Issues',
  props: ['dialogCreateIssue'],
  data () {
    return {
      issues: null,
      issueData: {
        title: '',
        body: ''
      },
      error: {
        createIssue: false
      },
    }
  },
  methods: {
    async getIssues() {
      await axios.get('https://api.github.com/search/issues?q=repo:fsrocha-dev/vaga-inovatto').then(response => {
        this.issues = response.data.items
      }).catch(error => {
        console.log('Falha ao listas as issues')
      })
    },
    async createIssue() {
      if(this.issueData.title === null || this.issueData.title === '' ) {
        this.error.createIssue = true
        return
      }
      await axios.post('https://api.github.com/repos/fsrocha-dev/vaga-inovatto/issues', this.issueData, {
        headers: { Authorization: "Token fba93d8a2f0c548ba16be0420ef2b21525b62a44"}
      }).then(response => {
        this.forceRerender()
        console.log('criou a issue')
      }).catch(error => {
        console.log('Falha ao tentar criar a issue')
      })
    },
    closeCreateIssue(value) {
      this.$emit('closeDialog', value)
    }
  },
  created() {
    this.getIssues()
  }
}
</script>
