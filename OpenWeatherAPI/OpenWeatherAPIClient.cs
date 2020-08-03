using System.Collections.Generic;
using System.Threading.Tasks;

namespace eckumoc_netcore_weather_api.OpenWeatherAPI
{

    // <summary>
    // Класс реализует клиент общедоступного API для доступа к данным 
    // о погоде https://api.openweathermap.org/.
    // </summary>    
    public class OpenWeatherAPIClient
    {
        public HourlyForecastAPI hourly;
        public OnecallForecastAPI onecall;
        public WeatherForecastAPI weather;

        public OpenWeatherAPIClient(
            HourlyForecastAPI hourly,
            OnecallForecastAPI onecall,
            WeatherForecastAPI weather )  
        {
            this.hourly = hourly;
            this.onecall = onecall;
            this.weather = weather;
        }   
        
        public static OpenWeatherAPIClient Create()
        {
            return new OpenWeatherAPIClient(
                new HourlyForecastAPI(),
                new OnecallForecastAPI(),
                new WeatherForecastAPI()
            );
        }
    }
}
