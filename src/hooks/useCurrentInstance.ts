// 添加 ComponentInternalInstance
import {type ComponentInternalInstance, getCurrentInstance} from 'vue';
export default function useCurrentInstance() {
  // 首先 此处 proxy ts会报
  // 类型“ComponentInternalInstance | null”上不存在属性“proxy”。ts(2339)
  // const {proxy} = getCurrentInstance();

  // 断言到 ComponentInternalInstance
  // const {proxy} = getCurrentInstance() as ComponentInternalInstance;
  const instance = getCurrentInstance() as any;
  const proxy = instance.proxy;
  return {proxy: proxy};
}
