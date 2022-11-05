import { defineStore } from 'pinia'
import dayjs from 'dayjs'

const useCommonStore = defineStore({
  id: 'common',
  state: (): commonType => ({
    today: dayjs().format('YYYY-MM-DD'),
    week: dayjs().subtract(7, 'days').format('YYYY-MM-DD'),
    quarter: dayjs().subtract(90, 'days').format('YYYY-MM-DD'),
  }),
  actions: {},
})

export default useCommonStore
