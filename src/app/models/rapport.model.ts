export interface LigneRapport {
  col_1: number;
  Nom: string;
  Denomination: string;
  HeureMin: string;
  Min: number;
  HeureMax: string;
  Max: number;
  MoyP: number;
  UnitIng: string;
  QF: number;
}

export interface Rapport {
  id: string;
  dateCreation: string;
  donnees: LigneRapport[];
  total_lignes: number;
}

export interface RapportResponse {
  rapports: Rapport[];
}

export interface RapportDetail {
  nom_rapport: string;
  data: any[];
}
export interface RapportMetadata {
  nom?: string;
  commentaire?: string;
  dateCreation?: string;
  heureDebut?: string;
  heureFin?: string;
  intervalle?: string;
  remarque?: string;
}
