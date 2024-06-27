async function loadGoogleAnalytics() {
    try {
      const response = await fetch('./config.json');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const config = await response.json();
      const googleAnalyticsId = config.googleAnalyticsId;
      console.log(googleAnalyticsId);

      // Cargar el script de Google Analytics con el ID recuperado
      const gtagScript = document.createElement('script');
      gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`;
      gtagScript.async = true;
      document.head.appendChild(gtagScript);
  
      // Configurar Google Analytics
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', googleAnalyticsId);
    } catch (error) {
      console.error('Error loading Google Analytics config:', error);
    }
  }
  
  // Llamar a la función para cargar y configurar Google Analytics
  loadGoogleAnalytics();