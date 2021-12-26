<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar :class="this.$q.dark.mode ? 'row bg-dark' : 'row'">
        <q-toolbar-title class="absolute-top-left q-ma-sm q-pa-sm">UCSC 1st Year DashBoard</q-toolbar-title>

        <q-btn
          class="absolute-center"
          outlined
          :style="this.$q.dark.mode ? 'color: goldenrod' : 'color: white'"
          :label="this.$q.dark.mode ? 'Dark' : 'light'"
          :icon="this.$q.dark.mode ? 'dark_mode' : 'light_mode'"
          @click="ToggleDark"
        />
        <div class="q-pa-sm absolute-top-right">
          <span class="q-ma-sm">{{ GetUsername }}</span>
          <q-avatar
            style="margin-left:10px"
            class="cursor-pointer"
            size="2.5rem"
            @click="triggers = true"
          >
            <img :src="getpic != null ? getpic : 'https://cdn.quasar.dev/img/avatar.png'" />
            <q-tooltip v-if="getpic != null" class="bg-positive text-black">Click to Edit Profile</q-tooltip>
          </q-avatar>

          <q-btn v-if="page === 'dash'" outline icon="lock_open" label="SignOut" @click="LogOut" />
          <q-btn
            style="margin-left:10px"
            v-if="IsSuperAdmin && $route.fullPath != '/SuperAdmin'"
            label="Super"
            :to="'/SuperAdmin'"
          />
          <q-btn
            style="margin-left:10px"
            v-if="IsSuperAdmin && $route.fullPath === '/SuperAdmin'"
            label="Dash"
            :to="'/dash'"
          />
          <q-dialog
            v-model="triggers"
            persistent
            :maximized="maximizedToggle"
            transition-show="slide-up"
            transition-hide="slide-down"
          >
            <edit-profile />
          </q-dialog>
        </div>
      </q-toolbar>
    </q-header>
    <q-footer :class="this.$q.dark.mode ? 'row bg-dark' : 'row'">
    <div v-if="!close"  :class="(this.$q.dark.mode?'bg-dark ':'bg-light ')+'text-h7 text-pink absolute-bottom-right q-ma-lg'">
    {{Days+"D : "+hours+ "H : "+minutes+ "M : "+seconds+"S"}} Time Left
    <!--<q-btn :class="(this.$q.dark.mode?'bg-grey-9 ':'bg-grey-4 ')+'rounded-borders'" icon="close" @click="closepop"/>-->
    </div>
    
    
    </q-footer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>




import { useQuasar } from 'quasar';
import { defineComponent } from 'vue'
import { mapGetters, mapActions } from 'vuex'
import { IsUser } from "src/services/service";
import EditProfile from 'src/components/EditProfile.vue';
import { ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',
  setup() {
    const close=ref(false)
    return {
      triggers: ref(false),
      maximizedToggle: ref(false),
      close

    }
  },
  computed: {
    ...mapGetters("stores", ["IsSuperAdmin", "getpic", 'GetUsername', 'SecondSemExam']),
    page() {
      if (this.$route.fullPath === "/")
        return '/'
      else
        return 'dash'
    }
  },
  components: {
    EditProfile: EditProfile
  },
  data() {
    return {
      hours: 0,
      minutes: 0,
      seconds: 0,
      Days: 0,
    }
  },
  mounted() {
    this.setTime()
  },
  methods: {
    ...mapActions('stores', ['LogOut']),
    ToggleDark() {
      console.log(this.$q.dark.mode);
      this.$q.dark.toggle()
    },
    closepop(){
      this.close=true
      setTimeout(() => {
        this.close=false
      }, 5000);
    },
    setTime() {

      setInterval(() => {
          var firstDate = new Date();
          // console.log(firstDate);
          var secondDate = new Date(this.SecondSemExam.Date);
          var time_difference = secondDate.getTime() - firstDate.getTime();
          var days_difference =Math.round(time_difference / (1000 * 60 * 60 * 24));
          var Hrs_difference = (Math.round(time_difference / (1000 * 60 * 60 ))%24);
          var Minutes_difference = (Math.round(time_difference /(1000*60))%60);
          var second_difference = (Math.round(time_difference / (1000))%60);
          this.Days=days_difference;
          this.hours=Hrs_difference;
          this.minutes=Minutes_difference;
          this.seconds=second_difference;
      }, 1000)
    },
    checkSingleDigit(digit) {
      return ('0' + digit).slice(-2)
    }
  },


})
</script>
<style lang="sass">
.q-avatar
  margin-right: 10px
</style>

