import { useState } from "react";
import { client } from "~/utils/supabase";

interface Solution {
  [key: number]: {
    name?: string;
    indice?: string;
    polaroid?: string;
  };
}

const solutions = [
  { fiche: 1, name: "mar", indice: "dome", polaroid: "chantier" },
  { fiche: 2, name: "flo", indice: "200", polaroid: "salle" },
  { fiche: 3, name: "pie", indice: "qr", polaroid: "fumer" },
  { fiche: 4, name: "axe", indice: "deg", polaroid: "ramasser" },
  { fiche: 5, name: "lea", indice: "ticket", polaroid: "toilette" },
  { fiche: 6, name: "jer", indice: "pelle", polaroid: "courir" },
  { fiche: 7, name: "par", indice: "sms-pa", polaroid: "quitter" },
];

export function Etape2({
  onComplete,
  utilisateur,
}: {
  onComplete: () => void;
  utilisateur: string;
}) {
  const [status, setStatus] = useState("current");
  const [solution, setSolution] = useState<Solution>({});
  const [errors, setErrors] = useState<number[]>([]);

  const nameSelector = (index: number, isDisabled: boolean) => (
    <select
      disabled={isDisabled}
      name="name"
      value={solution[index]?.name || ""}
      onChange={(e) => {
        setErrors([]);
        setSolution((current) => ({
          ...current,
          [index]: { ...current[index], name: e.target.value },
        }));
      }}
    >
      <option value="">Nom</option>
      <option value="par">Paul-Arthur</option>
      <option value="flo">Florian</option>
      <option value="jer">Jérôme</option>
      <option value="mar">Marion</option>
      <option value="axe">Axelle</option>
      <option value="lea">Léa</option>
      <option value="pie">Pierre</option>
    </select>
  );

  const indiceSelector = (index: number, isDisabled: boolean) => (
    <select
      disabled={isDisabled}
      name="indice"
      value={solution[index]?.indice || ""}
      onChange={(e) => {
        setErrors([]);
        setSolution((current) => ({
          ...current,
          [index]: { ...current[index], indice: e.target.value },
        }));
      }}
    >
      <option value="">Indice</option>
      <option value="sms-pa">SMS de PA</option>
      <option value="ticket">ticket vestiaire</option>
      <option value="qr">QR code</option>
      <option value="deg">SMS d'Axelle</option>
      <option value="dome">SMS Dôme pas prêt</option>
      <option value="200">SMS 200 balles</option>
      <option value="pelle">Jérôme avec pelle</option>
    </select>
  );

  const polaroidSelector = (index: number, isDisabled: boolean) => (
    <select
      disabled={isDisabled}
      name="polaroid"
      value={solution[index]?.polaroid || ""}
      onChange={(e) => {
        setErrors([]);
        setSolution((current) => ({
          ...current,
          [index]: { ...current[index], polaroid: e.target.value },
        }));
      }}
    >
      <option value="">Polaroïd</option>
      <option value="chantier">Casque chantier</option>
      <option value="ramasser">Ramasse cigarette</option>
      <option value="fumer">Fumer</option>
      <option value="quitter">Quitter le dôme</option>
      <option value="courir">Courir</option>
      <option value="salle">Salle réception</option>
      <option value="toilette">Toilette</option>
    </select>
  );

  const soumettre = async () => {
    let errorList: number[] = [];
    solutions.forEach(({ fiche, name, indice, polaroid }) => {
      const findedSolution = solution[fiche];
      if (
        !findedSolution ||
        findedSolution.name !== name ||
        findedSolution.indice !== indice ||
        findedSolution.polaroid !== polaroid
      ) {
        errorList.push(fiche);
      }
    });
    if (errorList.length !== 0) {
      setErrors(errorList);
    } else {
      const { error } = await client
        .from("utilisateurs")
        .update({ current_step: 2.1 })
        .eq("nom_utilisateur", utilisateur)
        .select();

      if (!error) setStatus("success");
    }
  };

  return (
    <section id="step-2">
      <p className="title">
        <strong>🔍 Étape 2</strong> - Repérer les agissements suspects pendant
        la soirée
      </p>
      <p>✉️ Dans l'enveloppe que tu viens d'ouvrir tu as :</p>
      <ul>
        <li>7 fiches suspects numérotées avec des indications</li>
        <li>7 noms de suspect</li>
        <li>7 polaroïds</li>
        <li>7 indices</li>
      </ul>
      <p>
        Comme tu te doutes, tu vas devoir assembler pour chaque fiche le nom du
        suspect, le polaroïd associé et son indice correspondant.
      </p>
      <p>Une fois tout ceci rassemblé, renseigne ta solution ici ⬇️</p>

      <table>
        <thead>
          <tr>
            <th scope="col">Fiche</th>
            <th scope="col">Nom</th>
            <th scope="col">Polaroïd</th>
            <th scope="col">Indice</th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3, 4, 5, 6, 7].map((numFiche) => (
            <tr key={`fiche-${numFiche}`}>
              <th scope="row">
                {errors.includes(numFiche) ? "❌ " : ""}
                {numFiche}
              </th>
              <td>{nameSelector(numFiche, status === "success")}</td>
              <td>{polaroidSelector(numFiche, status === "success")}</td>
              <td>{indiceSelector(numFiche, status === "success")}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {status !== "success" && <button onClick={soumettre}>Valider</button>}

      {status === "success" && (
        <>
          <p>
            👏🏻 Bravo d'avoir réussi à tout assembler, désormais tu vas devoir
            mériter ton prochain indice !
          </p>
          <p>Pour cela, ouvre l'enveloppe D.</p>
          <p>Une fois ouverte, clique sur "Fait" pour continuer.</p>
          <button onClick={onComplete}>Fait</button>
        </>
      )}
    </section>
  );
}
