import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IndexData, RapportData, RapportIndex } from '../models/rapport.model';
import 
@Injectable({
  providedIn: 'root',
})
export class RapportService {
  constructor() {
    this.initializeIndexData();
  }

  private initializeIndexData(): void {}

  getIndexData(): Observable<IndexData> {}

  getRapportData(nom: string): Observable<RapportData> {}

  getRapportsActifs(): Observable<RapportIndex[]> {
    const actifs = this.indexData.rapports.filter((r) => r.nombre_lignes > 0);
    return of(actifs);
  }
}
