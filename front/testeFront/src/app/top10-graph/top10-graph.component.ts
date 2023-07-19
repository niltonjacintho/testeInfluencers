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
  @ViewChild("chart") chart: UIChart | undefined;
  private gridApi: GridApi | undefined;
  gridOptions: GridOptions | undefined;
  public rowData$: any[] = [];
  options: any;
  data: any;
  labels: String[] = [];
  dados: number[] = [];

  constructor(private influencerSrv: InfluencerService) { }
  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    this.getData();
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

  async getData() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    return await this.influencerSrv.top10Graph().subscribe((res) => {
      this.labels = [];
      this.dados = [];
      for (let index = 0; index < res.length; index++) {
        const element = res[index];
        this.labels.push(element.total.toString());
        this.dados.push(parseInt(element.count));
      };
      this.data = {
        labels: this.labels,
        datasets: [
          {
            label: 'Influencers x Votos',
            data: this.dados,
            backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500')],
            hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
          }
        ]
      };
      this.chart!.data = this.data;
      this.chart!.refresh()
      return this.dados;
    });
  }

}
