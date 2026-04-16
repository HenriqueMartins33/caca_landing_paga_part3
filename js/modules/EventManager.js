import { WeatherManager } from './Weather.js';
import { MapManager }     from './Map.js';

/**
 * Manages CACA event CRUD operations with IndexedDB persistence.
 */
export class EventManager {

  /**
   * IndexedDB configuration.
   * @type {Object}
   */
  static DB_CONFIG = {
    name: 'CACA_EventosDB',
    version: 1,
    storeName: 'eventos'
  };

  /**
   * @param {string} formSelector 
   */
  constructor(formSelector) {
    this.form  = document.querySelector(formSelector);
    this.grid  = document.getElementById('events-grid');
    this.submitButton = document.getElementById('btn-submit-evento');

    // Tracks which event is being edited 
    this.eventoSendoEditadoId = null;

    // Tracks which event cards have already loaded weather+map
    this.cardsInicializados = new Set();

    if (!this.form) {
      console.warn('EventManager: form not found with selector:', formSelector);
      return;
    }

    this.db = null;
    this.initDatabase();

    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  // ─── DATABASE ─────────────────────────────────────────────────────────────

  /**
   * Opens the IndexedDB database and creates the eventos object store
   * @returns {void}
   */
  initDatabase() {
    const request = indexedDB.open(EventManager.DB_CONFIG.name, EventManager.DB_CONFIG.version);

    request.onerror = (event) => {
      console.error('EventManager: erro na BD:', event.target.error);
    };

    request.onsuccess = () => {
      this.db = request.result;
      this.displayEvents();
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(EventManager.DB_CONFIG.storeName)) {
        db.createObjectStore(EventManager.DB_CONFIG.storeName, {
          keyPath: 'id',
          autoIncrement: true
        });
      }
    };
  }

  // ─── ADD / EDIT SUBMIT ────────────────────────────────────────────────────

  /**
   * Handles form submission for both adding and editing events.
   * Validates required fields before writing to IndexedDB.
   * @param {Event} e 
   * @returns {void}
   */
  handleSubmit(e) {
    e.preventDefault();

    const dadosEvento = {
      titulo:    document.getElementById('evento-titulo').value.trim(),
      data:      document.getElementById('evento-data').value,
      cidade:    document.getElementById('evento-cidade').value.trim(),
      descricao: document.getElementById('evento-descricao').value.trim()
    };

    // Validation 
    if (!dadosEvento.titulo || !dadosEvento.data || !dadosEvento.cidade) {
      this.showValidationErrors(dadosEvento);
      return;
    }

    this.clearValidationErrors();

    if (!this.db) return;

    const transaction = this.db.transaction([EventManager.DB_CONFIG.storeName], 'readwrite');
    const store       = transaction.objectStore(EventManager.DB_CONFIG.storeName);

    
    if (this.eventoSendoEditadoId) {
      dadosEvento.id = this.eventoSendoEditadoId;
    }
    const request = this.eventoSendoEditadoId ? store.put(dadosEvento) : store.add(dadosEvento);

    request.onsuccess = () => {
      this.form.reset();
      this.eventoSendoEditadoId = null;
      this.submitButton.textContent = 'Adicionar Evento';
      this.clearValidationErrors();
      this.displayEvents();
    };

    request.onerror = () => {
      console.error('EventManager: erro ao guardar evento:', request.error);
    };
  }

  // ─── DELETE ───────────────────────────────────────────────────────────────

  /**
   * @param {number} id 
   * @returns {void}
   */
  apagarEvento(id) {
    if (!confirm('Tem a certeza que deseja remover este evento?')) return;
    if (!this.db) return;

    const transaction = this.db.transaction([EventManager.DB_CONFIG.storeName], 'readwrite');
    const store       = transaction.objectStore(EventManager.DB_CONFIG.storeName);
    const request     = store.delete(id);

    request.onsuccess = () => {
      this.cardsInicializados.delete(id); 
      this.displayEvents();
    };

    request.onerror = () => {
      console.error('EventManager: erro ao apagar evento:', request.error);
    };
  }

  // ─── EDIT ─────────────────────────────────────────────────────────────────

  /**
   * @param {Object} evento 
   * @returns {void}
   */
  prepararEdicao(evento) {
    document.getElementById('evento-titulo').value    = evento.titulo;
    document.getElementById('evento-data').value      = evento.data;
    document.getElementById('evento-cidade').value    = evento.cidade;
    document.getElementById('evento-descricao').value = evento.descricao || '';

    this.eventoSendoEditadoId     = evento.id;
    this.submitButton.textContent = 'Atualizar Evento';

    document.getElementById('eventos').scrollIntoView({ behavior: 'smooth' });
  }

  // ─── RENDER ───────────────────────────────────────────────────────────────

  /**
   * Retrieves all events from IndexedDB and renders them as cards.
   * @returns {void}
   */
  displayEvents() {
    if (!this.db || !this.grid) return;

    const transaction = this.db.transaction([EventManager.DB_CONFIG.storeName], 'readonly');
    const store       = transaction.objectStore(EventManager.DB_CONFIG.storeName);

    store.getAll().onsuccess = (e) => {
      const eventos = e.target.result;
      this.cardsInicializados.clear();
      this.grid.textContent = '';

      if (eventos.length === 0) {
        this.grid.innerHTML = '<p class="eventos-empty">Ainda não foram criados eventos.</p>';
        return;
      }

      eventos.forEach((evento) => this.criarCard(evento));
    };

    store.getAll().onerror = () => {
      console.error('EventManager: erro ao carregar eventos');
    };
  }

  /**
   * Builds and appends a single event card to the grid.
   * @param {Object} evento 
   * @returns {void}
   */
  criarCard(evento) {
    const dataFormatada = new Date(evento.data + 'T00:00:00').toLocaleDateString('pt-PT');

    const card = document.createElement('article');
    card.className  = 'event-card';
    card.dataset.id = evento.id;

     // Title
    const title = document.createElement('h3');
    title.textContent = evento.titulo;
    card.appendChild(title);

   
   // Date 
    const dataP = document.createElement('p');
    const dataStrong = document.createElement('strong');
    dataStrong.textContent = 'Data: ';
    dataP.appendChild(dataStrong);
    dataP.appendChild(document.createTextNode(dataFormatada));
    card.appendChild(dataP);

    // Location 
    const localP = document.createElement('p');
    const localStrong = document.createElement('strong');
    localStrong.textContent = 'Local: ';
    localP.appendChild(localStrong);
    localP.appendChild(document.createTextNode(evento.cidade));
    card.appendChild(localP);

     // Description
    if (evento.descricao) {
      const descP = document.createElement('p');
      descP.textContent = evento.descricao;
      card.appendChild(descP);
    }

    
    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'event-actions';

    const btnEdit = document.createElement('button');
    btnEdit.textContent = 'Editar';
    btnEdit.className   = 'btn';
    btnEdit.addEventListener('click', () => this.prepararEdicao(evento));

    const btnDelete = document.createElement('button');
    btnDelete.textContent = 'Remover';
    btnDelete.className   = 'btn btn-primary';
    btnDelete.addEventListener('click', () => this.apagarEvento(evento.id));

    actionsDiv.appendChild(btnEdit);
    actionsDiv.appendChild(btnDelete);
    card.appendChild(actionsDiv);

    
    const btnTempo = document.createElement('button');
    btnTempo.className   = 'btn btn-ghost btn-ver-tempo';
    btnTempo.innerHTML   = '<span class="material-symbols-outlined">partly_cloudy_day</span> Ver Tempo &amp; Localização';
    card.appendChild(btnTempo);

    
    const weatherDiv = document.createElement('div');
    weatherDiv.id             = `weather-event-${evento.id}`;
    weatherDiv.style.display  = 'none';
    card.appendChild(weatherDiv);

    
    const mapDiv = document.createElement('div');
    mapDiv.id            = `map-event-${evento.id}`;
    mapDiv.style.display = 'none';
    card.appendChild(mapDiv);

    
    btnTempo.addEventListener('click', () => {
      const isVisible = weatherDiv.style.display !== 'none';

      if (isVisible) {
        weatherDiv.style.display = 'none';
        mapDiv.style.display     = 'none';
        btnTempo.innerHTML = '<span class="material-symbols-outlined">partly_cloudy_day</span> Ver Tempo &amp; Localização';
        return;
      }

      weatherDiv.style.display = 'block';
      mapDiv.style.display     = 'block';
      btnTempo.innerHTML = '<span class="material-symbols-outlined">expand_less</span> Ocultar Tempo &amp; Localização';

      
      if (!this.cardsInicializados.has(evento.id)) {
        this.cardsInicializados.add(evento.id);
        new WeatherManager(evento.cidade, weatherDiv.id).init();
        new MapManager(evento.cidade, mapDiv.id).init();
      }
    });

    this.grid.appendChild(card);
  }

  // ─── VALIDATION HELPERS ───────────────────────────────────────────────────

  /**
   * Highlights required fields that are empty.
   * @param {Object} dados 
   * @returns {void}
   */
  showValidationErrors(dados) {
    if (!dados.titulo)  this.marcarErro('evento-titulo');
    if (!dados.data)    this.marcarErro('evento-data');
    if (!dados.cidade)  this.marcarErro('evento-cidade');
  }

  /**
   * Shows the error message element for a field.
   * @param {string} fieldId 
   * @returns {void}
   */
  marcarErro(fieldId) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    field.parentElement.classList.add('has-error');
    const err = document.getElementById(`error-${fieldId}`);
    if (err) err.style.display = 'block';
  }

  /**
   * Clears all validation error states from the form.
   * @returns {void}
   */
  clearValidationErrors() {
    ['evento-titulo', 'evento-data', 'evento-cidade'].forEach((fieldId) => {
      const field = document.getElementById(fieldId);
      if (!field) return;
      field.parentElement.classList.remove('has-error');
      const err = document.getElementById(`error-${fieldId}`);
      if (err) err.style.display = 'none';
    });
  }
}