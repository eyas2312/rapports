import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-gas-usage-chart',
  templateUrl: './gas.html',
  styleUrls: ['./gas.css']
})
export class GasUsageChartComponent implements AfterViewInit {

  @ViewChild('gasChart') gasChart!: ElementRef<HTMLCanvasElement>;
  chart: any;

  ngAfterViewInit(): void {
    this.chart = new Chart(this.gasChart.nativeElement, {
      type: 'line',
      data: {
        labels: ['00:00','01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00'],
        datasets: [{
          label: 'Consommation de gaz (m³)',
          data: [5,4.8,4.5,4.3,4.1,4.5,5,6,7,8],
          borderColor: 'blue',
          backgroundColor: 'rgba(0,0,255,0.1)',
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Courbe Analytique d’Utilisation de Gaz'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Gaz Usage (m³)'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Heure'
            }
          }
        }
      }
    });
  }
}
