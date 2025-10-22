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
    if (req.method === 'POST') {
      // Toggle habit completion
      const { date } = req.body;

      if (!date) {
        return res.status(400).json({ error: 'Date is required' });
      }

      // Validate date format (YYYY-MM-DD)
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(date)) {
        return res
          .status(400)
          .json({ error: 'Invalid date format. Use YYYY-MM-DD' });
      }

      const { data, error } = await supabase.rpc('toggle_habit_completion', {
        habit_uuid: id,
        completion_date: date,
        user_uuid: user.id,
      });

      if (error) {
        console.error('Error toggling completion:', error);
        return res.status(500).json({ error: 'Failed to toggle completion' });
      }

      return res.status(200).json({
        completed: data,
        message: data
          ? 'Habit marked as completed'
          : 'Habit marked as incomplete',
      });
    }

    if (req.method === 'GET') {
      // Get all completions for a habit
      const { data, error } = await supabase
        .from('habit_completions')
        .select('completion_date')
        .eq('habit_id', id)
        .order('completion_date', { ascending: true });

      if (error) {
        console.error('Error fetching completions:', error);
        return res.status(500).json({ error: 'Failed to fetch completions' });
      }

      const completedDates = data.map(c => c.completion_date);

      return res.status(200).json({ completedDates });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Completions API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
