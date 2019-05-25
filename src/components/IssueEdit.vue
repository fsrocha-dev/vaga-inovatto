<template>
	<q-dialog v-model="editIssueDialog.action" persistent>
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
				<q-btn flat label="Cancelar" />
				<q-btn color="green" unelevated label="Salvar alterações" />
			</q-card-actions>
	  </q-card>
	</q-dialog>
</template>

<script>
export default {
	name: 'IssuesEdit',
	props: ['editIssueDialog'],
	data () {
		return {
			issueData: null,
			error: {
				editIssue: false
			}
		}
	},
	methods: {
		getIssue() {
			this.issueData = this.editIssueDialog.data
		}
	},
	created() {
		this.getIssue()
	}
}
</script>

<style>

</style>
