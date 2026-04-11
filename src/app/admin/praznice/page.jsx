"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";

const EMPTY = {
  data: "",
  nume: "",
  descriere_scurta: "",
  program_special: "",
  priveghere: false,
  ora_priveghere: "",
  dezlegare_peste: false,
  este_hram: false,
};

function formatData(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("ro-RO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function AdminPraznicePage() {
  const supabase = createClient();
  const [praznice, setPraznice] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  const load = useCallback(async () => {
    const { data } = await supabase
      .from("praznice")
      .select("*")
      .order("data", { ascending: true });
    setPraznice(data || []);
  }, [supabase]);

  useEffect(() => { load(); }, [load]);

  function startEdit(item) {
    setEditing(item.id);
    setForm({
      data: item.data || "",
      nume: item.nume || "",
      descriere_scurta: item.descriere_scurta || "",
      program_special: item.program_special || "",
      priveghere: item.priveghere || false,
      ora_priveghere: item.ora_priveghere?.slice(0, 5) || "",
      dezlegare_peste: item.dezlegare_peste || false,
      este_hram: item.este_hram || false,
    });
    setMsg("");
  }

  function startNew() {
    setEditing("new");
    setForm(EMPTY);
    setMsg("");
  }

  function cancel() {
    setEditing(null);
    setForm(EMPTY);
  }

  async function save(e) {
    e.preventDefault();
    setSaving(true);
    setMsg("");

    const payload = {
      data: form.data,
      nume: form.nume,
      descriere_scurta: form.descriere_scurta || null,
      program_special: form.program_special || null,
      priveghere: form.priveghere,
      ora_priveghere: form.priveghere && form.ora_priveghere
        ? form.ora_priveghere + ":00"
        : null,
      dezlegare_peste: form.dezlegare_peste,
      este_hram: form.este_hram,
    };

    let error;
    if (editing === "new") {
      ({ error } = await supabase.from("praznice").insert(payload));
    } else {
      ({ error } = await supabase.from("praznice").update(payload).eq("id", editing));
    }

    if (error) {
      setMsg("Eroare: " + error.message);
    } else {
      setMsg("Salvat cu succes.");
      setEditing(null);
      setForm(EMPTY);
      await load();
      fetch("/api/revalidate?path=/program-slujbe", { method: "POST" }).catch(() => {});
    }
    setSaving(false);
  }

  async function remove(id) {
    if (!confirm("Sigur vrei să ștergi acest praznic?")) return;
    await supabase.from("praznice").delete().eq("id", id);
    await load();
    fetch("/api/revalidate?path=/program-slujbe", { method: "POST" }).catch(() => {});
  }

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl">Praznice și sărbători</h1>
        {!editing && (
          <button
            onClick={startNew}
            className="px-4 py-1.5 bg-olive text-primary text-[0.8125rem] font-body font-500 rounded-[4px] hover:bg-olive/90 transition-colors"
          >
            + Adaugă praznic
          </button>
        )}
      </div>

      {msg && (
        <p className={`mb-4 text-[0.8125rem] ${msg.startsWith("Eroare") ? "text-grena" : "text-olive"}`}>
          {msg}
        </p>
      )}

      {/* ─── Formular ─── */}
      {editing && (
        <form onSubmit={save} className="mb-8 p-5 bg-secondary rounded-[4px] border border-border space-y-4">
          <h2 className="text-base font-heading font-600">
            {editing === "new" ? "Praznic nou" : "Editare praznic"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-[0.75rem] font-body font-500 text-text-muted mb-1">Data</label>
              <input
                type="date"
                required
                value={form.data}
                onChange={(e) => setForm({ ...form, data: e.target.value })}
                className="w-full px-2 py-1.5 border border-border rounded-[4px] bg-primary text-text text-[0.8125rem] font-body"
              />
            </div>
            <div>
              <label className="block text-[0.75rem] font-body font-500 text-text-muted mb-1">Nume praznic</label>
              <input
                type="text"
                required
                value={form.nume}
                onChange={(e) => setForm({ ...form, nume: e.target.value })}
                className="w-full px-2 py-1.5 border border-border rounded-[4px] bg-primary text-text text-[0.875rem] font-body"
                placeholder="Ex: Sf. Mare Mucenic Efrem cel Nou"
              />
            </div>
          </div>

          <div>
            <label className="block text-[0.75rem] font-body font-500 text-text-muted mb-1">Descriere scurtă</label>
            <input
              type="text"
              value={form.descriere_scurta}
              onChange={(e) => setForm({ ...form, descriere_scurta: e.target.value })}
              className="w-full px-2 py-1.5 border border-border rounded-[4px] bg-primary text-text text-[0.875rem] font-body"
              placeholder="Ex: Hramul mănăstirii. Sfânt grabnic ajutător."
            />
          </div>

          <div>
            <label className="block text-[0.75rem] font-body font-500 text-text-muted mb-1">
              Program special (fiecare linie = un rând pe site)
            </label>
            <textarea
              value={form.program_special}
              onChange={(e) => setForm({ ...form, program_special: e.target.value })}
              className="w-full px-2 py-1.5 border border-border rounded-[4px] bg-primary text-text text-[0.875rem] font-body min-h-[80px] resize-y"
              placeholder={"Luni 4 mai, ora 22:00 — Priveghere\nMarți 5 mai, ora 09:00 — Sfânta Liturghie"}
            />
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <label className="flex items-center gap-2 text-[0.8125rem] font-body text-text-secondary">
              <input
                type="checkbox"
                checked={form.priveghere}
                onChange={(e) => setForm({ ...form, priveghere: e.target.checked })}
                className="w-4 h-4"
              />
              Priveghere
            </label>
            {form.priveghere && (
              <div className="flex items-center gap-2">
                <label className="text-[0.75rem] font-body text-text-muted">Ora:</label>
                <input
                  type="time"
                  value={form.ora_priveghere}
                  onChange={(e) => setForm({ ...form, ora_priveghere: e.target.value })}
                  className="px-2 py-1 border border-border rounded-[4px] bg-primary text-text text-[0.8125rem] font-body"
                />
              </div>
            )}
            <label className="flex items-center gap-2 text-[0.8125rem] font-body text-text-secondary">
              <input
                type="checkbox"
                checked={form.dezlegare_peste}
                onChange={(e) => setForm({ ...form, dezlegare_peste: e.target.checked })}
                className="w-4 h-4"
              />
              Dezlegare la pește
            </label>
            <label className="flex items-center gap-2 text-[0.8125rem] font-body text-text-secondary">
              <input
                type="checkbox"
                checked={form.este_hram}
                onChange={(e) => setForm({ ...form, este_hram: e.target.checked })}
                className="w-4 h-4"
              />
              Hram
            </label>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-1.5 bg-text text-primary text-[0.8125rem] font-body font-500 rounded-[4px] hover:bg-text/90 disabled:opacity-50 transition-colors"
            >
              {saving ? "Se salvează..." : "Salvează"}
            </button>
            <button
              type="button"
              onClick={cancel}
              className="px-4 py-1.5 border border-border text-text-secondary text-[0.8125rem] font-body rounded-[4px] hover:bg-secondary transition-colors"
            >
              Anulează
            </button>
          </div>
        </form>
      )}

      {/* ─── Lista praznice ─── */}
      <div className="space-y-2">
        {praznice.map((item) => (
          <div
            key={item.id}
            className="flex items-start justify-between p-3 rounded-[4px] hover:bg-secondary transition-colors border border-transparent hover:border-border"
          >
            <div>
              <span className="text-[0.75rem] font-body text-text-muted block">
                {formatData(item.data)}
              </span>
              <span className={`text-[0.9375rem] font-heading font-500 ${item.este_hram ? "text-grena" : "text-text"}`}>
                {item.nume}
              </span>
              <div className="flex gap-2 mt-1">
                {item.este_hram && (
                  <span className="text-[0.6875rem] font-body text-grena bg-grena/10 px-1.5 py-0.5 rounded">Hram</span>
                )}
                {item.priveghere && (
                  <span className="text-[0.6875rem] font-body text-olive bg-olive/10 px-1.5 py-0.5 rounded">Priveghere</span>
                )}
                {item.dezlegare_peste && (
                  <span className="text-[0.6875rem] font-body text-text-muted bg-primary px-1.5 py-0.5 rounded border border-border">Pește</span>
                )}
              </div>
            </div>
            <div className="flex gap-1 shrink-0 ml-3">
              <button
                onClick={() => startEdit(item)}
                className="px-2 py-0.5 text-[0.75rem] text-olive hover:bg-primary border border-transparent hover:border-border rounded transition-colors"
              >
                Editează
              </button>
              <button
                onClick={() => remove(item.id)}
                className="px-2 py-0.5 text-[0.75rem] text-grena hover:bg-primary border border-transparent hover:border-border rounded transition-colors"
              >
                Șterge
              </button>
            </div>
          </div>
        ))}

        {praznice.length === 0 && (
          <p className="text-text-muted text-[0.875rem] py-8 text-center">
            Nu există praznice. Apasă „+ Adaugă praznic" pentru a începe.
          </p>
        )}
      </div>
    </>
  );
}
