import { useState } from "react";
import { client } from "~/utils/supabase";

export function Etape5({
  onComplete,
  utilisateur,
  etape,
}: {
  onComplete: () => void;
  utilisateur: string;
  etape: number;
}) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(etape > 5 ? "success" : "current");
  const [solution, setSolution] = useState(etape > 5 ? "485490" : "");

  const gotoNext = async () => {
    setLoading(true);
    const { error } = await client
      .from("utilisateurs")
      .update({ current_step: 5.1 })
      .eq("nom_utilisateur", utilisateur)
      .select();

    setLoading(false);
    if (!error) onComplete();
  };

  const soumettre = async () => {
    setLoading(true);
    if (solution === "485490") {
      const { error } = await client
        .from("utilisateurs")
        .update({ current_step: 5.1 })
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
    <section className="step" id="4">
      <p className="title">
        <strong>🔍 Étape 5</strong> - Avoir le fin mot de l'histoire
      </p>
      <p>🔥 Prête pour le dénouement final ?</p>
      <p>
        Ouvre l'<em>enveloppe </em>
        <strong>J</strong>, avec celle-ci tu vas devoir remettre dans l'ordre
        les évènements amenant à la mort de Mélanie.
      </p>
      <p>
        Cela te donnera un code qui te permettra de retrouver l'adresse du siège
        de l'organisation d'enquête secrète du <strong>"Cercle"</strong>.
      </p>
      <div id="question-adresse">
        {status !== "success" && (
          <input
            type="number"
            placeholder="Ex: 362981"
            onChange={(e) => {
              setStatus("current");
              setSolution(e.target.value);
            }}
          />
        )}
        {status === "success" && (
          <>
            <p>
              <strong>4 allée Verdi, BENET - 85490</strong>
              <br />À l'adresse d'Axelle GILLARDEAU et Jérôme GUERIN
            </p>
            <p>
              👏🏻 Félicitations !<br /> Ouvre l'<em>enveloppe </em>
              <strong>K</strong>, elle contiendra tout ce qu'il te faut pour
              envoyer à cette adresse le prénom de la personne que tu penses
              être le coupable.
            </p>
            <p>
              Néammoins, attention elle ne contient que deux timbres. Tu n'auras
              donc que deux essais pour trouver le tueur.
            </p>
            <p>
              ℹ️ Une fois ta lettre reçue, tu recevras un e-mail de ton contact
              du <em>Cercle</em> qui te confirmera ou non l'identité du
              coupable. En cas d'échec, il ne te restera plus qu'un timbre pour
              déceler la vérité.
            </p>
          </>
        )}
      </div>
      {status !== "success" && etape === 5 && (
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
