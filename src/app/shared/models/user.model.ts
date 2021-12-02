

export interface User {
  id: number;
  first_name: string,
  last_name: string,
  title: string,
  summary: string,
  tel: string,
  photo: string,
  cv: string,
  email: string,
  email_verified_at: Date,
  created_at: Date,
  updated_at: Date,
  two_factor_secret: any,
  two_factor_recovery_codes: any,
}
