import { useState } from "react";
import { client } from "~/utils/supabase";

export function Etape42({
  onComplete,
  utilisateur,
  etape,
}: {
  onComplete: () => void;
  utilisateur: string;
  etape: number;
}) {
  const [loading, setLoading] = useState(false);

  const soumettre = async () => {
    setLoading(true);
    const { error } = await client
      .from("utilisateurs")
      .update({ current_step: 5 })
      .eq("nom_utilisateur", utilisateur)
      .select();

    setLoading(false);
    if (!error) onComplete();
  };

  return (
    <section className="step" id="4-2">
      <p>👏🏻 Bien vu !</p>
      <p>
        En effet, <strong>Paul-Arthur</strong> était parti avant la coupure du
        courant suite à son embrouille avec <em>Léa</em> et n'était par
        conséquent pas présent lors des faits.
      </p>
      <p>
        Et concernant <strong>Florian</strong>, même s'il était bien présent
        dans l'annexe, il était carrément à l'ouest suite à l'alcool qu'il avait
        ingéré et n'était pas en capacité de faire quoi que ce soit.
      </p>
      <p>
        Tu approches de la fin... Clique sur "Continuer" lorsque tu seras prête
        pour la suite.
      </p>
      {etape === 4.2 && (
        <div id="soumission">
          <button onClick={soumettre}>
            {loading ? "Chargement..." : "Continuer"}
          </button>
        </div>
      )}
    </section>
  );
}
