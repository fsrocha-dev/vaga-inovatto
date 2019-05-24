<template>
  <q-page>
    <div class="q-pa-md fixed-center"  style="width: 70%; min-width: 350px;">
      <div class="q-py-md">
        <span class="text-h4">Issues</span>
      </div>
      <q-list bordered separator>
        <q-item clickable v-ripple>
          <q-item-section>Titulo da issue</q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>

</template>

<style>
</style>

<script>
export default {
  name: 'Issues'
}
</script>
