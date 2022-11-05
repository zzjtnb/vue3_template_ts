// 只获取文件名
export const getName = (path: string) => path.substring(path.lastIndexOf('/') + 1, path.lastIndexOf('.'))

/**
 * 获取指定范围内的随机数, decimalNum指小数保留多少位
 * @param maxNum
 * @param minNum
 * @param decimalNum
 * @returns
 */
export function randomNum(maxNum: number, minNum: number, decimalNum = 0): number {
  let [max, min] = [0, 0]
  if (minNum <= maxNum) {
    min = minNum
    max = maxNum
  }
  else {
    min = maxNum
    max = minNum
  }

  switch (arguments.length) {
    case 1:
      return Math.floor(Math.random() * (max + 1))
    case 2:
      return Math.floor(Math.random() * (max - min + 1) + min)
    case 3:
      return Number((Math.random() * (max - min) + min).toFixed(decimalNum))
    default:
      return Math.random()
  }
}
/**
 *格式化小数点,不足的补零
 * @param value 需要转换的数字
 * @param n 保留几位小数
 * @returns
 */
export function fomatFloat(value: number, n: number) {
  const f = Math.round(value * 10 ** n) / 10 ** n
  let s = f.toString()
  const rs = s.indexOf('.')
  if (rs < 0)
    s += '.'

  for (let i = s.length - s.indexOf('.'); i <= n; i++)
    s += '0'

  return s
}
