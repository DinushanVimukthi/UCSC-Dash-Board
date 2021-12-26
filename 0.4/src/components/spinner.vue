<template>
  <div class="flex flex-center">
    <q-spinner
      v-if="trigger"
      class=""
      color="primary"
      size="3em"
    />
  </div>

</template>
<script>
export default {
  props: ["trigger"],
}
</script>
