export function isvalidPhone(str) {
    const reg = /^1[34578][0-9]\d{8}$/
    return reg.test(str)
}