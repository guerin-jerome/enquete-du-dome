import { useRef, useState, type KeyboardEvent } from "react";
import { Etape11 } from "./etape/etape11";
import { Etape12 } from "./etape/etape12";
import { Etape2 } from "./etape/etape2";
import { Home } from "./etape/home";

export function Welcome() {
  const [pageInfos, setPageInfos] = useState({ etape: 0, type: "home" });

  const { etape, type } = pageInfos;

  return (
    <main>
      {/** Home */}
      {type === "home" && (
        <Home goLogin={() => setPageInfos({ etape: 1.1, type: "enquete" })} />
      )}

      {/** Login */}

      {/** Etape 1 */}
      {type === "enquete" && etape < 2 && (
        <>
          <Etape11
            onComplete={() => setPageInfos({ etape: 1.2, type: "enquete" })}
            etape={etape}
          />
          {etape === 1.2 && (
            <Etape12
              onComplete={() => setPageInfos({ etape: 2, type: "enquete" })}
              etape={etape}
            />
          )}
        </>
      )}

      {/** Etape 2 */}
      {type === "enquete" && etape === 2 && <Etape2 />}
    </main>
  );
}
