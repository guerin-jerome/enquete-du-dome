import { useState } from "react";

export function Etape12({
  onComplete,
  etape,
}: {
  onComplete: () => void;
  etape: number;
}) {
  const [solution, setSolution] = useState("");
  const [status, setStatus] = useState("current");

  const soumettre = () => {
    if (solution.toLowerCase().includes("couteau")) {
      setStatus("success");
    } else {
      setStatus("error");
    }
  };

  return (
    <div id="step-1-2">
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
          <button onClick={soumettre}>Soumettre</button>
          <span>{status === "error" && <>- Mauvaise arme</>}</span>
        </div>
      )}
      {status === "success" && (
        <>
          <p>
            Arme trouvé. Tu peux désormais ouvrir l'
            <em>enveloppe </em>
            <strong>B</strong>.
          </p>
          {etape === 1.2 && (
            <>
              <p>Clique sur "Fait" pour continuer.</p>
              <button onClick={onComplete}>Fait</button>
            </>
          )}
        </>
      )}
    </div>
  );
}
