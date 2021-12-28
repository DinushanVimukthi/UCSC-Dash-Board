<template>
    <div class="bg-dark">
        <span class="text-h6">Upcomming Events :</span>
        <span class="bg-green text-h6" style="margin-left:10px" v-for="(courses,key) in GetUpcomingEvents" :key="key">
            {{ key.toString().split("_").join(" ") }}
            <span :class="courses < 4 ? 'bg-red' : 'bg-green'">{{ courses + " Days more" }}</span>
        </span>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    setup() {

    },
    computed: {
        ...mapGetters("stores", ["GetUpcomingEvents"]),
    },
}

</script>
    