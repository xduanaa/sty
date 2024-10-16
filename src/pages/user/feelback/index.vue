<template>
  <div>
    <el-upload
      action="/api/oss/file/fileUpload?fileHost=12346"
      list-type="picture-card"
      auto-upload="false"
      :on-success="qq"
    >
    </el-upload>
  </div>
  <el-upload
    action="/api/oss/file/fileUpload?fileHost=456"
    list-type="picture-card"
    :limit="1"
    :on-exceed="ts"
    :on-success="handleSuccess"
    :on-preview="fd"
    ><img src="../../../assets/images/logo.jpg" alt="" width="145px" height="145px" />
  </el-upload>
</template>

<script setup>
const qq = () => {
  console.log(11111111)
}
const handleSuccess=()=>{
  console.log(1346579)
}
</script>

<style scoped></style>
