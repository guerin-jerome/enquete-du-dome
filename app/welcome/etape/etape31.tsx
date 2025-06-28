import { useState } from "react";
import { client } from "~/utils/supabase";

export function Etape31({
  onComplete,
  utilisateur,
  etape,
}: {
  onComplete: () => void;
  utilisateur: string;
  etape: number;
}) {
  const [solution, setSolution] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("current");

  const soumettre = async () => {
    setLoading(true);
    if (solution.toLowerCase().includes("15324")) {
      const { error } = await client
        .from("utilisateurs")
        .update({ current_step: 3.2 })
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
    <section className="step" id="3-1">
      <p>
        ⏱️ Ouvre l'<em>enveloppe </em>
        <strong>F</strong> et retrace la frise chronologique afin de mieux
        comprendre le début de soirée.
      </p>
      <p>Quel est le code secret ?</p>
      <input
        type="number"
        disabled={status === "success" || etape > 3.1}
        value={etape > 3.1 ? "15324" : solution}
        onChange={(e) => {
          setStatus("current");
          setSolution(e.target.value);
        }}
      />
      {status !== "success" && etape === 3.1 && (
        <div id="soumission">
          <button onClick={soumettre}>
            {loading ? "Chargement..." : "Soumettre"}
          </button>
          <span>{status === "error" && <>- Mauvais code</>}</span>
        </div>
      )}
    </section>
  );
}
