export interface RapportIndex {
nom_rapport: any;
  nom: string;
  fichier: string;
  nombre_lignes: number;
}

export interface IndexData {
  total: number;
  rapports: RapportIndex[];
}

export interface RapportData {
  nom_rapport: string;
  headers: string[];
  data: Record<string, any>[];
  total_lignes: number;
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