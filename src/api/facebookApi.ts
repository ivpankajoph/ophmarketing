// src/api/facebookApi.ts

import type { Lead, LeadForm } from "../types/facebookTypes";

const ACCESS_TOKEN = 'EAAO1YPeIbdABQMpfSzBjEZAW31Md3vFS3paKrd5bX94yuMZAZBRob42VLHKK90hZBT6ZB8ZCDKPMvD7YDRZBRSsveknORAZCxF1f7kEwEQ0QH8yeaiogcOBersBsbgp2lFr7fBZCFZAFCsl9g6v0sQwrIZBMqh5KyRvueV2hIBWZBtNM6HUToNS5kdcUF7x9ojW6HlbvsLUZD';
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