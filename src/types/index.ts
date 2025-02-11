export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  images: string[];
  category: string;
  completionDate: string;
}