using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace eckumoc_netcore_weather.APIS
{

    // <summary>
    // Класс реализует клиент общедоступного API для доступа к данным 
    // о погоде https://api.openweathermap.org/.
    // </summary>    
    public class OpenWeatherAPIClient
    {
        private static string URL = "https://api.openweathermap.org/data/2.5/onecall";
        private static string API_KEY = "e50b1efc362606b154d86dcb2e86a9ba";

        // <summary>    
        //  Пример запроса: https://api.openweathermap.org/data/2.5/weather?id=498817&units=metric&appid=e50b1efc362606b154d86dcb2e86a9ba&lang=ru
        // </summary>    
        public async Task<string> GetPetersburgWeather()
        {
            string query = URL + $"{URL}?appid={API_KEY}&lang=ru&units=metric";
            System.Net.Http.HttpClient client = new System.Net.Http.HttpClient();
            HttpResponseMessage response = await client.GetAsync(query);
            response.EnsureSuccessStatusCode();
            return await response.Content.ReadAsStringAsync();
        }




    }
}
