// react-dates
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

import React from "react";
import { SingleDatePicker } from "react-dates";

const INPUT_PAGE = 0;
const OUTPUT_PAGE = 1;

const themes = [
  { id: 1, label: "Theme 1" },
  { id: 2, label: "Theme 2" },
  { id: 3, label: "Theme 3" },
];

function ThemePicker({ setTheme, activeId }) {
  return (
    <div>
      {themes.map(({ id, label }) => (
        <button onClick={() => setTheme(id)} key={id}>
          {id === activeId ? `ACTIVE: ${label}` : label}
        </button>
      ))}
    </div>
  );
}

function InputPage({ submit, setValues, values }) {
  const [open, setOpen] = React.useState(false);

  const { date, message, themeId } = values;

  return (
    <div>
      <h1>Input</h1>
      <SingleDatePicker
        date={date}
        onDateChange={(date) => setValues({ date })}
        focused={open}
        onFocusChange={({ focused }) => setOpen(focused)}
        id="delivery-date"
      />
      <div>
        <textarea
          defaultValue={message}
          onChange={(e) => {
            setValues({ message: e.target.value });
          }}
        />
      </div>
      <ThemePicker
        setTheme={(themeId) => setValues({ themeId })}
        activeId={themeId}
      />
      <div>
        <button onClick={submit}>Submit</button>
      </div>
    </div>
  );
}

function OutputPage({ goBack, values }) {
  const { date, message, themeId } = values;
  const selectedTheme = themes.find((t) => t.id === themeId);

  return (
    <div>
      <h1>Output</h1>
      <div>
        <p>{date.toString()}</p>
        <p>{message}</p>
        <p>{selectedTheme ? selectedTheme.label : ""}</p>
        <button onClick={goBack}>Go back</button>
      </div>
    </div>
  );
}

function App() {
  const [values, setValues] = React.useState({
    date: null,
    message: "",
  });
  const [activePage, setActivePage] = React.useState(INPUT_PAGE);

  return [
    <InputPage
      submit={() => setActivePage(OUTPUT_PAGE)}
      values={values}
      setValues={(newValues) =>
        setValues((prevValues) => ({ ...prevValues, ...newValues }))
      }
    />,
    <OutputPage goBack={() => setActivePage(INPUT_PAGE)} values={values} />,
  ][activePage];
}

export default App;
