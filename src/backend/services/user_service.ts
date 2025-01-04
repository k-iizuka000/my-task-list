import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export class UserService {
  static async createUser(data: any) {
    const { data: inserted, error } = await supabase
      .from('users')
      .insert(data)
      .single();
    if (error) throw error;
    return inserted;
  }

  static async getAllUsers() {
    const { data, error } = await supabase
      .from('users')
      .select('*');
    if (error) throw error;
    return data;
  }

  static async updateUser(id: string, data: any) {
    const { data: updated, error } = await supabase
      .from('users')
      .update(data)
      .eq('id', id)
      .single();
    if (error) throw error;
    return updated;
  }

  static async deleteUser(id: string) {
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', id);
    if (error) throw error;
  }
}
