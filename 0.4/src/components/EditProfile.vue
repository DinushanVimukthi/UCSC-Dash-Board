<template>
    <div>
        <q-card class="bg-primary text-white">
            <q-bar>
                <q-space />

                <q-btn dense flat icon="close" v-close-popup>
                    <q-tooltip class="bg-white text-primary">Close</q-tooltip>
                </q-btn>
            </q-bar>

            <q-card-section class="flex flex-center column">
                <q-img
                    v-if="model == null"
                    :src="User.Url"
                    spinner-color="red"
                    :ratio="16 / 9"
                    style="width: 70% ;"
                />
                <q-img
                    v-if="model != null"
                    :src="imageurl"
                    spinner-color="red"
                    :ratio="16 / 9"
                    style="width: 70% ;"
                />

                <q-file
                    class="bg-positive q-ma-md"
                    label="Add New Profile Image"
                    clearable
                    standout
                    v-model="model"
                    style="width: 70% ;"
                    @change="updateFile()"
                >
                    <template v-slot:append>
                        <q-icon name="camera" />
                    </template>
                </q-file>

                <div style="width:70%" class="q-ma-sm">
                    New User Name
                    <q-input v-model="Username" :label="User.name" dense />
                </div>
                <div style="width:70%" class="flex flex-center">
                    <q-btn
                        class="q-ma-lg bg-secondary"
                        label="Update Profile"
                        @click="Update_Profile"
                        v-close-popup
                    />
                </div>
            </q-card-section>
        </q-card>
    </div>
</template>
<script>
import { ref, watch } from 'vue'
import { mapActions, mapGetters } from 'vuex';
import { useQuasar } from 'quasar';
export default {
    computed: {
        ...mapGetters('stores', ['User', 'GetUsername']),
    },
    setup() {
        const q = useQuasar();
        const model = ref(null);
        const Username = ref('');
        const imageurl = ref('');
        watch(model, (newVal) => {
            console.log(newVal);
            if (newVal == null) {
                console.log(newVal);
            } else {
                console.log(imageurl.value);
                imageurl.value = URL.createObjectURL(newVal);
            }

        });
        return {
            maximizedToggle: ref(false),
            model,q,
            Username,
            imageurl,
            updateFile() {
                console.log("updateed");
                imageurl.value = URL.createObjectURL(model.value);
                console.log(imageurl.value);
            }
        }
    }
    , methods: {
        ...mapActions('stores', ['ChangeProfilename', 'ChangeProfilePicture']),
        Update_Profile() {
            console.log("Update_Profile", this.Username);
            console.log(this.model);
            if (this.model != null) {
                this.ChangeProfilePicture({ file: this.model });
            }
            if (this.Username != '') {
                // this.Username = this.User.name;
                this.ChangeProfilename({ name: this.Username })
            }
            this.q.notify({
                color: 'positive',
                textColor: 'white',
                message: 'Profile Updated'
            });
            console.log(this.Username, this.model);
        }
    },
}
</script>
<style lang="sass">

.q-card
    max-width: 500px
    min-width: 500px
    max-height: 600px
    min-height: 600px
.q-img
    width: 280px
    height: 280px
    border: 3px solid #fff
    border-radius: 50%
</style>