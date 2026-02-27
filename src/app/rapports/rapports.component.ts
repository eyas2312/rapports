import { Component, OnInit } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RapportService } from '../services/rapport.service';
import { RapportIndex } from '../models/rapport.model';

@Component({
  selector: 'app-rapports',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './rapports.html',
  styleUrls: ['./rapports.css'],
})
export class RapportsComponent implements OnInit {
  createNewRapport() {
    // Redirige vers la page de création de rapport avec le numero totalRapports + 1
    const newRapportNumber = this.totalRapports + 1;
    this.router.navigate(['/rapport/create', newRapportNumber]);
  }
  Math = Math;
  rapports: RapportIndex[] = [];
  filteredRapports: RapportIndex[] = [];
  totalRapports = 0;
  totalLignes = 0;
  rapportsActifs = 0;

  searchTerm = '';
  sortBy: 'nom' | 'lignes' = 'nom';
  sortOrder: 'asc' | 'desc' = 'asc';

  // 🆕 PAGINATION - AJOUTEZ CES PROPRIÉTÉS
  currentPage = 1;
  itemsPerPage = 12;
  totalPages = 0;
  paginatedRapports: RapportIndex[] = [];

  constructor(private rapportService: RapportService, private router: Router) {}

  ngOnInit(): void {
    console.log('Component initialized');
    this.loadRapports();
  }

  loadRapports(): void {
    this.rapportService.getIndexData().subscribe((data) => {
      console.log('Index data:', data);
      this.totalRapports = data.total;
      this.totalLignes = data.rapports.reduce((sum, r) => sum + r.nombre_lignes, 0);

      this.rapportService.getRapportsActifs().subscribe((actifs) => {
        console.log('Rapports actifs:', actifs);
        this.rapports = actifs;
        this.rapportsActifs = actifs.length;
        this.applyFilters();
      });
    });
  }

  onSearch(): void {
    this.currentPage = 1; // 🆕 Reset à la page 1 lors de la recherche
    this.applyFilters();
  }

  onSortChange(): void {
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredRapports = this.rapports.filter(
      (r) =>
        r.nom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        r.fichier.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    console.log('Filtered rapports:', this.filteredRapports);

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

    // 🆕 APPLIQUER LA PAGINATION
    this.updatePagination();
  }

  // 🆕 MÉTHODES DE PAGINATION - AJOUTEZ CES MÉTHODES
  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredRapports.length / this.itemsPerPage);

    // S'assurer que currentPage est valide
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages || 1;
    }

    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedRapports = this.filteredRapports.slice(startIndex, endIndex);

    console.log('Pagination:', {
      currentPage: this.currentPage,
      totalPages: this.totalPages,
      itemsPerPage: this.itemsPerPage,
      paginatedCount: this.paginatedRapports.length,
    });
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  onItemsPerPageChange(): void {
    this.currentPage = 1;
    this.updatePagination();
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxPagesToShow = 5;

    if (this.totalPages <= maxPagesToShow) {
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (this.currentPage <= 3) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
      } else if (this.currentPage >= this.totalPages - 2) {
        for (let i = this.totalPages - 4; i <= this.totalPages; i++) {
          pages.push(i);
        }
      } else {
        for (let i = this.currentPage - 2; i <= this.currentPage + 2; i++) {
          pages.push(i);
        }
      }
    }

    return pages;
  }

  openRapport(rapport: RapportIndex): void {
    console.log('Opening rapport:', rapport);
    this.router.navigate(['/rapport', rapport.nom]);
  }
}
