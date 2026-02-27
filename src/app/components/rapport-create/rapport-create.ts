import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { TableRow } from '../../models/row.model';
import { ActivatedRoute, Router } from '@angular/router';
import { RapportService } from '../../services/rapport.service';
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
    private rapportService: RapportService,
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.rapportNumber = params['number'];
    });
  }

  rows: TableRow[] = [
    {
      col_1: 1,
      Nom: '',
      Denomination: '',
      HeureMin: '08:00',
      Min: 0,
      HeureMax: '14:00',
      Max: 0,
      MoyP: 0,
      UnitIng: '°C',
      QF: 0,
      editing: true,
    },
  ];

  addRow() {
    const newRow: TableRow = {
      col_1: this.rows.length + 1,
      Nom: '',
      Denomination: '',
      HeureMin: '08:00',
      Min: 0,
      HeureMax: '14:00',
      Max: 0,
      MoyP: 0,
      UnitIng: '',
      QF: 0,
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

  addRapport() {
    const exportData = this.rows.map(({ editing, ...row }) => ({
      col_1: row.col_1,
      Nom: row.Nom,
      Denomination: row.Denomination,
      HeureMin: row.HeureMin,
      Min: row.Min,
      HeureMax: row.HeureMax,
      Max: row.Max,
      MoyP: row.MoyP,
      UnitIng: row.UnitIng,
      QF: row.QF,
    }));

    const json = JSON.stringify(exportData, null, 2);

    const rapport = {
      id: `Rapport_${this.rapportNumber}`,
      dateCreation: new Date().toISOString(),
      donnees: exportData,
      total_lignes: exportData.length,
    };
    this.rapportService.addRapport(rapport).subscribe(() => {
      alert('Rapport ajouté avec succès !');
      this.router.navigate(['/']);
    });
  }
  goBack(): void {
    this.router.navigate(['/']);
  }
}
