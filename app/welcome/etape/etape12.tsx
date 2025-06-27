import { useState } from "react";
import { client } from "~/utils/supabase";

export function Etape12({
  onComplete,
  etape,
  utilisateur,
}: {
  onComplete: () => void;
  etape: number;
  utilisateur: string;
}) {
  const [loading, setLoading] = useState(false);
  const [solution, setSolution] = useState("");
  const [status, setStatus] = useState("current");

  const soumettre = async () => {
    setLoading(true);
    if (solution.toLowerCase().includes("couteau")) {
      const { error } = await client
        .from("utilisateurs")
        .update({ current_step: 2 })
        .eq("nom_utilisateur", utilisateur)
        .select();

      setLoading(false);
      if (!error) setStatus("success");
    } else {
      setLoading(false);
      setStatus("error");
    }
  };

  return (
    <div className="step" id="1-2">
      <div>
        <label htmlFor="arme">Quel est l'arme du crime ?</label>
        <div id="arme-choice">
          <input
            id="arme"
            type="text"
            placeholder="Ex : Revolver"
            value={solution}
            disabled={status === "success"}
            onChange={(event) => setSolution(event.target.value)}
          />
          {status === "success" && <p>✅</p>}
        </div>
      </div>
      {status !== "success" && (
        <div id="soumission">
          <button onClick={soumettre}>
            {loading ? "Chargement..." : "Soumettre"}
          </button>
          <span>{status === "error" && <>- Mauvaise arme</>}</span>
        </div>
      )}
      {status === "success" && (
        <>
          <p>
            Arme trouvée. Tu peux désormais ouvrir l'
            <em>enveloppe </em>
            <strong>B</strong>.
          </p>
          {etape === 1.2 && (
            <>
              <p>
                Une fois que tu as réussi à déchiffrer le message sur le papier
                et effectuer ce qu'on attends de toi, clique sur "OK" pour
                continuer.
              </p>
              <button onClick={onComplete}>OK</button>
            </>
          )}
        </>
      )}
    </div>
  );
}
