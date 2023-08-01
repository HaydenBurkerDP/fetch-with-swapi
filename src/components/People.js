import { useState, useEffect } from "react";

export default function People() {
  const [people, setPeople] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true);
    fetch("https://swapi.tech/api/people")
      .then((res) => res.json())
      .then((data) => {
        setPeople(data.results);
        setPlanets(data.results.map(() => null));
        setIsLoading(false);
      })
      .catch((error) => console.error(error));
    return () => controller.abort();
  }, []);

  function showHomePlanet(personUrl, index) {
    setPlanets((planets) => {
      return planets.map((p, i) => (i === index ? "Loading..." : p));
    });

    fetch(personUrl)
      .then((res) => res.json())
      .then((person) => fetch(person.result.properties.homeworld))
      .then((res) => res.json())
      .then((planet) => {
        setPlanets((planets) => {
          return planets.map((p, i) =>
            i === index ? planet.result.properties.name : p
          );
        });
      })
      .catch((error) => {
        console.error(error);
        setPlanets((planets) => {
          return planets.map((p, i) => (i === index ? "Planet not found" : p));
        });
      });
  }

  return (
    <div className="people-container">
      {isLoading ? (
        <h1>Loading Characters...</h1>
      ) : (
        people.map((person, index) => (
          <div key={person.uid} className="person-item">
            <p>{person.name}</p>
            {planets[index] === null ? (
              <button onClick={() => showHomePlanet(person.url, index)}>
                Show Home Planet
              </button>
            ) : (
              <p>{planets[index]}</p>
            )}
          </div>
        ))
      )}
    </div>
  );
}
