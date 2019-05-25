<template>
	<q-toggle v-model="visible" :label="issueData.status" class="q-mb-md" />
</template>

<script>
import axios from 'axios'

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
				axios.put(`https://api.github.com/repos/fsrocha-dev/vaga-inovatto/issues/${this.issueData.number}/lock`, {'locked': true,}, {headers: { Authorization: "Token e88816c11a99cfad2268f177e56a1d27b8645997"} }).then(response => {
						this.issueData.status = 'Locked'
						this.$emit('editReturn', false)
					}).catch(error => {
						console.log('Falha ao tentar travar a issue')
					})
			} else {
				axios.delete(`https://api.github.com/repos/fsrocha-dev/vaga-inovatto/issues/${this.issueData.number}/lock`, {headers: { Authorization: "Token e88816c11a99cfad2268f177e56a1d27b8645997"} }).then(response => {
						this.issueData.status = 'Unlocked'
						this.$emit('editReturn', false)
					}).catch(error => {
						console.log('Falha ao tentar destravar a issue')
					})
			}
		}
	}
}
</script>

<style>
</style>