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

  if (!access_token) {
    return res.status(401).json({ error: 'Access token required' });
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
      // Get all habits for user
      const { data, error } = await supabase.rpc(
        'get_user_habits_with_completions',
        { user_uuid: user.id }
      );

      if (error) {
        console.error('Error fetching habits:', error);
        return res.status(500).json({ error: 'Failed to fetch habits' });
      }

      // Transform data to match frontend format
      const habits = data.map(habit => ({
        id: habit.id,
        name: habit.name,
        color: habit.color,
        completedDates: new Set(habit.completed_dates || []),
        createdAt: habit.created_at,
        updatedAt: habit.updated_at,
      }));

      return res.status(200).json({ habits });
    }

    if (req.method === 'POST') {
      // Create new habit
      const { name, color = 'green' } = req.body;

      if (!name) {
        return res.status(400).json({ error: 'Habit name is required' });
      }

      const { data, error } = await supabase
        .from('habits')
        .insert({
          user_id: user.id,
          name: name.trim(),
          color,
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating habit:', error);
        return res.status(500).json({ error: 'Failed to create habit' });
      }

      return res.status(201).json({
        id: data.id,
        name: data.name,
        color: data.color,
        completedDates: new Set(),
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Habits API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
