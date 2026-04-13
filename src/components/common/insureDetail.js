export let detailOption9 = {
    grid: {
        top: '10%',
        left: '5%',
        right: '3%',
        bottom: '10%',
        containLabel: true
    },
    // title: { text: '产品分布-授信金额' },
    title: {
        subtext: '保费/元',
        left: '3%',
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross'
        }
    },

    legend: {
        // data: [],
        // top: '30px'
        bottom: '2%'
    },
    series: [

    ],
    xAxis: {
        axisLabel: {
            interval: 0,
            // formatter: function (value) {
            //   let val = value.substring(0, 4) + '\n' + value.substring(4, 5) + '\n' + value.substring(5, 15);
            //   // console.log( val);
            //   return val;
            // }
        },
        type: 'category',
        data: [],
        axisPointer: {
            type: 'shadow'
        }
    },
    yAxis: [{
        type: 'value',

        min: 0,
        // interval: 5,
        // axisLabel: {
        //   formatter: '{value}'
        // }
    }, ]
}