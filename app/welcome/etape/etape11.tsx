import { useRef, useState, type KeyboardEvent } from "react";

export function Etape11({
  onComplete,
  etape,
}: {
  onComplete: () => void;
  etape: number;
}) {
  const [solution1, setSolution1] = useState(["", "", "", ""]);
  const [status, setStatus] = useState("current");

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

  const soumettre = () => {
    if (solution1.join("") === "6676") {
      setStatus("success");
    } else {
      setStatus("error");
    }
  };

  return (
    <section id="step-1">
      <p className="title">
        <strong>🔍 Étape 1</strong> - Trouve le code
      </p>
      <div id="digicode">
        <input
          maxLength={1}
          type="number"
          disabled={status === "success"}
          ref={refInput1}
          value={solution1[0]}
          onKeyDown={(event) => handleWrite(event, 0)}
        />
        <input
          maxLength={1}
          type="number"
          disabled={status === "success"}
          ref={refInput2}
          value={solution1[1]}
          onKeyDown={(event) => handleWrite(event, 1)}
        />
        <input
          maxLength={1}
          type="number"
          disabled={status === "success"}
          ref={refInput3}
          value={solution1[2]}
          onKeyDown={(event) => handleWrite(event, 2)}
        />
        <input
          maxLength={1}
          type="number"
          disabled={status === "success"}
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
