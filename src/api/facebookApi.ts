// src/api/facebookApi.ts

import type { Lead, LeadForm } from "../types/facebookTypes";

const ACCESS_TOKEN = 'EAAO1YPeIbdABQJTkcA61yR5iEn21CZAFg4kt3Dw7H7VHrmxAxlFJXOqeZAPJM58iRcZATJWrmUIOoirS7HcZCUqWZAbVGM7gZBg8w4pjsmhE54iF0SqZAgiQoCGk1cvVuAlY7bhnncuzE6jBfNSbTO6RDj6nb2GMrALwIltYbn1XCr1ZA2X37ZAmf5alCjck6YC2qH6MZD';
const PAGE_ID = '118584934681142';
const API_VERSION = 'v18.0';

const BASE_URL = `https://graph.facebook.com/${API_VERSION}`;

export const getLeadForms = async (): Promise<LeadForm[]> => {
  const res = await fetch(`${BASE_URL}/${PAGE_ID}/leadgen_forms?access_token=${ACCESS_TOKEN}`);
  const data: { data: LeadForm[] } = await res.json();
  return data.data;
};

export const getLeadsByFormId = async (formId: string): Promise<Lead[]> => {
  const res = await fetch(`${BASE_URL}/${formId}/leads?access_token=${ACCESS_TOKEN}`);
  const data: { data: Lead[] } = await res.json();
  return data.data;
};