/**
 * Class responsible for fetching and rendering news articles using the Google News RSS feed via rss2json.
 */
export class News {
  /**
   * Initializes the News module.
   * @param {string} tema 
   * @param {number} limite 
   */
  constructor(tema, limite) {
    this.tema = tema;
    this.limite = limite;
    this.rssUrl = `https://news.google.com/rss/search?q=${this.tema}&hl=pt-PT&gl=PT&ceid=PT:pt`;
    this.apiUrl = "https://api.rss2json.com/v1/api.json?rss_url=" + encodeURIComponent(this.rssUrl);
  }

  /**
   * @returns {Promise<void>}
   */
  async init() {
    await this.carregarNoticias();
  }

  /**
   * Fetches the RSS data, formats the dates
   * @returns {Promise<void>}
   */
  async carregarNoticias() {
    try {
      const resposta = await fetch(this.apiUrl);
      const dados = await resposta.json();
      
      // Extract only the requested number of items
      const topNoticias = dados.items.slice(0, this.limite);

      topNoticias.forEach((noticia, index) => {
        const dataFormatada = new Date(noticia.pubDate).toLocaleDateString('pt-PT');
        document.getElementById(`title-${index}`).textContent = noticia.title;
        document.getElementById(`date-${index}`).textContent = `Publicado a ${dataFormatada}`;
        document.getElementById(`link-${index}`).href = noticia.link;
      });

    } catch (erro) {
      console.error(erro);
      const errorContainer = document.getElementById("news-container");
      if (errorContainer) {
          errorContainer.textContent = "Erro ao carregar notícias.";
      }
    }
  }
}
