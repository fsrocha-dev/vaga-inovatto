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
import axios from 'axios'

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
			await axios.patch(`https://api.github.com/repos/fsrocha-dev/vaga-inovatto/issues/${this.issueData.number}`, {
				title: this.issueData.title,
				body: this.issueData.body
			}, {
        headers: { Authorization: "Token 71b021084e5d8fb081735b621ef6a46c669183e2"}
      }).then(response => {
				this.$emit('editReturn', false)
      }).catch(error => {
        console.log('Falha ao tentar editar a issue')
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
