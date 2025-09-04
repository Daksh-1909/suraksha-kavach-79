// src/lib/api.ts (or a new types.ts file)

export type Profile = {
  id: string; // uuid
  full_name: string;
  avatar_url: string;
};

export type Disaster = {
  id: number;
  name: string;
  description: string;
  icon_name: string;
};

export type Lesson = {
  id: number;
  title: string;
  content: string;
  disaster_id: number;
};

// ...add types for Quiz, Question, etc. as needed
// Add these types to your api.ts file

export type Quiz = {
  id: number;
  lesson_id: number;
  title: string;
};

export type Question = {
  id: number;
  quiz_id: number;
  question_text: string;
  options: string[]; // Supabase jsonb can be typed as an array
  correct_option: number;
};
// src/lib/api.ts

import { supabase } from './supabaseClient';
// Assuming you have the types defined in this file or imported them

// Function to get all disaster modules
export const getDisasters = async (): Promise<Disaster[]> => {
  const { data, error } = await supabase.from('disasters').select('*');
  if (error) {
    console.error('Error fetching disasters:', error);
    throw error;
  }
  return data || [];
};

// Function to get all lessons for a specific disaster
export const getLessonsForDisaster = async (disasterId: number): Promise<Lesson[]> => {
  const { data, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('disaster_id', disasterId) // Filter by the disaster_id column
    .order('order_in_module', { ascending: true }); // Order the lessons correctly

  if (error) {
    console.error('Error fetching lessons:', error);
    throw error;
  }
  return data || [];
};

// src/lib/api.ts

// Function to mark a lesson as completed for a user
export const markLessonAsComplete = async (userId: string, lessonId: number) => {
  const { data, error } = await supabase
    .from('user_progress')
    .insert([{ user_id: userId, lesson_id: lessonId }]);

  if (error) {
    // It might fail if the record already exists, which is fine.
    // You can handle specific error codes here if needed.
    console.error('Error marking lesson complete:', error);
    throw error;
  }
  return data;
};