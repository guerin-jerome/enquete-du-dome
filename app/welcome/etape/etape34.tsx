import { useState } from "react";
import { client } from "~/utils/supabase";

interface Solution {
  id: number;
  name: string;
}

export function Etape34({
  onComplete,
  utilisateur,
  etape,
}: {
  onComplete: () => void;
  utilisateur: string;
  etape: number;
}) {
  const [solution, setSolution] = useState<Solution[]>([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("current");

  const nameSelector = (index: number) => (
    <select
      className="name-selector"
      onChange={(e) => {
        setStatus("current");
        setSolution([...solution, { id: index, name: e.target.value }]);
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
      solution.find((s) => s.name === "pierre") &&
      solution.find((s) => s.name === "lea")
    ) {
      const { error } = await client
        .from("utilisateurs")
        .update({ current_step: 4 })
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
    <section className="step" id="3-4">
      <p>L'histoire prend forme, les choses deviennent intéressantes...</p>
      <p>🚾 Selon toi, qui occupait les toilettes ?</p>
      <div id="question-occupation-toilette">
        {nameSelector(1)}
        <p>ET</p>
        {nameSelector(2)}
      </div>
      {status !== "success" && etape === 3.4 && (
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
