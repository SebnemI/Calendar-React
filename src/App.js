import React, { useState, useEffect } from "react";
import { Day } from "./Day";
import "./CalendarN.css";

export const App = () => {
  const [nav, setNav] = useState(0);
  const [days, setDays] = useState([]);
  const [dateDisplay, setDateDisplay] = useState("");

  const [clicked, setClicked] = useState();
  const [events, setEvents] = useState([]);
  const [chosenDate, setChosenDate] = useState(new Date());

  const eventForDate = (date) => events.find((e) => e.date === date);

  useEffect(() => {
    //localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    const weekdays = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    let date = new Date();
    if (typeof chosenDate != "undefined") {
      date = new Date(chosenDate);
    }

    if (nav !== 0) {
      date.setMonth(new Date().getMonth() + nav);
    }

    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const dateString = firstDayOfMonth.toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });

    let monthString = date.toLocaleDateString(undefined, { month: "long" });
    monthString = monthString.charAt(0).toUpperCase() + monthString.slice(1);

    setDateDisplay(`${monthString} ${year}`);

    // display the first three letters of the weekdays
    let weekdaysElement = document.getElementById("weekdays");
    weekdaysElement.innerHTML = weekdays
      .map((weekday) => `<div>${weekday.slice(0, 3)}</div>`)
      .join("");

    // const paddingDays = weekdays.indexOf(dateString.split(", ")[0]);

    let paddingDays = firstDayOfMonth.getDay() - 1;
    if (paddingDays < 0) {
      paddingDays = 6;
    }

    const daysArr = [];

    for (let i = 1; i <= paddingDays + daysInMonth; i++) {
      const dayString = `${i - paddingDays}/ ${month + 1}/${year}`;
      let newDate = new Date(firstDayOfMonth);
      newDate.setDate(newDate.getDate() + i - 1 - paddingDays);

      if (i > paddingDays) {
        daysArr.push({
          value: i - paddingDays,
          event: eventForDate(dayString),
          isCurrentDay: i - paddingDays == day && nav === 0,
          date: newDate,
        });
      } else
        daysArr.push({
          value: "padding",
          event: null,
          isCurrentDay: false,
          date: "",
        });
    }

    setDays(daysArr);
  }, [chosenDate]);

  return (
    <>
      <div id="container">
        <div id="header">
          <div id="dateDisplay">{dateDisplay}</div>
          <div>
            <button
              id="backButton"
              onClick={() => {
                let tempDate = new Date();
                if (typeof chosenDate != "undefined") {
                  tempDate = new Date(chosenDate);
                }
                tempDate.setMonth(tempDate.getMonth() - 1);
                setChosenDate(tempDate);
              }}
            >
              Back
            </button>
            <button
              id="nextButton"
              onClick={() => {
                let tempDate = new Date();
                if (typeof chosenDate != "undefined") {
                  tempDate = new Date(chosenDate);
                }
                tempDate.setMonth(tempDate.getMonth() + 1);
                setChosenDate(tempDate);
              }}
            >
              Next
            </button>
          </div>
        </div>

        <div id="weekdays"></div>

        <div id="calendar">
          {days.map((day) => (
            <div onClick={() => {
              if (day.value !== "padding") {
              //console.log(d.value);
              let newDate = new Date(day?.date);
              console.log(newDate);
              setChosenDate(newDate);
              // setClicked(d.date);
              } 
              className=`day ${day.value === 'padding' ? 'padding' : ''} ${day.isCurrentDay ? 'currentDay' : ''}`}>
              {day.value === 'padding' ? '' : day.value}              
            </div>

            // <Day
            //   key={index}
            //   day={d}
            //   onClick={() => {
            //     if (d.value !== "padding") {
            //       //console.log(d.value);
            //       let newDate = new Date(d?.date);
            //       console.log(newDate);
            //       setChosenDate(newDate);

            //       // setClicked(d.date);
            //     }
            //   }}
            // />
          ))}
        </div>
      </div>
    </>
  );
};
