import { Component } from '@angular/core';
import 'ag-grid-enterprise';
import 'ag-grid-enterprise/chartsModule';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private columnDefs;
  private popupParent;
  private processChartOptions;
  private rowData: any;
  private sideBar;
  private gridOptions;

  constructor() {
    this.gridOptions = {
      // suppresses warning message on the console when 'defaultToolPanel' is used
      suppressPropertyNamesCheck: true
    };

    // column definitions
    this.columnDefs = [
      {
        headerName: 'Car Details',
        children: [
          {
            headerName: 'Make',
            field: 'make',
            chartDataType: 'category',
            sortable: true,
            filter: true
            // checkboxSelection: true
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
            chartDataType: 'excluded',
            sortable: true,
            filter: true
          },
          {
            headerName: 'Engine (L)',
            field: 'engine',
            chartDataType: 'excluded',
            sortable: true,
            filter: true,
            valueFormatter: numberFormatter
          },
          {
            headerName: 'Color',
            field: 'color',
            chartDataType: 'excluded',
            sortable: true,
            filter: true
          },
          {
            headerName: 'Value (EUR)',
            field: 'value',
            sortable: true,
            filter: true
          }
        ],
        defaultToolPanel: 'columns'
      }
    ];

    this.rowData = [
      {
        make: 'Ferrari',
        model: 'Monza',
        year: 2019,
        engine: 6.0,
        value: 200000,
        color: 'red'
      },
      {
        make: 'Ferrari',
        model: 'GTC4 ',
        year: 2017,
        engine: 5.0,
        value: 200000,
        color: 'red'
      },
      {
        make: 'Lamborghini',
        model: 'Huracan',
        year: 2018,
        engine: 6.0,
        value: 200000,
        color: 'yellow'
      },
      {
        make: 'Lamborghini',
        model: 'Aventador',
        year: 2019,
        engine: 5.0,
        value: 300000,
        color: 'yellow'
      },
      {
        make: 'Lamborghini',
        model: 'Urus ',
        year: 2019,
        engine: 6.0,
        value: 200000,
        color: 'yellow'
      },
      {
        make: 'Rolls Royce',
        model: 'Ghost ',
        year: 2019,
        engine: 7.0,
        value: 350000,
        color: 'blue'
      },
      {
        make: 'Rolls Royce',
        model: 'Phantom',
        year: 2018,
        engine: 7.0,
        value: 300000,
        color: 'black'
      },
      {
        make: 'Rolls Royce',
        model: 'Wraith',
        year: 2019,
        engine: 6.0,
        value: 300000,
        color: 'silver'
      }
    ];

    // sidebar configuration with filter panel set as default
    this.sideBar = {
      toolPanels: [
        {
          id: 'filters',
          labelDefault: 'Filters',
          labelKey: 'filters',
          iconKey: 'filter',
          toolPanel: 'agFiltersToolPanel'
        },
        {
          id: 'columns',
          labelDefault: 'Columns',
          labelKey: 'columns',
          iconKey: 'columns',
          toolPanel: 'agColumnsToolPanel'
        }
      ],
      defaultToolPanel: 'filters'
    };

    function numberFormatter(params) {
      return params.value.toFixed(1);
    }

    // use the grid option 'popupParent' so that the popup windows are not constrained to the bounds of the grid.
    this.popupParent = document.body;
    // The callback 'processChartOptions' is invoked once, before the chart is created, with ProcessChartOptionsParams
    this.processChartOptions = function(params) {
      // customization based on chart type.
      const options = params.options;
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
      // title
      options.title = {
        text: 'Cars by Value (€)'
      };
      // legend position
      options.legendPosition = 'bottom';
      // change label rotation
      if (params.type === 'groupedBar') {
        options.xAxis.labelRotation = 0;
      }
      // custom tooltipRenderer
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

  // firstDataRendered is fired the first time data is rendered into the grid.
  onFirstDataRendered(params) {
    console.log('onFirstDataRendered', params);
    const chartRangeParams = {
      cellRange: {
        columns: ['model', 'make', 'value']
      },
      chartType: 'groupedbar',
      chartContainer: document.querySelector('#myChart'),
      aggregate: true
    };
    params.api.chartRange(chartRangeParams);
  }
}
