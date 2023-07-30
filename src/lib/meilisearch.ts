"use client";

import { MeiliSearch, Index } from 'meilisearch';

class MeilisearchClient {
  private static instance: MeilisearchClient;
  private client: MeiliSearch;

  private constructor() {
    const host = "https://ms-4d4dc9f07c2a-106.lon.meilisearch.io";
    const apiKey = "d8c82c66e38501322f6a83a5eb464c062ff84b11"; // Use MEILISEARCH_SEARCH_KEY for more security

    if (!host) {
      throw new Error('MEILISEARCH_URL is not defined');
    }

    this.client = new MeiliSearch({ host, apiKey });
  }

  public static getInstance(): MeilisearchClient {
    if (!MeilisearchClient.instance) {
      MeilisearchClient.instance = new MeilisearchClient();
    }

    return MeilisearchClient.instance;
  }

  public getIndex(index: string): Index {
    return this.client.index(index);
  }

}

export const meilisearchClient = MeilisearchClient.getInstance();
