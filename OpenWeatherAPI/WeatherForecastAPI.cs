using System.Collections.Generic;
using System.Threading.Tasks;

namespace eckumoc_netcore_weather_api.OpenWeatherAPI
{

    // <summary>
    // Реализует запросы к сервису weather.
    // </summary>    
    public class WeatherForecastAPI: BaseOpenWeatherAPI
    {
        private static string URI = "data/2.5/weather";

        /**
         * http://api.openweathermap.org/data/2.5/box/city?bbox=12,32,15,37,10 - погода для городов внутри прямоугольника
         * http://api.openweathermap.org/data/2.5/find?lat=55.5&lon=37.5&cnt=10 - погода для городов внутри круга
         */
        public WeatherForecastAPI() : base(WeatherForecastAPI.URI)
        {
        }

        /// <summary>
        /// Запрос прогноза погоды по имени города
        /// </summary>
        /// <param name="cityname">имя города</param>        
        /// <example>
        /// https://api.openweathermap.org/data/2.5/weather?id=498817&units=metric&appid=e50b1efc362606b154d86dcb2e86a9ba&lang=ru
        /// </example>
        public async Task<string> GetWeatherForecastByCity( string cityname )
        {
            
            Dictionary<string, object> pars = new Dictionary<string, object>();
            pars["q"] = $"{cityname}";
            pars["lang"] = "ru";
            pars["units"] = "metric";
            return await this.Request(pars);
        }

               

    }
}
