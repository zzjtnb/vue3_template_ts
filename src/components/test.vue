<script lang="ts" setup>
const props = defineProps({
  isShow: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
});
console.log(props.title);
// const {proxy} = getCurrentInstance() as any;
// function closeDialog() {
//   proxy.$emit('closeLive', false);
// }
// const emit = defineEmits(['closeLive']);
</script>
<template>
  <div v-drag="['.drag .el-dialog', '.drag .el-dialog__header']" class="drag">
    <!-- <el-dialog v-model="isShow" width="310px" center :modal="false" :close-on-click-modal="false" :title="title" @close="closeDialog">
      <slot></slot>
    </el-dialog> -->
  </div>
</template>
<style lang="scss" scoped>
@media screen and (min-width: 621px) {
  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
    border-radius: 5px;
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: #24262b;
    transition: 0.5s;
  }

  ::-webkit-scrollbar-button {
    display: none;
  }
}
</style>
