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
				api.put(`https://api.github.com/repos/fsrocha-dev/vaga-inovatto/issues/${this.issueData.number}/lock`, {'locked': true,}, {headers: { Authorization: "Token 8b97a8ef166da5f951ff8fbb9949081b07046d03"} }).then(response => {
						this.issueData.status = 'Locked'
						this.$emit('editReturn', false)
					}).catch(error => {
						alert('Falha ao tentar travar a issue.')
					})
			} else {
				api.delete(`https://api.github.com/repos/fsrocha-dev/vaga-inovatto/issues/${this.issueData.number}/lock`, {headers: { Authorization: "Token 8b97a8ef166da5f951ff8fbb9949081b07046d03"} }).then(response => {
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