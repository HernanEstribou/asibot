// Función para cargar el archivo JSON de configuración
async function loadConfig() {
    try {
      const response = await fetch('./config2.json');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const config = await response.json();
      return config.ga_measurement_id;
    } catch (error) {
      console.error('Error loading config:', error);
      return null;
    }
}

async function initializeAnalytics() {
    const GA_MEASUREMENT_ID = await loadConfig();
    if (GA_MEASUREMENT_ID) {
      
      const gtagScript = document.createElement('script');
      gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      gtagScript.async = true;
      document.head.appendChild(gtagScript);  

      window.dataLayer = window.dataLayer || [];
      
      function gtag() {
        dataLayer.push(arguments);
      }
      
      gtag('js', new Date());
      //gtag('config', GA_MEASUREMENT_ID);
      
      // Configuración de Google Analytics 4 para no usar cookies y anonimizar IPs
      gtag('config', GA_MEASUREMENT_ID, {
        'storage': 'none',  // Deshabilitar el almacenamiento de cookies
        'anonymize_ip': true,  // Anonimizar IP
        'client_storage': 'none',  // Deshabilitar el almacenamiento de cookies en el cliente
        'allow_google_signals': false,  // Deshabilitar las señales de Google
        'allow_ad_personalization_signals': false  // Deshabilitar la personalización de anuncios
      });

      console.log(gtag);
      console.log("GA_MEASUREMENT_ID " + GA_MEASUREMENT_ID);
      // Exportar gtag para que esté disponible globalmente
      window.gtag = gtag;

    } else {
      console.error('Google Analytics Measurement ID not found.');
    }
  }
    
  initializeAnalytics();