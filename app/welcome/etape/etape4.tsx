import { useState } from "react";
import { client } from "~/utils/supabase";

export function Etape4({
  onComplete,
  utilisateur,
  etape,
}: {
  onComplete: () => void;
  utilisateur: string;
  etape: number;
}) {
  const [loading, setLoading] = useState(false);

  const gotoNext = async () => {
    setLoading(true);
    const { error } = await client
      .from("utilisateurs")
      .update({ current_step: 4.1 })
      .eq("nom_utilisateur", utilisateur)
      .select();

    setLoading(false);
    if (!error) onComplete();
  };

  return (
    <section className="step" id="4">
      <p className="title">
        <strong>🔍 Étape 4</strong> - Des suspects deviennent innocents
      </p>
      <p>
        Il est temps d'éliminer deux suspects. Ouvre l'<em>enveloppe </em>
        <strong>I</strong>.
      </p>
      {etape >= 4 && (
        <>
          <p>
            🗺️ Tu vas devoir réaliser les instructions qui t'ont été fournis.
          </p>
          <p>
            💍 Rends-toi au Dôme de La Rochelle, Marion y a déposé la bague
            d'accès à l'annexe. Elle t'apportera des informations cruciales sur
            les deux suspects à innocenter.
          </p>
          {etape === 4 && (
            <button onClick={gotoNext}>
              {loading ? "Chargement..." : "Je l'ai trouvé"}
            </button>
          )}
        </>
      )}
    </section>
  );
}
