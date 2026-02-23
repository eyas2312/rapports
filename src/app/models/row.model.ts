// models/row.model.ts
export interface TableRow {
  col_1: string;
  nom: string;
  denomination: string;
  heureMin: string;
  min: number | null;
  heureMax: string;
  max: number | null;
  moyp: number | null;
  uniting: string;
  qf: number | null;
  editing: boolean;
}
