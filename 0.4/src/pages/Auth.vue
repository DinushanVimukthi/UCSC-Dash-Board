<template>
<q-page class="flex flex-center">

    <q-card v-if="!trigger">
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="LogIn" label="LogIn" />
          <q-tab name="Register" label="Register" />

        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="LogIn">
            <div class="text-h6 " >LogIn</div>

            <Logreg :tab="tab"/>
          </q-tab-panel>

          <q-tab-panel name="Register">
            <div class="text-h6">Register</div>

            <Logreg :tab="tab"/>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    

</q-page>
</template>
<script>
import { ref } from 'vue'
import Logreg from 'components/Logreg'
// import Profile from 'components/Profile'
export default {
  setup () {
    return {
      tab: ref('LogIn'),
      trigger: ref(false)
    }
  },
  components:{
      Logreg:Logreg,
      // Profile:Profile
  }
}
</script>
<style>
.text-h6 {
  font-size: 1.25rem;
}
.q-card {
  max-width: 400px;
  max-height: 600px;
  min-height: 500px;
  min-width: 400px;
  margin: 0 auto;
}
</style>
