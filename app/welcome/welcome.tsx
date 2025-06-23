import { useRef, useState, type KeyboardEvent } from "react";
import { Etape11 } from "./etape/etape11";
import { Etape12 } from "./etape/etape12";
import Etape2 from "./etape/etape2";

/*
<img
        id="background"
        src="https://i.ibb.co/ksX071gk/background.png"
        alt="Bienvenue à toi enquêtrice"
      />
*/
export function Welcome() {
  const [etape, setEtape] = useState(1.1);

  return (
    <main>
      {/** Home */}

      {/** Etape 1 */}
      {etape < 2 && (
        <>
          <Etape11 onComplete={() => setEtape(1.2)} etape={etape} />
          {etape === 1.2 && (
            <Etape12 onComplete={() => setEtape(2)} etape={etape} />
          )}
        </>
      )}

      {/** Etape 2 */}
      {etape === 2 && <Etape2 />}
    </main>
  );
}
