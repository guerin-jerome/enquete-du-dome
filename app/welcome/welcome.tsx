import { useState } from "react";
import { Etape11 } from "./etape/etape11";
import { Etape12 } from "./etape/etape12";
import { Etape2 } from "./etape/etape2";
import { Home } from "./etape/home";
import { Login } from "./etape/login";

interface PageInfos {
  etape: number;
  type: "home" | "login" | "enquete";
  utilisateur?: string;
}

export function Welcome() {
  const [pageInfos, setPageInfos] = useState<PageInfos>({
    etape: 0,
    type: "home",
  });

  const { etape, type, utilisateur } = pageInfos;

  return (
    <main>
      {/** Home */}
      {type === "home" && (
        <Home goLogin={() => setPageInfos({ etape: 0, type: "login" })} />
      )}

      {/** Login */}
      {type === "login" && <Login setPageInfos={setPageInfos} />}

      {/** Etape 1 */}
      {type === "enquete" && etape < 2 && (
        <>
          <Etape11
            onComplete={() => setPageInfos({ etape: 1.2, type: "enquete" })}
            etape={etape}
            utilisateur={utilisateur || ""}
          />
          {etape === 1.2 && (
            <Etape12
              onComplete={() => setPageInfos({ etape: 2, type: "enquete" })}
              etape={etape}
              utilisateur={utilisateur || ""}
            />
          )}
        </>
      )}

      {/** Etape 2 */}
      {type === "enquete" && etape === 2 && (
        <Etape2 onComplete={() => {}} utilisateur={utilisateur || ""} />
      )}
    </main>
  );
}
