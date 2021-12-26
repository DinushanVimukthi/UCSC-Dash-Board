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
        <span class="q-ma-sm">{{GetUsername}}</span>
          <q-avatar class="cursor-pointer" size="2.5rem" @click="triggers = true">
            <img :src="getpic != null ? getpic : 'https://cdn.quasar.dev/img/avatar.png'"/>
            <q-tooltip v-if="getpic!=null" class="bg-positive text-black">
              Click to Edit Profile 
            </q-tooltip>
          </q-avatar>

          <q-btn v-if="page === 'dash'" outline icon="lock_open" label="SignOut" @click="LogOut" />
          <q-btn v-if="IsSuperAdmin" label="Super" :to="'/SuperAdmin'" />
          <q-dialog
            v-model="triggers"
            persistent
            :maximized="maximizedToggle"
            transition-show="slide-up"
            transition-hide="slide-down"
          >
          <edit-profile/>
         
          </q-dialog>
        </div>
      </q-toolbar>
    </q-header>

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
    return {
      triggers: ref(false),
      maximizedToggle: ref(false),
    }
  },
  computed: {
    ...mapGetters("stores", ["IsSuperAdmin", "getpic",'GetUsername']),
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
  methods: {
    ...mapActions('stores', ['LogOut']),
    ToggleDark() {
      console.log(this.$q.dark.mode);
      this.$q.dark.toggle()
    }
  },


})
</script>
<style lang="sass">
.q-avatar
  margin-right: 10px
</style>

