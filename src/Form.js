import { useState } from "react"
import 'bulma/css/bulma.min.css';
import './styles/slider.css'

export default function Form() {
  const [sliderValue, setSliderValue] = useState(50);
  const [noteInputValue, setNoteInputValue] = useState("");

  function handleSliderChange(event) {
    setSliderValue(event.target.value);
  }

  function handleNoteChange(event) {
    setNoteInputValue(event.target.value);
  }

  async function handleClick(event) {
    let data = {
      rating: sliderValue,
      notes: noteInputValue,
      date: (new Date()).toISOString()
    }
    
    console.log({ fields: data })

    await fetch("https://api.airtable.com/v0/appx2X79lC25UqVrT/moods", {
      method: "POST",
      body: JSON.stringify({fields: data}),
      headers: {
        "Authorization": "Bearer {API_KEY}",
        "Content-Type": "application/json"
      }
    })
      .then(res => console.log(res))
  }

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">{sliderValue}</div>
        <div className="controls">
          <input
            type="range"
            id="slider"
            name="slider"
            min="0"
            max="100"
            value={sliderValue}
            onChange={handleSliderChange}
          />
          <input type="text" id="note-input" onChange={handleNoteChange} placeholder="Notes" value={noteInputValue} />
        </div>
        <div className="card-footer">
          <button className="button is-primary" onClick={handleClick}>Save Mood</button>
        </div>
      </div>
    </div >
  )
}