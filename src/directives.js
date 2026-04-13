/*
 * @Author: 刘小二
 * @Date: 2021-07-15 14:43:27
 * @LastEditTime: 2021-07-15 15:00:27
 * @LastEditors: Please set LastEditors
 * @Description: 添加水印
 * @FilePath: /huashijc_MeetingSys/src/common/warterMark.js
 */
'use strict'


let watermark = {}

let setWatermark = (str) => {
    var date = new Date();
   var Y = date.getFullYear() + '-';
   var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
   var D = date.getDate() + ' ';
   var h = date.getHours() + ':';
   var m = date.getMinutes() + ':';
   var s = date.getSeconds();
    let id = '1.23452384164.123412415'

    if (document.getElementById(id) !== null) {
        document.body.removeChild(document.getElementById(id))
    }

    let can = document.createElement('canvas')
    can.width = 430
    can.height = 120

    let cans = can.getContext('2d')
    cans.rotate(-15 * Math.PI / 150)
    cans.font = '15px Vedana'
    cans.fillStyle = 'rgba(200, 200, 200, 0.4)'
    cans.textAlign = 'center'
    cans.textBaseline = 'Middle'
    cans.fillText(str, can.width / 6, can.height / 1)
    cans.fillText("\n" + Y + M + D + h + m + s,can.width / 8, can.height / 1.5);

    let div = document.createElement('div')
    div.id = id
    div.style.pointerEvents = 'none'
    div.style.top = '35px'
    div.style.left = '0px'
    div.style.position = 'fixed'
    div.style.zIndex = '100000'
    div.style.width = document.documentElement.clientWidth + 'px'
    div.style.height = document.documentElement.clientHeight + 'px'
    div.style.background = 'url(' + can.toDataURL('image/png') + ') left top repeat'
    document.body.appendChild(div)
    return id
}

// 该方法只允许调用一次
watermark.set = (str) => {
    let id = setWatermark(str)
    setInterval(() => {
        if (document.getElementById(id) === null) {
            id = setWatermark(str)
        }
    }, 500)
    window.onresize = () => {
        setWatermark(str)
    }
}

const outWatermark = (id) => {
    if (document.getElementById(id) !== null) {
        const div = document.getElementById(id)
        div.style.display = 'none'
    }
}
watermark.out = () => {
    const str = '1.23452384164.123412415'
    outWatermark(str)
}

export default watermark