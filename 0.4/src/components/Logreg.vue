<template>
  <q-dialog
    v-model="trigger"
    persistent
    :maximized="!maximizedToggle"
    transition-duration="2000"
    transition-show="fade"
    transition-hide="fade"
  >
    <q-card class="text-white">
      <q-card-section class="absolute-center">
        <q-spinner color="primary" size="10em" />
      </q-card-section>
    </q-card>
  </q-dialog>
  <div class="q-pa-md" style="max-width: 400px">
    <q-form class="q-gutter-md">
      <q-file
        v-if="tab === 'Register'"
        clearable
        standout
        v-model="model"
        label="Upload Profile Image"
      >
        <template v-slot:append>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo.svg" />
          </q-avatar>
        </template>
      </q-file>
      <q-input
        filled
        v-if="tab === 'Register'"
        type="text"
        v-model="FormData.name"
        label="Your name *"
        hint="Name and surname"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />

      <q-input
        filled
        type="email"
        v-model="FormData.email"
        label="Your Email *"
        lazy-rules
        :rules="[
          (val) => (val !== null && val !== '') || 'Please type your Email',
        ]"
      />
      <q-input
        filled
        type="password"
        v-model="FormData.password"
        label="Your password *"
        lazy-rules
        :rules="[
          (val) => (val !== null && val !== '') || 'Please type your password',
        ]"
      />

      <div>
        <q-btn :label="tab" @click="OnSubmit" color="primary" />
        <q-btn label="Reset" @click="OnReset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
  </div>
</template>
<script>
import { useQuasar } from "quasar";
import { ref } from "vue";
import { mapActions } from "vuex";
export default {
  props: ["tab"],
  setup() {
    const q = useQuasar();
    return {
      q,
      model: ref(null)
    }
  },
  data() {
    return {
      FormData: {
        name: '',
        email: '',
        password: '',

      }
      , trigger: ref(false),
      maximizedToggle: ref(false),
    };
  },
  methods: {
    ...mapActions("stores", ["RegisterUser", "LogUser"]),
    async OnSubmit() {
      if (this.tab == 'Register') {
        this.trigger = true
        const value = await this.RegisterUser({ FormData: this.FormData, model: this.model }).then(() => {

          this.q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'person_add',
            message: this.FormData.name + " Logged In ",
          })
          this.$router.push("/dash");
          setTimeout(() => {
            this.trigger = false

          }, 3000)

        })
        console.log(value)


        // this.$router.push('/dash')
      }
      else {
        const value = await this.LogUser(this.FormData);
        console.log(value)
        this.trigger = true
        this.q.notify({
          timeout: '1000',
          color: 'green-4',
          textColor: 'white',
          icon: 'account_circle',
          message: 'User Successfully Logged In'
        })
        setTimeout(() => {
          this.trigger = false
          setTimeout(() => {
            this.$router.push({ path: "/dash" });
          }, 500)

        }, 2000)

      }

      // console.log(this.FormData);
    },
    OnReset() {
      (this.name = ""), (this.email = ""), (this.password = "");
    },
  },
};
</script>
