using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices.ComTypes;
using System.Threading.Tasks;

using eckumoc_netcore_weather_api.OpenWeatherAPI;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace eckumoc_netcore_weather.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class WeatherForecastController : ControllerBase
    {

        private OpenWeatherAPIClient _client = OpenWeatherAPIClient.Create();

        public async Task<string> GetOneCall(double lat, double lon, long time)
        {
            return await this._client.onecall.GetOneCall(lat, lon, time);
        }

        public async Task<string> GetWeatherForecastByCity(string cityname)
        {
            return await this._client.weather.GetWeatherForecastByCity(cityname);
        }

    }
}
