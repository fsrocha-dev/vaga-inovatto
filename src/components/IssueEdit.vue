<template>
	<q-dialog v-model="issueData.action" persistent>
	  <q-card style="min-width: 400px">
			<q-card-section>
				<div class="text-h6">Editar Issue</div>
			</q-card-section>
			<q-card-section>
				<q-input dense v-model="issueData.title" autofocus  />
			</q-card-section>
			<q-card-section>
				<q-input dense autofocus v-model="issueData.body" />
			</q-card-section>
			<q-card-section>
				<span v-if="error.editIssue" class="text-red">*O Título é obrigarório</span>
			</q-card-section>
			<q-card-actions align="right" class="text-primary">
				<q-btn flat label="Cancelar" @click="closeEditIssue(false)" />
				<q-btn color="green" unelevated label="Salvar alterações" @click="updateIssue()"/>
			</q-card-actions>
	  </q-card>
	</q-dialog>
</template>

<script>
import api from '@/services/api.js'

export default {
	name: 'IssuesEdit',
	props: ['editIssueDialog'],
	data () {
		return {
			issueData: {
				action: false,
				title: this.editIssueDialog.title,
				body: this.editIssueDialog.body,
				number: this.editIssueDialog.number
			},
			error: {
				editIssue: false
			}
		}
	},
	watch: {
    editIssueDialog: function() {
      this.setIssue()
    }
  },
	methods: {
		setIssue() {
			this.issueData.action = this.editIssueDialog.data.action
			this.issueData.title = this.editIssueDialog.data.title
			this.issueData.body = this.editIssueDialog.data.body
			this.issueData.number = this.editIssueDialog.data.number
		},
		async updateIssue() {
			if(this.issueData.title === null || this.issueData.title === '' ) {
        this.error.editIssue = true
        return
			}
			await api.patch(`repos/fsrocha-dev/vaga-inovatto/issues/${this.issueData.number}`, {
				title: this.issueData.title,
				body: this.issueData.body
			}, {
        headers: { Authorization: "Token 68c554222d9f5e8733e601781b144881241b41e8"}
      }).then(response => {
				alert('Issue alterada com sucesso.')
				this.$emit('editReturn', false)
      }).catch(error => {
				alert('Falha ao tentar editar a issue.')
      })
		},
		closeEditIssue(value) {
			this.$emit('editReturn', false)
		}
	}
}
</script>

<style>

</style>
