import { useEffect, useState } from "react";
import Auth from "./components/Auth";
import { auth, database, storage } from "./config/firebase";
import {
  getDocs,
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

function App() {
  const [movies, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState();
  const [movieYear, setMovieYear] = useState();
  const [oscar, setOscar] = useState(false);
  const [movieTitle, setMovieTitle] = useState("");
  const [fileUpload, setFileUpload] = useState(null);

  // reference to our movie collection
  const movieCollectionRef = collection(database, "movies");

  const getMovies = async () => {
    // READ THE DATA FROM DATABASE AND SET THE DATA
    try {
      const data = await getDocs(movieCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMovies(filteredData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMovies();
  }, []); // adding an empty dependency array ensures that the useEffect hook is called only the component changes

  const createNewMovie = async (event) => {
    event.preventDefault();
    try {
      console.log("adding movie");
      await addDoc(movieCollectionRef, {
        title: newMovie,
        year: movieYear,
        oscar: oscar,
        userID: auth?.currentUser?.uid,
      });
      console.log("movie added successfully");
      getMovies();
      setNewMovie("");
      setMovieYear("");
      setOscar(false);
    } catch (err) {
      alert(err);
    }
  };

  const deleteMovie = async (id) => {
    try {
      const movieDoc = doc(database, "movies", id);
      console.log(`deleting movie with id: ${id}`);
      await deleteDoc(movieDoc);
      console.log("Movie deleted succesfully");
      getMovies();
    } catch (err) {
      console.error(err);
    }
  };

  const updateMovie = async (id) => {
    try {
      const movieDoc = doc(database, "movies", id);
      console.log("updating movie title");
      await updateDoc(movieDoc, { title: movieTitle });
      console.log("updated movie title");
      getMovies();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpload = async () => {
    try {
      if (!fileUpload) {
        alert("no files selected");
        return;
      } else {
        const storageRef = ref(storage, `projectFolder/${fileUpload.name}`);
        console.log("uploading files");
        await uploadBytes(storageRef, fileUpload);
        console.log("files uploaded successfully");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Auth />

      {/* Create movies section */}
      <form>
        <div>
          <label htmlFor="movie">Movie Title</label>
          <input
            type="text"
            id="movie"
            value={newMovie}
            onChange={(e) => setNewMovie(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="date">Release Date</label>
          <input
            type="number"
            id="date"
            value={movieYear}
            onChange={(e) => setMovieYear(Number(e.target.value))}
          />
        </div>

        <div>
          <label htmlFor="oscar">Oscar ?</label>
          <input
            type="checkbox"
            id="oscar"
            checked={oscar}
            onChange={(e) => setOscar(e.target.checked)}
          />
        </div>

        <button onClick={(e) => createNewMovie(e)}>create</button>
      </form>

      {/* Movie section here */}
      <div>
        {movies.map((movie) => (
          <div key={movie.id}>
            <h1 style={{ color: movie.oscar ? "green" : "red" }}>
              {movie.title}
            </h1>
            <p>Release Year: {movie.year}</p>

            <button
              style={{ padding: "10px", color: "red" }}
              onClick={() => deleteMovie(movie.id)}
            >
              Delete
            </button>
            <div>
              <label htmlFor="newTitle">New Movie Title</label>
              <input
                type="text"
                id="newTitle"
                onChange={(e) => setMovieTitle(e.target.value)}
              />
            </div>
            <button onClick={() => updateMovie(movie.id)}>Update</button>
          </div>
        ))}

        <div>
          <label htmlFor="file">Upload files:</label>
          <input
            type="file"
            id="file"
            onChange={(e) => setFileUpload(e.target.files[0])}
          />
          <button onClick={handleUpload}>upload</button>
        </div>
      </div>
    </>
  );
}

export default App;
