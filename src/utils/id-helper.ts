import { v4 as uuidv4 } from 'uuid';

export function generateId(): string {
  return uuidv4();
}

export function getRandomCategoryIndex(categoryIds: string[]): number {
  return Math.floor(Math.random() * Math.floor(categoryIds.length));
}
