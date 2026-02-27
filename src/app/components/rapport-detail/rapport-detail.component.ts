import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { RapportService } from '../../services/rapport.service';
import { RapportData, RapportMetadata } from '../../models/rapport.model';

@Component({
  selector: 'app-rapport-detail',
  standalone: true,
  imports: [],
  templateUrl: './rapport-detail.component.html',
  styleUrls: ['./rapport-detail.component.css']
})
export class RapportDetailComponent implements OnInit {
  rapportNom: string = '';
  rapportData: RapportData | null = null;
  metadata: RapportMetadata = {};
  tableHeaders: string[] = [];
  tableData: Record<string, any>[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router, 
    private rapportService: RapportService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.rapportNom = params['nom'];
      this.loadRapport();
    });
  }

  loadRapport(): void {
    this.rapportService.getRapportData(this.rapportNom).subscribe(data => {
      this.rapportData = data;
      this.extractMetadata();
      this.prepareTableData();
    });
  }

  extractMetadata(): void {
    if (!this.rapportData) return;

    const metadataRows = this.rapportData.data.slice(0, 6);
    
    metadataRows.forEach(row => {
      const key = row['col_2'];
      let value = '';

      if (key === 'Heure:') {
        value = `${row['col_5']} ${row['col_6']} ${row['col_9']} ${row['col_11']}`;
      } else {
        value = row['col_5'] || row['col_6'] || '';
      }

      if (key && value) {
        const metaKey = key.replace(':', '').trim().toLowerCase();
        
        switch(metaKey) {
          case 'nom':
            this.metadata.nom = value;
            break;
          case 'commentaire':
            this.metadata.commentaire = value;
            break;
          case 'date de création':
            this.metadata.dateCreation = value;
            break;
          case 'heure':
            this.metadata.heureDebut = value.split('A')[0].replace('De', '').trim();
            this.metadata.heureFin = value.split('A')[1]?.trim();
            break;
          case 'intervalle de temps':
            this.metadata.intervalle = value;
            break;
          case 'remarque':
            this.metadata.remarque = value;
            break;
        }
      }
    });
  }

  prepareTableData(): void {
    if (!this.rapportData) return;

    const headerRow = this.rapportData.data[6];
    this.tableHeaders = ['col_1', 'col_3', 'col_7', 'col_8', 'col_10', 'col_12', 'col_13', 'col_15', 'col_18', 'col_20']
      .map(col => headerRow[col] || col);

    this.tableData = this.rapportData.data.slice(7, 19);
  }

  getTableValue(row: Record<string, any>, index: number): string {
    const colKeys = ['col_1', 'col_3', 'col_7', 'col_8', 'col_10', 'col_12', 'col_13', 'col_15', 'col_18', 'col_20'];
    return row[colKeys[index]] || '';
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
