import { useState } from "react";
import { Etape11 } from "./etape/etape11";
import { Etape12 } from "./etape/etape12";
import { Etape2 } from "./etape/etape2";
import { Home } from "./etape/home";
import { Login } from "./etape/login";
import { Etape21 } from "./etape/etape21";
import { Etape3 } from "./etape/etape3";
import { Etape31 } from "./etape/etape31";
import { Etape32 } from "./etape/etape32";
import { Etape33 } from "./etape/etape33";
import { Etape34 } from "./etape/etape34";
import { Etape4 } from "./etape/etape4";
import { Etape41 } from "./etape/etape41";
import { Etape42 } from "./etape/etape42";
import { Etape5 } from "./etape/etape5";

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
    <main className={type === "enquete" ? "enquete" : ""}>
      {/** Home */}
      {type === "home" && (
        <Home
          goLogin={() => setPageInfos({ etape: 0, type: "login", utilisateur })}
        />
      )}

      {/** Login */}
      {type === "login" && <Login setPageInfos={setPageInfos} />}

      {/** Etape 1 */}
      {type === "enquete" && etape < 2 && (
        <>
          <Etape11
            onComplete={() =>
              setPageInfos({ etape: 1.2, type: "enquete", utilisateur })
            }
            etape={etape}
            utilisateur={utilisateur || ""}
          />
          {etape === 1.2 && (
            <Etape12
              onComplete={() =>
                setPageInfos({ etape: 2, type: "enquete", utilisateur })
              }
              etape={etape}
              utilisateur={utilisateur || ""}
            />
          )}
        </>
      )}

      {/** Etape 2 */}
      {type === "enquete" && etape >= 2 && etape < 3 && (
        <>
          <Etape2
            onComplete={() =>
              setPageInfos({ etape: 2.1, type: "enquete", utilisateur })
            }
            utilisateur={utilisateur || ""}
            etape={etape}
          />
          {etape === 2.1 && (
            <Etape21
              onComplete={() =>
                setPageInfos({ etape: 3, type: "enquete", utilisateur })
              }
              utilisateur={utilisateur || ""}
            />
          )}
        </>
      )}

      {/** Etape 3 */}
      {type === "enquete" && etape >= 3 && etape < 4 && (
        <>
          <Etape3
            onComplete={() =>
              setPageInfos({ etape: 3.1, type: "enquete", utilisateur })
            }
            etape={etape}
            utilisateur={utilisateur || ""}
          />
          {etape >= 3.1 && (
            <Etape31
              onComplete={() =>
                setPageInfos({ etape: 3.2, type: "enquete", utilisateur })
              }
              etape={etape}
              utilisateur={utilisateur || ""}
            />
          )}
          {etape >= 3.2 && (
            <Etape32
              onComplete={() =>
                setPageInfos({ etape: 3.3, type: "enquete", utilisateur })
              }
              etape={etape}
              utilisateur={utilisateur || ""}
            />
          )}
          {etape >= 3.3 && (
            <Etape33
              utilisateur={utilisateur || ""}
              etape={etape}
              onComplete={() =>
                setPageInfos({ etape: 3.4, type: "enquete", utilisateur })
              }
            />
          )}
          {etape >= 3.4 && (
            <Etape34
              utilisateur={utilisateur || ""}
              etape={etape}
              onComplete={() =>
                setPageInfos({ etape: 4, type: "enquete", utilisateur })
              }
            />
          )}
        </>
      )}

      {/** Etape 4 */}
      {type === "enquete" && etape >= 4 && etape < 5 && (
        <>
          <Etape4
            onComplete={() =>
              setPageInfos({ etape: 4.1, type: "enquete", utilisateur })
            }
            utilisateur={utilisateur || ""}
            etape={etape}
          />
          {etape >= 4.1 && (
            <Etape41
              onComplete={() =>
                setPageInfos({ etape: 4.2, type: "enquete", utilisateur })
              }
              utilisateur={utilisateur || ""}
              etape={etape}
            />
          )}
          {etape >= 4.2 && (
            <Etape42
              onComplete={() =>
                setPageInfos({ etape: 5, type: "enquete", utilisateur })
              }
              utilisateur={utilisateur || ""}
              etape={etape}
            />
          )}
        </>
      )}

      {/** Etape 5 */}
      {type === "enquete" && etape >= 5 && (
        <>
          <Etape5
            onComplete={() =>
              setPageInfos({ etape: 5.1, type: "enquete", utilisateur })
            }
            utilisateur={utilisateur || ""}
            etape={etape}
          />
        </>
      )}

      {type === "enquete" && (
        <p id="contact">
          - Votre contact au sein du département du Cercle pour votre enquête :
          servicesecret.lecercle@outlook.fr. Si vous bloquez pendant l'enquête,
          ce sera votre interlocuteur. N'hésitez pas à lui envoyer un e-mail en
          cas de besoin.
        </p>
      )}
    </main>
  );
}
