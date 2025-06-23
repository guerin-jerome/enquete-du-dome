import { useRef, useState } from "react";

/*
<img
        id="background"
        src="https://i.ibb.co/ksX071gk/background.png"
        alt="Bienvenue à toi enquêtrice"
      />
*/
export function Welcome() {
  const [etape, setEtape] = useState(1);

  // Étape 1
  const [solution1, setSolution1] = useState(["", "", "", ""]);

  const refInput1 = useRef(null);
  const refInput2 = useRef(null);
  const refInput3 = useRef(null);
  const refInput4 = useRef(null);

  const refs = [refInput1, refInput2, refInput3, refInput4];

  const handleWrite = (event, nbInput) => {
    console.log(event.key);
    if (event.key === "Backspace") {
      const newSolution = [...solution1];
      newSolution[nbInput] = "";
      setSolution1(newSolution);
      if (nbInput === 0) return;
      refs[nbInput - 1].current?.focus();
    }

    if (parseInt(event.key) >= 0 && parseInt(event.key) <= 9) {
      const newSolution = [...solution1];
      newSolution[nbInput] = event.key;
      setSolution1(newSolution);
      if (nbInput === 3) return;
      refs[nbInput + 1].current?.focus();
    }
  };

  const soumettre = () => {
    if (solution1.join("") === "6676") {
      setEtape(2);
    }
  };

  return (
    <main>
      {/** Home */}
      {/** Etape 1 */}
      {etape === 1 && (
        <section id="step-1">
          <p>
            <strong>🔍 Étape 1</strong> - Trouve le code
          </p>
          <div id="digicode">
            <input
              maxLength={1}
              type="number"
              ref={refInput1}
              value={solution1[0]}
              onKeyDown={(event) => handleWrite(event, 0)}
            />
            <input
              maxLength={1}
              type="number"
              ref={refInput2}
              value={solution1[1]}
              onKeyDown={(event) => handleWrite(event, 1)}
            />
            <input
              maxLength={1}
              type="number"
              ref={refInput3}
              value={solution1[2]}
              onKeyDown={(event) => handleWrite(event, 2)}
            />
            <input
              maxLength={1}
              type="number"
              ref={refInput4}
              value={solution1[3]}
              onKeyDown={(event) => handleWrite(event, 3)}
            />
          </div>
          <button onClick={soumettre}>Soumettre</button>
        </section>
      )}
    </main>
  );
}
