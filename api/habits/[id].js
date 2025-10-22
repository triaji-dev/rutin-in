import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export default async function handler(req, res) {
  const { access_token } =
    req.headers.authorization?.replace('Bearer ', '') || '';
  const { id } = req.query;

  if (!access_token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  if (!id) {
    return res.status(400).json({ error: 'Habit ID is required' });
  }

  // Verify the token and get user
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser(access_token);

  if (authError || !user) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  try {
    if (req.method === 'GET') {
      // Get specific habit
      const { data, error } = await supabase
        .from('habits')
        .select(
          `
          *,
          habit_completions(completion_date)
        `
        )
        .eq('id', id)
        .eq('user_id', user.id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return res.status(404).json({ error: 'Habit not found' });
        }
        console.error('Error fetching habit:', error);
        return res.status(500).json({ error: 'Failed to fetch habit' });
      }

      const completedDates = data.habit_completions.map(c => c.completion_date);

      return res.status(200).json({
        id: data.id,
        name: data.name,
        color: data.color,
        completedDates: new Set(completedDates),
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      });
    }

    if (req.method === 'PUT') {
      // Update habit
      const { name, color } = req.body;

      const updateData = {};
      if (name !== undefined) updateData.name = name.trim();
      if (color !== undefined) updateData.color = color;

      const { data, error } = await supabase
        .from('habits')
        .update(updateData)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return res.status(404).json({ error: 'Habit not found' });
        }
        console.error('Error updating habit:', error);
        return res.status(500).json({ error: 'Failed to update habit' });
      }

      return res.status(200).json({
        id: data.id,
        name: data.name,
        color: data.color,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      });
    }

    if (req.method === 'DELETE') {
      // Delete habit
      const { error } = await supabase
        .from('habits')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error deleting habit:', error);
        return res.status(500).json({ error: 'Failed to delete habit' });
      }

      return res.status(200).json({ message: 'Habit deleted successfully' });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Habit API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
