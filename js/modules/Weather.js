/**
 * Class responsible for fetching and displaying current weather data from the OpenWeather API.
 */
export class WeatherManager {
  /**
   * Initializes the WeatherManager.
   * @param {string} cidade 
   * @param {string} containerId 
   */
  constructor(cidade, containerId) {
    this.cidade = cidade;
    this.containerId = containerId;
    
    /**
     * OpenWeather API Key.
     * @type {string}
     */
    this.apiKey = "771f699f357f813e03c2a0a90109c175";
  }

  /**
   * Fetches weather data 
   * Handles errors by rendering a fallback message.
   * @returns {Promise<void>}
   */
  async init() {
    const container = document.getElementById(this.containerId);
    if (!container) return;

    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.cidade}&appid=${this.apiKey}&units=metric&lang=pt`);
      if (!response.ok) throw new Error("Local indisponível");
      
      const data = await response.json();
      container.textContent = ''; 

      // Create weather widget DOM elements
      const widget = document.createElement('div');
      widget.className = 'weather-widget';

      const tempStrong = document.createElement('strong');
      tempStrong.textContent = `${data.main.temp}°C `;

      const descSpan = document.createElement('span');
      descSpan.textContent = `- ${data.weather[0].description}`;

    
      widget.appendChild(tempStrong);
      widget.appendChild(descSpan);
      container.appendChild(widget);

    } catch (error) {
      container.textContent = 'Dados meteorológicos indisponíveis';
      container.style.color = 'red';
      container.style.fontSize = '0.8em';
    }
  }
}