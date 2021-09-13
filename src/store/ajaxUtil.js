
module.exports = {
    post: (url, {data, params, pathData}) => {
        return window.$Ev.$ajax({
            url,
            method: 'POST',
            data,
            params,
            pathData,
        })
    },
    get: (url, {params, pathData}) => {
        return window.$Ev.$ajax({
            url,
            params,
            pathData,
        })
    }
}