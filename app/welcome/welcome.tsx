export function Welcome() {
  return (
    <main>
      <h1>L'enquête du Dôme</h1>
      <br />
      <div id="typewriter">
        <p className="typewriter-effect">
          Te sens-tu prête à relever le défi de résoudre ce mystérieux meurtre ?
        </p>
      </div>
      <button id="start-button">Commencer</button>

      <img
        id="background"
        src="https://i.ibb.co/ksX071gk/background.png"
        alt="Bienvenue à toi enquêtrice"
      />
    </main>
  );
}
