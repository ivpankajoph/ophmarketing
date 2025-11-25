// src/types/facebookTypes.ts

export interface LeadForm {
  id: string;
  name: string;
  status: string;
  locale: string;
}

export interface LeadField {
  name: string;
  values: string[];
}

export interface Lead {
  id: string;
  created_time: string;
  field_data: LeadField[];
}

export interface PaginatedResponse<T> {
  data: T[];
  paging?: {
    cursors?: { before?: string; after?: string };
    next?: string;
  };
}