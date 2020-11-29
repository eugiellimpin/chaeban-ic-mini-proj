// react-dates
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import React from 'react';
import { SingleDatePicker } from 'react-dates';

function App() {
  const [date, setDate] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  return (
    <div className="App">
      <h1>Hello there!</h1>
      <SingleDatePicker
        date={date}
        onDateChange={date => setDate(date)}
        focused={open}
        onFocusChange={({ focused }) => setOpen(focused)}
        id="delivery-date"
      />
    </div>
  );
}

export default App;
