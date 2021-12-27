<template>
    <div>
        Notify
        <div class="absolute-top-right">
            Enable Timers
            <q-toggle v-model="EnableTimer" />
        </div>
        <div class="flex flex-center">
            <q-card
                class="bg-grey-7 my-main-card"
                v-for="(EventsData,EventsName) in GetSpecialEvents"
                :key="EventsName"
            >
                <div class="flex flex-center column">
                    <div
                        class="text-h4"
                    >{{ EventsName.toString().split("_").join(" ").toUpperCase() }}</div>
                    <div class="text-h6">{{ EventsData.Date }}</div>
                    <div>{{ EventsData.Time }}</div>
                </div>

                <q-card-section v-if="EnableTimer" class="flex flex-center">
                    <q-card
                        v-for="(Time,key) in EventsTimer[EventsName]"
                        :class="(EventsTimer[EventsName]['Days']<7? 'bg-red ':'bg-positive ')+ 'flex flex-center my-sub-card q-ma-md'"
                        :key="Time+' '+key"
                    >
                        <div class="flex flex-center column">
                            <span class="text-h7">{{ key.toString() }}</span>
                            <span class="text-h3">{{ Time }}</span>
                        </div>
                    </q-card>
                </q-card-section>
            </q-card>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { ref } from 'vue'

export default {
    data() {
        return {
            ClosedEvents:ref({}),
            Events: ref({}),
            EventsTimer: ref({}),
            EnableTimer: ref(true),
            
        }
    },
    mounted() {
        this.GetEvents();
        this.countetimer();
    },
    computed: {
        ...mapGetters("stores", ["GetSpecialEvents"]),
        ClosedEvent() {
            return Dates => {
                let date = new Date(Dates);
                let today = new Date();
                // console.log("vv",(date.getTime()-today.getTime())/(60*60*1000)%7);
                if (today.getTime() - date.getTime() < (7 * 24 * 60 * 60 * 1000)) {

                    return true;
                }
                else {
                    return false;
                }
            }
            
        }


    },
    methods: {
        ...mapActions('stores', ['GetEvents', 'DestroyEvents']),
        TimerEnable() {
            this.EnableTimer = !this.EnableTimer
        },
        countetimer() {
            setInterval(() => {
                this.Events = this.GetSpecialEvents
                Object.keys(this.Events).forEach(async key => {
                    let Time = this.Events[key].Time
                    let Date = this.Events[key].Date
                    this.EventsTimer[key] = this.setTime({ Time, Date })
                    
                })
            }, 1000);

        },
        setTime(key) {
            let Time = {
                Days: 0,
                Hours: 0,
                Minutes: 0,
                Seconds: 0,
      
            }
            var firstDate = new Date();
            var secondDate = new Date(key.Date.split("/")[2],key.Date.split("/")[0]-1,key.Date.split("/")[1],key.Time.split(":")[0],key.Time.split(":")[1],key.Time.split(":")[2]);
            var time_difference = secondDate.getTime() - firstDate.getTime();
            var days_difference = Math.floor(time_difference / (1000 * 60 * 60 * 24));
            var Hrs_difference = (Math.floor(time_difference / (1000 * 60 * 60)) % 24);
            var Minutes_difference = (Math.floor(time_difference / (1000 * 60)) % 60);
            var second_difference = (Math.floor(time_difference / (1000)) % 60);
            Time.Hours = Hrs_difference;
            Time.Minutes = Minutes_difference;
            Time.Seconds = second_difference;
            Time.Days = days_difference;
    
          
            return Time;
        },
        checkSingleDigit(digit) {
            return ('0' + digit).slice(-2)
        }
    },

}


</script>    
<style lang="sass">

.my-main-card
    margin: 10px
    max-height: 50px
    min-height: 300px
.my-sub-card
    max-height: 80px
    max-width: 80px
    min-width: 80px
    min-height: 80px
</style>