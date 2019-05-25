<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-secondary">
      <q-toolbar>
        <q-toolbar-title>
          My Issues
        </q-toolbar-title>
        <div>
          <q-btn @click="createIssue(true)" no-caps flat text-color="white" color="primary" icon="add" label="Nova Issue" />
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <IssuesRepo :dialogCreateIssue="valor" @closeDialog="valor = false"/>
    </q-page-container>
  </q-layout>
</template>

<script>
import IssuesRepo from './components/Issues.vue'

export default {
  name: 'MyIssues',

  components: {
    IssuesRepo
  },

  data () {
    return {
      valor: false
    }
  },
  methods: {
    createIssue(value){
      this.valor = value
    }
  }
}
</script>

<style>
</style>
