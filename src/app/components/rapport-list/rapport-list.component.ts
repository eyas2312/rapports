import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RapportService } from '../../services/rapport.service';
import { RapportIndex } from '../../models/rapport.model';

@Component({
  selector: 'app-rapport-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rapport-list.component.html',
  styleUrls: ['./rapport-list.component.css']
})
export class RapportListComponent implements OnInit {
  rapports: RapportIndex[] = [];
  filteredRapports: RapportIndex[] = [];
  totalRapports = 0;
  totalLignes = 0;
  rapportsActifs = 0;
  
  searchTerm = '';
  sortBy: 'nom' | 'lignes' = 'nom';
  sortOrder: 'asc' | 'desc' = 'asc';

  constructor(
    private rapportService: RapportService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadRapports();
  }

  loadRapports(): void {
    this.rapportService.getIndexData().subscribe(data => {
      this.totalRapports = data.total;
      this.totalLignes = data.rapports.reduce((sum, r) => sum + r.nombre_lignes, 0);
      
      this.rapportService.getRapportsActifs().subscribe(actifs => {
        this.rapports = actifs;
        this.rapportsActifs = actifs.length;
        this.applyFilters();
      });
    });
  }

  onSearch(): void {
    this.applyFilters();
  }

  onSortChange(): void {
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredRapports = this.rapports.filter(r =>
      r.nom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      r.fichier.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    this.filteredRapports.sort((a, b) => {
      let valA = this.sortBy === 'nom' ? a.nom : a.nombre_lignes;
      let valB = this.sortBy === 'nom' ? b.nom : b.nombre_lignes;

      if (typeof valA === 'string' && typeof valB === 'string') {
        const comparison = valA.localeCompare(valB, 'fr', { numeric: true });
        return this.sortOrder === 'asc' ? comparison : -comparison;
      }

      const comparison = (valA as number) - (valB as number);
      return this.sortOrder === 'asc' ? comparison : -comparison;
    });
  }

  openRapport(rapport: RapportIndex): void {
    this.router.navigate(['/rapport', rapport.nom]);
  }
}