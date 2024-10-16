<template>
  <div class="content">
    <div class="top">
      <div class="top-d">
        <span class="left">常见科室</span>
        <div><span class="right">全部</span><span class="icon">></span></div>
      </div>
      <ul style="display: flex; justify-content: space-between">
        <li v-for="(k, index) in kArr" :key="index">{{ k }}</li>
      </ul>
    </div>
    <div class="zj">
      <div class="zj-d" style="display: flex; justify-content: space-between">
        <span class="left-b" style="color: black; margin-bottom: 15px">平台公告</span>
        <div class="right-b"><span>全部</span><span class="icon-b">></span></div>
      </div>
      <ul style="display: flex; justify-content: space-between; flex-wrap: wrap" class="tital">
        <li>关于延长北京大学国际医院放假的通知</li>
        <li>北京中医药大学东方医院部分科室医生门诊医</li>
        <li>武警总医院号源暂停更新通知武警总医院号源暂停更新通知</li>
      </ul>
    </div>
    <div class="buttom">
      <div class="zj-t" style="display: flex; justify-content: space-between">
        <span class="left-t" style="color: black; margin-bottom: 15px">停诊公告</span>
        <div class="right-t"><span>全部</span><span class="icon-t">></span></div>
      </div>
      <ul style="display: flex; justify-content: space-between; flex-wrap: wrap" class="tital-t">
        <li>中国人民解放军总医院第六医学中心(原海军总医院)呼吸内科门诊停诊公告</li>
        <li>首都医科大学附属北京潞河医院老年医学科门诊停诊公告</li>
        <li>武警总医院号源暂停更新通知武警总医院号源暂停更新通知</li>
      </ul>
    </div>
  </div>
</template>

<script setup naee="Tip">
import { ref } from 'vue'
let kArr = ref([])
kArr.value = ['神经内科', '消化内科', '内科', '神经外科', '妇科', '产科', '儿科', '心理科']
</script>

<style scoped>
.content {
  margin-left: 50px;
  display: flex;
  flex-direction: column;
}
.left {
  color: black;
  font-size: 16px;
  letter-spacing: 1px;
  font-weight: 600;
}
.right {
  color: #999;
  font-size: 14px;
}
.icon {
  color: #4490f1;
  font-size: 14px;
}
.top {
  height: 200px;
}
.top-d {
  margin: 20px 0;
  display: flex;
  justify-content: space-between;
}
.top ul {
  flex-wrap: wrap;
  display: flex;
  justify-content: space-between;
}
.top li {
  width: 40%;
  margin: 7px auto;
  color: #333;
  height: 100%;
}
.content li:hover {
  color: skyblue;
  cursor: pointer;
}
.zj {
  margin-bottom: 30px;
}
.left-b {
  color: black;
  font-size: 16px;
  letter-spacing: 1px;
  font-weight: 600;
}
.right-b {
  color: #999;
  font-size: 14px;
}
.icon-b {
  color: #4490f1;
  font-size: 14px;
}
.top-b {
  margin: 20px 0;
  display: flex;
  justify-content: space-between;
}
.tital li {
  margin: 5px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  white-space: nowrap;
}
.left-t {
  color: black;
  font-size: 16px;
  letter-spacing: 1px;
  font-weight: 600;
}
.right-t {
  color: #999;
  font-size: 14px;
}
.icon-t {
  color: #4490f1;
  font-size: 14px;
}
.top-t {
  margin: 20px 0;
  display: flex;
  justify-content: space-between;
}
.tital-t li {
  margin: 7px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  white-space: nowrap;
}
span:hover {
  cursor: default;
}
</style>
