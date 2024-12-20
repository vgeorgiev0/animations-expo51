export type SearchPayload = {
  total_results: number;
  page: number;
  per_page: number;
  photos: Photo[];
};

export type Photo = {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  };
  liked: boolean;
  alt: string;
};

export enum CarouselImageVariant {
  ROUNDED = 'rounded',
  SQUARE = 'square',
}