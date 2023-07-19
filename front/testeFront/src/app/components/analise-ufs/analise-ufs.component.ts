import { Component, ViewChild } from '@angular/core';
import { UIChart } from 'primeng/chart';
import { InfluencerService } from 'src/app/services/influencer.service';

@Component({
  selector: 'app-analise-ufs',
  templateUrl: './analise-ufs.component.html',
  styleUrls: ['./analise-ufs.component.scss']
})
export class AnaliseUfsComponent {
  @ViewChild("chart") chart: UIChart | undefined;

  data: any;
  options: any;

  constructor(private influencerSrv: InfluencerService) { }

  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          tension: 0.4
        },
        {
          label: 'Second Dataset',
          data: [28, 48, 40, 19, 86, 27, 90],
          fill: false,
          borderColor: documentStyle.getPropertyValue('--pink-500'),
          tension: 0.4
        }
      ]
    };

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 1.3,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };

    this.getData();
  }

  async getData() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    return await this.influencerSrv.graphUfs.subscribe((res) => {
      this.data.labels = [];
      this.data.datasets = [{}, {}];
      this.data.datasets[0].label = 'Influenciador x UF';
      this.data.datasets[1].label = 'Votos x UF';
      this.data.datasets[0].data = [];
      this.data.datasets[1].data = [];
      for (let index = 0; index < res.length; index++) {
        const element = res[index];
        this.data.labels.push(element.uf);
        this.data.datasets[0].data.push(element.total_uf)
        this.data.datasets[1].data.push(element.votos)
      };
      this.chart!.data = this.data;
      this.chart!.refresh()
      console.log(this.data);

      return this.data;
    });
  }

}
