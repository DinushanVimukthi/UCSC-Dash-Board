<template>
    <div class="q-ma-sm flex flex-center">
        <q-card class="q-pa-lg q-ma-lg my-card" v-for="(users,key) in All_users" :key="key">
            <q-card-section class="flex flex-center column">
                <q-img :src="users.Url" spinner-color="red" style="height: 140px; max-width: 150px">
                    <template v-slot:loading>
                        <div class="text-yellow">
                            <q-spinner-ios />
                            <div class="q-mt-md">Loading...</div>
                        </div>
                    </template>
                    <template v-slot:error>
                        <div class="text-red flex flex-center" style="height: 140px; width: 150px">
                            <q-spinner-ios size="5rem" />
                            <div class="q-mt-md">Not Found !</div>
                        </div>
                    </template>
                </q-img>
                <div class="text-h6">{{ users.name }}</div>
                <div class="text-subtitle2">{{ users.email }}</div>
                <q-btn icon="error" @click="MakeAdmin(key)" :label="!users.admin?'Make Admin':'Remove Admin'" :class="users.admin?'bg-red':'bg-positive'"/>

            </q-card-section>
        </q-card>
    </div>
    <div></div>
</template>
<script>
import { ref } from 'vue'
import { mapActions, mapGetters } from 'vuex'
export default {
   

    setup() {
        const Userslist = ref({})
        return {
            Userslist
            ,value:ref(false)
        }
    },
    computed: {
        ...mapGetters('stores', ['All_users']),
        
    },
    mounted() {
        this.GetAllusers()
    },
    methods: {
        ...mapActions('stores', ['GetAllusers', "MakeAdmin"]),
    },



}
</script>
<style lang="sass" scoped>

.q-card
    width: 100%
    min-width: 300px
    max-width: 300px
    min-height: 300px
    max-height: 300px
</style>