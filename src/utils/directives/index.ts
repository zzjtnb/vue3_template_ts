import type {App} from 'vue';

import dialogDrag from './dialogDrag';
import inputDirective from './inputDirective';

export default {
  install(app: App) {
    const directives = [dialogDrag, inputDirective];
    directives.forEach((v) => {
      app.use(v);
    });
  },
};
