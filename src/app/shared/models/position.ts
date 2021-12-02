export interface Position {
    id: number;
    title: string;
    project_id: number;
    status: string;
}

export enum STATUS {
  'Closed',
  'Open',
}