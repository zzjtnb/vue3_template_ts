<script lang="ts" setup>
import {setI18nLanguage} from '@/plugins/i18n';
import useStore from '@/store';
const {user} = useStore();
function changeLanguage(value: string) {
  setI18nLanguage(value);
  user.locale = value;
}
// const locale = ref(i18n.global.locale);
//获取公用方法proxy.$axios，或者use中
// const {proxy} = getCurrentInstance() as any;
</script>

<template>
  <div class="language">
    <el-button type="primary" @click="changeLanguage('zh-CN')">简体中文</el-button>
    <el-button type="success" @click="changeLanguage('en-US')">English</el-button>
  </div>
</template>
