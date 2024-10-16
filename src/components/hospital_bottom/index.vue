<template>
  <div class="foot">
    <div class="conter">
      <div class="left">
        <span>京ICP备13018369号</span>
        <span>电话挂号010-56253825</span>
      </div>
      <div class="right">
        <span>联系我们</span>
        <span>合作伙伴</span>
        <span>用户协议</span>
        <span>隐私协议</span>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.foot {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  background-color: #fafafa;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 2;
}
.conter{
  width: 1200px;
  height: 50px;
  display: flex;
  justify-content: space-between
}
.left{
  display: flex;
  align-items: center;
}
.left :first-child{
  font-size: 10px;
  color: #BBB;
  margin-right: 30px;
}
.left :last-child{
  font-size: 10px;
  color: #666;
}
.right{
  color: #666;
  font-size: 12px;
  display: flex;
  align-items: center;
}
.right span{
  margin-right: 50px;
}
.right :last-child{
  margin-right: 0;
}
.foot:hover{
  cursor: default
}
</style>
