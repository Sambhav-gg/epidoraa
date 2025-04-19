/*
  # Revert recommendations history table

  This migration removes the recommendations_history table and its associated policies.
*/

DROP TABLE IF EXISTS recommendations_history;