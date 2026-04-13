import vue from "./../../main"

export let option = {
    grid: {
        left: '2%',
        right: '2%',
        bottom: '10%',
        top: '10%',
        containLabel: true
    },
    // color: ['rgb(80,135,236)', 'rgb(104,187,196)', 'rgb(254,25,100)'],
	
    title: { 
        text: ``,
        textStyle: {
            color:'white'
        }
     },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross'
        }
    },

    legend: {
        textStyle: {color:'#999999'},
        data: ['累计放款金额（万）', '在贷余额（万）', '放款金额（万）'],
        bottom: '0px'
    },

    series: [
        {
            name: '累计放款金额（万）',
            type: 'line',
            data: [],
            // color: '#EE4982'
        },

        {
            name: '在贷余额（万）',
            type: 'line',
            data: [],
            // color: "#3E83FF"
        },

        {
            name: '放款金额（万）',
            type: 'bar',
            data: [],
            yAxisIndex: 1,
            // color: '#EE4982'
        }
    ],
    xAxis: [
        {
            axisLabel: {
                interval: 0,
                formatter: function (value) {
                    let val = value.substring(0, 4) + '\n' + value.substring(4, 5) + '\n' + value.substring(5, 15);
                    // console.log( val);
                    return val;
                }
            },
            type: 'category',
            data: [],
            axisPointer: {
                type: 'shadow'
            }
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '金额(万)',
            min: 0,

            // interval: 0,
            axisLabel: {
                formatter: '{value}'
            }
        },
        {
            type: 'value',
            name: '金额(万)',
            min: 0,

            interval: 0,
            axisLabel: {
                formatter: '{value}'
            }
        },

    ]
}

export let option2 = {
    grid: {
        left: '2%',
        right: '2%',
        bottom: '10%',
        top: '10%',
        containLabel: true
    },
    // color: ['rgb(80,135,236)', 'rgb(104,187,196)'],
    title: { 
        text: ``,
        textStyle: {
            color:'white'
        }, 
    },
    
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross'
        }
    },

    legend: {
        textStyle: {color:'#999999'},
        data: ['累计放款用户数', '累计放款店铺数'],
        bottom: '0px'
    },
    series: [
        {
            name: '累计放款用户数',
            type: 'line',
            data: [],
            // color: '#FFB811'
        },

        {
            name: '累计放款店铺数',
            type: 'line',
            data: [],
            // color: '#EE4982 '
        }
    ],
    xAxis: [
        {
            axisLabel: {
                interval: 0,
                formatter: function (value) {
                    let val = value.substring(0, 4) + '\n' + value.substring(4, 5) + '\n' + value.substring(5, 15);
                    // console.log( val);
                    return val;
                }
            },
            type: 'category',
            data: [],
            axisPointer: {
                type: 'shadow'
            }
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '数量',
            min: 0,

            // interval: 5,
            axisLabel: {
                formatter: '{value}'
            }
        },

    ]
}

export let option3 = {
    grid: {
        left: '10%',
        bottom: '0%',
        containLabel: true
    },
    title: {
        text: '资金方分布-累计放款金额（万元）',
        left: 'left'
    },
    tooltip: {
        trigger: 'item',
        formatter: function (datas) {
            // console.log(datas)
            var res =
                datas.data.name +
                '&nbsp;' +
                datas.data.value +
                '万元，' +
                '&nbsp;' +
                '&nbsp;' +
                '占比：' +
                datas.percent +
                '%';
            return res;
        }
    },
    legend: {
        data: []
    },
    series: [
        {
            name: '',
            type: 'pie',
            radius: '65%',
            // center: ['47%', '47%'],
            data: [],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
}

export let option4Pie = {
    color: ['#EE4982', '#FF7171', '#FFB929', '#FFDB4B', '#A3EA3C', '#3CE58C', '#09CFAB', '#3ED3FF', '#3E83FF', '#4764E4', '#9E88F0', '#9560E3'],
    tooltip: {
        trigger: 'item',
        formatter: function (params) {
            return `<div class="label-item" >
            <div class="top" style=' display: flex;align-items: center; font-family: PingFangSC-Regular;font-size: 14px;color: #969799;font-weight: 400;margin-bottom: 7px;'>
                <div class="block" style='width: 8px;height: 8px;background: ${params.color};margin-right: 9px;'></div>
                ${params.name}
            </div>
            <div class="bottom" style='font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #323232;
            font-weight: 400;
            padding-left: 15px;'> 
                <span style='padding-right:12px'>${Number(params.value).toLocaleString()}万</span>
                <span>占比 ${params.data.scale}%</span>
            </div>
        </div>`
        }
    },
    series: [
        {

            type: 'pie',

            radius: [105, 170],
            center: ['47%', '37%'],
            avoidLabelOverlap: true,


            data: [

            ]
        }
    ]
};
export let option4 = {
    grid: {
        left: '2%',
        right: '2%',
        bottom: '10%',
        top: '7%',
        containLabel: true
    },
    color: ['#EE4982', '#FF7171', '#FFB929', '#FFDB4B', '#A3EA3C', '#3CE58C', '#09CFAB', '#3ED3FF', '#3E83FF', '#4764E4', '#9E88F0', '#9560E3'],
    // title: { text: '资金方趋势图-累计放款金额', },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },

    legend: {
        data: [],
        bottom: '0px'
    },
    series: [



    ],
    xAxis: [
        {
            axisLabel: {
                // interval: 0,
                formatter: function (value) {
                    let val = value.substring(0, 4) + '\n' + value.substring(4, 5) + '\n' + value.substring(5, 15);
                    // console.log( val);
                    return val;
                }
            },
            type: 'category',
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],

        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '金额（万）',
            min: 0,

            // interval: 5,
            axisLabel: {
                formatter: '{value}'
            }
        },
    ]
}


export let option5 = {
    grid: {
        left: '10%',
        bottom: '0%',
        containLabel: true
    },
    title: {
        text: '产品分布-累计放款金额（万元）',
        left: 'left'
    },
    tooltip: {
        trigger: 'item',
        formatter: function (datas) {
            var res =
                datas.data.name +
                '&nbsp;' +
                datas.data.value +
                '万元，' +
                '&nbsp;' +
                '&nbsp;' +
                '占比：' +
                datas.percent +
                '%';
            return res;
        }
    },
    legend: {
        data: []
    },
    series: [
        {
            name: '',
            type: 'pie',
            radius: '65%',
            // center: ['47%', '47%'],
            data: [],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
}

export let option6Pie = {
    color: ['#EE4982', '#FF7171', '#FFB929', '#FFDB4B', '#A3EA3C', '#3CE58C', '#09CFAB', '#3ED3FF', '#3E83FF', '#4764E4', '#9E88F0', '#9560E3'],
    tooltip: {
        trigger: 'item',
        formatter: function (params) {

            return `<div class="label-item" >
            <div class="top" style=' display: flex;align-items: center; font-family: PingFangSC-Regular;font-size: 14px;color: #969799;font-weight: 400;margin-bottom: 7px;'>
                <div class="block" style='width: 8px;height: 8px;background: ${params.color};margin-right: 9px;'></div>
                ${params.name}
            </div>
            <div class="bottom" style='font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #323232;
            font-weight: 400;
            padding-left: 15px;'> 
                <span style='padding-right:12px'>${Number(params.value).toLocaleString()}万</span>
                <span>占比 ${params.data.scale}%</span>
            </div>
        </div>`
        }
    },
    series: [
        {

            type: 'pie',

            radius: [105, 170],
            center: ['47%', '38%'],
            avoidLabelOverlap: true,


            data: [

            ]
        }
    ]
};
export let option6 = {
    grid: {
        left: '2%',
        right: '2%',
        bottom: '10%',
        top: '7%',
        containLabel: true
    },
    color: ['#EE4982', '#FF7171', '#FFB929', '#FFDB4B', '#A3EA3C', '#3CE58C', '#09CFAB', '#3ED3FF', '#3E83FF', '#4764E4', '#9E88F0', '#9560E3'],
    // title: { text: '', },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },

    legend: {
        data: [],
        bottom: '0px'
    },
    series: [



    ],
    xAxis: [
        {
            axisLabel: {
                // interval: 0,
                formatter: function (value) {
                    let val = value.substring(0, 4) + '\n' + value.substring(4, 5) + '\n' + value.substring(5, 15);
                    // console.log( val);
                    return val;
                }
            },
            type: 'category',
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            axisPointer: {
                type: 'shadow'
            }
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '金额（万）',
            min: 0,

            // interval: 5,
            axisLabel: {
                formatter: '{value}'
            }
        },
    ]
}


export let option7 = {
    grid: {
        left: '10%',
        bottom: '0%',
        containLabel: true
    },
    title: {
        text: '支付公司分布-累计放款店铺数',
        left: 'left'
    },
    tooltip: {
        trigger: 'item',
        formatter: function (datas) {
            var res =
                datas.data.name +
                '&nbsp;' +
                datas.data.value +
                '，' +
                '&nbsp;' +
                '&nbsp;' +
                '占比：' +
                datas.percent +
                '%';
            return res;
        }
    },
    legend: {
        data: []
    },
    series: [
        {
            name: '',
            type: 'pie',
            radius: '65%',
            // center: ['47%', '47%'],
            data: [],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
}


export let option8 = {
    grid: {
        left: '0%',
        right: '2%',
        bottom: '0%',
        top: '28%',
        containLabel: true
    },

    title: { text: '支付公司趋势图-放款店铺数', },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross'
        }
    },

    legend: {
        data: [],
        top: '30px'
    },
    series: [



    ],
    xAxis: [
        {
            axisLabel: {
                // interval: 0,
                formatter: function (value) {
                    let val = value.substring(0, 4) + '\n' + value.substring(4, 5) + '\n' + value.substring(5, 15);
                    // console.log( val);
                    return val;
                }
            },
            type: 'category',
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            axisPointer: {
                type: 'shadow'
            }
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '店铺数',
            min: 0,

            // interval: 5,
            axisLabel: {
                formatter: '{value}'
            }
        },
    ]
}


export let option9 = {
    grid: {
        left: '2%',
        right: '2%',
        bottom: '0%',
        top: '10%',
        containLabel: true
    },

    title: { text: '授信店铺近12个月累计销售金额&回款金额趋势图', },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross'
        }
    },
    legend: {},
    dataset: {
        source: [
            ['product', '2015', '2016', '2017'],
            ['Matcha Latte', 43.3, 85.8, 93.7],
            ['Milk Tea', 83.1, 73.4, 55.1],
            ['Cheese Cocoa', 86.4, 65.2, 82.5],
            ['Walnut Brownie', 72.4, 53.9, 39.1]
        ]
    },
    xAxis: { type: 'category' },
    yAxis: {},
    // Declare several bar series, each will be mapped
    // to a column of dataset.source by default.
    series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }]
};




export let option10 = {
    grid: {
        left: '10%',
        bottom: '0%',
        containLabel: true
    },
    title: {
        text: '累计放款金额-平台分布',
        left: 'left'
    },
    tooltip: {
        trigger: 'item',
        formatter: function (datas) {
            var res =
                datas.data.name +
                '&nbsp;' +
                datas.data.value +
                '万元，' +
                '&nbsp;' +
                '&nbsp;' +
                '占比：' +
                datas.percent +
                '%';
            return res;
        }
    },
    legend: {
        data: []
    },
    series: [
        {
            name: '',
            type: 'pie',
            radius: '65%',
            // center: ['47%', '47%'],
            data: [],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
}

export let option11 = {
    grid: {
        left: '10%',
        bottom: '0%',
        containLabel: true
    },
    title: {
        text: '累计放款金额-国家分布',
        left: 'left'
    },
    tooltip: {
        trigger: 'item',
        formatter: function (datas) {
            var res =
                datas.data.name +
                '&nbsp;' +
                datas.data.value +
                '万元，' +
                '&nbsp;' +
                '&nbsp;' +
                '占比：' +
                datas.percent +
                '%';
            return res;
        }
    },
    legend: {
        data: []
    },
    series: [
        {
            name: '',
            type: 'pie',
            radius: '65%',
            // center: ['47%', '47%'],
            data: [],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
}



export let option12Pie = {
    color: ['#EE4982', '#FF7171', '#FFB929', '#FFDB4B', '#A3EA3C', '#3CE58C', '#09CFAB', '#3ED3FF', '#3E83FF', '#4764E4', '#9E88F0', '#9560E3'],
    tooltip: {
        trigger: 'item',
        formatter: function (params) {
            return `<div class="label-item" >
            <div class="top" style=' display: flex;align-items: center; font-family: PingFangSC-Regular;font-size: 14px;color: #969799;font-weight: 400;margin-bottom: 7px;'>
                <div class="block" style='width: 8px;height: 8px;background: ${params.color};margin-right: 9px;'></div>
                ${params.name}
            </div>
            <div class="bottom" style='font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #323232;
            font-weight: 400;
            padding-left: 15px;'> 
                <span style='padding-right:12px'>${Number(params.value).toLocaleString()}万</span>
                <span>占比 ${params.data.scale}%</span>
            </div>
        </div>`
        }
    },
    series: [
        {

            type: 'pie',

            radius: [105, 170],
            center: ['47%', '38%'],
            avoidLabelOverlap: true,


            data: [

            ]
        }
    ]
};
export let option12 = {
    grid: {
        left: '2%',
        right: '2%',
        bottom: '10%',
        top: '7%',
        containLabel: true
    },
    color: ['#EE4982', '#FF7171', '#FFB929', '#FFDB4B', '#A3EA3C', '#3CE58C', '#09CFAB', '#3ED3FF', '#3E83FF', '#4764E4', '#9E88F0', '#9560E3'],
    // title: { text: '资金方趋势图-累计放款金额', },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },

    legend: {
        data: [],
        bottom: '0px'
    },
    series: [



    ],
    xAxis: [
        {
            axisLabel: {
                // interval: 0,
                formatter: function (value) {
                    let val = value.substring(0, 4) + '\n' + value.substring(4, 5) + '\n' + value.substring(5, 15);
                    // console.log( val);
                    return val;
                }
            },
            type: 'category',
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],

        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '金额（万）',
            min: 0,

            // interval: 5,
            axisLabel: {
                formatter: '{value}'
            }
        },
    ]
}
export let option13Pie = {
    color: ['#EE4982', '#FF7171', '#FFB929', '#FFDB4B', '#A3EA3C', '#3CE58C', '#09CFAB', '#3ED3FF', '#3E83FF', '#4764E4', '#9E88F0', '#9560E3'],
    tooltip: {
        trigger: 'item',
        formatter: function (params) {
            return `<div class="label-item" >
            <div class="top" style=' display: flex;align-items: center; font-family: PingFangSC-Regular;font-size: 14px;color: #969799;font-weight: 400;margin-bottom: 7px;'>
                <div class="block" style='width: 8px;height: 8px;background: ${params.color};margin-right: 9px;'></div>
                ${params.name}
            </div>
            <div class="bottom" style='font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #323232;
            font-weight: 400;
            padding-left: 15px;'> 
                <span style='padding-right:12px'>${Number(params.value).toLocaleString()}万</span>
                <span>占比 ${params.data.scale}%</span>
            </div>
        </div>`
        }
    },
    series: [
        {

            type: 'pie',

            radius: [105, 170],
            center: ['47%', '38%'],
            avoidLabelOverlap: true,


            data: [

            ]
        }
    ]
};
export let option13 = {
    grid: {
        left: '2%',
        right: '2%',
        bottom: '10%',
        top: '7%',
        containLabel: true
    },
    color: ['#EE4982', '#FF7171', '#FFB929', '#FFDB4B', '#A3EA3C', '#3CE58C', '#09CFAB', '#3ED3FF', '#3E83FF', '#4764E4', '#9E88F0', '#9560E3'],
    // title: { text: '资金方趋势图-累计放款金额', },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },

    legend: {
        data: [],
        bottom: '0px'
    },
    series: [



    ],
    xAxis: [
        {
            axisLabel: {
                // interval: 0,
                formatter: function (value) {
                    let val = value.substring(0, 4) + '\n' + value.substring(4, 5) + '\n' + value.substring(5, 15);
                    // console.log( val);
                    return val;
                }
            },
            type: 'category',
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],

        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '金额（万）',
            min: 0,

            // interval: 5,
            axisLabel: {
                formatter: '{value}'
            }
        },
    ]
}


export let option14Pie = {
    color: ['#EE4982', '#FF7171', '#FFB929', '#FFDB4B', '#A3EA3C', '#3CE58C', '#09CFAB', '#3ED3FF', '#3E83FF', '#4764E4', '#9E88F0', '#9560E3'],
    tooltip: {
        trigger: 'item',
        formatter: function (params) {
            return `<div class="label-item" >
            <div class="top" style=' display: flex;align-items: center; font-family: PingFangSC-Regular;font-size: 14px;color: #969799;font-weight: 400;margin-bottom: 7px;'>
                <div class="block" style='width: 8px;height: 8px;background: ${params.color};margin-right: 9px;'></div>
                ${params.name}
            </div>
            <div class="bottom" style='font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #323232;
            font-weight: 400;
            padding-left: 15px;'> 
                <span style='padding-right:12px'>${Number(params.value).toLocaleString()}万</span>
                <span>占比 ${params.data.scale}%</span>
            </div>
        </div>`
        }
    },
    series: [
        {

            type: 'pie',

            radius: [105, 170],
            center: ['47%', '38%'],
            avoidLabelOverlap: true,


            data: [

            ]
        }
    ]
};
export let option14 = {
    grid: {
        left: '2%',
        right: '2%',
        bottom: '10%',
        top: '7%',
        containLabel: true
    },
    color: ['#EE4982', '#FF7171', '#FFB929', '#FFDB4B', '#A3EA3C', '#3CE58C', '#09CFAB', '#3ED3FF', '#3E83FF', '#4764E4', '#9E88F0', '#9560E3'],
    // title: { text: '资金方趋势图-累计放款金额', },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },

    legend: {
        data: [],
        bottom: '0px'
    },
    series: [



    ],
    xAxis: [
        {
            axisLabel: {
                // interval: 0,
                formatter: function (value) {
                    let val = value.substring(0, 4) + '\n' + value.substring(4, 5) + '\n' + value.substring(5, 15);
                    // console.log( val);
                    return val;
                }
            },
            type: 'category',
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],

        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '金额（万）',
            min: 0,

            // interval: 5,
            axisLabel: {
                formatter: '{value}'
            }
        },
    ]
}



export let option15Pie = {
    color: ['#EE4982', '#FF7171', '#FFB929', '#FFDB4B', '#A3EA3C', '#3CE58C', '#09CFAB', '#3ED3FF', '#3E83FF', '#4764E4', '#9E88F0', '#9560E3'],
    tooltip: {
        trigger: 'item',
        formatter: function (params) {
            return `<div class="label-item" >
            <div class="top" style=' display: flex;align-items: center; font-family: PingFangSC-Regular;font-size: 14px;color: #969799;font-weight: 400;margin-bottom: 7px;'>
                <div class="block" style='width: 8px;height: 8px;background: ${params.color};margin-right: 9px;'></div>
                ${params.name}
            </div>
            <div class="bottom" style='font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #323232;
            font-weight: 400;
            padding-left: 15px;'> 
                <span style='padding-right:12px'>${Number(params.value).toLocaleString()}万</span>
                <span>占比 ${params.data.scale}%</span>
            </div>
        </div>`
        }
    },
    series: [
        {

            type: 'pie',

            radius: [105, 170],
            center: ['47%', '38%'],
            avoidLabelOverlap: true,


            data: [

            ]
        }
    ]
};
export let option15 = {
    grid: {
        left: '2%',
        right: '2%',
        bottom: '10%',
        top: '7%',
        containLabel: true
    },
    color: ['#EE4982', '#FF7171', '#FFB929', '#FFDB4B', '#A3EA3C', '#3CE58C', '#09CFAB', '#3ED3FF', '#3E83FF', '#4764E4', '#9E88F0', '#9560E3'],
    // title: { text: '资金方趋势图-累计放款金额', },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },

    legend: {
        data: [],
        bottom: '0px'
    },
    series: [



    ],
    xAxis: [
        {
            axisLabel: {
                // interval: 0,
                formatter: function (value) {
                    let val = value.substring(0, 4) + '\n' + value.substring(4, 5) + '\n' + value.substring(5, 15);
                    // console.log( val);
                    return val;
                }
            },
            type: 'category',
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],

        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '金额（万）',
            min: 0,

            // interval: 5,
            axisLabel: {
                formatter: '{value}'
            }
        },
    ]
}


export let option16Pie = {
    color: ['#EE4982', '#FF7171', '#FFB929', '#FFDB4B', '#A3EA3C', '#3CE58C', '#09CFAB', '#3ED3FF', '#3E83FF', '#4764E4', '#9E88F0', '#9560E3'],
    tooltip: {
        trigger: 'item',
        formatter: function (params) {
            return `<div class="label-item" >
            <div class="top" style=' display: flex;align-items: center; font-family: PingFangSC-Regular;font-size: 14px;color: #969799;font-weight: 400;margin-bottom: 7px;'>
                <div class="block" style='width: 8px;height: 8px;background: ${params.color};margin-right: 9px;'></div>
                ${params.name}
            </div>
            <div class="bottom" style='font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #323232;
            font-weight: 400;
            padding-left: 15px;'> 
                <span style='padding-right:12px'>${Number(params.value).toLocaleString()}笔</span>
                <span>占比 ${params.data.scale}%</span>
            </div>
        </div>`
        }
    },
    series: [
        {

            type: 'pie',

            radius: [105, 170],
            center: ['47%', '38%'],
            avoidLabelOverlap: true,


            data: [

            ]
        }
    ]
};
export let option16 = {
    grid: {
        left: '2%',
        right: '2%',
        bottom: '10%',
        top: '7%',
        containLabel: true
    },
    color: ['#EE4982', '#FF7171', '#FFB929', '#FFDB4B', '#A3EA3C', '#3CE58C', '#09CFAB', '#3ED3FF', '#3E83FF', '#4764E4', '#9E88F0', '#9560E3'],
    // title: { text: '资金方趋势图-累计放款金额', },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },

    legend: {
        data: [],
        bottom: '0px'
    },
    series: [



    ],
    xAxis: [
        {
            axisLabel: {
                // interval: 0,
                formatter: function (value) {
                    let val = value.substring(0, 4) + '\n' + value.substring(4, 5) + '\n' + value.substring(5, 15);
                    // console.log( val);
                    return val;
                }
            },
            type: 'category',
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],

        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '笔数',
            min: 0,

            // interval: 5,
            axisLabel: {
                formatter: '{value}'
            }
        },
    ]
}

export let option17Pie = {
    color: ['#EE4982', '#FF7171', '#FFB929', '#FFDB4B', '#A3EA3C', '#3CE58C', '#09CFAB', '#3ED3FF', '#3E83FF', '#4764E4', '#9E88F0', '#9560E3'],
    tooltip: {
        trigger: 'item',
        formatter: function (params) {
            return `<div class="label-item" >
            <div class="top" style=' display: flex;align-items: center; font-family: PingFangSC-Regular;font-size: 14px;color: #969799;font-weight: 400;margin-bottom: 7px;'>
                <div class="block" style='width: 8px;height: 8px;background: ${params.color};margin-right: 9px;'></div>
                ${params.name}
            </div>
            <div class="bottom" style='font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #323232;
            font-weight: 400;
            padding-left: 15px;'> 
                <span style='padding-right:12px'>${Number(params.value).toLocaleString()}笔</span>
                <span>占比 ${params.data.scale}%</span>
            </div>
        </div>`
        }
    },
    series: [
        {

            type: 'pie',

            radius: [105, 170],
            center: ['47%', '38%'],
            avoidLabelOverlap: true,


            data: [

            ]
        }
    ]
};
export let option17 = {
    grid: {
        left: '2%',
        right: '2%',
        bottom: '10%',
        top: '7%',
        containLabel: true
    },
    color: ['#EE4982', '#FF7171', '#FFB929', '#FFDB4B', '#A3EA3C', '#3CE58C', '#09CFAB', '#3ED3FF', '#3E83FF', '#4764E4', '#9E88F0', '#9560E3'],
    // title: { text: '资金方趋势图-累计放款金额', },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },

    legend: {
        data: [],
        bottom: '0px'
    },
    series: [



    ],
    xAxis: [
        {
            axisLabel: {
                // interval: 0,
                formatter: function (value) {
                    let val = value.substring(0, 4) + '\n' + value.substring(4, 5) + '\n' + value.substring(5, 15);
                    // console.log( val);
                    return val;
                }
            },
            type: 'category',
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],

        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '笔数',
            min: 0,

            // interval: 5,
            axisLabel: {
                formatter: '{value}'
            }
        },
    ]
}

export let option18Pie = {
    color: ['#EE4982', '#FF7171', '#FFB929', '#FFDB4B', '#A3EA3C', '#3CE58C', '#09CFAB', '#3ED3FF', '#3E83FF', '#4764E4', '#9E88F0', '#9560E3'],
    tooltip: {
        trigger: 'item',
        formatter: function (params) {
            return `<div class="label-item" >
            <div class="top" style=' display: flex;align-items: center; font-family: PingFangSC-Regular;font-size: 14px;color: #969799;font-weight: 400;margin-bottom: 7px;'>
                <div class="block" style='width: 8px;height: 8px;background: ${params.color};margin-right: 9px;'></div>
                ${params.name}
            </div>
            <div class="bottom" style='font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #323232;
            font-weight: 400;
            padding-left: 15px;'> 
                <span style='padding-right:12px'>${Number(params.value).toLocaleString()}笔</span>
                <span>占比 ${params.data.scale}%</span>
            </div>
        </div>`
        }
    },
    series: [
        {

            type: 'pie',

            radius: [105, 170],
            center: ['47%', '38%'],
            avoidLabelOverlap: true,


            data: [

            ]
        }
    ]
};
export let option18 = {
    grid: {
        left: '2%',
        right: '2%',
        bottom: '10%',
        top: '7%',
        containLabel: true
    },
    color: ['#EE4982', '#FF7171', '#FFB929', '#FFDB4B', '#A3EA3C', '#3CE58C', '#09CFAB', '#3ED3FF', '#3E83FF', '#4764E4', '#9E88F0', '#9560E3'],
    // title: { text: '资金方趋势图-累计放款金额', },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },

    legend: {
        data: [],
        bottom: '0px'
    },
    series: [



    ],
    xAxis: [
        {
            axisLabel: {
                // interval: 0,
                formatter: function (value) {
                    let val = value.substring(0, 4) + '\n' + value.substring(4, 5) + '\n' + value.substring(5, 15);
                    // console.log( val);
                    return val;
                }
            },
            type: 'category',
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],

        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '笔数',
            min: 0,

            // interval: 5,
            axisLabel: {
                formatter: '{value}'
            }
        },
    ]
}


export let detailOption1 = {
    grid: {
        top: '20%',
        left: '3%',
        right: '3%',
        bottom: '0%',
        containLabel: true
    },
    title: { text: '资金分布-授信金额' },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross'
        }
    },

    legend: {
        data: [],
        top: '30px'
    },
    series: [

    ],
    xAxis: [
        {
            axisLabel: {
                interval: 0,
                formatter: function (value) {
                    let val = value.substring(0, 4) + '\n' + value.substring(4, 5) + '\n' + value.substring(5, 15);
                    // console.log( val);
                    return val;
                }
            },
            type: 'category',
            data: [],
            axisPointer: {
                type: 'shadow'
            }
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '金额(万)',
            min: 0,

            // interval: 5,
            axisLabel: {
                formatter: '{value}'
            }
        },
    ]
}





export let detailOption2 = {
    grid: {
        top: '20%',
        left: '3%',
        right: '3%',
        bottom: '0%',
        containLabel: true
    },
    title: { text: '产品分布-授信金额' },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross'
        }
    },

    legend: {
        data: [],
        top: '30px'
    },
    series: [

    ],
    xAxis: [
        {
            axisLabel: {
                interval: 0,
                formatter: function (value) {
                    let val = value.substring(0, 4) + '\n' + value.substring(4, 5) + '\n' + value.substring(5, 15);
                    // console.log( val);
                    return val;
                }
            },
            type: 'category',
            data: [],
            axisPointer: {
                type: 'shadow'
            }
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '金额(万)',
            min: 0,

            // interval: 5,
            axisLabel: {
                formatter: '{value}'
            }
        },
    ]
}



export let detailOption3 = {
    grid: {
        top: '20%',
        left: '3%',
        right: '3%',
        bottom: '0%',
        containLabel: true
    },
    title: { text: '资金分布-放款金额' },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross'
        }
    },

    legend: {
        data: [],
        top: '30px'
    },
    series: [

    ],
    xAxis: [
        {
            axisLabel: {
                interval: 0,
                formatter: function (value) {
                    let val = value.substring(0, 4) + '\n' + value.substring(4, 5) + '\n' + value.substring(5, 15);
                    // console.log( val);
                    return val;
                }
            },
            type: 'category',
            data: [],
            axisPointer: {
                type: 'shadow'
            }
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '金额(万)',
            min: 0,

            // interval: 5,
            axisLabel: {
                formatter: '{value}'
            }
        },
    ]
}





export let detailOption4 = {
    grid: {
        top: '20%',
        left: '3%',
        right: '3%',
        bottom: '0%',
        containLabel: true
    },
    title: { text: '产品分布-放款金额' },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross'
        }
    },

    legend: {
        data: [],
        top: '30px'
    },
    series: [

    ],
    xAxis: [
        {
            axisLabel: {
                interval: 0,
                formatter: function (value) {
                    let val = value.substring(0, 4) + '\n' + value.substring(4, 5) + '\n' + value.substring(5, 15);
                    // console.log( val);
                    return val;
                }
            },
            type: 'category',
            data: [],
            axisPointer: {
                type: 'shadow'
            }
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '金额(万)',
            min: 0,

            // interval: 5,
            axisLabel: {
                formatter: '{value}'
            }
        },
    ]
}


export let detailOption5 = {
    grid: {
        left: '2%',
        right: '2%',
        bottom: '10%',
        top: '7%',
        containLabel: true
    },

    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross'
        }
    },

    legend: {
        show: true,
        data: ['注册用户数', '授信用户数', '放款用户数', '授信转化率', '放款转化率',],
        bottom: '0px'
    },
    series: [
        {
            name: '注册用户数',
            type: 'bar',
            // color: '#3E83FF',
            data: []
        },
        {
            name: '授信用户数',
            type: 'bar',
            data: [],
            // color: '#FFB929'
        },
        {
            name: '放款用户数',
            type: 'bar',
            data: [],
            // color: '#09CFAB'
        },
        {
            name: '授信转化率',
            type: 'line',
            yAxisIndex: 1,
            // color: '#EE4982',
            data: []
        },
        {
            name: '放款转化率',
            type: 'line',
            yAxisIndex: 1,
            // color: '#9560E3',
            data: []
        },
    ],
    xAxis: [
        {
            axisLabel: {
                interval: 0,
                formatter: function (value) {
                    let val = value.substring(0, 4) + '\n' + value.substring(4, 5) + '\n' + value.substring(5, 15);
                    // console.log( val);
                    return val;
                }
            },
            type: 'category',
            data: [],
            axisPointer: {
                type: 'shadow'
            }
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '用户数',
            min: 0,

            // interval: 5,
            axisLabel: {
                formatter: '{value}'
            }
        },
        {
            type: 'value',
            name: '转化率',
            min: 0,

            // interval: 5,
            axisLabel: {
                formatter: '{value}'
            }
        },
    ]
}


export let detailOption6 = {
    grid: {
        left: '2%',
        right: '2%',
        bottom: '10%',
        top: '7%',
        containLabel: true
    },

    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross'
        }
    },

    legend: {
        data: ['授权店铺数', '授信店铺数', '放款店铺数', '授信转化率', '放款转化率'],
        bottom: '0px'
    },
    series: [
        {
            name: '授权店铺数',
            type: 'bar',
            data: [],
            // color: '#09CFAB',
        },
        {
            name: '授信店铺数',
            type: 'bar',
            data: [],
            // color: '#FFB929'
        },
        {
            name: '放款店铺数',
            type: 'bar',
            data: [],
            // color: '#EE4982'
        },
        {
            name: '授信转化率',
            type: 'line',
            yAxisIndex: 1,
            data: [],
            // color: '#3E83FF'
        },
        {
            name: '放款转化率',
            type: 'line',
            yAxisIndex: 1,
            data: [],
            // color: '#9560E3',
        },
    ],
    xAxis: [
        {
            axisLabel: {
                interval: 0,
                formatter: function (value) {
                    let val = value.substring(0, 4) + '\n' + value.substring(4, 5) + '\n' + value.substring(5, 15);
                    // console.log( val);
                    return val;
                }
            },
            type: 'category',
            data: [],
            axisPointer: {
                type: 'shadow'
            }
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '店铺数',
            min: 0,

            // interval: 5,
            axisLabel: {
                formatter: '{value}'
            }
        },
        {
            type: 'value',
            name: '转化率',
            min: 0,

            // interval: 5,
            axisLabel: {
                formatter: '{value}'
            }
        },
    ]
}



export let detailOption7 = {
    grid: {
        top: '20%',
        left: '3%',
        right: '3%',
        bottom: '0%',
        containLabel: true
    },
    title: { text: '支付公司分布-放款店铺数' },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross'
        }
    },

    legend: {
        data: [],
        top: '30px'
    },
    series: [

    ],
    xAxis: [
        {
            axisLabel: {
                interval: 0,
                formatter: function (value) {
                    let val = value.substring(0, 4) + '\n' + value.substring(4, 5) + '\n' + value.substring(5, 15);
                    // console.log( val);
                    return val;
                }
            },
            type: 'category',
            data: [],
            axisPointer: {
                type: 'shadow'
            }
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '金额(万)',
            min: 0,

            // interval: 5,
            axisLabel: {
                formatter: '{value}'
            }
        },
    ]
}

export let detailOption8 = {
    grid: {
        top: '20%',
        left: '3%',
        right: '3%',
        bottom: '0%',
        containLabel: true
    },
    title: { text: '店铺数' },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross'
        }
    },

    legend: {
        data: ['授权店铺数', '授信店铺数', '放款店铺数', '授信转化率', '放款转化率'],
        top: '30px'
    },
    series: [
        {
            name: '授权店铺数',
            type: 'bar',
            data: []
        },
        {
            name: '授信店铺数',
            type: 'bar',
            data: []
        },
        {
            name: '放款店铺数',
            type: 'bar',
            data: []
        },
        {
            name: '授信转化率',
            type: 'line',
            yAxisIndex: 1,
            data: []
        },
        {
            name: '放款转化率',
            type: 'line',
            yAxisIndex: 1,
            data: []
        },
    ],
    xAxis: [
        {
            axisLabel: {
                interval: 0,
                formatter: function (value) {
                    let val = value.substring(0, 4) + '\n' + value.substring(4, 5) + '\n' + value.substring(5, 15);
                    // console.log( val);
                    return val;
                }
            },
            type: 'category',
            data: [],
            axisPointer: {
                type: 'shadow'
            }
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '店铺数',
            min: 0,

            // interval: 5,
            axisLabel: {
                formatter: '{value}'
            }
        },
        {
            type: 'value',
            name: '转化率',
            min: 0,

            // interval: 5,
            axisLabel: {
                formatter: '{value}'
            }
        },
    ]
}


//======================================================================

export let detail1Pie = {
    color: ['#EE4982', '#FF7171', '#FFB929', '#FFDB4B', '#A3EA3C', '#3CE58C', '#09CFAB', '#3ED3FF', '#3E83FF', '#4764E4', '#9E88F0', '#9560E3'],
    tooltip: {
        trigger: 'item',
        formatter: function (params) {
            return `<div class="label-item" >
            <div class="top" style=' display: flex;align-items: center; font-family: PingFangSC-Regular;font-size: 14px;color: #969799;font-weight: 400;margin-bottom: 7px;'>
                <div class="block" style='width: 8px;height: 8px;background: ${params.color};margin-right: 9px;'></div>
                ${params.name}
            </div>
            <div class="bottom" style='font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #323232;
            font-weight: 400;
            padding-left: 15px;'> 
                <span style='padding-right:12px'>${Number(params.value).toLocaleString()}万</span>
                <span>占比 ${params.data.scale}%</span>
            </div>
        </div>`
        }
    },
    series: [
        {

            type: 'pie',

            radius: [105, 170],
            center: ['47%', '38%'],
            avoidLabelOverlap: true,


            data: [

            ]
        }
    ]
};
export let detail1 = {
    grid: {
        left: '2%',
        right: '2%',
        bottom: '10%',
        top: '7%',
        containLabel: true
    },
    color: ['#EE4982', '#FF7171', '#FFB929', '#FFDB4B', '#A3EA3C', '#3CE58C', '#09CFAB', '#3ED3FF', '#3E83FF', '#4764E4', '#9E88F0', '#9560E3'],
    // title: { text: '资金方趋势图-累计放款金额', },
    tooltip: {
        trigger: 'axis',
        formatter: function (arg) {

            let arrTemp = arg;
            let dom = [
                `<div style='display:flex;align-items:center'><div style="width:120px;text-align:left">${arg[0].axisValueLabel}</div>  </div>`
            ];
            arrTemp.forEach((item) => {
                if ((item.data /1).toFixed(2) > 0) {
                    dom.push(
                        `<div style='display:flex;align-items:center;margin-top:5px;'><div style="text-align:left;padding-right:15px" "> ${item.marker} ${item.seriesName}</div><div style="width:100%;text-align:right;font-size: 14px;color: #666;font-weight: 900;">${((item.data /1).toFixed(2)*1).toLocaleString()}</div> </div>`
                    );
                }
            });
            let dom2 = [];
            dom.forEach((item, index) => {
                if (item) {
                    dom2.push(item);
                }
            });
            return dom2.join('');
        }
    },

    legend: {
        data: [],
        bottom: '0px'
    },
    series: [



    ],
    xAxis: [
        {
            axisLabel: {
                // interval: 0,
                formatter: function (value) {
                    let val = value.substring(0, 4) + '\n' + value.substring(4, 5) + '\n' + value.substring(5, 15);
                    // console.log( val);
                    return val;
                }
            },
            type: 'category',
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],

        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '金额（万）',
            min: 0,

            // interval: 5,
            axisLabel: {
                formatter: '{value}'
            }
        },
    ]
}


export let detail2Pie = {
    color: ['#EE4982', '#FF7171', '#FFB929', '#FFDB4B', '#A3EA3C', '#3CE58C', '#09CFAB', '#3ED3FF', '#3E83FF', '#4764E4', '#9E88F0', '#9560E3'],
    tooltip: {
        trigger: 'item',
        formatter: function (params) {
            return `<div class="label-item" >
            <div class="top" style=' display: flex;align-items: center; font-family: PingFangSC-Regular;font-size: 14px;color: #969799;font-weight: 400;margin-bottom: 7px;'>
                <div class="block" style='width: 8px;height: 8px;background: ${params.color};margin-right: 9px;'></div>
                ${params.name}
            </div>
            <div class="bottom" style='font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #323232;
            font-weight: 400;
            padding-left: 15px;'> 
                <span style='padding-right:12px'>${Number(params.value).toLocaleString()}万</span>
                <span>占比 ${params.data.scale}%</span>
            </div>
        </div>`
        }
    },
    series: [
        {

            type: 'pie',

            radius: [105, 170],
            center: ['47%', '38%'],
            avoidLabelOverlap: true,


            data: [

            ]
        }
    ]
};
export let detail2 = {
    grid: {
        left: '2%',
        right: '2%',
        bottom: '10%',
        top: '7%',
        containLabel: true
    },
    color: ['#EE4982', '#FF7171', '#FFB929', '#FFDB4B', '#A3EA3C', '#3CE58C', '#09CFAB', '#3ED3FF', '#3E83FF', '#4764E4', '#9E88F0', '#9560E3'],
    // title: { text: '资金方趋势图-累计放款金额', },
    tooltip: {
        trigger: 'axis',
        formatter: function (arg) {

            let arrTemp = arg;
            let dom = [
                `<div style='display:flex;align-items:center'><div style="width:120px;text-align:left">${arg[0].axisValueLabel}</div>  </div>`
            ];
            arrTemp.forEach((item) => {
                if ((item.data /1).toFixed(2) > 0) {
                    dom.push(
                        `<div style='display:flex;align-items:center;margin-top:5px;'><div style="text-align:left;padding-right:15px" "> ${item.marker} ${item.seriesName}</div><div style="width:100%;text-align:right;font-size: 14px;color: #666;font-weight: 900;">${((item.data /1).toFixed(2)*1).toLocaleString()}</div> </div>`
                    );
                }
            });
            let dom2 = [];
            dom.forEach((item, index) => {
                if (item) {
                    dom2.push(item);
                }
            });
            return dom2.join('');
        }
    },

    legend: {
        data: [],
        bottom: '0px'
    },
    series: [



    ],
    xAxis: [
        {
            axisLabel: {
                // interval: 0,
                formatter: function (value) {
                    let val = value.substring(0, 4) + '\n' + value.substring(4, 5) + '\n' + value.substring(5, 15);
                    // console.log( val);
                    return val;
                }
            },
            type: 'category',
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],

        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '金额（万）',
            min: 0,

            // interval: 5,
            axisLabel: {
                formatter: '{value}'
            }
        },
    ]
}



export let detail3Pie = {
    color: ['#EE4982', '#FF7171', '#FFB929', '#FFDB4B', '#A3EA3C', '#3CE58C', '#09CFAB', '#3ED3FF', '#3E83FF', '#4764E4', '#9E88F0', '#9560E3'],
    tooltip: {
        trigger: 'item',
        formatter: function (params) {
            return `<div class="label-item" >
            <div class="top" style=' display: flex;align-items: center; font-family: PingFangSC-Regular;font-size: 14px;color: #969799;font-weight: 400;margin-bottom: 7px;'>
                <div class="block" style='width: 8px;height: 8px;background: ${params.color};margin-right: 9px;'></div>
                ${params.name}
            </div>
            <div class="bottom" style='font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #323232;
            font-weight: 400;
            padding-left: 15px;'> 
                <span style='padding-right:12px'>${Number(params.value).toLocaleString()}万</span>
                <span>占比 ${params.data.scale}%</span>
            </div>
        </div>`
        }
    },
    series: [
        {

            type: 'pie',

            radius: [105, 170],
            center: ['47%', '38%'],
            avoidLabelOverlap: true,


            data: [

            ]
        }
    ]
};
export let detail3 = {
    grid: {
        left: '2%',
        right: '2%',
        bottom: '10%',
        top: '7%',
        containLabel: true
    },
    color: ['#EE4982', '#FF7171', '#FFB929', '#FFDB4B', '#A3EA3C', '#3CE58C', '#09CFAB', '#3ED3FF', '#3E83FF', '#4764E4', '#9E88F0', '#9560E3'],
    // title: { text: '资金方趋势图-累计放款金额', },
    tooltip: {
        trigger: 'axis',
        formatter: function (arg) {

            let arrTemp = arg;
            let dom = [
                `<div style='display:flex;align-items:center'><div style="width:120px;text-align:left">${arg[0].axisValueLabel}</div>  </div>`
            ];
            arrTemp.forEach((item) => {
                if ((item.data /1).toFixed(2) > 0) {
                    dom.push(
                        `<div style='display:flex;align-items:center;margin-top:5px;'><div style="text-align:left;padding-right:15px" "> ${item.marker} ${item.seriesName}</div><div style="width:100%;text-align:right;font-size: 14px;color: #666;font-weight: 900;">${((item.data /1).toFixed(2)*1).toLocaleString()}</div> </div>`
                    );
                }
            });
            let dom2 = [];
            dom.forEach((item, index) => {
                if (item) {
                    dom2.push(item);
                }
            });
            return dom2.join('');
        }
    },

    legend: {
        data: [],
        bottom: '0px'
    },
    series: [



    ],
    xAxis: [
        {
            axisLabel: {
                // interval: 0,
                formatter: function (value) {
                    let val = value.substring(0, 4) + '\n' + value.substring(4, 5) + '\n' + value.substring(5, 15);
                    // console.log( val);
                    return val;
                }
            },
            type: 'category',
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],

        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '金额（万）',
            min: 0,

            // interval: 5,
            axisLabel: {
                formatter: '{value}'
            }
        },
    ]
}


export let detail4Pie = {
    color: ['#EE4982', '#FF7171', '#FFB929', '#FFDB4B', '#A3EA3C', '#3CE58C', '#09CFAB', '#3ED3FF', '#3E83FF', '#4764E4', '#9E88F0', '#9560E3'],
    tooltip: {
        trigger: 'item',
        formatter: function (params) {
            return `<div class="label-item" >
            <div class="top" style=' display: flex;align-items: center; font-family: PingFangSC-Regular;font-size: 14px;color: #969799;font-weight: 400;margin-bottom: 7px;'>
                <div class="block" style='width: 8px;height: 8px;background: ${params.color};margin-right: 9px;'></div>
                ${params.name}
            </div>
            <div class="bottom" style='font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #323232;
            font-weight: 400;
            padding-left: 15px;'> 
                <span style='padding-right:12px'>${Number(params.value).toLocaleString()}万</span>
                <span>占比 ${params.data.scale}%</span>
            </div>
        </div>`
        }
    },
    series: [
        {

            type: 'pie',

            radius: [105, 170],
            center: ['47%', '38%'],
            avoidLabelOverlap: true,


            data: [

            ]
        }
    ]
};
export let detail4 = {
    grid: {
        left: '2%',
        right: '2%',
        bottom: '10%',
        top: '7%',
        containLabel: true
    },
    color: ['#EE4982', '#FF7171', '#FFB929', '#FFDB4B', '#A3EA3C', '#3CE58C', '#09CFAB', '#3ED3FF', '#3E83FF', '#4764E4', '#9E88F0', '#9560E3'],
    // title: { text: '资金方趋势图-累计放款金额', },
    tooltip: {
        trigger: 'axis',
        formatter: function (arg) {

            let arrTemp = arg;
            let dom = [
                `<div style='display:flex;align-items:center'><div style="width:120px;text-align:left">${arg[0].axisValueLabel}</div>  </div>`
            ];
            arrTemp.forEach((item) => {
                if ((item.data /1).toFixed(2) > 0) {
                    dom.push(
                        `<div style='display:flex;align-items:center;margin-top:5px;'><div style="text-align:left;padding-right:15px" "> ${item.marker} ${item.seriesName}</div><div style="width:100%;text-align:right;font-size: 14px;color: #666;font-weight: 900;">${((item.data /1).toFixed(2)*1).toLocaleString()}</div> </div>`
                    );
                }
            });
            let dom2 = [];
            dom.forEach((item, index) => {
                if (item) {
                    dom2.push(item);
                }
            });
            return dom2.join('');
        }
    },

    legend: {
        data: [],
        bottom: '0px'
    },
    series: [



    ],
    xAxis: [
        {
            axisLabel: {
                // interval: 0,
                formatter: function (value) {
                    let val = value.substring(0, 4) + '\n' + value.substring(4, 5) + '\n' + value.substring(5, 15);
                    // console.log( val);
                    return val;
                }
            },
            type: 'category',
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],

        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '金额（万）',
            min: 0,

            // interval: 5,
            axisLabel: {
                formatter: '{value}'
            }
        },
    ]
}



export let detail5Pie = {
    color: ['#EE4982', '#FF7171', '#FFB929', '#FFDB4B', '#A3EA3C', '#3CE58C', '#09CFAB', '#3ED3FF', '#3E83FF', '#4764E4', '#9E88F0', '#9560E3'],
    tooltip: {
        trigger: 'item',
        formatter: function (params) {
            return `<div class="label-item" >
            <div class="top" style=' display: flex;align-items: center; font-family: PingFangSC-Regular;font-size: 14px;color: #969799;font-weight: 400;margin-bottom: 7px;'>
                <div class="block" style='width: 8px;height: 8px;background: ${params.color};margin-right: 9px;'></div>
                ${params.name}
            </div>
            <div class="bottom" style='font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #323232;
            font-weight: 400;
            padding-left: 15px;'> 
                <span style='padding-right:12px'>${Number(params.value).toLocaleString()}万</span>
                <span>占比 ${params.data.scale}%</span>
            </div>
        </div>`
        }
    },
    series: [
        {

            type: 'pie',

            radius: [105, 170],
            center: ['47%', '38%'],
            avoidLabelOverlap: true,


            data: [

            ]
        }
    ]
};
export let detail5 = {
    grid: {
        left: '2%',
        right: '2%',
        bottom: '10%',
        top: '7%',
        containLabel: true
    },
    color: ['#EE4982', '#FF7171', '#FFB929', '#FFDB4B', '#A3EA3C', '#3CE58C', '#09CFAB', '#3ED3FF', '#3E83FF', '#4764E4', '#9E88F0', '#9560E3'],
    // title: { text: '资金方趋势图-累计放款金额', },
    tooltip: {
        trigger: 'axis',
        formatter: function (arg) {

            let arrTemp = arg;
            let dom = [
                `<div style='display:flex;align-items:center'><div style="width:120px;text-align:left">${arg[0].axisValueLabel}</div>  </div>`
            ];
            arrTemp.forEach((item) => {
                if ((item.data /1).toFixed(2) > 0) {
                    dom.push(
                        `<div style='display:flex;align-items:center;margin-top:5px;'><div style="text-align:left;padding-right:15px" "> ${item.marker} ${item.seriesName}</div><div style="width:100%;text-align:right;font-size: 14px;color: #666;font-weight: 900;">${((item.data /1).toFixed(2)*1).toLocaleString()}</div> </div>`
                    );
                }
            });
            let dom2 = [];
            dom.forEach((item, index) => {
                if (item) {
                    dom2.push(item);
                }
            });
            return dom2.join('');
        }
    },

    legend: {
        data: [],
        bottom: '0px'
    },
    series: [



    ],
    xAxis: [
        {
            axisLabel: {
                // interval: 0,
                formatter: function (value) {
                    let val = value.substring(0, 4) + '\n' + value.substring(4, 5) + '\n' + value.substring(5, 15);
                    // console.log( val);
                    return val;
                }
            },
            type: 'category',
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],

        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '金额（万）',
            min: 0,

            // interval: 5,
            axisLabel: {
                formatter: '{value}'
            }
        },
    ]
}


export let detail6Pie = {
    color: ['#EE4982', '#FF7171', '#FFB929', '#FFDB4B', '#A3EA3C', '#3CE58C', '#09CFAB', '#3ED3FF', '#3E83FF', '#4764E4', '#9E88F0', '#9560E3'],
    tooltip: {
        trigger: 'item',
        formatter: function (params) {
            return `<div class="label-item" >
            <div class="top" style=' display: flex;align-items: center; font-family: PingFangSC-Regular;font-size: 14px;color: #969799;font-weight: 400;margin-bottom: 7px;'>
                <div class="block" style='width: 8px;height: 8px;background: ${params.color};margin-right: 9px;'></div>
                ${params.name}
            </div>
            <div class="bottom" style='font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #323232;
            font-weight: 400;
            padding-left: 15px;'> 
                <span style='padding-right:12px'>${Number(params.value).toLocaleString()}万</span>
                <span>占比 ${params.data.scale}%</span>
            </div>
        </div>`
        }
    },
    series: [
        {

            type: 'pie',

            radius: [105, 170],
            center: ['47%', '38%'],
            avoidLabelOverlap: true,


            data: [

            ]
        }
    ]
};
export let detail6 = {
    grid: {
        left: '2%',
        right: '2%',
        bottom: '10%',
        top: '7%',
        containLabel: true
    },
    color: ['#EE4982', '#FF7171', '#FFB929', '#FFDB4B', '#A3EA3C', '#3CE58C', '#09CFAB', '#3ED3FF', '#3E83FF', '#4764E4', '#9E88F0', '#9560E3'],
    // title: { text: '资金方趋势图-累计放款金额', },
    tooltip: {
        trigger: 'axis',
        formatter: function (arg) {

            let arrTemp = arg;
            let dom = [
                `<div style='display:flex;align-items:center'><div style="width:120px;text-align:left">${arg[0].axisValueLabel}</div>  </div>`
            ];
            arrTemp.forEach((item) => {
                if ((item.data /1).toFixed(2) > 0) {
                    dom.push(
                        `<div style='display:flex;align-items:center;margin-top:5px;'><div style="text-align:left;padding-right:15px" "> ${item.marker} ${item.seriesName}</div><div style="width:100%;text-align:right;font-size: 14px;color: #666;font-weight: 900;">${((item.data /1).toFixed(2)*1).toLocaleString()}</div> </div>`
                    );
                }
            });
            let dom2 = [];
            dom.forEach((item, index) => {
                if (item) {
                    dom2.push(item);
                }
            });
            return dom2.join('');
        }
    },

    legend: {
        data: [],
        bottom: '0px'
    },
    series: [



    ],
    xAxis: [
        {
            axisLabel: {
                // interval: 0,
                formatter: function (value) {
                    let val = value.substring(0, 4) + '\n' + value.substring(4, 5) + '\n' + value.substring(5, 15);
                    // console.log( val);
                    return val;
                }
            },
            type: 'category',
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],

        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '金额（万）',
            min: 0,

            // interval: 5,
            axisLabel: {
                formatter: '{value}'
            }
        },
    ]
}



export let detail7Pie = {
    color: ['#EE4982', '#FF7171', '#FFB929', '#FFDB4B', '#A3EA3C', '#3CE58C', '#09CFAB', '#3ED3FF', '#3E83FF', '#4764E4', '#9E88F0', '#9560E3'],
    tooltip: {
        trigger: 'item',
        formatter: function (params) {
            return `<div class="label-item" >
            <div class="top" style=' display: flex;align-items: center; font-family: PingFangSC-Regular;font-size: 14px;color: #969799;font-weight: 400;margin-bottom: 7px;'>
                <div class="block" style='width: 8px;height: 8px;background: ${params.color};margin-right: 9px;'></div>
                ${params.name}
            </div>
            <div class="bottom" style='font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #323232;
            font-weight: 400;
            padding-left: 15px;'> 
                <span style='padding-right:12px'>${Number(params.value).toLocaleString()}笔</span>
                <span>占比 ${params.data.scale}%</span>
            </div>
        </div>`
        }
    },
    series: [
        {

            type: 'pie',

            radius: [105, 170],
            center: ['47%', '38%'],
            avoidLabelOverlap: true,


            data: [

            ]
        }
    ]
};
export let detail7 = {
    grid: {
        left: '2%',
        right: '2%',
        bottom: '10%',
        top: '7%',
        containLabel: true
    },
    color: ['#EE4982', '#FF7171', '#FFB929', '#FFDB4B', '#A3EA3C', '#3CE58C', '#09CFAB', '#3ED3FF', '#3E83FF', '#4764E4', '#9E88F0', '#9560E3'],
    // title: { text: '资金方趋势图-累计放款金额', },
    tooltip: {
        trigger: 'axis',
        formatter: function (arg) {

            let arrTemp = arg;
            let dom = [
                `<div style='display:flex;align-items:center'><div style="width:120px;text-align:left">${arg[0].axisValueLabel}</div>  </div>`
            ];
            arrTemp.forEach((item) => {
                if ((item.data /1).toFixed(2) > 0) {
                    dom.push(
                        `<div style='display:flex;align-items:center;margin-top:5px;'><div style="text-align:left;padding-right:15px" "> ${item.marker} ${item.seriesName}</div><div style="width:100%;text-align:right;font-size: 14px;color: #666;font-weight: 900;">${((item.data /1).toFixed(2)*1).toLocaleString()}</div> </div>`
                    );
                }
            });
            let dom2 = [];
            dom.forEach((item, index) => {
                if (item) {
                    dom2.push(item);
                }
            });
            return dom2.join('');
        }
    },

    legend: {
        data: [],
        bottom: '0px'
    },
    series: [



    ],
    xAxis: [
        {
            axisLabel: {
                // interval: 0,
                formatter: function (value) {
                    let val = value.substring(0, 4) + '\n' + value.substring(4, 5) + '\n' + value.substring(5, 15);
                    // console.log( val);
                    return val;
                }
            },
            type: 'category',
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],

        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '笔数',
            min: 0,

            // interval: 5,
            axisLabel: {
                formatter: '{value}'
            }
        },
    ]
}

export let detail8Pie = {
    color: ['#EE4982', '#FF7171', '#FFB929', '#FFDB4B', '#A3EA3C', '#3CE58C', '#09CFAB', '#3ED3FF', '#3E83FF', '#4764E4', '#9E88F0', '#9560E3'],
    tooltip: {
        trigger: 'item',
        formatter: function (params) {
            return `<div class="label-item" >
            <div class="top" style=' display: flex;align-items: center; font-family: PingFangSC-Regular;font-size: 14px;color: #969799;font-weight: 400;margin-bottom: 7px;'>
                <div class="block" style='width: 8px;height: 8px;background: ${params.color};margin-right: 9px;'></div>
                ${params.name}
            </div>
            <div class="bottom" style='font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #323232;
            font-weight: 400;
            padding-left: 15px;'> 
                <span style='padding-right:12px'>${Number(params.value).toLocaleString()}笔</span>
                <span>占比 ${params.data.scale}%</span>
            </div>
        </div>`
        }
    },
    series: [
        {

            type: 'pie',

            radius: [105, 170],
            center: ['47%', '38%'],
            avoidLabelOverlap: true,


            data: [

            ]
        }
    ]
};
export let detail8 = {
    grid: {
        left: '2%',
        right: '2%',
        bottom: '10%',
        top: '7%',
        containLabel: true
    },
    color: ['#EE4982', '#FF7171', '#FFB929', '#FFDB4B', '#A3EA3C', '#3CE58C', '#09CFAB', '#3ED3FF', '#3E83FF', '#4764E4', '#9E88F0', '#9560E3'],
    // title: { text: '资金方趋势图-累计放款金额', },
    tooltip: {
        trigger: 'axis',
        formatter: function (arg) {

            let arrTemp = arg;
            let dom = [
                `<div style='display:flex;align-items:center'><div style="width:120px;text-align:left">${arg[0].axisValueLabel}</div>  </div>`
            ];
            arrTemp.forEach((item) => {
                if ((item.data /1).toFixed(2) > 0) {
                    dom.push(
                        `<div style='display:flex;align-items:center;margin-top:5px;'><div style="text-align:left;padding-right:15px" "> ${item.marker} ${item.seriesName}</div><div style="width:100%;text-align:right;font-size: 14px;color: #666;font-weight: 900;">${((item.data /1).toFixed(2)*1).toLocaleString()}</div> </div>`
                    );
                }
            });
            let dom2 = [];
            dom.forEach((item, index) => {
                if (item) {
                    dom2.push(item);
                }
            });
            return dom2.join('');
        }
    },

    legend: {
        data: [],
        bottom: '0px'
    },
    series: [



    ],
    xAxis: [
        {
            axisLabel: {
                // interval: 0,
                formatter: function (value) {
                    let val = value.substring(0, 4) + '\n' + value.substring(4, 5) + '\n' + value.substring(5, 15);
                    // console.log( val);
                    return val;
                }
            },
            type: 'category',
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],

        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '笔数）',
            min: 0,

            // interval: 5,
            axisLabel: {
                formatter: '{value}'
            }
        },
    ]
}
export let detail9Pie = {
    color: ['#EE4982', '#FF7171', '#FFB929', '#FFDB4B', '#A3EA3C', '#3CE58C', '#09CFAB', '#3ED3FF', '#3E83FF', '#4764E4', '#9E88F0', '#9560E3'],
    tooltip: {
        trigger: 'item',
        formatter: function (params) {
            return `<div class="label-item" >
            <div class="top" style=' display: flex;align-items: center; font-family: PingFangSC-Regular;font-size: 14px;color: #969799;font-weight: 400;margin-bottom: 7px;'>
                <div class="block" style='width: 8px;height: 8px;background: ${params.color};margin-right: 9px;'></div>
                ${params.name}
            </div>
            <div class="bottom" style='font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #323232;
            font-weight: 400;
            padding-left: 15px;'> 
                <span style='padding-right:12px'>${Number(params.value).toLocaleString()}笔</span>
                <span>占比 ${params.data.scale}%</span>
            </div>
        </div>`
        }
    },
    series: [
        {

            type: 'pie',

            radius: [105, 170],
            center: ['47%', '38%'],
            avoidLabelOverlap: true,


            data: [

            ]
        }
    ]
};
export let detail9 = {
    grid: {
        left: '2%',
        right: '2%',
        bottom: '10%',
        top: '7%',
        containLabel: true
    },
    color: ['#EE4982', '#FF7171', '#FFB929', '#FFDB4B', '#A3EA3C', '#3CE58C', '#09CFAB', '#3ED3FF', '#3E83FF', '#4764E4', '#9E88F0', '#9560E3'],
    // title: { text: '资金方趋势图-累计放款金额', },
    tooltip: {
        trigger: 'axis',
        formatter: function (arg) {

            let arrTemp = arg;
            let dom = [
                `<div style='display:flex;align-items:center'><div style="width:120px;text-align:left">${arg[0].axisValueLabel}</div>  </div>`
            ];
            arrTemp.forEach((item) => {
                if ((item.data /1).toFixed(2) > 0) {
                    dom.push(
                        `<div style='display:flex;align-items:center;margin-top:5px;'><div style="text-align:left;padding-right:15px" "> ${item.marker} ${item.seriesName}</div><div style="width:100%;text-align:right;font-size: 14px;color: #666;font-weight: 900;">${((item.data /1).toFixed(2)*1).toLocaleString()}</div> </div>`
                    );
                }
            });
            let dom2 = [];
            dom.forEach((item, index) => {
                if (item) {
                    dom2.push(item);
                }
            });
            return dom2.join('');
        }
    },

    legend: {
        data: [],
        bottom: '0px'
    },
    series: [



    ],
    xAxis: [
        {
            axisLabel: {
                // interval: 0,
                formatter: function (value) {
                    let val = value.substring(0, 4) + '\n' + value.substring(4, 5) + '\n' + value.substring(5, 15);
                    // console.log( val);
                    return val;
                }
            },
            type: 'category',
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],

        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '笔数',
            min: 0,

            // interval: 5,
            axisLabel: {
                formatter: '{value}'
            }
        },
    ]
}