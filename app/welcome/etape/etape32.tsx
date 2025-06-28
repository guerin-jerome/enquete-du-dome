import { useState } from "react";
import { client } from "~/utils/supabase";

export function Etape32({
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
    if (solution.toLowerCase().includes("avortement")) {
      const { error } = await client
        .from("utilisateurs")
        .update({ current_step: 3.3 })
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
    <section className="step" id="3-2">
      <p>
        😱 Maintenant, en ouvrant l'<em>enveloppe </em>
        <strong>G</strong> et à l'aide des indices qui s'y trouve, inscrit ce
        qu'a découvert Mélanie.
      </p>
      <input
        type="text"
        disabled={status === "success" || etape > 3.2}
        value={etape > 3.2 ? "avortement" : solution}
        onChange={(e) => {
          setStatus("current");
          setSolution(e.target.value);
        }}
      />
      {status !== "success" && etape === 3.2 && (
        <div id="soumission">
          <button onClick={soumettre}>
            {loading ? "Chargement..." : "Soumettre"}
          </button>
          <span>{status === "error" && <>- Mauvais mot</>}</span>
        </div>
      )}
    </section>
  );
}
