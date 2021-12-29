<template>
  <router-view />
</template>
<script>
import { defineComponent } from 'vue';
import {mapActions} from "vuex";
import {useQuasar} from "quasar";
import {Update_Course,Update_Events} from "src/services/Notification";
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
      Update_Course()
      Update_Events()
  }
})
</script>
