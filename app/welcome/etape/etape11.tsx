import { useRef, useState, type KeyboardEvent } from "react";
import { client } from "~/utils/supabase";

export function Etape11({
  onComplete,
  etape,
  utilisateur,
}: {
  onComplete: () => void;
  etape: number;
  utilisateur: string;
}) {
  const [solution1, setSolution1] = useState(
    etape > 1.1 ? ["6", "6", "7", "6"] : ["", "", "", ""]
  );
  const [status, setStatus] = useState(etape > 1.1 ? "success" : "current");

  const refInput1 = useRef(null);
  const refInput2 = useRef(null);
  const refInput3 = useRef(null);
  const refInput4 = useRef(null);

  const refs = [refInput1, refInput2, refInput3, refInput4];

  const handleWrite = (
    event: KeyboardEvent<HTMLInputElement>,
    nbInput: number
  ) => {
    if (event.key === "Backspace") {
      setStatus("current");
      const newSolution = [...solution1];
      newSolution[nbInput] = "";
      setSolution1(newSolution);
      if (nbInput === 0) return;
      refs[nbInput - 1].current?.focus();
    }

    if (parseInt(event.key) >= 0 && parseInt(event.key) <= 9) {
      setStatus("current");
      const newSolution = [...solution1];
      newSolution[nbInput] = event.key;
      setSolution1(newSolution);
      if (nbInput === 3) return;
      refs[nbInput + 1].current?.focus();
    }
  };

  const soumettre = async () => {
    if (solution1.join("") === "6676") {
      const { error } = await client
        .from("utilisateurs")
        .update({ current_step: 1.2 })
        .eq("nom_utilisateur", utilisateur)
        .select();

      if (!error) setStatus("success");
    } else {
      setStatus("error");
    }
  };

  return (
    <section id="step-1">
      <p className="title">
        <strong>🔍 Étape 1</strong> - Comprendre le drame
      </p>
      <p>Trouve le code.</p>
      <div id="digicode">
        <input
          maxLength={1}
          type="number"
          disabled={status === "success" || etape > 1.1}
          ref={refInput1}
          value={solution1[0]}
          onKeyDown={(event) => handleWrite(event, 0)}
        />
        <input
          maxLength={1}
          type="number"
          disabled={status === "success" || etape > 1.1}
          ref={refInput2}
          value={solution1[1]}
          onKeyDown={(event) => handleWrite(event, 1)}
        />
        <input
          maxLength={1}
          type="number"
          disabled={status === "success" || etape > 1.1}
          ref={refInput3}
          value={solution1[2]}
          onKeyDown={(event) => handleWrite(event, 2)}
        />
        <input
          maxLength={1}
          type="number"
          disabled={status === "success" || etape > 1.1}
          ref={refInput4}
          value={solution1[3]}
          onKeyDown={(event) => handleWrite(event, 3)}
        />
        {status === "success" && <p>✅</p>}
        {status === "error" && <p>❌</p>}
      </div>
      {status !== "success" && (
        <div id="soumission">
          <button onClick={soumettre}>Soumettre</button>
          <span>{status === "error" && <>- Code erroné</>}</span>
        </div>
      )}
      {status === "success" && (
        <>
          <p>
            Code trouvé. Tu peux désormais ouvrir l'
            <em>enveloppe </em>
            <strong>A</strong>.
          </p>
          {etape === 1.1 && (
            <>
              <p>Clique sur "Fait" pour continuer.</p>
              <button onClick={onComplete}>Fait</button>
            </>
          )}
        </>
      )}
    </section>
  );
}
