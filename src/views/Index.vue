<script setup lang="ts">
import useStore from '@/store'
const { user } = useStore()
const list = computed(() => {
  return user.list
})

const showTip = function () {
  ElMessage({
    showClose: true,
    message: 'Congrats, this is a success message.',
    type: 'success',
  })
}

const { proxy } = useCurrentInstance()
function showProxyTip() {
  // console.log(proxy)
  proxy?.$message({
    showClose: true,
    message: 'Warning, this is a warning message.',
    type: 'success',
  })
}
</script>

<template>
  <div class="card">
    <el-row :gutter="24" style="margin: 20px;">
      <template v-for="(item, index) in list" :key="index">
        <el-col :xs="24" :sm="10" :md="10" :lg="6" :xl="6">
          <el-card shadow="hover">
            {{ item }}
          </el-card>
        </el-col>
      </template>
    </el-row>
    <div class="black" />
    <el-button type="primary" @click="showTip">
      提示
    </el-button>
    <el-button type="primary" @click="showProxyTip">
      proxy 提示
    </el-button>
    <router-link to="/test">
      测试
    </router-link>
    <div>
      <p>
        <span>图标 </span>
        <span>{prefix}-{collection}-{icon} 使用组件解析器时,您必须遵循名称转换才能正确推断图标</span>
      </p>
      <p>
        <span>Icon</span>
        <IconEpFold class="v-icon" />
      </p>
      <p>
        <span>icon-</span>
        <icon-ep:bell-filled class="v-icon" />
      </p>
      <p>
        <span> el-icon </span>
        <el-icon><IconNotoWrench /></el-icon>
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.black {
  width: 100px;
  height: 100px;
  background: $black;
}

.v-icon {
  display: inline-block;
  width: 1em;
  height: 1em;
  font-size: 1em;
}

.v-icon > svg {
  width: 100%;
  height: 100%;
}
</style>
