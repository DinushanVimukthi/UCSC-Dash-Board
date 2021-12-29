<template>
    Notifications
    <q-btn label="Notifications" @click="Create_Notifications"/>
</template>
<script>
import { Create_Notifications } from "src/services/Notification";
export default{
    data(){
        return{
            Notifications:[],
            Create_Notifications
        }
    },
    methods:{
        async GetNotifications(){
            let Notifications=await fun.GetNotifications();
            this.Notifications=Notifications;
        }
    }
    
}
</script>