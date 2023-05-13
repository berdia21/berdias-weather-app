import { useState } from "react";
import styles from "./SearchForm.module.scss";
import { FaSearch } from "react-icons/fa";

interface Props {
  onFormSubmit: (location: string) => void;
}

export function SearchForm({ onFormSubmit }: Props) {
  const [location, setLocation] = useState("");

  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (location.length > 1) {
      console.log("loc in form", location);
      onFormSubmit(location);
      setLocation("");
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSearch}>
      <label htmlFor="location">Search For Location </label>
      <div className={styles["form__input-holder"]}>
        <input
          type="text"
          name="location"
          required
          minLength={2}
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="District...City...Country...State..."
        />
        <button type="submit">
          <FaSearch size="20px" color="#555" />
        </button>
      </div>
    </form>
  );
}
