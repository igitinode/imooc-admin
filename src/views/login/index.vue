<template>
  <div class="login-container">
    <el-form class="login-form">
      <div class="title-container">
        <h3 class="titile">用户登录</h3>
      </div>
      <!-- username -->
      <el-form-itme>
        <span class="svg-container">
          <el-icon>
            <avatar />
          </el-icon>
        </span>
        <el-input palceholder="username" name="username" type="text"></el-input>
      </el-form-itme>
      <!-- password -->
      <el-form-itme>
        <span class="svg-container">
          <el-icon>
            <avatar />
          </el-icon>
        </span>
        <el-input palceholder="password" name="password"></el-input>
        <span class="show-pwd">
          <el-icon>
            <avatar />
          </el-icon>
        </span>
      </el-form-itme>

      <!-- 登录按钮 -->
      <el-button type="primary" style="width: 100%; margin-bottom: 30px"
        >登录</el-button
      >
    </el-form>
  </div>
</template>

<script setup>
// 导入的组件可以世界使用
import { Avatar } from '@element-plus/icons'
import {} from 'vue'
</script>

<style lang="scss" scoped></style>
