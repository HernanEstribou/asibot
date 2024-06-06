Calculadora de Ahorro Energético

Descripción

La Calculadora de Ahorro Energético es una herramienta web frontend que permite a los usuarios estimar su potencial de ahorro energético. Los usuarios deben cargar la información de consumo de sus últimas 12 facturas de electricidad para determinar si existe o no posibilidad de ahorro. Esta herramienta funciona tanto para usuarios de la distribuidora Edesur como Edenor.

Uso

Preguntas del sistema: El sitio web solicitará al usuario que responda algunas preguntas para determinar la categoría tarifaria a la que pertenece y poder realizar los cálculos. Para ello el usuario debe seleccionar a través del menú:
-   Empresa distribuidora: Edesur / Edenor
-   Tipo de factura: T1 / T2 / T3
-   Peaje: Si o No (esto aplica solo para facturas T2 y T3)
-   Tensión: Media o Baja (esto aplica solo para facturas T3)

En base al tipo de factura seleccionada, T1, T2 o T3, el usuario deberá cargar la información de los consumos de las últimas 12 facturas en el formulario que se le presenta.

Ejemplo de carga del formulario para simulación de T2:
PERIODO     CSC     PA      ENT2
202405      40      56      19440
202404      40      62.4    21480
202403      40      65.6    23920
202402      40      68.4    23400
202401      40      68.8    16000
202312      40      18      5240
202311      40      15.8    4280
202310      40      15.6    4320
202309      40      15.6    4160
202308      40      15.6    4200
202307      40      15.6    4320

Ejemplo de carga del formulario para simulación de T3:
PERIODO     CSC     PA      EPTA    EVALLE      ERESTO
202405      86      52      5339    12953       4991
202403      86      56      3812    8929        3684
202403      86      55      6235    15018       6359
202402      86      52      5273    12840       5254
202401      86      50      4942    11750       4705
202312      86      47      3399    8638        3591
202311      86      35      3043    7007        2839
202310      86      34      2784    6855        2889
202309      86      36      174     441         168
202308      86      37      2803    7184        2879
202307      86      40      194     520         198

Análisis de Consumo: Una vez realizada la carga, la calculadora analiza el consumo mensual y estima el potencial de ahorro energético. El resultado se muestra en un pop up ofreciendo la posibilidad de descargar el resultado en formato PDF junto a otras recomendaciones.

Instalación
Al ser un proyecto Front End solo se requiere un servidor web sin configuraciones especiales para que la web quede funcional.  
