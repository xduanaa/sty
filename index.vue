<template>
  <el-button class="yzm" style="pointer-events: none; margin-left: 0">
    获取验证码({{ time }})
  </el-button>
</template>

<script setup>
import { ref, watch } from 'vue'
let $emit = defineEmits(['getshowCode'])
let props = defineProps(['showCount'])
// let tiemr=setTimeout(() => {
//   time.value--
// }, 1000);
let time = ref(5)
let timer = null
// console.log(props.showCount)
watch(
  () => props.showCount,
  () => {
    if (timer) {
      clearInterval(timer)
    }
    timer = setInterval(() => {
      time.value--

      if (time.value === 0) {
        time.value = 5
        $emit('getshowCode', true)
        clearInterval(timer)
        timer = null
      }
    }, 1000)
  },

  { immediate: true }
)
</script>

<style scoped></style>
