import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Add from "@mui/icons-material/Add";
import Reset from "@mui/icons-material/RestartAlt";
import { useState } from "react";
import styles from "./Counters.module.scss";

function getStorage(key: string) {
  if (!window) return null;
  const value = window.localStorage.getItem(key);
  return parseInt(value || "0");
}

function setStorage(key: string, value: number) {
  if (!window) return null;
  return window.localStorage.setItem(key, value.toString());
}

function reset() {
  if (!window) return null;
  window.localStorage.clear();
  window.location.reload();
}

export default function Counters(): React.ReactNode {
  const [viewed, setViewed] = useState(getStorage("viewed") || 0);
  const [applied, setApplied] = useState(getStorage("applied") || 0);
  const [maxViewed, setMaxViewed] = useState(
    getStorage("max-viewed") || 30
  );
  const [maxApplied, setMaxApplied] = useState(
    getStorage("max-applied") || 10
  );

  function plusViewed() {
    const newVal = viewed + 1;
    setStorage("viewed", newVal);
    setViewed(newVal);
  }

  function plusApplied() {
    const newVal = applied + 1;
    setStorage("applied", newVal);
    setApplied(newVal);
  }

  function handlerMaxViewed(event: React.ChangeEvent<HTMLInputElement>) {
    const val = parseInt(event.target.value);
    setStorage("max-viewed", val);
    setMaxViewed(val);
  }

  function handlerMaxApplied(event: React.ChangeEvent<HTMLInputElement>) {
    const val = parseInt(event.target.value);
    setStorage("max-applied", val);
    setMaxApplied(val);
  }

  return (
    <>
      <div className={styles.group}>
        <span className={styles.counter}>{viewed}</span>

        <span className={styles.divider}>/</span>

        <TextField
          sx={{
            width: 72,
          }}
          id="outlined-basic"
          label="Viewed"
          variant="outlined"
          type="number"
          className="number"
          value={maxViewed}
          onChange={handlerMaxViewed}
        />

        <IconButton
          aria-label="add"
          onClick={plusViewed}
          className={styles.increase}
          sx={{
            m: 1,
          }}
        >
          <Add />
        </IconButton>
      </div>

      <div className={styles.group}>
        <span className={styles.counter}>{applied}</span>

        <span className={styles.divider}>/</span>

        <TextField
          sx={{
            width: 72,
          }}
          id="outlined-basic"
          label="Applied"
          variant="outlined"
          type="number"
          className="number"
          value={maxApplied}
          onChange={handlerMaxApplied}
        />

        <IconButton
          aria-label="add"
          onClick={plusApplied}
          className={styles.increase}
          sx={{
            m: 1,
          }}
        >
          <Add />
        </IconButton>
      </div>

      <div className={styles.group}>
        <Button onClick={reset} variant="contained" startIcon={<Reset />}>
          Reset
        </Button>
      </div>
    </>
  );
}
