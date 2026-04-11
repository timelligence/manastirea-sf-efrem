-- ═══════════════════════════════════════════════════════════════
-- Migration 001: Program Slujbe + Praznice
-- Mănăstirea Sf. Dionisie Exiguul & Sf. Efrem cel Nou
-- ═══════════════════════════════════════════════════════════════

-- Programul săptămânal al slujbelor
CREATE TABLE slujbe (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  zi_saptamana SMALLINT NOT NULL CHECK (zi_saptamana BETWEEN 0 AND 6),
  -- 0=Duminică, 1=Luni, 2=Marți, 3=Miercuri, 4=Joi, 5=Vineri, 6=Sâmbătă
  ora TIME NOT NULL,
  denumire TEXT NOT NULL,
  tip TEXT NOT NULL CHECK (tip IN (
    'liturghie', 'vecernie', 'utrenie', 'paraclis',
    'priveghere', 'acatist', 'sfintirea_apei'
  )),
  detalii TEXT,
  activ BOOLEAN DEFAULT true,
  ordine SMALLINT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Praznice și sărbători
CREATE TABLE praznice (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  data DATE NOT NULL,
  nume TEXT NOT NULL,
  descriere_scurta TEXT,
  program_special TEXT,
  priveghere BOOLEAN DEFAULT false,
  ora_priveghere TIME,
  dezlegare_peste BOOLEAN DEFAULT false,
  este_hram BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Indexuri
CREATE INDEX idx_slujbe_zi ON slujbe (zi_saptamana, ordine);
CREATE INDEX idx_praznice_data ON praznice (data);

-- RLS
ALTER TABLE slujbe ENABLE ROW LEVEL SECURITY;
ALTER TABLE praznice ENABLE ROW LEVEL SECURITY;

-- Public: read doar slujbele active
CREATE POLICY "Public read slujbe" ON slujbe
  FOR SELECT USING (activ = true);

-- Admin: CRUD complet pe slujbe
CREATE POLICY "Admin all slujbe" ON slujbe
  FOR ALL USING (auth.role() = 'authenticated');

-- Public: read toate praznicele
CREATE POLICY "Public read praznice" ON praznice
  FOR SELECT USING (true);

-- Admin: CRUD complet pe praznice
CREATE POLICY "Admin all praznice" ON praznice
  FOR ALL USING (auth.role() = 'authenticated');

-- Trigger updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER slujbe_updated_at
  BEFORE UPDATE ON slujbe
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
