<template>
	<q-toggle v-model="visible" :label="issueData.status" class="q-mb-md" />
</template>

<script>
import api from '@/services/api.js'
import CONFIG from '@/config.js'

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
				api.put(`repos/${CONFIG.Account}/${CONFIG.Repository}/issues/${this.issueData.number}/lock`, {'locked': true,}, {headers: { Authorization: `Token ${CONFIG.Token}`} }).then(response => {
						this.issueData.status = 'Locked'
						this.$emit('editReturn', false)
					}).catch(error => {
						alert('Falha ao tentar travar a issue.')
					})
			} else {
				api.delete(`repos/${CONFIG.Account}/${CONFIG.Repository}/issues/${this.issueData.number}/lock`, {headers: { Authorization: `Token ${CONFIG.Token}`} }).then(response => {
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