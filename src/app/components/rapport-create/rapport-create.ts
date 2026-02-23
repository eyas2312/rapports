import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableRow } from '../../models/row.model';
@Component({
  selector: 'app-rapport-create',
  imports: [CommonModule, FormsModule],
  templateUrl: './rapport-create.html',
  styleUrl: './rapport-create.css',
})
export class RapportCreate {
  rows: TableRow[] = [
    {
      col_1: 'A1',
      nom: 'Nom',
      denomination: 'Dénomination',
      heureMin: '08:00',
      min: 12.5,
      heureMax: '14:00',
      max: 38.2,
      moyp: 1.2,
      uniting: '°C',
      qf: 95,
      editing: true,
    },
  ];

  addRow() {
    const newRow: TableRow = {
      col_1: `A${this.rows.length + 1}`,
      nom: '',
      denomination: '',
      heureMin: '',
      min: null,
      heureMax: '',
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
}
