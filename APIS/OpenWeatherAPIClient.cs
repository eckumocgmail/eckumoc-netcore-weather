using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eckumoc_netcore_weather.APIS
{

    // <summary>
    // Класс реализует клиент общедоступного API для доступа к данным 
    // о погоде https://api.openweathermap.org/.
    // Идея класса в том, что доступные методы с модификатором доступа 
    // public предоставляют информаю полученную с сервиса, полученную
    // c помощью private-методами, реализующими HTTP-запросы 
    // к сервису и предоставлющие данные идентичные тем, что полученны 
    // в резутате выполнения запросов.
    // <summary>    
    public class OpenWeatherAPIClient
    {

    }
}
