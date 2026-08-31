import './Footer.scss';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__container">
        <p>© {currentYear} Pokédex. All rights reserved.</p>

        <p className="footer__disclaimer">
          Pokémon and Pokémon character names are trademarks of Nintendo, Game
          Freak, and The Pokémon Company.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
