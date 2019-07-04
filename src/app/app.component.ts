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
        headerName: 'Price',
        field: 'price',
        sortable: true,
        filter: true
      }
    ];
    // this.defaultColDef = {
    //   width: 200,
    //   resizable: true
    // };

    this.rowData = [
      {
        make: 'Ferrari',
        model: 'Monza',
        price: 200000,
        year: 2019,
        engine: 5.0
      },
      {
        make: 'Ferrari',
        model: 'Portofino',
        price: 250000,
        year: 2018,
        engine: 5.0
      },
      {
        make: 'Ferrari',
        model: 'GTC4 ',
        price: 200000,
        year: 2017,
        engine: 5.0
      },
      {
        make: 'Lamborghini',
        model: 'Huracan',
        price: 200000,
        year: 2018,
        engine: 5.0
      },
      {
        make: 'Lamborghini',
        model: 'Aventador',
        price: 250000,
        year: 2019,
        engine: 5.0
      },
      {
        make: 'Lamborghini',
        model: 'Urus ',
        price: 200000,
        year: 2019,
        engine: 5.0
      }
    ];

    this.popupParent = document.body;
    this.processChartOptions = function(params) {
      var opt = params.options;
      opt.title = { text: 'Cars for Sale' };
      opt.legendPosition = 'bottom';
      if (params.type === 'groupedBar') {
        opt.xAxis.labelRotation = 0;
      }
      opt.seriesDefaults.tooltipRenderer = function(params) {
        console.log(params);
        var value = params.datum[params.yField];
        // console.log(params.yField);
        // console.log(value);
        return `<b>${params.yField}</b>: ${value}`;
      };
      console.log(opt);
      return opt;
    };
  }

  onFirstDataRendered(params) {
    var chartRangeParams = {
      cellRange: {
        rowStartIndex: 0,
        rowEndIndex: 79,
        columns: ['make', 'price', 'model']
      },
      chartType: 'groupedBar',
      chartContainer: document.querySelector('#myChart'),
      aggregate: true
    };
    params.api.chartRange(chartRangeParams);
  }

  gridOptions = {
    // To enable charting in the grid
    enableCharts: true,
    // To allow users to create charts from a Range Selection and / or display the Chart Ranges in the grid
    enableRangeSelection: true
  };
}

// columnDefs = [
//   { headerName: 'Make', field: 'make', rowGroup: true },
//   { headerName: 'Price', field: 'price' }
// ];
// autoGroupColumnDef = {
//   headerName: 'Model',
//   field: 'model',
//   cellRenderer: 'agGroupCellRenderer',
//   cellRendererParams: {
//     checkbox: true
//   }
// };
