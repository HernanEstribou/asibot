function obtenerFechaHoy() {
    const hoy = new Date();

    const dia = hoy.getDate().toString().padStart(2, '0');
    const mes = (hoy.getMonth() + 1).toString().padStart(2, '0'); // Los meses en JavaScript son 0-11
    const año = hoy.getFullYear();

    return `${dia}/${mes}/${año}`;
}

async function generarPdf(fecha, tarifaOriginal, categoriaOptima, potenciaOptima, oportunidad, ahorro, datosFormulario, empresa, resolucion){
  const { PDFDocument, rgb, StandardFonts } = PDFLib;
  
  const titulo = "Diagnóstico de optimización de costos energeticos";
  const primerParrafo = `En respuesta a tu solicitud y las facturas que nos enviaste con los consumos electricos de tu PyME, te presentamos los comentarios y recomendaciones finales para orientarte sobre las oportunidades de ahorro que detectamos en tus facturas:\n \n`

  let puntoUno = '';
  let puntoDos = '';
  let minPot;
  let maxPot;

  const aumentoPotenciaEdesur = "https://www.edesur.com.ar/pymes-y-comercios/modificar-potencia-pymes/";
  const aumentoPotenciaEdenor = "https://www.edenor.com/grandes-clientes/tramites/aumento-de-potencia";
  
  let enlace = '';
  if (empresa == 'edesur'){
    enlace = aumentoPotenciaEdesur;
  } else if (empresa == 'edenor'){
    enlace = aumentoPotenciaEdenor;
  }

  const mantenerCategoria = `- Categoría tarifaria: debido a tu consumo de energía mensual, mantener la categoría ${tarifaOriginal} es lo más adecuado.\n \n`;
  const cambiarCategoria = `- Categoría tarifaria: debido a que tu consumo de energía mensual es muy elevado, cambiar a la Categoría Tarifaria ${categoriaOptima} te producira un ahorro de al menos ${ahorro} por año en tu factura por el servicio electrico.\n \n`   
  const noHayAhorro = `- Categoría tarifaria: debido a tu consumo de energía mensual, no detectamos oportunidad de ahorro al simular un cambio de categoría.\n \n`;

  //const contenidoPrimerPagina = "En respuesta a tu solicitud y las facturas que nos enviaste con los consumos electricos de tu PyME, te presentamos los comentarios y recomendaciones finales para orientarte sobre las oportunidades de ahorro que detectamos en tus facturas:\n \n 1.	Categoría tarifaria: debido a que tu consumo de energía mensual es muy elevado, cambiar a la Categoría Tarifaria {CATEGORIA} te producira un ahorro de al menos {AHORRO} por año en tu factura por el servicio electrico.\n \n 2.	Capacidad de Suministro Contratada (CSC): dentro de la categoría {CATEGORIA}, los usuarios deben escoger un nivel de CSC acorde a sus necesidades de potencia, el cual puede variar entre {MINCATEGORIA} y {MAXCATEGORIA} kW. \n Para determinar la CSC que tu pyme requiere, es posible que necesites el asesoramiento de un electricista.\n Ademas, tene en cuenta que para realizar un cambio de categoría tarifaria es posible que tu empresa distribuidora te solicite una modificacion en los gabinetes de fusibles y gabinete de medidor que se encuentran en el frente de la edificación.\n \n 3.	Para mas informacion sobre este tramite, podes consultar el siguiente enlace de tu empresa distribuidora: https://www.edenor.com/grandes-clientes/tramites/aumento-de-potencia \nEste tramite puede ser realizado unicamente cada 12 meses. Las recomendaciones aquí indicadas seran validas en tanto los datos de las facturas ingresadas sean representativos del consumo a futuro.\n \n 4.	Penalidades por energfa reactiva: estas pagando {penalidad} por año de penalidades por exceso de energía reactiva. Te sugerimos analizar la conveniencia de instalar un banco de capacitores. El período de repago suele ser inferior a los 6 meses.\n \n 5.    Para implementar mejoras que te permitan reducir el consumo energetico, te sugerimos aplicar programas de uso racional de la energía y gestionar de forma sostenible tu establecimiento. Podes adherirte al Programa Ecosellos, y contar con el acompañamiento metodológico especializado que la Subsecretarfa de Ambiente pone a disposicion de todas las organizaciones de la Ciudad de Buenos Aires. Para mas informacion y consultas, podes enviar un email a ecosellos@buenosaires.gob.ar o acceder a:\nhttps://buenosaires.gob.ar/desarrollo-sostenible/programa-ecosellos \n \nFecha de análisis:{FECHA}\nDistribuidora: {DISTRIBUIDORA}\nCuadro Tarifario aplicado:{CUADROTARIFARIO}";
  //puntoDos = `2.	Capacidad de Suministro Contratada (CSC): dentro de la categoría ${categoriaOptima}, los usuarios deben escoger un nivel de CSC acorde a sus necesidades de potencia, el cual puede variar entre {MINCATEGORIA} y {MAXCATEGORIA} kW. \n Para determinar la CSC que tu pyme requiere, es posible que necesites el asesoramiento de un electricista.\n Ademas, tene en cuenta que para realizar un cambio de categoría tarifaria es posible que tu empresa distribuidora te solicite una modificacion en los gabinetes de fusibles y gabinete de medidor que se encuentran en el frente de la edificación.\n \n 3.	Para mas informacion sobre este tramite, podes consultar el siguiente enlace de tu empresa distribuidora: ${enlace} \nEste tramite puede ser realizado unicamente cada 12 meses. Las recomendaciones aquí indicadas seran validas en tanto los datos de las facturas ingresadas sean representativos del consumo a futuro.\n \n 4.	Penalidades por energfa reactiva: estas pagando {penalidad} por año de penalidades por exceso de energía reactiva. Te sugerimos analizar la conveniencia de instalar un banco de capacitores. El período de repago suele ser inferior a los 6 meses.\n \n 5.    Para implementar mejoras que te permitan reducir el consumo energetico, te sugerimos aplicar programas de uso racional de la energía y gestionar de forma sostenible tu establecimiento. Podes adherirte al Programa Ecosellos, y contar con el acompañamiento metodológico especializado que la Subsecretarfa de Ambiente pone a disposicion de todas las organizaciones de la Ciudad de Buenos Aires. Para mas informacion y consultas, podes enviar un email a ecosellos@buenosaires.gob.ar o acceder a:\nhttps://buenosaires.gob.ar/desarrollo-sostenible/programa-ecosellos \n \nFecha de análisis: ${fecha}\nDistribuidora: ${empresa}\nCuadro Tarifario aplicado: ${resolucion}`;
  let puntoCuatro = `- Para implementar mejoras que te permitan reducir el consumo energetico, te sugerimos aplicar programas de uso racional de la energía y gestionar de forma sostenible tu establecimiento. Podes adherirte al Programa Ecosellos, y contar con el acompañamiento metodológico especializado que la Subsecretarfa de Ambiente pone a disposicion de todas las organizaciones de la Ciudad de Buenos Aires. Para mas informacion y consultas, podes enviar un email a ecosellos@buenosaires.gob.ar o acceder a:\nhttps://buenosaires.gob.ar/desarrollo-sostenible/programa-ecosellos \n \nFecha de análisis: ${fecha}\nDistribuidora: ${empresa}\nCuadro Tarifario aplicado: ${resolucion}`;

  const tituloTerminos = "Terminos y condiciones";
  const contenidoSegundaPagina = "1.	USO DEL TEST\nPara un correcto uso del TEST, el USUARIO debera ingresar la totalidad de los DATOS solicitados, siguiendo todas las pautas especificadas.\nLa carga de DATOS parciales y/o	erroneos puede ocasionar la obtención de SUGERENCIAS inadecuadas.\n \n2.	CONDICIONES E HIPOTESIS DE TRABAJO\nEl TEST fue desarrollado por la DGPEN bajo las siguientes condiciones e hipótesis de trabajo:\n\ta.	El ajuste de la Capacidad de Suministro Contratada se basa en suponer que la demanda futura sera similar a la demanda habida en el perfodo cuyas facturas se cargaron.\n\tb.	El período de análisis es de 12 meses para considerar la estacionalidad de las demandas durante un año.\n\tc.	Las tarifas aplicables son las informadas por el TEST a traves las presentes SUGERENCIAS una vez completados todos los datos.\n \n3.	TRATAMIENTO DE LA INFORMACION SOLICITADA\nLa información solicitada al USUARIO en el marco del TEST sera utilizada por el GCBA unicamente a los fines de evaluar y sugerir mejoras en la contratación del servicio electrico.\n \n4.	DESLINDE DE RESPONSABILIDAD\nLos USUARIOS deslindan al Gobierno de la Ciudad Autónoma de Buenos Aires de cualquier tipo de responsabilidad que pudiera originarse por el uso del TEST y/o la implementación de las SUGERENCIAS.\nLas SUGERENCIAS que el TEST arroja son meramente orientativas e informativas. Cualquier acción y/o modificación que el USUARIO realice sobre su punto de suministro en base a las SUGERENCIAS queda bajo su exclusiva responsabilidad, no teniendo nada que reclamar al GCBA derivado del uso del TEST."

  const fontSize = 12;    
  //const font = await pdfDoc.embedFont(StandardFonts.Helvetica);  
  
  // Cargar el archivo template
  const response = await fetch('./templates/MembreteDGPEN.pdf');
  const templateBytes = await response.arrayBuffer();

  // Cargar el documento PDF del template
  const templatePdf = await PDFLib.PDFDocument.load(templateBytes);

  // Crear un nuevo documento PDF
  const newPdf = await PDFLib.PDFDocument.create();

  // Copiar la primera página del template para la primera página del nuevo PDF
  const [firstTemplatePage] = await newPdf.copyPages(templatePdf, [0]);
  newPdf.addPage(firstTemplatePage);
  const firstPage = newPdf.getPage(0);

  // Obtener el tamaño de la primera página
  const { width, height } = firstPage.getSize();
    
  // Definir el área para el texto justificado
  const textWidth = 500;
  const textHeight = 100;
  let x = 50;
  let y = height - 100;

  //Agregar Fecha al PDF
  firstPage.drawText(`Fecha: ${fecha}`, {
    x: 50,
    y: height - 40,
    size: fontSize,
    color: rgb(0, 0, 0),
  });

  // Agregar Titulo al PDF
  firstPage.drawText(titulo, {
    x: 70,
    y: height - 80,
    size: 20,
    color: rgb(0, 0, 0),
  });  

  if (oportunidad){
    if (tarifaOriginal == categoriaOptima) {
      //Mensaje de mantener la categoría
      puntoUno = mantenerCategoria;
    }
    else {
      //Mensaje de cambiar la categoría
      puntoUno = cambiarCategoria;  
    }
    
    if(categoriaOptima == 'T2'){
      minPot = 10;
      maxPot = 49;
      puntoDos = `-	Capacidad de Suministro Contratada (CSC): dentro de la categoría ${categoriaOptima}, los usuarios deben escoger un nivel de CSC acorde a sus necesidades de potencia, el cual puede variar entre ${minPot} y ${maxPot} kW.\nPara determinar la CSC que tu pyme requiere, es posible que necesites el asesoramiento de un electricista. Nuestros calculos determinaron una potencia optima de ${potenciaOptima} kW\nAdemas, tene en cuenta que para realizar un cambio de categoría tarifaria es posible que tu empresa distribuidora te solicite una modificacion en los gabinetes de fusibles y gabinete de medidor que se encuentran en el frente de la edificación.\n \n- Para mas informacion sobre este tramite, podes consultar el siguiente enlace de tu empresa distribuidora: ${enlace} \nEste tramite puede ser realizado unicamente cada 12 meses. Las recomendaciones aquí indicadas seran validas en tanto los datos de las facturas ingresadas sean representativos del consumo a futuro.\n \n`

    } else if(categoriaOptima == 'T3'){
      minPot = 50;
      puntoDos = `- Capacidad de Suministro Contratada (CSC): dentro de la categoría ${categoriaOptima}, los usuarios deben escoger un nivel de CSC acorde a sus necesidades de potencia, la cual comienza en ${minPot} kW en adelante.\nPara determinar la CSC que tu pyme requiere, es posible que necesites el asesoramiento de un electricista. Nuestros calculos determinaron una potencia optima de ${potenciaOptima} kW\nAdemas, tene en cuenta que para realizar un cambio de categoría tarifaria es posible que tu empresa distribuidora te solicite una modificacion en los gabinetes de fusibles y gabinete de medidor que se encuentran en el frente de la edificación.\n \n- Para mas informacion sobre este tramite, podes consultar el siguiente enlace de tu empresa distribuidora: ${enlace} \nEste tramite puede ser realizado unicamente cada 12 meses. Las recomendaciones aquí indicadas seran validas en tanto los datos de las facturas ingresadas sean representativos del consumo a futuro.\n \n`
    } 

  } else {
    //Mensaje de no hay oportunidad de ahorro
    puntoUno = noHayAhorro;
  }

  let contenidoPrimerPagina = primerParrafo + puntoUno + puntoDos + puntoCuatro;
 
  // Insertar primer pagina
  firstPage.drawText(contenidoPrimerPagina, {
    x: x,
    y: height - 120,
    width: textWidth,
    height: textHeight,
    size: fontSize,
    lineHeight: 14,
    maxWidth: textWidth,
    color: rgb(0, 0, 0),        
    //align: 'justify',   //No funciona
});
  
  // Copiar la primera página del template para la segunda página del nuevo PDF
  const [secondTemplatePage] = await newPdf.copyPages(templatePdf, [0]);
  newPdf.addPage(secondTemplatePage);
  const secondPage = newPdf.getPage(1);
  secondPage.drawText(tituloTerminos, {
    x: 50,
    //y: 700,
    y: height - 80,
    size: 20,
    color: PDFLib.rgb(0, 0, 0),
  });

  secondPage.drawText(contenidoSegundaPagina, {
    x: x,
    y: height - 120,
    width: textWidth,
    height: textHeight,
    size: fontSize,
    lineHeight: 14,
    maxWidth: textWidth,
    color: rgb(0, 0, 0),     
});

  // Copiar la primera página del template para la tercera página del nuevo PDF
  const [thirdTemplatePage] = await newPdf.copyPages(templatePdf, [0]);
  newPdf.addPage(thirdTemplatePage);
  const thirdPage = newPdf.getPage(2);
  thirdPage.drawText('Copia de la información enviada', {
    x: 50,
    y: 700,
    size: 24,
    color: PDFLib.rgb(0, 0, 0),
  });

  
  // Filtrar datos y definir encabezados según tarifaOriginal
  let headers;
  if (tarifaOriginal === 'T1') {
    headers = ['periodo', 'ent2'];
  } else if (tarifaOriginal === 'T2') {
    headers = ['periodo', 'csc', 'pa', 'ent2'];
  } else if (tarifaOriginal === 'T3') {
    headers = ['periodo', 'csc', 'pa', 'epta', 'evalle', 'eresto'];
  }

  // Imprimir la tabla en la tercera página
  const startX = 50;
  const startY = 650;
  const rowHeight = 20;
  let currentY = startY;

  // Encabezados de la tabla
  headers.forEach((header, index) => {
    thirdPage.drawText(header.toUpperCase(), {
      x: startX + index * 70,
      y: currentY,
      size: 12,
      color: PDFLib.rgb(0, 0, 0),
    });
  });

  currentY -= rowHeight;

  // Filas de datos
  Object.values(datosFormulario).forEach(row => {
    headers.forEach((header, index) => {
      thirdPage.drawText(row[header], {
        x: startX + index * 70,
        y: currentY,
        size: 12,
        color: PDFLib.rgb(0, 0, 0),
      });
    });
    currentY -= rowHeight;
  });

// Serializar el documento a un archivo
const pdfBytes = await newPdf.save();

// Crear un enlace de descarga para el nuevo PDF
const blob = new Blob([pdfBytes], { type: 'application/pdf' });
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = 'GeneratedDocument.pdf';
document.body.appendChild(a);
a.click();
document.body.removeChild(a);
URL.revokeObjectURL(url);
  
}

export { obtenerFechaHoy, generarPdf }