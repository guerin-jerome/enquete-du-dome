import { useState, type Dispatch } from "react";
import { client } from "~/utils/supabase";

interface LoginProps {
  setPageInfos: Dispatch<
    React.SetStateAction<{
      etape: number;
      type: "home" | "login" | "enquete";
      utilisateur?: string;
    }>
  >;
}
export function Login({ setPageInfos }: LoginProps) {
  const [infos, setInfos] = useState({ username: "", password: "" });
  const [status, setStatus] = useState("current");

  const soumettre = async () => {
    setStatus("loading");

    let { data: utilisateurs, error } = await client
      .from("utilisateurs")
      .select("*")
      .eq("nom_utilisateur", infos.username)
      .eq("password", infos.password);

    if (error || !utilisateurs || utilisateurs?.length === 0) {
      setStatus("error");
      return;
    }

    const isFirstTime = utilisateurs[0].current_step === 0;

    setStatus("current");
    setPageInfos({
      etape: isFirstTime ? 1.1 : utilisateurs[0].current_step,
      type: "enquete",
      utilisateur: utilisateurs[0].nom_utilisateur,
    });
  };

  return (
    <section id="login">
      <img id="cercle-logo" src="https://i.ibb.co/BWRNbtM/logo.png" />
      <h2>🔒 COMPTE INSPECTEUR</h2>
      <div id="login-form">
        <label>Identifiant agent</label>
        <input
          type="text"
          value={infos.username}
          onChange={(event) => {
            setStatus("current");
            setInfos({ ...infos, username: event.target.value });
          }}
        />
        <label>Mot de passe</label>
        <input
          type="password"
          value={infos.password}
          onChange={(event) => {
            setStatus("current");
            setInfos({ ...infos, password: event.target.value });
          }}
        />
      </div>
      <button disabled={status === "loading"} onClick={soumettre}>
        {status === "loading" ? "Chargement..." : "Accéder au logiciel"}
      </button>
      {status === "error" && (
        <p className="error-message">Ce compte n'existe pas.</p>
      )}
    </section>
  );
}
