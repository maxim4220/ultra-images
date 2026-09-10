import { GiphySearchResponse, ImageSearchResult, Pagination } from '../app/images/models/giphy.model';

export const mockPagination: Pagination = {
  count: 25,
  offset: 0,
  total_count: 100,
};

export const mockImageUrls = ['https://media.giphy.com/media/one.gif', 'https://media.giphy.com/media/two.gif'] as const;

export function createPagination(overrides: Partial<Pagination> = {}): Pagination {
  return {
    ...mockPagination,
    ...overrides,
  };
}

export function createImageSearchResult(overrides: Partial<ImageSearchResult> = {}): ImageSearchResult {
  return {
    images: [...mockImageUrls],
    pagination: mockPagination,
    ...overrides,
  };
}

export function createGiphySearchResponse(urls: readonly string[] = mockImageUrls): GiphySearchResponse {
  return {
    data: urls.map((url) => ({
      images: {
        fixed_width_downsampled: { url },
      },
    })),
    pagination: mockPagination,
  };
}
