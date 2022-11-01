import {defineStore} from 'pinia';

export const useLocaleStore = defineStore('locale', {
  // a function that returns a fresh state
  state: () => ({
    locale: 'ja',
  }),
});
