<template>
  <!-- 搜索框 -->
  <div>
    <div class="block text-center">
      <el-carousel height="350px">
        <el-carousel-item v-for="item in 4" :key="item">
          <img src="../../assets/images/cca.jpg" alt="" class="coa" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="search">
      <el-autocomplete
        v-model="state1"
        :fetch-suggestions="querySearch"
        clearable
        class="inline-input"
        placeholder="请输入要查询的地点"
        @select="handleSelect"
      />
      <el-button type="primary">搜索</el-button>
    </div>
  </div>
  <!-- 医院 -->
  <div>
    <el-row>
      <el-col :span="18">
        <div>
          <h1 style="color: black; margin: 20px 0">医院</h1>
          <!-- 等级 -->
          <div class="hospital">
            <h1>等级:</h1>
            <ul style="display: flex">
              <li>全部</li>
              <li>三级甲等</li>
              <li>三级乙等</li>
              <li>二级甲等</li>
              <li>二级乙等</li>
              <li>一级</li>
            </ul>
          </div>
        </div>
        <!-- 地区 -->
        <div class="diqu">
          <h1 style="width: 60px; margin-top: 5px">地区:</h1>
          <ul style="display: flex; flex-wrap: wrap">
            <li>全部</li>
            <li>城东区</li>
            <li>城东区</li>
            <li>城东区</li>
            <li>城东区</li>
            <li>城东区</li>
            <li>城东区</li>
            <li>城东区</li>
            <li>城东区</li>
            <li>城东区</li>
            <li>城东区</li>
            <li>城东区</li>
            <li>城东区</li>
            <li>城东区</li>
            <li>城东区</li>
            <li>城东区</li>
            <li>城东区</li>
            <li>城东区</li>
          </ul>
        </div>
        <!-- 医院卡片 -->
        <div class="yy">
          <el-card shadow="hover" v-for="item in 10" :key="item" class="yyxq">
            <div class="yyxq-content">
              <div class="yyxq-left">
                <h1>北京大学国际医院</h1>
                <div class="yyxq-buttom"><span>二级乙等</span> <span>7.00放号</span></div>
              </div>
              <div class="yyxq-right"><img src="../../assets/images/logo.jpg" alt="" /></div>
            </div>
          </el-card>
        </div>
        <!-- 分页 -->
        <el-pagination
          v-model:current-page="currentPage4"
          v-model:page-size="pageSize4"
          :background="true"
          layout=" prev, pager, next, jumper,->, sizes,total"
          :total="40"
        />
      </el-col>
      <el-col :span="6">456</el-col>
    </el-row>
  </div>
</template>
<script setup></script>

<style scoped>
.el-input__inner {
  width: 400px;
}
.demonstration {
  color: var(--el-text-color-secondary);
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 350px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.coa {
  width: 1200px;
  height: 350px;
}
.search {
  width: 500px;
  height: 150px;
  justify-content: center;
  display: flex;
  align-items: center;
  margin: auto;
}
.hospital {
  display: flex;
  color: #7f7f7f;
  margin: 10px 0;
}
.hospital li {
  margin: 0 10px;
}
.hospital li:hover {
  color: aqua;
  cursor: pointer;
}

.diqu {
  color: #7f7f7f;
  display: flex;
  margin: 20px 0;
}
.diqu li {
  margin: 5px 10px;
}
.diqu li:hover {
  color: aqua;
  cursor: pointer;
}
.yy {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.yyxq {
  width: 48%;
  margin: 15px 0;
  cursor: pointer;
}
.yyxq-content {
  display: flex;
  justify-content: space-between;
}
.yyxq img {
  width: 50px;
  height: 50px;
}
.yyxq-buttom {
  margin-top: 15px;
  color: #7f7f7f;
}
.yyxq-buttom span {
  margin-right: 90px;
}
</style>
