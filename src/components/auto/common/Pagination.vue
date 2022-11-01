<script lang="ts" setup>
// const props = defineProps({
//   current: {
//     type: Number,
//     default: 1,
//   },
//   size: {
//     type: Number,
//     default: 10,
//   },
//   total: {
//     type: Number,
//     default: 20,
//   },
// });

// const emit = defineEmits(['sizeChange', 'currentChange']);

// const handleSizeChange = (val: number) => {
//   emit('sizeChange', val);
// };

// const handleCurrentChange = (val: number) => {
//   emit('currentChange', val);
// };
</script>

<template>
  <div class="demo-pagination-block">
    <!-- <el-pagination v-model:currentPage="props.current" :page-sizes="[10, 20, 30, 40]" :page-size="props.size" layout="total, sizes, prev, pager, next, jumper" :total="props.total" @size-change="handleSizeChange" @current-change="handleCurrentChange" /> -->
  </div>
</template>

<style lang="scss" scoped>
// :deep(.el-pagination__total) {
//   color: #bfc8cd;
// }

// :deep(.el-pagination__jump) {
//   color: #bfc8cd;
// }

// :deep(.el-pager li) {
//   margin: 0 1px;
//   background-color: #353f4b;
//   color: #bfc8cd;
// }

// :deep(.el-pagination button) {
//   background-color: #353f4b;
//   color: #bfc8cd;
// }

// :deep(.el-pager li.active) {
//   color: #fff;
// }
</style>
