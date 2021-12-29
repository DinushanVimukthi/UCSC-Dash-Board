<template>
    Assignments
    <div class="flex flex-center">
    <div class="text-h4">Upcoming Submission</div>
    <q-btn label="Ass" @click="AddAssignment('l')"/>
    <div v-for="(assignment,key) in assignments" :key="key">
    <div>
    {{key+" : "+assignment}}
    </div>
    </div>
    </div>
</template>
<script>
import {ref} from 'vue';
// import {} from 'src/services/Assignment';
import { mapActions } from 'vuex';
export default {
    data(){
        return{
            assignments:ref({'DSA':{'Date':'2021/12/05'},'OOP':{'Date':'2021/12/06'}}),
        }
    },
    methods:{
        ...mapActions(['AddAssignment']),
    }
}
</script>