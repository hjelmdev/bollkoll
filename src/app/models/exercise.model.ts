export interface Exercise {
  id: number;
  name: string;
  focusAreas: string[];
  participants: string[];
  environments: string[];
  spaces: string[];
  equipment: string[];
  tags: string[];
  durationSeconds: number;
  description: string;
  difficulty: string;
}
