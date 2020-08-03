using System;
using System.Collections.Generic;
using System.Text;

namespace eckumoc_netcore_weather_api.OpenWeatherAPI
{
    /// <summary>
    /// Реализует запросы почасового прогноза погоды сервису history.
    /// </summary>
    public class HistoryForecastAPI : BaseOpenWeatherAPI
    {
        private static string URI = "data/2.5/forecast/hourly";

        public HistoryForecastAPI() : base(HistoryForecastAPI.URI)
        {
        }

    } 
}
