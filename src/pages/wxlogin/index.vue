<template>
<div></div>
</template>

<script setup>
import {useRoute} from 'vue-router'
let $route=useRoute()
console.log($route.query)
//将微信发送的token存入本地浏览器
localStorage.setItem('userlogin',JSON.stringify($route.query))

let html=document.querySelector('html')
html.style.display='none'

</script>

<style scope></style>
