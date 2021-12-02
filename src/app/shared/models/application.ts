export interface Application {
    id: number;
    applicant_id : number;
    position_id: number;
    status: string;
    comment: string;
}

export enum STATUS {
    'Closed',
    'Open',
    'inProcess'
  }