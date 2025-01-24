import { ReactNode } from "react";

export interface ComponentProps {
  children: ReactNode
}

export interface ButtonProps {
  title: string
  action?: () => void
  className?: string;
}

export interface MovieProps {
  id?: string
  posterImage: string
  releaseYear: string
  title: string
}

interface PrimaryImage {
  url: string
}

interface TitleText {
  text: string
}

interface ReleaseYear {
  year: string
}

export interface MoviesProps {
  title: string;
  imageUrl: string;
  description: string;
  releaseDate: string;
  imdbUrl: string;
  rating: string;
}
