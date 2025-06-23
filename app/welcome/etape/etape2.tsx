import { useState, useRef, useEffect } from "react";

const leftWords = [
  "Léa",
  "Pierre",
  "Jérôme",
  "Paul-Arthur",
  "Florian",
  "Axelle",
  "Marion",
];

const rightWords = ["1", "2", "3", "4", "5", "6", "7"];

const solutions = [
  ["Marion", "1"],
  ["Florian", "2"],
  ["Pierre", "3"],
  ["Axelle", "4"],
  ["Léa", "5"],
  ["Jérôme", "6"],
  ["Paul-Arthur", "7"],
];

export default function Etape2() {
  const containerRef = useRef(null);
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [connections, setConnections] = useState<
    { left: string; right: string }[]
  >([]);
  const [positions, setPositions] = useState({});
  const [status, setStatus] = useState("current");
  const [nbErrors, setNbErrors] = useState<number | null>(null);

  const reset = () => {
    setStatus("current");
    setSelectedLeft(null);
    setConnections([]);
    setPositions({});
    setNbErrors(null);
  };

  const isConnected = (word: string, side: "left" | "right") =>
    connections.some((conn) => conn[side] === word);

  const handleLeftClick = (word: string) => {
    if (!isConnected(word, "left")) {
      setSelectedLeft(word);
    } else {
      setSelectedLeft(null);
    }
  };

  const handleRightClick = (word: string) => {
    if (selectedLeft && !isConnected(word, "right")) {
      setConnections([...connections, { left: selectedLeft, right: word }]);
      setSelectedLeft(null);
    }
  };

  useEffect(() => {
    const newPositions = {};
    const elements = containerRef.current?.querySelectorAll("[data-key]");
    elements.forEach((el: HTMLElement) => {
      const key = el.getAttribute("data-key");
      const rect = el.getBoundingClientRect();
      const parent = containerRef.current?.getBoundingClientRect();
      newPositions[key] = {
        x: rect.left + rect.width / 2 - parent.left,
        y: rect.top + rect.height / 2 - parent.top,
      };
    });
    setPositions(newPositions);
  }, [connections, selectedLeft]);

  const soumettre = () => {
    setStatus("submitted");
    const propositions = connections.map(({ left, right }) => [left, right]);
    propositions.sort((a, b) => a[1].localeCompare(b[1]));
    if (JSON.stringify(propositions) === JSON.stringify(solutions)) {
      setStatus("success");
    } else {
      let errors = [];
      solutions.forEach(([name, numFiche, index]) => {
        const [solutionName, solutionNumFiche] = propositions?.[index] || [
          null,
          null,
        ];
        if (name !== solutionName || numFiche !== solutionNumFiche) {
          errors.push(index);
        }
      });
      setStatus("error");
      setNbErrors(errors.length);
    }
  };

  return (
    <section id="step-2">
      <p className="title">
        <strong>🔍 Étape 2</strong> - Repérer les agissements suspects pendant
        la soirée
      </p>
      <p>Associe les personnes aux numéros de fiche.</p>
      <style>{`
        .word-match-container {
          position: relative;
          display: flex;
          justify-content: space-between;
          padding: 20px;
          border: 1px solid #ccc;
          max-width: 600px;
          margin: 0 auto;
        }

        .word-column {
          display: flex;
          flex-direction: column;
          gap: 16px;
          z-index: 10;
        }

        .word-box {
          padding: 10px 14px;
          border: 1px solid #aaa;
          border-radius: 6px;
          background-color: white;
          cursor: pointer;
          user-select: none;
        }

        .word-box.selected {
          background-color: #cde4ff;
        }

        .word-box.disabled {
          background-color: #eee;
          cursor: not-allowed;
        }

        .match-svg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
        }
      `}</style>

      <div className="word-match-container" ref={containerRef}>
        <svg className="match-svg">
          {connections.map(({ left, right }, i) => {
            const from = positions[`left-${left}`];
            const to = positions[`right-${right}`];
            if (!from || !to) return null;
            return (
              <line
                key={i}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke="black"
                strokeWidth="2"
              />
            );
          })}
        </svg>

        {/* Colonne gauche */}
        <div className="word-column">
          {leftWords.map((word) => {
            const isSel = selectedLeft === word;
            const isUsed = isConnected(word, "left");
            return (
              <div
                key={word}
                data-key={`left-${word}`}
                className={`word-box ${isSel ? "selected" : ""} ${
                  isUsed ? "disabled" : ""
                }`}
                onClick={() => !isUsed && handleLeftClick(word)}
              >
                {word}
              </div>
            );
          })}
        </div>

        {/* Colonne droite */}
        <div className="word-column">
          {rightWords.map((word) => {
            const isUsed = isConnected(word, "right");
            return (
              <div
                key={word}
                data-key={`right-${word}`}
                className={`word-box ${isUsed ? "disabled" : ""}`}
                onClick={() => !isUsed && handleRightClick(word)}
              >
                {word}
              </div>
            );
          })}
        </div>
      </div>

      {status !== "success" && (
        <div id="soumission">
          <button onClick={status === "current" ? soumettre : reset}>
            {status === "current" ? "Soumettre" : "Réessayer"}
          </button>
          <span>{status === "error" && <>- {nbErrors} erreurs</>}</span>
        </div>
      )}

      {status === "success" && (
        <>
          <p>Bravo, tu as trouvé toutes les correspondances.</p>
          <p>
            Tu peux maintenant accéder aux <em>indices</em> sur les
            <strong> agissements suspects</strong> de chaque personnes pendant
            la soirée.
          </p>
        </>
      )}
    </section>
  );
}
