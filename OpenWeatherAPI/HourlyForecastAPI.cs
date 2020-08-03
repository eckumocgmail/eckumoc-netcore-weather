using System.Collections.Generic;
using System.Diagnostics;
using System.Net.Http;
using System.Threading.Tasks;

namespace eckumoc_netcore_weather_api.OpenWeatherAPI
{
    /// <summary>
    /// Реализует запросы почасового прогноза погоды сервису hourly.
    /// </summary>
    public class HourlyForecastAPI: BaseOpenWeatherAPI
    {
        private static string URI = "data/2.5/forecast/hourly";

        public HourlyForecastAPI(): base(HourlyForecastAPI.URI)
        {
        }
 
    }
}
