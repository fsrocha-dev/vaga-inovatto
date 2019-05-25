<template>
	<q-toggle v-model="visible" :label="issueData.status" class="q-mb-md" />
</template>

<script>
import api from '@/services/api.js'

export default {
  name: 'IssueLock',
  props: ['lockIssue'],
  data () {
		return {
			visible: this.lockIssue.lock,
			issueData: {
				status: '',
				number: this.lockIssue.number
			}
		}
	},
	watch: {
    visible: function() {
			this.lockedIssue(this.visible)
    }
	},
	methods: {
		lockedIssue(value) {
			if(value == true){
				api.put(`repos/fsrocha-dev/vaga-inovatto/issues/${this.issueData.number}/lock`, {'locked': true,}, {headers: { Authorization: "Token 68c554222d9f5e8733e601781b144881241b41e8"} }).then(response => {
						this.issueData.status = 'Locked'
						this.$emit('editReturn', false)
					}).catch(error => {
						alert('Falha ao tentar travar a issue.')
					})
			} else {
				api.delete(`repos/fsrocha-dev/vaga-inovatto/issues/${this.issueData.number}/lock`, {headers: { Authorization: "Token 68c554222d9f5e8733e601781b144881241b41e8"} }).then(response => {
						this.issueData.status = 'Unlocked'
						this.$emit('editReturn', false)
					}).catch(error => {
						alert('Falha ao tentar destravar a issue.')
					})
			}
		}
	}
}
</script>

<style>
</style>