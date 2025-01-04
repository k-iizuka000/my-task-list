import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export class TaskService {
  static async createTask(data: any) {
    const { data: inserted, error } = await supabase
      .from('tasks')
      .insert(data)
      .single();
    if (error) throw error;
    return inserted;
  }

  static async getAllTasks() {
    const { data, error } = await supabase
      .from('tasks')
      .select('*');
    if (error) throw error;
    return data;
  }

  static async updateTask(id: string, data: any) {
    const { data: updated, error } = await supabase
      .from('tasks')
      .update(data)
      .eq('id', id)
      .single();
    if (error) throw error;
    return updated;
  }

  static async deleteTask(id: string) {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id);
    if (error) throw error;
  }
}
