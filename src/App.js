// react-dates
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

import React from "react";
import { SingleDatePicker } from "react-dates";

const INPUT_PAGE = 0;
const OUTPUT_PAGE = 1;

function InputPage({ submit, setValues, values }) {
  const [open, setOpen] = React.useState(false);

  const { date, message } = values;

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
          defaultValue={values.message}
          onChange={(e) => {
            setValues({ message: e.target.value });
          }}
        />
      </div>
      <div>
        <button onClick={submit}>Submit</button>
      </div>
    </div>
  );
}

function OutputPage({ goBack, values }) {
  const { date, message } = values;

  return (
    <div>
      <h1>Output</h1>
      <div>
        <p>{date.toString()}</p>
        <p>{message}</p>
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

  console.log(values);

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
