<template>
  <el-row :gutter="20">
    <el-col :span="18">
      <s2></s2>
    </el-col>
    <el-col :span="6">
      <sheet-label v-for="item in 6" :key="item" class="mb-20"></sheet-label>
    </el-col>
  </el-row>
</template>

<script setup>
import S2 from './components/S2.vue'
import SheetLabel from './components/SheetLabel.vue'
</script>

<style lang="scss" scoped>
.mb-20 {
  margin-bottom: 20px;
}
</style>
