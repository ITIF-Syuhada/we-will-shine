-- Add kelas, rombel, and angkatan fields to students table
ALTER TABLE students
ADD COLUMN IF NOT EXISTS kelas VARCHAR(10),
ADD COLUMN IF NOT EXISTS rombel VARCHAR(10),
ADD COLUMN IF NOT EXISTS angkatan VARCHAR(10);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_students_kelas ON students(kelas);
CREATE INDEX IF NOT EXISTS idx_students_rombel ON students(rombel);
CREATE INDEX IF NOT EXISTS idx_students_angkatan ON students(angkatan);
CREATE INDEX IF NOT EXISTS idx_students_kelas_rombel ON students(kelas, rombel);

-- Add comments for documentation
COMMENT ON COLUMN students.kelas IS 'Student class level (e.g., X, XI, XII)';
COMMENT ON COLUMN students.rombel IS 'Student homeroom class (e.g., A, B, C)';
COMMENT ON COLUMN students.angkatan IS 'Student cohort year (e.g., 2024, 2025)';

