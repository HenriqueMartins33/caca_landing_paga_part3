export class News {
  
  constructor(tema , limite ) {
    this.tema = tema;
    this.limite = limite;
    this.rssUrl = `https://news.google.com/rss/search?q=${this.tema}&hl=pt-PT&gl=PT&ceid=PT:pt`;
    this.apiUrl = "https://api.rss2json.com/v1/api.json?rss_url=" + encodeURIComponent(this.rssUrl);
  }

  async init() {
    await this.carregarNoticias();
  }

  async carregarNoticias() {
    try {
      const resposta = await fetch(this.apiUrl);
      const dados = await resposta.json();
      const topNoticias = dados.items.slice(0, this.limite);

    topNoticias.forEach((noticia, index) => {
    const dataFormatada = new Date(noticia.pubDate).toLocaleDateString('pt-PT');
    document.getElementById(`title-${index}`).textContent = noticia.title;
    document.getElementById(`date-${index}`).textContent = `Publicado em: ${dataFormatada}`;
    document.getElementById(`link-${index}`).href = noticia.link;
    });

    } catch (erro) {
    console.error(erro);
    document.getElementById("news-container").textContent = "Erro ao carregar notícias.";
  }
  }
}