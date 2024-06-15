import './style.css'
import { getWeather } from "./weather"
import {imageMap} from "./imageMapping"

navigator.geolocation.getCurrentPosition(positionSuccess, positionError)

function positionSuccess({coords}){
    getWeather(coords.latitude, coords.longitude, Intl.DateTimeFormat().resolvedOptions().timeZone)
    .then(renderWeather)
        .catch(e=>{
            console.error(e)
            alert("Error getting weather.")
        })
    }

function positionError(){
    alert("There was an error getting your location. Please allow us to use your location and refresh the page.")
}

function renderWeather({current, daily, hourly}){
    renderCurrentWeather(current)
    renderDailyWeather(daily)
    renderHourlyWeather(hourly)
    document.body.classList.remove("blurred")
}

function setValue(selector, value, {parent = document} ={}){
    parent.querySelector(`[data-${selector}]`).textContent = value
}

const currentImage = document.querySelector("[data-current-image]")

function getImageUrl(imageCode){
    return `image/${imageMap.get(imageCode)}.png`
}

function renderCurrentWeather(current){
    currentImage.src = getImageUrl(current.imageCode)
    setValue("current-temp",current.currentTemp)
    setValue("current-high",current.maxTemp)
    setValue("current-low",current.minTemp)
    setValue("current-fl-high",current.maxFeelsLike)
    setValue("current-fl-low",current.minFeelsLike)
    setValue("current-wind",current.windSpeed)
    setValue("current-precip",current.precip)

}

const DAY_FORMATTER = new Intl.DateTimeFormat(undefined, {weekday:"long"})
const dailySection = document.querySelector("[data-day-section]")
const dayCardTemplate = document.getElementById("day-card-template")

function renderDailyWeather(daily){
    dailySection.innerHTML=""
    let i=0;
    daily.forEach(day =>{
        if(i>0){
        const element = dayCardTemplate.content.cloneNode(true)
        setValue("temp", day.maxTemp, {parent: element})
        setValue("day", DAY_FORMATTER.format(day.timestamp),{parent:element})
        element.querySelector("[data-image]").src = getImageUrl(day.imageCode)
        element.querySelector(".day-card").addEventListener("click", () => updateHeader(day))
        dailySection.append(element)
        }
        i++;
    })
}

function updateHeader(day) {
    setValue("current-temp", day.maxTemp)
    setValue("current-high", day.maxTemp)
    setValue("current-low", day.minTemp)
    setValue("current-fl-high", day.maxFeelsLike)
    setValue("current-fl-low", day.minFeelsLike)
    setValue("current-wind", day.dailyWindSpeed)
    setValue("current-precip", day.precip)
    currentImage.src = getImageUrl(day.imageCode)
}

const HOUR_FORMATTER = new Intl.DateTimeFormat(undefined, {hour:"numeric"})
const hourlySection = document.querySelector("[data-hour-section]")
const hourRowTemplate = document.getElementById("hour-row-template")

function renderHourlyWeather(hourly){
    hourlySection.innerHTML=""
    hourly.forEach(hour =>{
        const element = hourRowTemplate.content.cloneNode(true)
        setValue("temp", hour.currentTemp, {parent: element})
        setValue("fl-temp", hour.currentFeelsLike, {parent: element})
        setValue("wind", hour.windSpeed, {parent: element})
        setValue("precip", hour.precip, {parent: element})
        setValue("day", DAY_FORMATTER.format(hour.timestamp),{parent:element})
        setValue("time", HOUR_FORMATTER.format(hour.timestamp),{parent:element})
        element.querySelector("[data-image]").src = getImageUrl(hour.imageCode)
        hourlySection.append(element)
    })
}