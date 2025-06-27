import { useState } from "react";
import { client } from "~/utils/supabase";

export function Etape21({
  onComplete,
  utilisateur,
}: {
  onComplete: () => void;
  utilisateur: string;
}) {
  const [loading, setLoading] = useState(false);
  const [solution, setSolution] = useState("");
  const [status, setStatus] = useState("current");

  const soumettre = async () => {
    setLoading(true);

    if (solution.toLowerCase() === "interrogatoire") {
      const { error } = await client
        .from("utilisateurs")
        .update({ current_step: 3 })
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
    <section className="step" id="2-1">
      <p>Les 14 images forment un mot, à toi de le trouver.</p>
      <input
        type="text"
        onChange={(e) => {
          setStatus("current");
          setSolution(e.target.value);
        }}
      />
      <br />
      {status !== "success" && (
        <div id="soumission">
          <button onClick={soumettre}>
            {loading ? "Chargement..." : "Soumettre"}
          </button>
          <span>{status === "error" && <>- Mauvais mot</>}</span>
        </div>
      )}

      {status === "success" && (
        <>
          <p>Très perspicace.</p>
          <p>
            Tu as trouvé la solution. Désormais, tu peux prendre l'
            <em>enveloppe </em>
            <strong>E</strong>.
          </p>
          <p>Une fois ouverte, clique sur "Fait" pour continuer.</p>
          <button onClick={onComplete}>Fait</button>
        </>
      )}
    </section>
  );
}
