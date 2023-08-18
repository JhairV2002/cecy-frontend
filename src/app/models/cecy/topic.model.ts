
export interface TopicModel {
  id?: number;
  children?: TopicModel[];
  parent?: number;
  level?: number;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
