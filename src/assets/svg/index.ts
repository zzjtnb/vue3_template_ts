import {getName} from '@/utils/utils';
import type {App} from 'vue';
function init(app: App) {
  const modulesFiles: any = import.meta.glob('./**/*.svg', {eager: true});
  const result = Object.keys(modulesFiles).filter((item: any) => item == true);
  result.forEach((item: any) => {
    const moduleName = getName(item);
    const componentConfig = modulesFiles[item];
    app.component(moduleName, componentConfig.default || componentConfig);
  });
}
export default init;
