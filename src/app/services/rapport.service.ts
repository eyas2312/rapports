import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { LigneRapport, Rapport, RapportResponse } from '../models/rapport.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RapportService {
  private url = 'rapports.json';

  constructor(private http: HttpClient) {}

  getRapports(): Observable<RapportResponse> {
    return this.http.get<RapportResponse>(this.url);
  }

  getRapportsNumber(): Observable<number> {
    return this.getRapports().pipe(map((response) => response.rapports.length));
  }
  getRapportsActifs(): Observable<Number[]> {
    return this.getRapports().pipe(
      map((response: RapportResponse) => {
        return response.rapports.filter((r) => r.donnees.length > 0).map((r) => r.donnees.length);
      }),
    );
  }

  getRapportData(nom: string): Observable<any> {
    return this.getRapports().pipe(
      map((response: RapportResponse) => {
        const rapport = response.rapports.find((r) => r.id === nom);
        return rapport ? rapport : null;
      }),
    );
  }

  addRapport(rapport: Rapport) {
    rapport.total_lignes = rapport.donnees.length;
    return this.http.post('http://localhost:3000/rapports', rapport);
  }

  deleteRapport(nom: string) {
    return this.http.delete(`http://localhost:3000/rapports/${nom}`);
  }
}
