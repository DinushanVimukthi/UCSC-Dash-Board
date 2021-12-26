<template>
  <router-view />
</template>
<script>
import { defineComponent } from 'vue';
import {mapActions} from "vuex";
import {useQuasar} from "quasar";

export default defineComponent({
  name: 'App',
  setup(){
    const $q=useQuasar()
    $q.dark.set(true)
  },
  methods:{
  ...mapActions('stores',['HandleAuthenticationStateChange','GetDate']),
  },
  mounted() {
      this.HandleAuthenticationStateChange()
      this.GetDate()
  }
})
</script>
