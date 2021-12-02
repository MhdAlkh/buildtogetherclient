

export interface Project {
  id: number;
  name: string;
  summary: string;
  ptype: string;
  category: string;
  totalFund: string;
  achievedFund: string;
  startDate: Date;
  endDate: Date;
  photo: string | null;
  created_at: Date;
  updated_at: Date;
  owner: string;
}


export enum PTYPE {
  'longTerm',
  'hackathon',
}


export enum PROJECT_CATEGORY {
  'technology', 'marketing','education','finance','business'
}

