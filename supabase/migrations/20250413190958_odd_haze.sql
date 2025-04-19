/*
  # Create saved products table

  1. New Tables
    - `saved_products`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `product_name` (text)
      - `product_description` (text)
      - `product_reason` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `saved_products` table
    - Add policies for users to:
      - Insert their own saved products
      - View their own saved products
      - Delete their own saved products
*/

CREATE TABLE IF NOT EXISTS saved_products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  product_name text NOT NULL,
  product_description text NOT NULL,
  product_reason text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE saved_products ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can insert their own saved products"
  ON saved_products
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own saved products"
  ON saved_products
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own saved products"
  ON saved_products
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);