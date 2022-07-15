type = ["primary", "info", "success", "warning", "danger"];

demo = {
  initPickColor: function () {
    $(".pick-class-label").click(function () {
      var new_class = $(this).attr("new-class");
      var old_class = $("#display-buttons").attr("data-class");
      var display_div = $("#display-buttons");
      if (display_div.length) {
        var display_buttons = display_div.find(".btn");
        display_buttons.removeClass(old_class);
        display_buttons.addClass(new_class);
        display_div.attr("data-class", new_class);
      }
    });
  },

  initDocChart: function () {
    chartColor = "#FFFFFF";

    // General configuration for the charts with Line gradientStroke
    gradientChartOptionsConfiguration = {
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
      tooltips: {
        bodySpacing: 4,
        mode: "nearest",
        intersect: 0,
        position: "nearest",
        xPadding: 10,
        yPadding: 10,
        caretPadding: 10,
      },
      responsive: true,
      scales: {
        yAxes: [
          {
            display: 0,
            gridLines: 0,
            ticks: {
              display: false,
            },
            gridLines: {
              zeroLineColor: "transparent",
              drawTicks: false,
              display: false,
              drawBorder: false,
            },
          },
        ],
        xAxes: [
          {
            display: 0,
            gridLines: 0,
            ticks: {
              display: false,
            },
            gridLines: {
              zeroLineColor: "transparent",
              drawTicks: false,
              display: false,
              drawBorder: false,
            },
          },
        ],
      },
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 15,
          bottom: 15,
        },
      },
    };

    ctx = document.getElementById("lineChartExample").getContext("2d");

    gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
    gradientStroke.addColorStop(0, "#80b6f4");
    gradientStroke.addColorStop(1, chartColor);

    gradientFill = ctx.createLinearGradient(0, 170, 0, 50);
    gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
    gradientFill.addColorStop(1, "rgba(249, 99, 59, 0.40)");

    myChart = new Chart(ctx, {
      type: "line",
      responsive: true,
      data: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        datasets: [
          {
            label: "Active Users",
            borderColor: "#f96332",
            pointBorderColor: "#FFF",
            pointBackgroundColor: "#f96332",
            pointBorderWidth: 2,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 1,
            pointRadius: 4,
            fill: true,
            backgroundColor: gradientFill,
            borderWidth: 2,
            data: [542, 480, 430, 550, 530, 453, 380, 434, 568, 610, 700, 630],
          },
        ],
      },
      options: gradientChartOptionsConfiguration,
    });
  },

  initDashboardPageCharts: function () {
    gradientChartOptionsConfigurationWithTooltipBlue = {
      maintainAspectRatio: false,
      legend: {
        display: false,
      },

      tooltips: {
        backgroundColor: "#f5f5f5",
        titleFontColor: "#333",
        bodyFontColor: "#666",
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest",
      },
      responsive: true,
      scales: {
        yAxes: [
          {
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: "rgba(29,140,248,0.0)",
              zeroLineColor: "transparent",
            },
            ticks: {
              suggestedMin: 60,
              suggestedMax: 125,
              padding: 20,
              fontColor: "#2380f7",
            },
          },
        ],

        xAxes: [
          {
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: "rgba(29,140,248,0.1)",
              zeroLineColor: "transparent",
            },
            ticks: {
              padding: 20,
              fontColor: "#2380f7",
            },
          },
        ],
      },
    };

    gradientChartOptionsConfigurationWithTooltipPurple = {
      maintainAspectRatio: false,
      legend: {
        display: false,
      },

      tooltips: {
        backgroundColor: "#f5f5f5",
        titleFontColor: "#333",
        bodyFontColor: "#666",
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest",
      },
      responsive: true,
      scales: {
        yAxes: [
          {
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: "rgba(29,140,248,0.0)",
              zeroLineColor: "transparent",
            },
            ticks: {
              suggestedMin: 60,
              suggestedMax: 125,
              padding: 20,
              fontColor: "#9a9a9a",
            },
          },
        ],

        xAxes: [
          {
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: "rgba(225,78,202,0.1)",
              zeroLineColor: "transparent",
            },
            ticks: {
              padding: 20,
              fontColor: "#9a9a9a",
            },
          },
        ],
      },
    };

    gradientChartOptionsConfigurationWithTooltipOrange = {
      maintainAspectRatio: false,
      legend: {
        display: false,
      },

      tooltips: {
        backgroundColor: "#f5f5f5",
        titleFontColor: "#333",
        bodyFontColor: "#666",
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest",
      },
      responsive: true,
      scales: {
        yAxes: [
          {
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: "rgba(29,140,248,0.0)",
              zeroLineColor: "transparent",
            },
            ticks: {
              suggestedMin: 50,
              suggestedMax: 110,
              padding: 20,
              fontColor: "#ff8a76",
            },
          },
        ],

        xAxes: [
          {
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: "rgba(220,53,69,0.1)",
              zeroLineColor: "transparent",
            },
            ticks: {
              padding: 20,
              fontColor: "#ff8a76",
            },
          },
        ],
      },
    };

    gradientChartOptionsConfigurationWithTooltipGreen = {
      maintainAspectRatio: false,
      legend: {
        display: false,
      },

      tooltips: {
        backgroundColor: "#f5f5f5",
        titleFontColor: "#333",
        bodyFontColor: "#666",
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest",
      },
      responsive: true,
      scales: {
        yAxes: [
          {
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: "rgba(29,140,248,0.0)",
              zeroLineColor: "transparent",
            },
            ticks: {
              suggestedMin: 50,
              suggestedMax: 125,
              padding: 20,
              fontColor: "#9e9e9e",
            },
          },
        ],

        xAxes: [
          {
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: "rgba(0,242,195,0.1)",
              zeroLineColor: "transparent",
            },
            ticks: {
              padding: 20,
              fontColor: "#9e9e9e",
            },
          },
        ],
      },
    };

    gradientBarChartConfiguration = {
      maintainAspectRatio: false,
      legend: {
        display: false,
      },

      tooltips: {
        backgroundColor: "#f5f5f5",
        titleFontColor: "#333",
        bodyFontColor: "#666",
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest",
      },
      responsive: true,
      scales: {
        yAxes: [
          {
            gridLines: {
              drawBorder: false,
              color: "rgba(29,140,248,0.1)",
              zeroLineColor: "transparent",
            },
            ticks: {
              suggestedMin: 60,
              suggestedMax: 120,
              padding: 20,
              fontColor: "#9e9e9e",
            },
          },
        ],

        xAxes: [
          {
            gridLines: {
              drawBorder: false,
              color: "rgba(29,140,248,0.1)",
              zeroLineColor: "transparent",
            },
            ticks: {
              padding: 20,
              fontColor: "#9e9e9e",
            },
          },
        ],
      },
    };

    function fetch_data(type, quantity, callBackFunc) {
      $.getJSON(
        `https://625576b38646add390d75d72.mockapi.io/iot/${type}?page=1&limit=${quantity}&sortBy=time&order=desc`,
        function (data) {
          callBackFunc(data["items"]);
        }
      );
    }

    //region generate auto chart
    $("canvas").each(function (i) {
      let id = $(this).attr("id");
      let chart_type = $(this).attr("data-type");
      let ctx = $(this).get(0).getContext("2d");
      let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
      gradientStroke.addColorStop(1, "rgba(72,72,176,0.2)");
      gradientStroke.addColorStop(0.2, "rgba(72,72,176,0.0)");
      gradientStroke.addColorStop(0, "rgba(119,52,169,0)"); //purple colors

      // ctx.fill=gradientStroke;

      let dataConfig = {
        // labels: ["Jan", "Feb", "May", "Jun"],
        datasets: [
          {
            label: "Data",
            fill: true,
            backgroundColor: gradientStroke,
            borderColor: "#d048b6",
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: "#d048b6",
            pointBorderColor: "rgba(255,255,255,0)",
            pointHoverBackgroundColor: "#d048b6",
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            // data: [10, 90, 29, 30],
          },
        ],
      };
      let chartInit = new Chart(ctx, {
        type: chart_type,
        data: dataConfig,
        options: gradientChartOptionsConfigurationWithTooltipPurple,
      });
    });
    //endregion

    // //#region chart soil humidity
    // var chart_soil_humidity_labels = [];
    // var chart_soil_humidity_data = [];

    // function initChartSoilHumidityData(items) {
    //   items.forEach((item) => {
    //     chart_soil_humidity_labels.push(item["time"]);
    //     chart_soil_humidity_data.push(item["value"]);
    //   });
    // }
    // fetch_data("pie", 5, initChartSoilHumidityData);
    // var ctx = document.getElementById("chartSoilHumidity").getContext("2d");

    // var gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

    // gradientStroke.addColorStop(1, "rgba(72,72,176,0.2)");
    // gradientStroke.addColorStop(0.2, "rgba(72,72,176,0.0)");
    // gradientStroke.addColorStop(0, "rgba(119,52,169,0)"); //purple colors
    // ctx.fillStyle = gradientStroke;

    // var data = {
    //   labels: chart_soil_humidity_labels,
    //   datasets: [
    //     {
    //       label: "Data",
    //       fill: true,
    //       backgroundColor: gradientStroke,
    //       borderColor: "#d048b6",
    //       borderWidth: 2,
    //       borderDash: [],
    //       borderDashOffset: 0.0,
    //       pointBackgroundColor: "#d048b6",
    //       pointBorderColor: "rgba(255,255,255,0)",
    //       pointHoverBackgroundColor: "#d048b6",
    //       pointBorderWidth: 20,
    //       pointHoverRadius: 4,
    //       pointHoverBorderWidth: 15,
    //       pointRadius: 4,
    //       data: chart_soil_humidity_data,
    //     },
    //   ],
    // };

    // var configJson =
    //   '{"datasets":[{"label":"Data","fill":"","borderColor":"#d048b6","borderWidth":2,"borderDash":[],"borderDashOffset":0,"pointBackgroundColor":"#d048b6","pointBorderColor":"rgba(255,255,255,0)","pointHoverBackgroundColor":"#d048b6","pointBorderWidth":20,"pointHoverRadius":4,"pointHoverBorderWidth":15,"pointRadius":4}]}';
    // // var data = JSON.parse(configJson);
    // // console.log(data)
    // var chartSoildHudimityData = new Chart(ctx, {
    //   type: "line",
    //   data: data,
    //   options: gradientChartOptionsConfigurationWithTooltipPurple,
    // });

    // //update chart real-time
    // function updateChartSoilHudimityData(items) {
    //   var dataConfig = chartSoildHudimityData.config.data;
    //   // var chart_data_hudimity = dataConfig.datasets[0].data;
    //   // var chart_data_temperature = dataConfig.datasets[1].data;
    //   // var chart_data_co2 = dataConfig.datasets[2].data;
    //   // var chart_label = dataConfig.labels;
    //   //update data
    //   items.forEach((item) => {
    //     chart_soil_humidity_labels.shift();
    //     chart_soil_humidity_data.shift();
    //     chart_soil_humidity_labels.push(item["time"]);
    //     chart_soil_humidity_data.push(item["value"]);
    //   });
    //   dataConfig.labels = chart_labels;
    //   dataConfig.datasets[0].data = chart_soil_humidity_data;
    //   chartSoildHudimityData.update();
    // }

    // //#endregion

    // //#region chart temp

    // var ctxGreen = document.getElementById("chartLineGreen").getContext("2d");

    // var gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

    // gradientStroke.addColorStop(1, "rgba(66,134,121,0.15)");
    // gradientStroke.addColorStop(0.4, "rgba(66,134,121,0.0)"); //green colors
    // gradientStroke.addColorStop(0, "rgba(66,134,121,0)"); //green colors

    // var data = {
    //   labels: ["JUL", "AUG", "SEP", "OCT", "NOV"],
    //   datasets: [
    //     {
    //       label: "My First dataset",
    //       fill: true,
    //       backgroundColor: gradientStroke,
    //       borderColor: "#00d6b4",
    //       borderWidth: 2,
    //       borderDash: [],
    //       borderDashOffset: 0.0,
    //       pointBackgroundColor: "#00d6b4",
    //       pointBorderColor: "rgba(255,255,255,0)",
    //       pointHoverBackgroundColor: "#00d6b4",
    //       pointBorderWidth: 20,
    //       pointHoverRadius: 4,
    //       pointHoverBorderWidth: 15,
    //       pointRadius: 4,
    //       data: [90, 27, 60, 12, 80],
    //     },
    //   ],
    // };

    // var myChart = new Chart(ctxGreen, {
    //   type: "line",
    //   data: data,
    //   options: gradientChartOptionsConfigurationWithTooltipGreen,
    // });
    // //#endregion

    // //#region big chart

    // var chart_labels = [];
    // var chart_data_hudimity = [];
    // var chart_data_temperature = [];
    // var chart_data_co2 = [];

    // function initBigChartData(items) {
    //   items.forEach((item) => {
    //     chart_labels.push(item["time"]);
    //     chart_data_hudimity.push(item["value"][0]);
    //     chart_data_temperature.push(item["value"][1]);
    //     chart_data_co2.push(item["value"][2]);
    //   });
    // }
    // fetch_data("bar", 5, initBigChartData);
    // var ctx = document.getElementById("chartBig1").getContext("2d");

    // var gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

    // gradientStroke.addColorStop(1, "rgba(72,72,176,0.1)");
    // gradientStroke.addColorStop(0.4, "rgba(72,72,176,0.0)");
    // gradientStroke.addColorStop(0, "rgba(119,52,169,0)"); //purple colors
    // var config = {
    //   type: "line",
    //   data: {
    //     labels: chart_labels,
    //     datasets: [
    //       {
    //         label: "Humidity",
    //         fill: true,
    //         backgroundColor: gradientStroke,
    //         borderColor: "#35e883",
    //         borderWidth: 2,
    //         borderDash: [],
    //         borderDashOffset: 0.0,
    //         pointBackgroundColor: "#35e883",
    //         pointBorderColor: "rgba(255,255,255,0)",
    //         pointHoverBackgroundColor: "#35e883",
    //         pointBorderWidth: 20,
    //         pointHoverRadius: 4,
    //         pointHoverBorderWidth: 15,
    //         pointRadius: 4,
    //         data: chart_data_hudimity,
    //       },
    //       {
    //         label: "Temperature",
    //         fill: true,
    //         backgroundColor: gradientStroke,
    //         borderColor: "#d346b1",
    //         borderWidth: 2,
    //         borderDash: [],
    //         borderDashOffset: 0.0,
    //         pointBackgroundColor: "#d346b1",
    //         pointBorderColor: "rgba(255,255,255,0)",
    //         pointHoverBackgroundColor: "#d346b1",
    //         pointBorderWidth: 20,
    //         pointHoverRadius: 4,
    //         pointHoverBorderWidth: 15,
    //         pointRadius: 4,
    //         data: chart_data_temperature,
    //       },
    //       {
    //         label: "CO2",
    //         fill: true,
    //         backgroundColor: gradientStroke,
    //         borderColor: "#3e35e8",
    //         borderWidth: 2,
    //         borderDash: [],
    //         borderDashOffset: 0.0,
    //         pointBackgroundColor: "#3e35e8",
    //         pointBorderColor: "rgba(255,255,255,0)",
    //         pointHoverBackgroundColor: "#3e35e8",
    //         pointBorderWidth: 20,
    //         pointHoverRadius: 4,
    //         pointHoverBorderWidth: 15,
    //         pointRadius: 4,
    //         data: chart_data_co2,
    //       },
    //     ],
    //   },
    //   options: gradientChartOptionsConfigurationWithTooltipPurple,
    // };
    // var myChartData = new Chart(ctx, config);
    // var tab_active = 0;
    // $("#0").click(function () {
    //   tab_active = 0;
    //   var data = myChartData.config.data;
    //   data.datasets[0].data = chart_data_hudimity;
    //   data.datasets[1].data = chart_data_temperature;
    //   data.datasets[2].data = chart_data_co2;
    //   data.labels = chart_labels;
    //   myChartData.update();
    // });
    // $("#1").click(function () {
    //   tab_active = 1;
    //   var data = myChartData.config.data;
    //   data.datasets[0].data = chart_data_hudimity;
    //   data.datasets[1].data = null;
    //   data.datasets[2].data = null;
    //   data.labels = chart_labels;
    //   myChartData.update();
    // });
    // $("#2").click(function () {
    //   tab_active = 2;
    //   var data = myChartData.config.data;
    //   data.datasets[0].data = null;
    //   data.datasets[1].data = chart_data_temperature;
    //   data.datasets[2].data = null;
    //   data.labels = chart_labels;
    //   myChartData.update();
    // });

    // $("#3").click(function () {
    //   tab_active = 3;
    //   var data = myChartData.config.data;
    //   data.datasets[0].data = null;
    //   data.datasets[1].data = null;
    //   data.datasets[2].data = chart_data_co2;
    //   data.labels = chart_labels;
    //   myChartData.update();
    // });
    // //update chart real-time
    // function updateBigChartData(items) {
    //   let dataConfig = myChartData.config.data;
    //   // var chart_data_hudimity = dataConfig.datasets[0].data;
    //   // var chart_data_temperature = dataConfig.datasets[1].data;
    //   // var chart_data_co2 = dataConfig.datasets[2].data;
    //   // var chart_label = dataConfig.labels;
    //   //update data
    //   items.forEach((item) => {
    //     chart_data_hudimity.shift();
    //     chart_data_temperature.shift();
    //     chart_data_co2.shift();
    //     chart_labels.shift();
    //     chart_labels.push(item["time"]);
    //     chart_data_hudimity.push(item["value"][0]);
    //     chart_data_temperature.push(item["value"][1]);
    //     chart_data_co2.push(item["value"][2]);
    //   });

    //   switch (tab_active) {
    //     case 0:
    //       dataConfig.datasets[0].data = chart_data_hudimity;
    //       dataConfig.datasets[1].data = chart_data_temperature;
    //       dataConfig.datasets[2].data = chart_data_co2;
    //       break;
    //     case 1:
    //       dataConfig.datasets[0].data = chart_data_hudimity;
    //       break;
    //     case 2:
    //       dataConfig.datasets[1].data = chart_data_temperature;
    //       break;
    //     case 3:
    //       dataConfig.datasets[2].data = chart_data_co2;
    //       break;
    //   }
    //   dataConfig.labels = chart_labels;
    //   myChartData.update();
    // }
    // //#endregion

    // //#region  soil template
    // var chart_soil_temperature_labels = [];
    // var chart_soil_temperature_data = [];

    // function initChartSoilTemperatureData(items) {
    //   items.forEach((item) => {
    //     chart_soil_temperature_labels.push(item["time"]);
    //     chart_soil_temperature_data.push(item["value"]);
    //   });
    // }
    // fetch_data("area", 5, initChartSoilTemperatureData);
    // var ctx = document.getElementById("chartSoilTemperature").getContext("2d");

    // var gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

    // gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
    // gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
    // gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors

    // var chartSoilTemperatureData = new Chart(ctx, {
    //   type: "bar",
    //   responsive: true,
    //   legend: {
    //     display: false,
    //   },
    //   data: {
    //     labels: chart_soil_temperature_labels,
    //     datasets: [
    //       {
    //         label: "Countries",
    //         fill: true,
    //         backgroundColor: gradientStroke,
    //         hoverBackgroundColor: gradientStroke,
    //         borderColor: "#1f8ef1",
    //         borderWidth: 2,
    //         borderDash: [],
    //         borderDashOffset: 0.0,
    //         data: chart_soil_temperature_data,
    //       },
    //     ],
    //   },
    //   options: gradientBarChartConfiguration,
    // });
    // function updateChartSoilTemperatureData(items) {
    //   var dataConfig = chartSoilTemperatureData.config.data;
    //   // var chart_data_hudimity = dataConfig.datasets[0].data;
    //   // var chart_data_temperature = dataConfig.datasets[1].data;
    //   // var chart_data_co2 = dataConfig.datasets[2].data;
    //   // var chart_label = dataConfig.labels;
    //   //update data
    //   items.forEach((item) => {
    //     chart_soil_temperature_labels.shift();
    //     chart_soil_temperature_data.shift();
    //     chart_soil_temperature_labels.push(item["time"]);
    //     chart_soil_temperature_data.push(item["value"]);
    //   });
    //   dataConfig.labels = chart_soil_temperature_labels;
    //   dataConfig.datasets[0].data = chart_soil_temperature_data;
    //   chartSoilTemperatureData.update();
    // }

    // //#endregion

    // setInterval(function () {
    //   fetch_data("bar", 1, updateBigChartData);
    //   fetch_data("pie", 1, updateChartSoilHudimityData);
    //   fetch_data("area", 1, updateChartSoilTemperatureData);
    //   // smyNewChart.Line(data, optionsNoAnimation);
    // }, 5000);
  },

  initGoogleMaps: function () {
    var myLatlng = new google.maps.LatLng(40.748817, -73.985428);
    var mapOptions = {
      zoom: 13,
      center: myLatlng,
      scrollwheel: false, //we disable de scroll over the map, it is a really annoing when you scroll through page
      styles: [
        {
          elementType: "geometry",
          stylers: [
            {
              color: "#1d2c4d",
            },
          ],
        },
        {
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#8ec3b9",
            },
          ],
        },
        {
          elementType: "labels.text.stroke",
          stylers: [
            {
              color: "#1a3646",
            },
          ],
        },
        {
          featureType: "administrative.country",
          elementType: "geometry.stroke",
          stylers: [
            {
              color: "#4b6878",
            },
          ],
        },
        {
          featureType: "administrative.land_parcel",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#64779e",
            },
          ],
        },
        {
          featureType: "administrative.province",
          elementType: "geometry.stroke",
          stylers: [
            {
              color: "#4b6878",
            },
          ],
        },
        {
          featureType: "landscape.man_made",
          elementType: "geometry.stroke",
          stylers: [
            {
              color: "#334e87",
            },
          ],
        },
        {
          featureType: "landscape.natural",
          elementType: "geometry",
          stylers: [
            {
              color: "#023e58",
            },
          ],
        },
        {
          featureType: "poi",
          elementType: "geometry",
          stylers: [
            {
              color: "#283d6a",
            },
          ],
        },
        {
          featureType: "poi",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#6f9ba5",
            },
          ],
        },
        {
          featureType: "poi",
          elementType: "labels.text.stroke",
          stylers: [
            {
              color: "#1d2c4d",
            },
          ],
        },
        {
          featureType: "poi.park",
          elementType: "geometry.fill",
          stylers: [
            {
              color: "#023e58",
            },
          ],
        },
        {
          featureType: "poi.park",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#3C7680",
            },
          ],
        },
        {
          featureType: "road",
          elementType: "geometry",
          stylers: [
            {
              color: "#304a7d",
            },
          ],
        },
        {
          featureType: "road",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#98a5be",
            },
          ],
        },
        {
          featureType: "road",
          elementType: "labels.text.stroke",
          stylers: [
            {
              color: "#1d2c4d",
            },
          ],
        },
        {
          featureType: "road.highway",
          elementType: "geometry",
          stylers: [
            {
              color: "#2c6675",
            },
          ],
        },
        {
          featureType: "road.highway",
          elementType: "geometry.fill",
          stylers: [
            {
              color: "#9d2a80",
            },
          ],
        },
        {
          featureType: "road.highway",
          elementType: "geometry.stroke",
          stylers: [
            {
              color: "#9d2a80",
            },
          ],
        },
        {
          featureType: "road.highway",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#b0d5ce",
            },
          ],
        },
        {
          featureType: "road.highway",
          elementType: "labels.text.stroke",
          stylers: [
            {
              color: "#023e58",
            },
          ],
        },
        {
          featureType: "transit",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#98a5be",
            },
          ],
        },
        {
          featureType: "transit",
          elementType: "labels.text.stroke",
          stylers: [
            {
              color: "#1d2c4d",
            },
          ],
        },
        {
          featureType: "transit.line",
          elementType: "geometry.fill",
          stylers: [
            {
              color: "#283d6a",
            },
          ],
        },
        {
          featureType: "transit.station",
          elementType: "geometry",
          stylers: [
            {
              color: "#3a4762",
            },
          ],
        },
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [
            {
              color: "#0e1626",
            },
          ],
        },
        {
          featureType: "water",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#4e6d70",
            },
          ],
        },
      ],
    };

    var map = new google.maps.Map(document.getElementById("map"), mapOptions);

    var marker = new google.maps.Marker({
      position: myLatlng,
      title: "Hello World!",
    });

    // To add the marker to the map, call setMap();
    marker.setMap(map);
  },

  showNotification: function (from, align) {
    color = Math.floor(Math.random() * 4 + 1);

    $.notify(
      {
        icon: "tim-icons icon-bell-55",
        message:
          "Welcome to <b>Black Dashboard</b> - a beautiful freebie for every web developer.",
      },
      {
        type: type[color],
        timer: 8000,
        placement: {
          from: from,
          align: align,
        },
      }
    );
  },
};
