export function Home({ goLogin }: { goLogin: () => void }) {
  return (
    <section id="home">
      <img
        id="background"
        src="https://i.ibb.co/ksX071gk/background.png"
        alt="Bienvenue à toi enquêtrice"
      />
      <h1 className="typewriter-effect">L'enquête du Dôme</h1>
      <br />
      <button onClick={goLogin}>Commencer</button>
    </section>
  );
}
