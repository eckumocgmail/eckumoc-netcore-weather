using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;

namespace eckumoc_netcore_weather_api.OpenWeatherAPI
{
    /// <summary>
    /// Базовый класс реализует доступ к API через HTTP 
    /// </summary>
    public class BaseOpenWeatherAPI
    {        
        protected string BASE_URL = "https://api.openweathermap.org/";
        protected string API_KEY = "e50b1efc362606b154d86dcb2e86a9ba";
        protected string URI = null;

        protected BaseOpenWeatherAPI( string URI )
        {
            this.URI = URI;
        }

        /// <summary>
        /// Выполнение HTTP-запроса по URL методом GET.
        /// </summary>        
        private async Task<string> Execute(string query)
        {
            System.Net.Http.HttpClient client = new System.Net.Http.HttpClient();
            Console.WriteLine(query);
            HttpResponseMessage response = await client.GetAsync(query);
            response.EnsureSuccessStatusCode();
            return await response.Content.ReadAsStringAsync();
        }

        /// <summary>
        /// Выполение запроса с параметрами.
        /// </summary>
        protected async Task<string> Request(Dictionary<string, object> pars)
        {
            pars["appid"] = API_KEY;
            return await this.Execute(this.ToQueryString(pars));
        }

        /// <summary>
        /// Преобразование параметров запроса.
        /// </summary>  
        private string ToQueryString(Dictionary<string, object> pars)
        {
            string queryString = "";
            foreach(var pair in pars)
            {
                queryString += $"{pair.Key}={pair.Value}&";
            }
            return $"{BASE_URL}{URI}?{queryString}";
        }
    }
}
