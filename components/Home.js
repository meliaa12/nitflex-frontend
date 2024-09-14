import styles from "../styles/Home.module.css";
import TextFieldComponent from "./TexfieldComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

function Home() {
  const [film, setFilm] = useState(null);
  const apiKey = "a9f4d3004f4dc397603808cfdd7842b7"; // Remplacez par votre clé API
  const movieId = 550;

  useEffect(() => {
    const fetchFilmData = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}&language=fr`
        );
        const data = await response.json();
        setFilm(data.results);
      } catch (error) {
        console.error("Error fetching film data:", error);
      }
    };

    fetchFilmData();
  }, [apiKey]);

  console.log(film);
  if (!film) return <div>Loading...</div>;

  return (
    <div>
      <main className={styles.main}>
        <div className={styles.head}>
          <div className={styles.headHead}>
            <img src="" />
            <button className={styles.btn}>S'identifier</button>
          </div>
          <div className={styles.containerHead}>
            <h2 className={`${styles.text} ${styles.title}`}>
              Films et séries <br /> en illimité, et bien plus
            </h2>
            <p className={`${styles.text} ${styles.para}`}>
              Prêt à regarder Netflix ? Saisissez votre adresse e-mail pour vous
              abonner ou
              <br /> réactiver votre abonnement.
            </p>
            <div className={styles.email}>
              <TextFieldComponent
                // size={"small"}
                style={{ width: 600 }}
                label={"E-mail"}
              />
              <button className={styles.btnContai}>
                {" "}
                Commencer <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>
          </div>
        </div>
        <div className={styles.containerBody}>
          <div className={styles.tendance}>
            <h1>Films tendances</h1>
            {film.map((film) => (
              <div className={styles.films} key={film.id}>
                <h2>{film.title}</h2>
                <p>{film.overview}</p>
                <p>Release Date: {film.release_date}</p>
                <img
                  className={styles.poster}
                  src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
                  alt={film.title}
                />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
