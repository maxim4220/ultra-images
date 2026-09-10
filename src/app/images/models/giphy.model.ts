export interface Pagination {
  readonly count: number;
  readonly total_count: number;
  readonly offset: number;
}

export interface GiphyImage {
  readonly url: string;
}

export interface GiphyGif {
  readonly images: {
    readonly fixed_width_downsampled: GiphyImage;
  };
}

export interface GiphySearchResponse {
  readonly data: readonly GiphyGif[];
  readonly pagination: Pagination;
}

export interface ImageSearchResult {
  readonly images: readonly string[];
  readonly pagination: Pagination;
}
