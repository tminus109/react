import "../styles/header.css";

function Header({ title }) {
  return (
    <div>
      <header>
        <h1>{title}</h1>
      </header>
    </div>
  );
}

export default Header;
