// columnChartInit();

/*
  two separte key and value pairs
  return in sorted order while keep the pair in index
*/
function sortKeyValArr(keyArr, valArr){
  // get value from keyArr
  var numKeyArr = keyArr.map(function(key){
    return parseInt(key);
  });

  // sort by number in ascending order
  numKeyArr.sort(function(a, b){return a - b});
  // console.log(numKeyArr);

  var sortedValArr = [];
  for(var i = 0; i < valArr.length; i++){
    var curKeyIndex = keyArr.indexOf(String(numKeyArr[i]));
    sortedValArr.push(valArr[curKeyIndex]);
  }

  var strKeyArr = numKeyArr.map(function(key){
    return String(key);
  });

  console.log(strKeyArr);
  console.log(sortedValArr);
  return [strKeyArr, sortedValArr];
}

function parsePieData(rawData){
  var pieData = {};

  pieData.total = rawData.length;

  //  this looks really bad.. need to rework when have time...

  // init the pieData structure
  pieData.posData = {};
  pieData.negData = {};
  pieData.neturalData = {};

  // neutural is sepcial case, as it has no sub options
  pieData.neturalData.cate = ['0'];
  pieData.neturalData.data = [0];

  pieData.negData.cate = [];
  pieData.negData.data = [];
  pieData.posData.cate = [];
  pieData.posData.data = [];

  pieData.posData.num = 0;
  pieData.negData.num = 0;
  pieData.neturalData.num = 0;


  rawData.map(function(rawItem){
    var sentiScore = rawItem.score;

    if(sentiScore == 0){
      pieData.neturalData.data[0] += 1;
      pieData.neturalData.num += 1;
    }else if(sentiScore > 0){
      // check if contain the category
      var bContainCate = pieData.posData.cate.indexOf(String(sentiScore));
      if(bContainCate > -1){
        pieData.posData.data[bContainCate] += 1;
      }else{
        pieData.posData.cate.push(String(sentiScore));
        pieData.posData.data.push(1);
      }
      pieData.posData.num += 1;

    }else{
      // check if contain the category
      var bContainCate = pieData.negData.cate.indexOf(String(sentiScore));
      if(bContainCate > -1){
        pieData.negData.data[bContainCate] += 1;
      }else{
        pieData.negData.cate.push(String(sentiScore));
        pieData.negData.data.push(1);
      }
      pieData.negData.num += 1;
    }
  });

  // sort array
  var posSorted = sortKeyValArr(pieData.posData.cate, pieData.posData.data);
  var negSorted = sortKeyValArr(pieData.negData.cate, pieData.negData.data);


  pieData.posData.cate = posSorted[0];
  pieData.posData.data = posSorted[1];
  pieData.negData.cate = negSorted[0];
  pieData.negData.data = negSorted[1];

  console.log(pieData);
  return pieData;
}

function pieChartInit(pieData) {

  $(function() {
    var colors = Highcharts.getOptions().colors,
      categories = ['Positive', 'Negative', 'Netural'],
      data = [{
        y: 100/pieData.total * pieData.posData.num,
        color: colors[0],
        drilldown: {
          name: 'Positive',
          categories: pieData.posData.cate,
          data: pieData.posData.data,
          color: colors[0]
        }
      }, {
        y: 100/pieData.total * pieData.negData.num,
        color: colors[1],
        drilldown: {
          name: 'Negative',
          categories: pieData.negData.cate,
          data: pieData.negData.data,
          color: colors[1]
        }
      }, {
        y: 100/pieData.total * pieData.neturalData.num,
        color: colors[2],
        drilldown: {
          name: 'Netural',
          categories: pieData.neturalData.cate,
          data: pieData.neturalData.data,
          color: colors[2]
        }
      }],
      browserData = [],
      versionsData = [],
      i,
      j,
      dataLen = data.length,
      drillDataLen,
      brightness;


    // Build the data arrays
    for (i = 0; i < dataLen; i += 1) {

      // add browser data
      browserData.push({
        name: categories[i],
        y: data[i].y,
        color: data[i].color
      });

      // add version data
      drillDataLen = data[i].drilldown.data.length;
      for (j = 0; j < drillDataLen; j += 1) {
        brightness = 0.2 - (j / drillDataLen) / 5;
        versionsData.push({
          name: data[i].drilldown.categories[j],
          y: data[i].drilldown.data[j],
          color: Highcharts.Color(data[i].color).brighten(brightness).get()
        });
      }
    }

    // Create the chart
    $('#pie_chart').highcharts({
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Browser market share, January, 2015 to May, 2015'
      },
      subtitle: {
        text: 'Source: <a href="http://netmarketshare.com/">netmarketshare.com</a>'
      },
      yAxis: {
        title: {
          text: 'Total percent market share'
        }
      },
      plotOptions: {
        pie: {
          shadow: false,
          center: ['50%', '50%']
        }
      },
      tooltip: {
        valueSuffix: '%'
      },
      series: [{
        name: 'Browsers',
        data: browserData,
        size: '60%',
        dataLabels: {
          formatter: function() {
            return this.y > 5 ? this.point.name : null;
          },
          color: '#ffffff',
          distance: -30
        }
      }, {
        name: 'Versions',
        data: versionsData,
        size: '80%',
        innerSize: '60%',
        dataLabels: {
          formatter: function() {
            // display only if larger than 1
            return this.y > 1 ? '<b>' + this.point.name + ':</b> ' + this.y + '%' : null;
          }
        }
      }]
    });
  });
}


function columnChartInit() {

  $(function() {
    $('#spider_web').highcharts({
      chart: {
        type: 'column'
      },
      title: {
        text: 'Monthly Average Rainfall'
      },
      subtitle: {
        text: 'Source: WorldClimate.com'
      },
      xAxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec'
        ],
        crosshair: true
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Rainfall (mm)'
        }
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0
        }
      },
      series: [{
        name: 'Tokyo',
        data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]

      }, {
        name: 'New York',
        data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]

      }, {
        name: 'London',
        data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]

      }, {
        name: 'Berlin',
        data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]

      }]
    });
  });

}
