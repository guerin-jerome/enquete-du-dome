export function Welcome() {
  return (
    <main>
      <div id="left-part">
        <img id="background" src="../../docs/background.png" />
      </div>
      <div id="right-part">
        <h1>L'enquête du Dôme</h1>
        <br />
        <p className="typewriter-effect">
          Te sens-tu prête à relever le défi de résoudre ce mystérieux meurtre ?
        </p>
        <br />
        <button id="start-button">Commencer</button>
      </div>
    </main>
  );
}
