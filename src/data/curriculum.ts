import type { Exercise } from '../types';
import { exercises1 } from './curriculum_part1';
import { exercises2 } from './curriculum_part2';
import { zone01Exercises } from './zone01';

const allExercises: Exercise[] = [...exercises1, ...exercises2, ...zone01Exercises];

export function getAllExercises(): Exercise[] {
  return allExercises;
}

export function getExerciseById(id: number): Exercise | undefined {
  return allExercises.find((e) => e.id === id);
}

export function getExercisesByCheckpoint(checkpoint: string): Exercise[] {
  return allExercises.filter((e) => e.checkpoint === checkpoint);
}
