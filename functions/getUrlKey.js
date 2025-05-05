function getUrlKey(url){
    const arr = url.split('/')
    return arr.slice(-1)[0]
}
module.exports = getUrlKey