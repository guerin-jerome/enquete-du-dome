import { useState } from "react";
import { client } from "~/utils/supabase";

export function Etape33({
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
    if (solution.toLowerCase().includes("9")) {
      const { error } = await client
        .from("utilisateurs")
        .update({ current_step: 3.4 })
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
    <section className="step" id="3-3">
      <p>Quelle tragédie ! Léa a avorté !</p>
      <p>
        💡 Ouvre l'<em>enveloppe </em>
        <strong>H</strong> et assemble la chronologie jusqu'à la remise du
        courant. Cela t'éclairera pour la suite.
      </p>
      <p>
        Tu devras inscrire ici le code que tu auras trouvé grâce à l'équation
        suivante :
      </p>
      <p id="equation">(v*3 + 2^w - x + 20 + y - z) / 10</p>
      <input
        id="result-equation"
        type="number"
        disabled={status === "success" || etape > 3.3}
        value={etape > 3.3 ? "9" : solution}
        placeholder="Ex: 145"
        onChange={(e) => {
          setStatus("current");
          setSolution(e.target.value);
        }}
      />
      {status !== "success" && etape === 3.3 && (
        <div id="soumission">
          <button onClick={soumettre}>
            {loading ? "Chargement..." : "Soumettre"}
          </button>
          <span>{status === "error" && <>- Équation non résolue</>}</span>
        </div>
      )}
    </section>
  );
}
