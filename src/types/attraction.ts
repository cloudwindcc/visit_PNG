export interface Attraction {
  chinese_name: string;
  english_name: string;
  description: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  best_time_to_visit: string;
  travel_tips: string;
  audio_guide_highlights: string;
}
