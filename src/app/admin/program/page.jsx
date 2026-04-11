"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";

const ZILELE = [
  "Duminică", "Luni", "Marți", "Miercuri", "Joi", "Vineri", "Sâmbătă",
];

const TIPURI = [
  { value: "liturghie", label: "Liturghie" },
  { value: "vecernie", label: "Vecernie" },
  { value: "utrenie", label: "Utrenie" },
  { value: "paraclis", label: "Paraclis" },
  { value: "priveghere", label: "Priveghere" },
  { value: "acatist", label: "Acatist" },
  { value: "sfintirea_apei", label: "Sfințirea apei" },
];

const EMPTY = {
  zi_saptamana: 0,
  ora: "09:00",
  denumire: "",
  tip: "liturghie",
  detalii: "",
  activ: true,
  ordine: 0,
};

export default function AdminProgramPage() {
  const supabase = createClient();
  const [slujbe, setSlujbe] = useState([]);
  const [editing, setEditing] = useState(null); // null=list, "new"=add, id=edit
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  const load = useCallback(async () => {
    const { data } = await supabase
      .from("slujbe")
      .select("*")
      .order("zi_saptamana")
      .order("ordine");
    setSlujbe(data || []);
  }, [supabase]);

  useEffect(() => { load(); }, [load]);

  function startEdit(item) {
    setEditing(item.id);
    setForm({
      zi_saptamana: item.zi_saptamana,
      ora: item.ora?.slice(0, 5) || "09:00",
      denumire: item.denumire,
      tip: item.tip,
      detalii: item.detalii || "",
      activ: item.activ,
      ordine: item.ordine || 0,
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
      ...form,
      ora: form.ora + ":00",
      zi_saptamana: Number(form.zi_saptamana),
      ordine: Number(form.ordine),
    };

    let error;
    if (editing === "new") {
      ({ error } = await supabase.from("slujbe").insert(payload));
    } else {
      ({ error } = await supabase.from("slujbe").update(payload).eq("id", editing));
    }

    if (error) {
      setMsg("Eroare: " + error.message);
    } else {
      setMsg("Salvat cu succes.");
      setEditing(null);
      setForm(EMPTY);
      await load();
      // Revalidare
      fetch("/api/revalidate?path=/program-slujbe", { method: "POST" }).catch(() => {});
    }
    setSaving(false);
  }

  async function remove(id) {
    if (!confirm("Sigur vrei să ștergi această slujbă?")) return;
    await supabase.from("slujbe").delete().eq("id", id);
    await load();
    fetch("/api/revalidate?path=/program-slujbe", { method: "POST" }).catch(() => {});
  }

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl">Program slujbe</h1>
        {!editing && (
          <button
            onClick={startNew}
            className="px-4 py-1.5 bg-olive text-primary text-[0.8125rem] font-body font-500 rounded-[4px] hover:bg-olive/90 transition-colors"
          >
            + Adaugă slujbă
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
            {editing === "new" ? "Slujbă nouă" : "Editare slujbă"}
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div>
              <label className="block text-[0.75rem] font-body font-500 text-text-muted mb-1">Ziua</label>
              <select
                value={form.zi_saptamana}
                onChange={(e) => setForm({ ...form, zi_saptamana: e.target.value })}
                className="w-full px-2 py-1.5 border border-border rounded-[4px] bg-primary text-text text-[0.8125rem] font-body"
              >
                {ZILELE.map((z, i) => (
                  <option key={i} value={i}>{z}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[0.75rem] font-body font-500 text-text-muted mb-1">Ora</label>
              <input
                type="time"
                required
                value={form.ora}
                onChange={(e) => setForm({ ...form, ora: e.target.value })}
                className="w-full px-2 py-1.5 border border-border rounded-[4px] bg-primary text-text text-[0.8125rem] font-body"
              />
            </div>
            <div>
              <label className="block text-[0.75rem] font-body font-500 text-text-muted mb-1">Tip</label>
              <select
                value={form.tip}
                onChange={(e) => setForm({ ...form, tip: e.target.value })}
                className="w-full px-2 py-1.5 border border-border rounded-[4px] bg-primary text-text text-[0.8125rem] font-body"
              >
                {TIPURI.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[0.75rem] font-body font-500 text-text-muted mb-1">Ordine</label>
              <input
                type="number"
                min={0}
                value={form.ordine}
                onChange={(e) => setForm({ ...form, ordine: e.target.value })}
                className="w-full px-2 py-1.5 border border-border rounded-[4px] bg-primary text-text text-[0.8125rem] font-body"
              />
            </div>
          </div>

          <div>
            <label className="block text-[0.75rem] font-body font-500 text-text-muted mb-1">Denumire</label>
            <input
              type="text"
              required
              value={form.denumire}
              onChange={(e) => setForm({ ...form, denumire: e.target.value })}
              className="w-full px-2 py-1.5 border border-border rounded-[4px] bg-primary text-text text-[0.875rem] font-body"
              placeholder="Ex: Ceasurile III, VI și Sfânta Liturghie"
            />
          </div>

          <div>
            <label className="block text-[0.75rem] font-body font-500 text-text-muted mb-1">Detalii (opțional)</label>
            <input
              type="text"
              value={form.detalii}
              onChange={(e) => setForm({ ...form, detalii: e.target.value })}
              className="w-full px-2 py-1.5 border border-border rounded-[4px] bg-primary text-text text-[0.875rem] font-body"
              placeholder="Ex: cu binecuvântarea Părintelui Ghenadie"
            />
          </div>

          <label className="flex items-center gap-2 text-[0.8125rem] font-body text-text-secondary">
            <input
              type="checkbox"
              checked={form.activ}
              onChange={(e) => setForm({ ...form, activ: e.target.checked })}
              className="w-4 h-4"
            />
            Activ (vizibil pe site)
          </label>

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

      {/* ─── Lista slujbe ─── */}
      <div className="space-y-1">
        {ZILELE.map((ziNume, zi) => {
          const items = slujbe.filter((s) => s.zi_saptamana === zi);
          if (items.length === 0) return null;
          return (
            <div key={zi} className="mb-4">
              <h3 className="text-[0.875rem] font-heading font-600 text-grena mb-2">
                {ziNume}
              </h3>
              {items.map((item) => (
                <div
                  key={item.id}
                  className={`flex items-center justify-between py-2 px-3 rounded-[4px] text-[0.8125rem] font-body hover:bg-secondary transition-colors ${
                    !item.activ ? "opacity-50" : ""
                  }`}
                >
                  <div className="flex gap-3 items-baseline">
                    <span className="text-olive font-600 tabular-nums w-12">
                      {item.ora?.slice(0, 5)}
                    </span>
                    <span className="text-text">{item.denumire}</span>
                    <span className="text-text-muted text-[0.75rem]">
                      ({TIPURI.find((t) => t.value === item.tip)?.label})
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => startEdit(item)}
                      className="px-2 py-0.5 text-[0.75rem] text-olive hover:bg-secondary border border-transparent hover:border-border rounded transition-colors"
                    >
                      Editează
                    </button>
                    <button
                      onClick={() => remove(item.id)}
                      className="px-2 py-0.5 text-[0.75rem] text-grena hover:bg-secondary border border-transparent hover:border-border rounded transition-colors"
                    >
                      Șterge
                    </button>
                  </div>
                </div>
              ))}
            </div>
          );
        })}

        {slujbe.length === 0 && (
          <p className="text-text-muted text-[0.875rem] py-8 text-center">
            Nu există slujbe. Apasă „+ Adaugă slujbă" pentru a începe.
          </p>
        )}
      </div>
    </>
  );
}
