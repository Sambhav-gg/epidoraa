/*
  # Create recommendations history table

  1. New Tables
    - `recommendations_history`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `skin_type` (text)
      - `concerns` (text[])
      - `recommendations` (jsonb)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `recommendations_history` table
    - Add policies for users to:
      - Insert their own history
      - View their own history
*/

CREATE TABLE IF NOT EXISTS recommendations_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  skin_type text NOT NULL,
  concerns text[] DEFAULT '{}',
  recommendations jsonb NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE recommendations_history ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can insert their own history"
  ON recommendations_history
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own history"
  ON recommendations_history
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);