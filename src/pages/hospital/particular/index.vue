<template>
  <div>
    <div class="top">
      <div class="titil">{{ regisStore.hospitalInfo.hospital?.hosname }}</div>
      <div class="level">{{ regisStore.hospitalInfo.hospital?.param.hostypeString }}</div>
    </div>
    <div style="display: flex; margin-top: 50px">
      <div class="left">
        <img
          :src="`data:image/jpeg;base64,${regisStore.hospitalInfo.hospital?.logoData}`"
          alt=""
          style="width: 80px; height: 80px; border-radius: 50%"
        />
      </div>
      <div class="right">医院路线: {{ regisStore.hospitalInfo.hospital?.route }}</div>
    </div>
    <h1>医院介绍</h1>
    <p>{{ regisStore.hospitalInfo.hospital?.intro }}</p>
  </div>
</template>

<script setup>
import useRegistryStore from '@/store/modules/registry'
let regisStore = useRegistryStore()
// console.log(regisStore)
</script>

<style scoped>
.top {
  display: flex;
}
.titil {
  color: black;
  font-weight: 900;
  font-size: 20px;
}
.level {
  line-height: 20px;
  margin-left: 20px;
}
.right {
  margin-left: 50px;
  color: #777;
  font-size: 16px;
  line-height: 19px;
}
h1 {
  font-size: 20px;
  margin: 35px 0
}
p{
  text-indent: 2em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  letter-spacing: 1px;
  font-size: 12px;
  line-height: 22px;  
  color: #777;
}
.top:hover{
  cursor: default
}
.right:hover{
cursor: default;
}
h1:hover{
  cursor: default
}
p:hover{
  cursor: default;
}
</style>
