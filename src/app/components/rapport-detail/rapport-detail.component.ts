import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { RapportService } from '../../services/rapport.service';
import { LigneRapport, Rapport, RapportMetadata } from '../../models/rapport.model';

@Component({
  selector: 'app-rapport-detail',
  standalone: true,
  imports: [],
  templateUrl: './rapport-detail.component.html',
  styleUrls: ['./rapport-detail.component.css'],
})
export class RapportDetailComponent implements OnInit {
  rapportNom: string = '';
  rapportData: Rapport | null = null;
  rapportLignes: LigneRapport[] = [];
  metadata: RapportMetadata = {};
  tableHeaders: string[] = [
    'col n°',
    'Nom',
    'Denomination',
    'HeureMin',
    'Min',
    'HeureMax',
    'Max',
    'MoyP',
    'UnitIng',
    'QF',
  ];
  tableData: Record<string, any>[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private rapportService: RapportService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.rapportNom = params['nom'];
      this.loadRapport();
    });
  }

  loadRapport(): void {
    this.rapportService.getRapportData(this.rapportNom).subscribe((data) => {
      this.rapportData = data;
      this.rapportLignes = data.donnees || [];
      console.log('Rapport data aa:', this.rapportData);
      this.prepareTableData();
    });
  }

  prepareTableData(): void {
    console.log('Preparing table data from:', this.rapportData);
    if (!this.rapportLignes) return;
    this.tableData = this.rapportLignes.map((ligne, index) => ({
      'col n°': index + 1,
      Nom: ligne.Nom,
      Denomination: ligne.Denomination,
      HeureMin: ligne.HeureMin,
      Min: ligne.Min,
      HeureMax: ligne.HeureMax,
      Max: ligne.Max,
      MoyP: ligne.MoyP,
      UnitIng: ligne.UnitIng,
      QF: ligne.QF,
    }));
  }

  getTableValue(row: Record<string, any>, index: number): string {
    const header = this.tableHeaders[index];
    return row[header] !== undefined ? String(row[header]) : '';
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
