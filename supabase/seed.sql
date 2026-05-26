-- ═══════════════════════════════════════════════════════════════
-- Seed: Program tipic săptămânal
-- ATENȚIE: Ore estimate din postările Facebook.
-- Maica Stareță trebuie să verifice și să corecteze programul.
-- ═══════════════════════════════════════════════════════════════

-- Duminică (0)
INSERT INTO slujbe (zi_saptamana, ora, denumire, tip, ordine) VALUES
  (0, '09:00', 'Ceasurile III, VI și Sfânta Liturghie', 'liturghie', 1),
  (0, '17:00', 'Paraclisul Maicii Domnului', 'paraclis', 2);

-- Luni (1)
INSERT INTO slujbe (zi_saptamana, ora, denumire, tip, ordine) VALUES
  (1, '17:00', 'Vecernia', 'vecernie', 1);

-- Marți (2)
INSERT INTO slujbe (zi_saptamana, ora, denumire, tip, ordine) VALUES
  (2, '17:00', 'Vecernia', 'vecernie', 1);

-- Miercuri (3)
INSERT INTO slujbe (zi_saptamana, ora, denumire, tip, ordine) VALUES
  (3, '09:00', 'Ceasurile III, VI și Sfânta Liturghie', 'liturghie', 1),
  (3, '17:00', 'Vecernia', 'vecernie', 2);

-- Joi (4)
INSERT INTO slujbe (zi_saptamana, ora, denumire, tip, ordine) VALUES
  (4, '17:00', 'Vecernia', 'vecernie', 1);

-- Vineri (5)
INSERT INTO slujbe (zi_saptamana, ora, denumire, tip, ordine) VALUES
  (5, '09:00', 'Ceasurile III, VI și Sfânta Liturghie', 'liturghie', 1),
  (5, '17:00', 'Vecernia', 'vecernie', 2);

-- Sâmbătă (6)
INSERT INTO slujbe (zi_saptamana, ora, denumire, tip, ordine) VALUES
  (6, '09:00', 'Ceasurile III, VI și Sfânta Liturghie', 'liturghie', 1),
  (6, '17:00', 'Vecernia', 'vecernie', 2);

-- ═══════════════════════════════════════════════════════════════
-- Praznice apropiate (2026)
-- ═══════════════════════════════════════════════════════════════

INSERT INTO praznice (data, nume, descriere_scurta, program_special, priveghere, ora_priveghere, este_hram) VALUES
  ('2026-05-05', 'Sf. Mare Mucenic Efrem cel Nou',
   'Hramul mănăstirii. Sfânt grabnic ajutător în necazuri și boli.',
   E'Luni 4 mai, ora 22:00 — Priveghere\nMarți 5 mai, ora 09:00 — Ceasurile și Sfânta Liturghie',
   true, '22:00', true);

INSERT INTO praznice (data, nume, descriere_scurta, program_special, priveghere, ora_priveghere, dezlegare_peste) VALUES
  ('2026-05-31', 'Pogorârea Sfântului Duh — Rusalii',
   'Praznic Împărătesc. Pogorârea Sfântului Duh asupra Sfinților Apostoli. Începutul Postului Sfinților Apostoli Petru și Pavel.',
   E'Duminică 31 mai, orele 09:00 — Dumnezeiasca Liturghie, Vecernia plecării genunchilor\n17:00 — Paraclisul Maicii Domnului\nLuni 1 iunie, orele 09:00 — Utrenia, Dumnezeiasca Liturghie\nDuminică și Luni mănăstirea va fi deschisă de la 08:00 la 20:00!',
   false, null, true);

INSERT INTO praznice (data, nume, descriere_scurta, program_special, priveghere, ora_priveghere) VALUES
  ('2026-08-15', 'Adormirea Maicii Domnului',
   'Praznicul Adormirii Preasfintei Născătoare de Dumnezeu.',
   E'Joi 14 august, ora 22:00 — Priveghere\nVineri 15 august, ora 09:00 — Sfânta Liturghie',
   true, '22:00');

INSERT INTO praznice (data, nume, descriere_scurta, program_special, priveghere, ora_priveghere, este_hram) VALUES
  ('2026-09-01', 'Sf. Cuvios Dionisie Exiguul',
   'Hramul mănăstirii. Anul nou bisericesc.',
   E'Duminică 31 august, ora 22:00 — Priveghere\nLuni 1 septembrie, ora 09:00 — Sfânta Liturghie',
   true, '22:00', true);

INSERT INTO praznice (data, nume, descriere_scurta, program_special, priveghere, ora_priveghere) VALUES
  ('2026-12-25', 'Nașterea Domnului',
   'Praznic Împărătesc. Se dezleagă la toate.',
   E'Miercuri 24 decembrie, ora 22:00 — Priveghere\nJoi 25 decembrie, ora 09:00 — Sfânta Liturghie',
   true, '22:00');
