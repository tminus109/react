import "../styles/button.css";

function Button({ btnType, btnText, handleClick }) {
  return (
    <div>
      <button className="button" type={btnType} onClick={handleClick}>
        {btnText}
      </button>
    </div>
  );
}

export default Button;
