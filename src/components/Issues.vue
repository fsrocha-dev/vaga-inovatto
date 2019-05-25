<template>
  <q-page>
    <div class="q-pa-md fixed-center"  style="width: 70%; min-width: 350px;">
      <div class="q-py-md">
        <span class="text-h4">Issues</span>
      </div>
      <div v-for="issue in issues" :key="issue.id" class="row no-wrap items-center q-mt-sm q-pa-sm bg-grey-3 rounded-borders">
        <q-expansion-item group="somegroup" class="full-width">
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
                <q-badge v-else color="red" class="q-mx-sm">{{ issue.state }}</q-badge>
                <q-badge v-if="issue.locked == true" color="black" >Locked</q-badge>
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
              <q-item-section side>
                <div class="row items-rights">
                  <q-btn @click="editIssue({'action': true, 'title': issue.title, 'body': issue.body, 'number': issue.number})" flat round size="10px" color="primary" icon="edit" class="q-mt-sm" />
                  <IssueLock @editReturn="reloadComponent($event)" :lockIssue="{'number': issue.number, 'lock': issue.locked}" />
                </div>
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
    <IssueEdit @editReturn="reloadComponent($event)" :editIssueDialog="{'data': dataEditIssue}" />
    </div>
  </q-page>
</template>

<script>
import IssueEdit from '@/components/IssueEdit'
import IssueLock from '@/components/IssueLock'
import api from '@/services/api.js'
import CONFIG from '@/config.js'

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
      dataEditIssue: {
        action: false,
        title: '',
        body: '',
        number: null
      },
      error: {
        createIssue: false
      }
    }
  },
  methods: {
    async getIssues() {
      await api.get(`search/issues?q=repo:${CONFIG.Account}/${CONFIG.Repository}`).then(response => {
        this.issues = response.data.items
        console.log(CONFIG)
      }).catch(error => {
        alert('Não foi possível listar as issues')
      })
    },
    async createIssue() {
      if(this.issueData.title === null || this.issueData.title === '' ) {
        this.error.createIssue = true
        return
      }
      await api.post('repos/fsrocha-dev/vaga-inovatto/issues', this.issueData, {
        headers: { Authorization: "Token 68c554222d9f5e8733e601781b144881241b41e8"}
      }).then((response) => {
        alert('Issue criada com sucesso').then(() => {
          this.$emit('closeDialog', false)
        })
      }).catch(error => {
        alert('Falha ao tentar criar a issue, tente mais tarde.')
        this.$emit('closeDialog', false)
      })
    },
    closeCreateIssue(value) {
      this.$emit('closeDialog', value)
    },
    editIssue(issue){
      this.dataEditIssue = issue
    },
    reloadComponent(event){
      this.dataEditIssue.action = event
      this.getIssues()
    }
  },
  created() {
    this.getIssues()
  },
  components: { IssueEdit, IssueLock }
}
</script>

<style>
.q-toggle {
  margin-bottom: 0px !important;
  float: right;
}
</style>
