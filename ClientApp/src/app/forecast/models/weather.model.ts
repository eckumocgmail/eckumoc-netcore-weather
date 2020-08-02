export class WeatherModel
{
  dt:         number;
  sunrise:    number;
  sunset:     number;
  rain:       number; //обьём осадков
  feels_like: number; //восприятие человеком погоду
  pressure:   number; //атмосферное давление
  humidity:   number; //влажность
  dew_point:  number;
  uvi:        number;
  clouds:     number; //Облачность
  visibility: number; //Средняя видимость
  wind_speed: number;
  wind_deg:   number;
  temp:  {
    day: number,
    eve: number,
    max: number,
    min: number,
    morn: number,
    night: number
  };
  weather: {
    id:           number;
    main:         string;
    description:  string;
    icon:         string
  }[]
}
