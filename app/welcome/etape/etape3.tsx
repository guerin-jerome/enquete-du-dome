import { useState } from "react";
import { client } from "~/utils/supabase";

export function Etape3({
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
      .update({ current_step: 3.1 })
      .eq("nom_utilisateur", utilisateur)
      .select();

    setLoading(false);
    if (!error) onComplete();
  };

  return (
    <section className="step" id="3">
      <p className="title">
        <strong>🔍 Étape 3</strong> - Y voir un peu plus clair
      </p>
      <p>
        Désormais tu disposes de l'entièreté des interrogatoires, lis
        attentivement ces procès verbaux et n'oublie pas de prendre des notes de
        ton côté cela te servira à mettre en évidence les points de divergence
        et les incohérences...
      </p>
      {etape === 3 && (
        <>
          <p>
            🧐 Dès que tu te sens prête à continuer, appuie sur le bouton
            ci-dessous.
          </p>
          <button onClick={gotoNext}>
            {loading ? "Chargement..." : "Continuer"}
          </button>
        </>
      )}
    </section>
  );
}
