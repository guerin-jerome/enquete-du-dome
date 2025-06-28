import { useState } from "react";
import { client } from "~/utils/supabase";

interface Solution {
  id: number;
  name: string;
}

const solutions = [
  { id: 1, name: "florian" },
  { id: 2, name: "pa" },
];

export function Etape41({
  onComplete,
  utilisateur,
  etape,
}: {
  onComplete: () => void;
  utilisateur: string;
  etape: number;
}) {
  const [solution, setSolution] = useState<Solution[]>(
    etape > 4.1 ? solutions : []
  );
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(etape > 4.1 ? "success" : "current");

  const nameSelector = (index: number) => (
    <select
      value={solution.find((s) => s.id === index)?.name || "-"}
      disabled={etape > 4.1}
      className="name-selector"
      onChange={(e) => {
        setStatus("current");
        setSolution([
          ...solution.filter((it) => it.id !== index),
          { id: index, name: e.target.value },
        ]);
      }}
    >
      <option value="-">-</option>
      <option value="melanie">Mélanie</option>
      <option value="axelle">Axelle</option>
      <option value="pierre">Pierre</option>
      <option value="pa">Paul-Arthur</option>
      <option value="marion">Marion</option>
      <option value="florian">Florian</option>
      <option value="lea">Léa</option>
      <option value="jerome">Jérôme</option>
    </select>
  );

  const soumettre = async () => {
    setLoading(true);
    if (
      solution.find((s) => s.name === "pa") &&
      solution.find((s) => s.name === "florian")
    ) {
      const { error } = await client
        .from("utilisateurs")
        .update({ current_step: 4.2 })
        .eq("nom_utilisateur", utilisateur)
        .select();

      setLoading(false);
      if (!error) {
        setStatus("success");
        onComplete();
      }
    } else {
      setLoading(false);
      setStatus("error");
    }
  };

  return (
    <section className="step" id="4-1">
      <p>
        En ouvrant l'<em>enveloppe </em>
        <strong>I</strong> et à l'aide la bague, trouve les deux personnes qui
        n'ont rien à voir avec le meurtre de Mélanie.
      </p>
      <div id="question-occupation-toilette">
        {nameSelector(1)}
        <p>ET</p>
        {nameSelector(2)}
      </div>
      {status !== "success" && etape === 4.1 && (
        <div id="soumission">
          <button onClick={soumettre}>
            {loading ? "Chargement..." : "Soumettre"}
          </button>
          <span>{status === "error" && <>- Mauvaise réponse</>}</span>
        </div>
      )}
    </section>
  );
}
