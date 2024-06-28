import axios from "axios"

//https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,weather_code,wind_speed_10m&hourly=temperature_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,rain_sum&timeformat=unixtime&timezone=Asia%2FSingapore
//https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,weather_code,wind_speed_10m&hourly=temperature_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,rain_sum,wind_speed_10m_max&timeformat=unixtime&timezone=Asia%2FSingapore
export async function getWeather(lat, lon, timezone){
    return axios
      .get(
        "https://api.open-meteo.com/v1/forecast?current=temperature_2m,weather_code,wind_speed_10m,is_day&hourly=temperature_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,is_day&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,rain_sum,wind_speed_10m_max&timeformat=unixtime",
        {
          params: {
            latitude: lat,
            longitude: lon,
            timezone,
          },
        }
        // )
      )
      .then(({ data }) => {
        return {
          current: parseCurrentWeather(data),
          daily: parseDailyWeather(data),
          hourly: parseHourlyWeather(data),
        };
      });
}

function parseCurrentWeather({current,daily}){
    const {
        temperature_2m: currentTemp,
        weather_code: imageCode,
        wind_speed_10m: windSpeed,
        is_day: dayOrNight,
    } = current 
    const {
        temperature_2m_max: [maxTemp],
        temperature_2m_min: [minTemp],
        apparent_temperature_max: [maxFeelsLike],
        apparent_temperature_min: [minFeelsLike],
        wind_speed_10m_max: [dailyWindSpeed],
        rain_sum: [precip],
    } = daily

    return{
        currentTemp,
        maxTemp,
        minTemp,
        maxFeelsLike,
        minFeelsLike,
        windSpeed,
        dailyWindSpeed,
        precip,
        imageCode,
        dayOrNight,
    }
}

function parseDailyWeather({daily}){
    return daily.time.map((time,index) => {
        return {
            timestamp: time*1000,
            imageCode: daily.weather_code[index],
            maxTemp: daily.temperature_2m_max[index],
            minTemp: daily.temperature_2m_min[index],
            maxFeelsLike: daily.apparent_temperature_max[index],
            minFeelsLike: daily.apparent_temperature_min[index],
            dailyWindSpeed: daily.wind_speed_10m_max[index],
            precip: daily.rain_sum[index],
        }
    })
}

function parseHourlyWeather({hourly, current}){
    return hourly.time.map((time,index) => {
        return{
            timestamp: time*1000,
            currentTemp: hourly.temperature_2m[index],
            currentFeelsLike: hourly.apparent_temperature[index],
            imageCode: hourly.weather_code[index],
            windSpeed: hourly.wind_speed_10m[index],
            precip: hourly.precipitation[index],
            dayOrNight: hourly.is_day[index],
        }
    }).filter(({timestamp}) => timestamp >= current.time*1000)
}