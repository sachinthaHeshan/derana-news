export type NewsType = {
  id?: string;
  headline?: string;
  content?: string;
  imageURL?: string;
  writerUID?: string;
  createdAt?: string;
  category?: string;
};

export interface CategoryType {
  id?: string;
  name?: string;
}
