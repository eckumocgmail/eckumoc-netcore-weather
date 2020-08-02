export class ForecastModel
{


  base: string;
  clouds: {
    all: number
  };
  cod: number;
  coord: {lon: -77.4, lat: 37.23}
  dt: number;
  id: number;
  main: {
    temp:       number,
    feels_like: number,
    temp_min:   number,
    temp_max:   number,
    pressure:   number
  }={
    temp: 0,
    feels_like: 0,
    temp_min: 0,
    temp_max: 0,
    pressure: 0
  };
  name = "Петербург";
  // sys = {type: 1, id: 5417, country: "US", sunrise: 1596276880, sunset: 1596327420}


  timezone= -14400;
  visibility= 10000;
  weather: {id: number, main: string, description: string, icon: string }[] = [];
  wind = {
    speed: 0.82,
    deg: 11
  }
}
