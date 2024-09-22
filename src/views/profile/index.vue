<template>
  <el-pagination
    :page-size="100"
    layout="total, prev, pager,next"
    :total="1000"
  >
  </el-pagination>
  <el-row>
    <el-button>Default</el-button>
    <el-button type="primary">primary</el-button>
    <el-button type="success">success</el-button>
    <el-button type="info">info</el-button>
    <el-button type="warning">warning</el-button>
    <el-button type="danger">danger</el-button>
  </el-row>
</template>

<script setup>
import {} from 'vue'
</script>

<style lang="scss" scoped></style>
