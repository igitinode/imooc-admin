/**
 * 判断是否为外部资源
 * @param {String} path
 * 以这些开头的路径都是外部资源
 */
export function isExternal(path) {
  return /(https?:|mailto:|tel:)/.test(path)
}
