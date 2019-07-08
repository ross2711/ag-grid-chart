import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private columnDefs;
  private defaultColDef;
  private popupParent;
  private processChartOptions;
  private rowData: any;

  constructor() {
    this.columnDefs = [
      {
        headerName: 'Make',
        field: 'make',
        chartDataType: 'category',
        sortable: true,
        filter: true,
        checkboxSelection: true
      },
      {
        headerName: 'Model',
        field: 'model',
        chartDataType: 'category',
        sortable: true,
        filter: true
      },
      {
        headerName: 'Year',
        field: 'year',
        sortable: true,
        filter: true
      },
      {
        headerName: 'Engine',
        field: 'engine',
        sortable: true,
        filter: true
      },
      {
        headerName: 'Value (EUR)',
        field: 'value',
        sortable: true,
        filter: true
      }
    ];

    this.rowData = [
      {
        make: 'Ferrari',
        model: 'Monza',
        value: 200000,
        year: 2019,
        engine: 6.0
      },
      {
        make: 'Ferrari',
        model: 'GTC4 ',
        value: 200000,
        year: 2017,
        engine: 5.0
      },
      {
        make: 'Lamborghini',
        model: 'Huracan',
        value: 200000,
        year: 2018,
        engine: 6.0
      },
      {
        make: 'Lamborghini',
        model: 'Aventador',
        value: 300000,
        year: 2019,
        engine: 5.0
      },
      {
        make: 'Lamborghini',
        model: 'Urus ',
        value: 200000,
        year: 2019,
        engine: 6.0
      },
      {
        make: 'Rolls Royce',
        model: 'Ghost ',
        value: 350000,
        year: 2019,
        engine: 7.0
      },
      {
        make: 'Rolls Royce',
        model: 'Phantom',
        value: 300000,
        year: 2018,
        engine: 7.0
      },
      {
        make: 'Rolls Royce',
        model: 'Wraith',
        value: 300000,
        year: 2019,
        engine: 6.0
      }
    ];
    // use the grid option 'popupParent' so that the popup windows are not constrained to the bounds of the grid.
    this.popupParent = document.body;
    // the callback processChartOptions
    this.processChartOptions = function(params) {
      // customization based on chart type.
      var options = params.options;
      switch (params.type) {
        case 'groupedBar':
          options.legendPosition = 'bottom';
          break;
        case 'stackedBar':
          options.legendPosition = 'bottom';
          break;
        case 'pie':
          options.legendPosition = 'top';
          break;
        case 'doughnut':
          options.legendPosition = 'right';
          break;
        case 'line':
          options.legendPosition = 'left';
          break;
      }
      // return options;
      // var options = params.options;
      options.title = { text: 'Cars by Value (€)' };
      options.legendPosition = 'bottom';
      // if (params.type === 'groupedBar') {
      //   options.xAxis.labelRotation = 0;
      // }
      options.seriesDefaults.tooltipRenderer = function(params) {
        console.log(params);
        var value = params.datum[params.yField];
        // console.log(params.yField);
        // console.log(value);
        return `<b>${params.yField}</b>: ${value}`;
      };
      console.log(options);
      return options;
    };
  }

  onFirstDataRendered(params) {
    var chartRangeParams = {
      cellRange: {
        rowStartIndex: 0,
        rowEndIndex: 79,
        columns: ['make', 'value', 'model']
      },
      chartType: 'groupedBar',
      chartContainer: document.querySelector('#myChart'),
      aggregate: true
    };
    params.api.chartRange(chartRangeParams);
  }
}

// columnDefs = [
//   { headerName: 'Make', field: 'make', rowGroup: true },
//   { headerName: 'value', field: 'value' }
// ];
// autoGroupColumnDef = {
//   headerName: 'Model',
//   field: 'model',
//   cellRenderer: 'agGroupCellRenderer',
//   cellRendererParams: {
//     checkbox: true
//   }
// };

// gridOptions = {
//   // To enable charting in the grid
//   enableCharts: true,
//   // To allow users to create charts from a Range Selection and / or display the Chart Ranges in the grid
//   enableRangeSelection: true
// };
