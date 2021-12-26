<template>
    <div>
        profile
        <q-btn label="Reg" @click="Deletedialog=true"/>
        <q-dialog
            v-model="Deletedialog"
            persistent
            :maximized="maximizedToggle"
            transition-show="slide-up"
            transition-hide="slide-down"
        >
            <q-card class="bg-secondary text-white DialogBox">
             <q-bar>
                <q-btn icon="close" v-close-popup/>
                </q-bar>
                <q-card-section>
                    <div class="text-h6">Delete Course</div>
                </q-card-section>
               

                <q-card-section class="q-pt-none text-white"></q-card-section>
            </q-card>
        </q-dialog>
    </div>
</template>
<script>
import { ref } from 'vue'
export default {
    data() {
        return {
            Deletedialog: ref(false),
            maximizedToggle: ref(false)
        }
    },
    methods: {
        deleteCourse() {
            this.Deletedialog = true
        }
    }
}
</script>