// models/row.model.ts
export interface TableRow {
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
  editing: boolean;
}
