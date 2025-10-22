# Supabase Database Schema

## Tables

### users
```sql
CREATE TABLE users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own data
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON users
  FOR INSERT WITH CHECK (auth.uid() = id);
```

### habits
```sql
CREATE TABLE habits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  color TEXT DEFAULT 'green' NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE habits ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own habits
CREATE POLICY "Users can view own habits" ON habits
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own habits" ON habits
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own habits" ON habits
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own habits" ON habits
  FOR DELETE USING (auth.uid() = user_id);
```

### habit_completions
```sql
CREATE TABLE habit_completions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  habit_id UUID REFERENCES habits(id) ON DELETE CASCADE NOT NULL,
  completion_date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(habit_id, completion_date)
);

-- Enable RLS
ALTER TABLE habit_completions ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see completions for their habits
CREATE POLICY "Users can view own habit completions" ON habit_completions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM habits 
      WHERE habits.id = habit_completions.habit_id 
      AND habits.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own habit completions" ON habit_completions
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM habits 
      WHERE habits.id = habit_completions.habit_id 
      AND habits.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete own habit completions" ON habit_completions
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM habits 
      WHERE habits.id = habit_completions.habit_id 
      AND habits.user_id = auth.uid()
    )
  );
```

## Functions

### Get user habits with completions
```sql
CREATE OR REPLACE FUNCTION get_user_habits_with_completions(user_uuid UUID)
RETURNS TABLE (
  id UUID,
  name TEXT,
  color TEXT,
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE,
  completed_dates DATE[]
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    h.id,
    h.name,
    h.color,
    h.created_at,
    h.updated_at,
    COALESCE(
      ARRAY_AGG(hc.completion_date ORDER BY hc.completion_date),
      ARRAY[]::DATE[]
    ) as completed_dates
  FROM habits h
  LEFT JOIN habit_completions hc ON h.id = hc.habit_id
  WHERE h.user_id = user_uuid
  GROUP BY h.id, h.name, h.color, h.created_at, h.updated_at
  ORDER BY h.created_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### Toggle habit completion
```sql
CREATE OR REPLACE FUNCTION toggle_habit_completion(
  habit_uuid UUID,
  completion_date DATE,
  user_uuid UUID
)
RETURNS BOOLEAN AS $$
DECLARE
  completion_exists BOOLEAN;
BEGIN
  -- Check if user owns the habit
  IF NOT EXISTS (
    SELECT 1 FROM habits 
    WHERE id = habit_uuid AND user_id = user_uuid
  ) THEN
    RETURN FALSE;
  END IF;

  -- Check if completion exists
  SELECT EXISTS(
    SELECT 1 FROM habit_completions 
    WHERE habit_id = habit_uuid AND completion_date = completion_date
  ) INTO completion_exists;

  IF completion_exists THEN
    -- Remove completion
    DELETE FROM habit_completions 
    WHERE habit_id = habit_uuid AND completion_date = completion_date;
    RETURN FALSE;
  ELSE
    -- Add completion
    INSERT INTO habit_completions (habit_id, completion_date)
    VALUES (habit_uuid, completion_date);
    RETURN TRUE;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```
