import { useEffect, useRef, useState } from "react";
import "./App.css";
import gifMacaco from "./assets/macaco-digitando.gif";
import titulo from "./assets/titulo.png"
import { FaPause, FaPlay } from "react-icons/fa6";

function App() {
  const [texto, setTexto] = useState("dda");
  const [isDigitando, setIsDigitando] = useState(true);
  const textoContainerRef = useRef()
  const letras = "abcdefghijklmnopqrstuvwxyz";

  useEffect(() => {
    let digitando;

    if (isDigitando) {
      digitando = setInterval(() => {
        const letraAleatoria = Math.floor(Math.random() * letras.length);
        const updateTexto = texto + letras[letraAleatoria];
        setTexto(updateTexto);
      }, 10);
    }

    return () => {
      clearInterval(digitando);
    };
  }, [isDigitando, texto, letras]);

  useEffect(() => {
    // Rola para o final do container quando o texto é atualizado
    textoContainerRef.current.scrollTop = textoContainerRef.current.scrollHeight;
  }, [texto]);

  return (
    <div className="App">
      <img className="titulo" src={titulo}/>
      <p className="definicao">
        O Teorema do Macaco Infinito afirma que um macaco digitando
        aleatoriamente em um teclado por um intervalo de tempo infinito irá
        quase certamente criar um texto qualquer escolhido.
      </p>
      <img className="gif" src={gifMacaco} alt="Macaco digitando" />
      <div ref={textoContainerRef} className="container">
        <p>{texto}</p>
      </div>
      <button onClick={() => setIsDigitando(!isDigitando)}>
        {isDigitando ? <FaPause /> : <FaPlay />}
      </button>
    </div>
  );
}

export default App;
