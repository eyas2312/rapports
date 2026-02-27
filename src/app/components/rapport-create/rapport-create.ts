import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { TableRow } from '../../models/row.model';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-rapport-create',
  imports: [FormsModule],
  templateUrl: './rapport-create.html',
  styleUrl: './rapport-create.css',
})
export class RapportCreate {
  rapportNumber: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.rapportNumber = params['number'];
    });
  }

  rows: TableRow[] = [
    {
      col_1: 'A1',
      nom: '',
      denomination: '',
      heureMin: '08:00',
      min: null,
      heureMax: '14:00',
      max: null,
      moyp: null,
      uniting: '°C',
      qf: null,
      editing: true,
    },
  ];

  addRow() {
    const newRow: TableRow = {
      col_1: `A${this.rows.length + 1}`,
      nom: '',
      denomination: '',
      heureMin: '08:00',
      min: null,
      heureMax: '14:00',
      max: null,
      moyp: null,
      uniting: '',
      qf: null,
      editing: true,
    };
    this.rows.push(newRow);
  }

  deleteRow(row: TableRow) {
    this.rows = this.rows.filter((r) => r.col_1 !== row.col_1);
  }

  exportToJson() {
    // Remove the 'editing' field from exported data
    const exportData = this.rows.map(({ editing, ...row }) => row);

    const json = JSON.stringify(exportData, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `rapport_${this.rapportNumber}.json`;
    a.click();

    URL.revokeObjectURL(url);
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
