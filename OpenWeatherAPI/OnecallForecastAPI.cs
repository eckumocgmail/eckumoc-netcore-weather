using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;

namespace eckumoc_netcore_weather_api.OpenWeatherAPI
{

    /// <summary>
    /// Реализует запросы к сервису Onecall
    /// </summary>
    public class OnecallForecastAPI: BaseOpenWeatherAPI
    {  
        private static string URI = "data/2.5/onecall";

        public OnecallForecastAPI():base(OnecallForecastAPI.URI)
        {
        }

        /// <summary>
        /// Запрашивает данные о погоде с заданной координатой и временем
        /// </summary>
        public async Task<string> GetOneCall( double lat, double lon, long time )
        {
            Dictionary<string, object> pars = new Dictionary<string, object>();
            pars["lat"] = lat;
            pars["lon"] = lon;
            pars["time"] = time;
            pars["lang"] = "ru";
            pars["units"] = "metric";
            return await this.Request(pars);
        }

    }


    enum TimeParams
    {
        current,
        minutely,
        hourly,
        daily
    }
}
