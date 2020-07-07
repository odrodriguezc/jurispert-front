import { Component, OnInit, Input } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { ActivatedRoute } from '@angular/router';
import { Task } from '../tasks/Task';
import { Event } from '../events/event';

@Component({
  selector: 'app-dashboard-chart',
  templateUrl: './dashboard-chart.component.html',
  styleUrls: ['./dashboard-chart.component.css'],
})
export class DashboardChartComponent implements OnInit {
  public lineChartData: ChartDataSets[] = [
    { data: [0, 0, 0, 0, 0, 0, 0], label: 'Taches' },
    // { data: [0, 0, 0, 0, 0, 0, 0], label: 'Evennements' },
  ];
  public lineChartLabels: Label[] = [
    'Lundi',
    'Mardi',
    'Mercredi',
    'jeudi',
    'Vendredi',
    'Samedi',
    'Dimanche',
  ];
  public lineChartOptions: ChartOptions = {
    responsive: true,
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.dataStats();
  }

  public dataStats() {
    let tasksSet = { data: [0, 0, 0, 0, 0, 0, 0], label: 'Taches' };
    this.route.snapshot.data.tasks.forEach((element: Task) => {
      let date = new Date(element.deadline);
      let day = date.getDay();
      (this.lineChartData[0].data[day] as number) += 10;
    });

    // let eventsSet = { data: [0, 0, 0, 0, 0, 0, 0], label: 'Evennements' };
    // this.route.snapshot.data.tasks.forEach((element: Event) => {
    //   let date = new Date(element.date);
    //   let day = date.getDay();
    //   (this.lineChartData[1].data[day] as number) += 10;
    // });

    // let totalSet = { data: [0, 0, 0, 0, 0, 0, 0], label: 'Total' };
    // for (let i = 0; i < 7; i++) {
    //   totalSet.data[i] = eventsSet.data[i] + tasksSet.data[i];
    // }
  }
}
