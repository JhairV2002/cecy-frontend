export interface Topic {
  id?: number;
  courseId?: number;
  children?: subtopicModel[];
  description?: string;
}

export interface subtopicModel {
  id?: number;
  topicId: number;
  description?: string;

}
