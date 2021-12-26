<template>
    <div class="uploader">
        File Uploader

        <q-file outlined v-model="model">
            <q-btn class="absolute-center" size="24px" icon="upload" />
        </q-file>
        <q-btn label="Upload" @click="Upload(model)" />
        <q-card>
            <h6>Shoes here</h6>
<!--            <q-img :src="Image" :ratio="16/9">-->
<!--                <div class="absolute-bottom text-subtitle1 text-center">Caption</div>-->
<!--            </q-img>-->
            <q-card-section>
                <p></p>
            </q-card-section>
        </q-card>
    </div>
</template>
<script>
import { useQuasar } from "quasar";
import { ref, watchEffect } from "vue";
import { Upload, RetrieveImages} from "src/services/service";
export default {
    setup() {
        const model = ref(null);
        const Image = ref("");
        RetrieveImages().then(res => {
            console.log(res);
            Image.value = res;
        });
        watchEffect(() => {
            console.log(model.value);
        });
        return {
            model,
            Upload,
            Image,
        }
    },


}
</script>
<style lang="scss">
</style>
