<template>
    <div>
        <div class="full-width text-red text-center text-h3">Special Events</div>
        <div class="absolute-top-right">
            Enable Timers
            <q-toggle v-model="EnableTimer" />
        </div>
        <div class="flex flex-center">
            <q-card
                v-if="Object.keys(GetSpecialEvents).length == 0"
                class="bg-grey-7 my-main-card flex-center"
            >
                <q-card-section class="flex-center absolute-center">
                    <span class="bg-pink text-h3 flex text-center">No Special Event Found</span>
                </q-card-section>
            </q-card>
        </div>
        <div class="flex flex-center">
            <q-card
                class="bg-grey-7 my-main-card"
                v-for="(EventsData,EventsName) in GetSpecialEvents"
                :key="EventsName"
            >
                <div class="flex flex-center column q-ma-md">
                    <div
                        class="text-h4 text-center"
                    >{{ EventsName.toString().split("_").join(" ").toUpperCase() }}</div>
                    <div class="text-h6">{{ EventsData.Date }}</div>
                </div>

                <q-card-section v-if="EnableTimer" class="flex flex-center">
                    <q-card
                        v-for="(Time,key) in EventsTimer[EventsName]"
                        :class="(EventsTimer[EventsName]['Days'] < 7 ? 'bg-red ' : 'bg-positive ') + ' flex flex-center my-sub-card q-ma-md'"
                        :key="Time + ' ' + key"
                    >
                        <div class="flex flex-center column">
                            <span class="text-h7">{{ key.toString() }}</span>
                            <span class="text-h3">{{ parseInt(Time) > 0 ? Time : "0" }}</span>
                        </div>
                    </q-card>
                </q-card-section>
            </q-card>
        </div>
    </div>
    <div class="flex flex-center">
        <div class="full-width text-red text-center text-h3">Events</div>
        <div class="flex -flex-center">
            <q-card
                v-if="Object.keys(GetNormalEvents).length == 0"
                class="bg-grey-7 my-main-card flex-center"
            >
                <q-card-section class="flex-center absolute-center">
                    <span class="text-h3 flex text-center">No Event Found</span>
                </q-card-section>
            </q-card>
        </div>
        <div class="flex flex-center">
            <q-card
                class="bg-grey-7 my-main-card q-ma-md"
                v-for="(EventsData,EventsName) in GetNormalEvents"
                :key="EventsName"
            >
                <div class="flex flex-center column">
                    <div
                        class="text-h4 q-ma-md"
                    >{{ EventsName.toString().split("_").join(" ").toUpperCase() }}</div>
                    <div class="text-h6">{{ EventsData.Date }}</div>
                    <div>{{ EventsData.Time }}</div>
                </div>

                <q-card-section v-if="EnableTimer && Overdued(EventsName)" class="flex flex-center">
                    <q-card
                        v-for="(Time,key) in EventsTimer[EventsName]"
                        :class="(EventsTimer[EventsName]['Days'] < 7 ? 'bg-red ' : 'bg-positive ') + 'flex flex-center my-sub-card q-ma-md'"
                        :key="Time + ' ' + key"
                    >
                        <div
                            class="flex flex-center"
                            v-if="(EventsTimer[EventsName]['Days'] < 0 && EventsTimer[EventsName]['Hours'] < 0 && EventsTimer[EventsName]['Minutes'] < 0 && EventsTimer[EventsName]['Seconds'] < 0)"
                        >
                            <span class="text-h3">{{ "Overdued" }}</span>
                        </div>
                        <div v-else class="flex flex-center column">
                            <span class="text-h7">{{ key.toString() }}</span>
                            <span class="text-h3">{{ parseInt(Time) > 0 ? Time : "0" }}</span>
                        </div>
                    </q-card>
                </q-card-section>
                <q-card-section v-else class="flex flex-center">
                    <div class="flex flex-center">
                        <span class="text-h3 text-white bg-red">{{ "Overdued" }}</span>
                    </div>
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
            ClosedEvents: ref({}),
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
        ...mapGetters("stores", ["GetSpecialEvents", 'GetNormalEvents', 'GetAllEvents']),
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
        Overdued(val) {
            console.log(val);
            console.log(this.Events[val]);
            let flag=true;
            console.log(this.EventsTimer[val]);
            for (let key in this.EventsTimer[val]) {
                if(this.EventsTimer[val][key]<0){
                    flag=false;
                }
                else{
                    flag=true;
                }
            }
            return flag;
            // Object.keys(this.EventsTimer).forEach(ele => {
            //     console.log(ele);
            //     if (this.EventsTimer[ele]['Days'] < 0 && this.EventsTimer[ele]['Hours'] < 0 && this.EventsTimer[ele]['Minutes'] < 0 && this.EventsTimer[ele]['Seconds'] < 0) {
            //         console.log("Overdued");
            //         return false;
            //     }
            //     else {
            //         return true;
            //     }
            // })

        },
        TimerEnable() {
            this.EnableTimer = !this.EnableTimer
        },
        countetimer() {
            setInterval(() => {
                this.Events = this.GetAllEvents
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
            var secondDate = new Date(key.Date.split("/")[2], key.Date.split("/")[0] - 1, key.Date.split("/")[1], key.Time.split(":")[0], key.Time.split(":")[1], key.Time.split(":")[2]);
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