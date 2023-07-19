import { Component, ViewChild } from '@angular/core';
import { GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { InfluencerService } from '../services/influencer.service';
import { ToastService } from '../services/toast.service';
import { async } from 'rxjs';
import { UIChart } from 'primeng/chart';

@Component({
  selector: 'app-top10-graph',
  templateUrl: './top10-graph.component.html',
  styleUrls: ['./top10-graph.component.scss']
})
export class Top10GraphComponent {
  @ViewChild("findings") chart: UIChart | undefined;
  private gridApi: GridApi | undefined;
  gridOptions: GridOptions | undefined;
  public rowData$: any[] = [];
  options: any;
  data: any;
  labels: any[] = [];
  dados: number[] = [];

  constructor(private influencerSrv: InfluencerService, private toastSrv: ToastService) {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    this.getData().then((v) => {
      console.log('VAI GRAVAR', this.labels)
      this.data = {
        labels: this.labels, // ['a', 'b', 'c', 's', '4', '2', 'k', 'e'],
        //labels: ['a1', 'b', 'c', 's', '4', '2', 'k', 'e'],
        datasets: [
          {
            //data: this.d.dataset,
            data: this.dados, // [1, 1, 1, 4, 5, 6, 7, 8],
            backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500')],
            hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
          }
        ]
      };
      console.log('DATA ', this.data)
      this.chart!.data = this.data;
      this.chart!.refresh()
      console.log('DATA ', this.data)
    })
    console.log('VOLTOU DO GET this.d.datasets[0]');
    this.options = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: textColor
          }
        }
      }
    };
  }


  async ngOnInit(): Promise<any> {
    // const documentStyle = getComputedStyle(document.documentElement);
    // const textColor = documentStyle.getPropertyValue('--text-color');
    // this.gridOptions = {
    //   rowSelection: 'single',
    //   rowData: null,
    //   columnDefs: [
    //     { field: "nome", headerName: "Nome", flex: 5, },
    //     { field: "votos", headerName: "Votos", flex: 2, checkboxSelection: true },
    //   ],
    //   defaultColDef: {
    //     sortable: true,
    //     filter: true,
    //     cellStyle: { textAlign: 'left' }
    //   },
    //   animateRows: true,
    // }
    // this.getData().then((v) => {
    //   console.log('VAI GRAVAR', this.labels)
    //   this.data = {
    //     labels: this.labels, // ['a', 'b', 'c', 's', '4', '2', 'k', 'e'],
    //     //labels: ['a1', 'b', 'c', 's', '4', '2', 'k', 'e'],
    //     datasets: [
    //       {
    //         //data: this.d.dataset,
    //         data: [1, 1, 1, 4, 5, 6, 7, 8],
    //         backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500')],
    //         hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
    //       }
    //     ]
    //   };
    //   console.log('DATA ', this.data)
    // })
    // console.log('VOLTOU DO GET this.d.datasets[0]');
    // this.options = {
    //   plugins: {
    //     legend: {
    //       labels: {
    //         usePointStyle: true,
    //         color: textColor
    //       }
    //     }
    //   }
    // };

    //this.getData();
  }

  async getData() {
    console.log('entrou');
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    return await this.influencerSrv.top10Graph().subscribe((res) => {
      console.log('RETORNO ==> ', res.length);
      this.rowData$ = res;
      this.labels = [];
      this.dados = [];
      for (let index = 0; index < res.length; index++) {
        const element = res[index];
        console.log('ELEMENTO ===> ', element)
        this.labels.push(element.total.toString());
        this.dados.push(parseInt(element.count));
      };
      // this.gridApi?.setRowData(this.rowData$);
      console.log('SAIU DE GET DADOS', this.dados, this.labels)

      this.data = {
        labels: this.labels, // ['a', 'b', 'c', 's', '4', '2', 'k', 'e'],
        //labels: ['a1', 'b', 'c', 's', '4', '2', 'k', 'e'],
        datasets: [
          {
            //data: this.d.dataset,
            data: this.dados, // [1, 1, 1, 4, 5, 6, 7, 8],
            backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500')],
            hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
          }
        ]
      };
      console.log('DATA ', this.data)
      this.chart!.data = this.data;
      this.chart!.refresh()
      console.log('DATA ', this.data)

      return this.dados;
      // console.log('DATA APOS TRATA,ENTO', this.d);
    });
  }

}
