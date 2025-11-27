// src/api/facebookApi.ts

import type { Lead, LeadForm } from "../types/facebookTypes";

const ACCESS_TOKEN = 'EAAO1YPeIbdABQFvvsvpLjZCzC9ODpZBRMIZC3IXHyZClDi3j6zn5QmeBfdftYA0ZCtbPKestApmDbMZBIgqy13XdWHNOBjIOZCvw1GDGfc0tdhXJvnWpAZCuZCdEbapXkxeT3mMZCAu51qOVSL7mZBPxV7SA44ZBICzd0H5BFeDLO4TwkZBRGgVq326W5JBoJUltPkSqjNHjwL4oZD';
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