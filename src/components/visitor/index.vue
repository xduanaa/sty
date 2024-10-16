<template>
  <div class="text item">
    <div class="body_item">
      <div class="topcard_body_top">
        <div class="topcard_body_top_info">
          <div class="yb">{{ p.isInsure == 1 ? '医保' : '自费' }}</div>
          <div class="topcard_body_top_info_name">{{ p.name }}</div>
        </div>
        <div>
          <el-button type="primary" @click="hander" :icon="Edit" circle />
          <el-button
            type="danger"
            v-if="$route.path == '/user/patient'"
            :icon="Delete"
            circle
            class="topcard_body_top_updata"
            @click="$emit('getId')"
          />
        </div>
      </div>
      <div class="body_item_info">
        <ul class="topcard_body_info">
          <li>
            证件类型:<span>{{ p.param.certificatesTypeString }}</span>
          </li>
          <li>
            证件号码:<span>{{ p.certificatesNo }}</span>
          </li>
          <li>
            用户性别:<span>{{ p.sex === 1 ? '男' : '女' }}</span>
          </li>
          <li>
            出生日期:<span>{{ p.birthdate }}</span>
          </li>
          <li>
            手机号码:<span>{{ p.phone }}</span>
          </li>
          <li>
            婚姻状况:<span>{{ p.isMarry == 0 ? '未婚' : '已婚' }}</span>
          </li>
          <li>
            当前地址:<span
              >{{ p.param.provinceString }}{{ p.param.cityString
              }}{{ p.param.districtString }}</span
            >
          </li>
          <li>
            详细地址:<span>{{ p.param.fullAddress }}</span>
          </li>
        </ul>
        <div class="xz" v-if="props.patientId == p.id">已选择</div>
      </div>
      <div class="topcard_body_content"></div>
    </div>
  </div>
</template>

<script setup>
import { Edit, Delete } from '@element-plus/icons-vue'
import { useRoute,useRouter } from 'vue-router'
const $route = useRoute()
const $router=useRouter()
const props = defineProps(['p', 'patientId'])
let $emit = defineEmits(['changeSence', 'getId'])
// console.log(1111, props)
const hander = () => {
  if ($route.path == '/user/patient') {
    $emit('changeSence')
  } else {
  $router.push({path:'/user/patient',query:{type:'200',id:props.p.id}})
  }
}
</script>
<style scoped>
.topcard_body .item {
  margin: 10px;
  box-shadow: 1px 1px 5px #7f7f7f;
  width: 30%;
}
.topcard_body_top {
  background-color: #edebeb;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
}
.topcard_body_top_info {
  display: flex;
}
.yb {
  background-color: white;
  margin-left: 20px;
  font-size: 12px;
  /* padding: 2px; */
  line-height: 16px;
}
.topcard_body_top_info_name {
  color: #7f7f7f;
  font-size: 16px;
  list-style: 16px;
}
.topcard_body_top_updata {
  margin-right: 5px;
}
.topcard_body_info {
  display: flex;
  flex-direction: column;
}
.topcard_body_info li {
  font-size: 14px;
  margin-left: 20px;
  margin-top: 12px;
  color: black;
  line-height: 19px;
}
.topcard_body_info :last-child {
  margin-bottom: 12px;
}
.topcard_body_info span {
  color: #7f7f7f;
}
.body_item_info {
  position: relative;
}
.xz {
  position: absolute;
  left: 10%;
  top: 15%;
  color: red;
  font-size: 20px;
  font-weight: 900;
  width: 200px;
  height: 200px;
  border: 1px dotted red;
  border-radius: 50%;
  text-align: center;
  line-height: 200px;
  transform: rotate(25deg);
  opacity: 0.2;
}
</style>
