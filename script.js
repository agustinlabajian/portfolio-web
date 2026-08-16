// Estado del idioma, tema y modal
let currentLang = 'ES';
let currentActiveProjectId = null;

// Variables de inercia para scroll de rueda del mouse (Página principal)
let currentScrollY = 0;
let targetScrollY = 0;
let isWheelScrolling = false;

// Variables de inercia para scroll de rueda del mouse (Dentro del Modal de Proyecto)
let modalCurrentScrollY = 0;
let modalTargetScrollY = 0;
let isModalWheelScrolling = false;
let modalScrollObserver = null;

// Diccionario completo de traducciones Bilingües (Español / Inglés)
const i18n = {
  ES: {
    darkModeDark: 'Modo Oscuro',
    darkModeLight: 'Modo Claro',
    homeSub: 'Estudiante avanzado de Arquitectura | FADU-UBA',
    homeQuote: '“Incluso un ladrillo quiere ser algo.”',
    homeQuoteAuthor: 'Louis Kahn, Arquitecto',
    
    secTrabajo: 'Trabajos Profesionales',
    secProyectos: 'Proyectos Académicos',
    secEscritos: 'Escritos',
    secFotografia: 'Fotografía',
    secCv: 'Información Personal',

    pillTrabajo: 'Trabajo',
    pillProyectos: 'Proyectos',

    exploreProfBtn: 'Ver todos los Trabajos Profesionales',
    exploreAcadBtn: 'Ver todos los Proyectos Académicos',
    exploreEscBtn: 'Ver todos los Escritos',
    exploreFotoBtn: 'Ver todas las Fotografías',
    allPhotosTitle: 'Todas las Fotografías',
    exploreAllBtn: 'Explorar todos los Proyectos',
    apmTitle: 'Todos los Proyectos',
    filterAll: 'Todos',

    photoIntro: 'Exploración personal sobre la geometría del espacio, la arquitectura y el entorno urbano.',

    footerTitle: 'Arquitectura &<br>Modelado BIM.',
    footerSub: 'Estudiante avanzado (FADU-UBA)<br>Maestro Mayor de Obras',
    footerMenuLabel: 'Menú',
    footerContactLabel: 'Contacto',
    backToTop: '↑ Volver arriba',
    copyright: '© 2026 Agustín Labajian. Todos los derechos reservados.',

    // Modal UI
    modalCloseText: 'Cerrar',
    pmCategoryLabel: 'Categoría',
    pmYearLabel: 'Año',
    pmRoleLabel: 'Rol / Estudio',
    pmLinkText: 'Ver Legajo / Link',
    pmPrevText: 'Proyecto Anterior',
    pmNextText: 'Siguiente Proyecto',

    // CV EXACT SPANISH TRANSLATIONS FROM PDF
    cvRoleTitle: 'MAESTRO MAYOR DE OBRAS',
    cvBio: 'Estudiante avanzado de Arquitectura (FADU–UBA) y Maestro Mayor de Obras, con experiencia en modelado BIM y documentación técnica en estudios nacionales e internacionales. Manejo avanzado de Revit y fuerte interés en el área de proyecto y representación arquitectónica.',
    cvContactHead: 'INFORMACIÓN DE CONTACTO',
    cvEmailLabel: 'Correo electrónico',
    cvPhoneLabel: 'Teléfono',
    cvLocationLabel: 'Dirección',
    cvEduHead: 'Educación',
    cvEdu1Degree: 'Arquitectura',
    cvEdu1Status: '— en curso (2 materias pendientes)',
    cvEdu1School: 'Universidad de Buenos Aires',
    cvEdu1Faculty: 'Facultad de Arquitectura, Diseño y Urbanismo',
    cvEduItem1Date: '2021 – act.',
    cvEduItem2Role: 'Maestro Mayor de Obras',
    cvEdu2Level: 'Escuela Secundaria Técnica',
    cvEdu2School: 'Instituto Tecnológico San Bonifacio',
    cvEduItem2Date: '2013 – 2019',
    
    cvExpHead: 'Experiencia Laboral',
    exp1Role: 'Modelador BIM Junior',
    exp1Date: 'feb 2025 – act.',
    exp1Tag: 'estudio internacional',
    exp1B1: 'Desarrollo y modelado BIM en Revit de documentación técnica para proyectos de mediana escala (establecimientos educativos), trabajando en idioma inglés y bajo el sistema imperial de unidades.',
    exp1B2: 'Elaboración de Permit Sets completos para las fases de Design Development (DD) y Construction Documents (CD), adaptando el diseño a los códigos de edificación de San Francisco.',
    exp1B3: "Gestión de la fase de administración de obra (CA): resolución y respuesta integral de RFI's (Requests for Information) y Submittals, manteniendo la organización y actualización constante del log de seguimiento.",
    exp1B4: 'Armado de presentaciones ejecutivas y material gráfico orientado a la comunicación del proyecto y revisión con los comitentes.',

    exp2Role: 'Dibujante Junior',
    exp2Date: 'feb 2024 – abr 2024',
    exp2Tag: 'temporario',
    exp2B1: 'Participación en el desarrollo del proyecto ejecutivo del Teatro de la Torre Odeón (Av. Corrientes).',
    exp2B2: 'Documentación técnica y elaboración de planos ejecutivos.',
    exp2B3: 'Actualización y control de coherencia gráfica y precisión constructiva según requerimientos del proyecto.',

    exp3Role: 'Ayudante Administrativo',
    exp3Date: 'nov 2021 – mar 2023',
    exp3B1: 'Gestión de documentación de obra para un club de campo y la remodelación de un edificio histórico en Av. de Mayo.',
    exp3B2: 'Administración de consorcio de edificio de viviendas multifamiliar.',
    exp3B3: 'Coordinación de tareas de mantenimiento, materiales y mano de obra.',
    exp3B4: 'Gestión de imagen institucional: redes sociales, sitio web y atención al cliente (Community Manager).',

    exp4Role: 'Mantenimiento edilicio',
    exp4Date: 'may 2019 – nov 2019',
    exp4Tag: 'pasantía',
    exp4B1: 'Tareas de mantenimiento preventivo y correctivo en planta industrial y oficinas.',
    exp4B2: 'Trabajos de montaje y construcción para el sector de exposición de la planta.',
    exp4B3: 'Apoyo técnico general como parte de la formación en escuela secundaria técnica.',

    cvSoftHead: 'Software',
    sk2d: 'Dibujo 2D',
    sk3d: 'Modelado 3D',
    skRender: 'Renderizado',
    skGraphic: 'Gráfico',
    skAnim: 'Animación',

    cvLangHead: 'Idioma',
    cvLangNative: 'Nativo',
    cvLangAdv: 'Avanzado',
    langEsName: 'Español',
    langEnName: 'Inglés',

    // PROYECTOS DESTACADOS SECCIÓN 01 Y 02
    profHibaTitle: 'HIBA Academy Bay Area',
    profHibaCat: 'Educativo',
    profIssfTitle: 'International School of San Francisco',
    profIssfCat: 'Educativo',
    profOdeonTitle: 'Teatro Odeón',
    profOdeonCat: 'Cultural',

    acad3Title: 'Centro Cultural Lobos',
    acad3Cat: 'Arquitectura III – Jury',
    acad5Title: 'Restaurante',
    acad5Cat: 'Arquitectura I',
    acad4Title: 'Plaza bajo Viaducto',
    acad4Cat: 'Arquitectura II',

    // ESCRITOS EN FORMATO LISTA
    esc1Title: 'Intersticio: entre la apertura y la clausura',
    esc1Cat: 'Teoría de la Arquitectura',
    esc1Summary: 'Ensayo teórico sobre los límites, las fricciones urbanas y los espacios indeterminados donde la arquitectura opera como campo de posibilidad entre sistemas consolidados.',
    esc2Title: 'Interpretación local de un fenómeno global',
    esc2Cat: 'Arquitectura, Arte y Diseño Argentino',
    esc2Summary: 'Análisis crítico y contextual de la Torre Odeón y la apropiación vernácula del ladrillo visto como traducción identitaria de las corrientes internacionales.',
    esc4Title: 'La Arquitectura como Propaganda Política',
    esc4Cat: 'Historia III',
    esc4Summary: 'Investigación audiovisual y ensayística sobre el rol del espacio público y la arquitectura monumental como dispositivos de legitimación y discurso de poder.',
    esc3Title: 'Mixtura de Usos',
    esc3Cat: 'Arquitectura IV',
    esc3Summary: 'Investigación y desarrollo audiovisual sobre la coexistencia programática y mixtura de usos en el tejido urbano contemporáneo.',

    // MENÚ FLOTANTE INFERIOR
    menuProf: 'Profesionales',
    menuAcad: 'Académicos',
    menuEsc: 'Escritos',
    menuFoto: 'Fotografía',
    menuInfo: 'Información'
  },
  EN: {
    darkModeDark: 'Dark Mode',
    darkModeLight: 'Light Mode',
    homeSub: 'Advanced Architecture Student | FADU-UBA',
    homeQuote: '“Even a brick wants to be something.”',
    homeQuoteAuthor: 'Louis Kahn, Architect',

    secTrabajo: 'Professional Works',
    secProyectos: 'Academic Projects',
    secEscritos: 'Essays',
    secFotografia: 'Photography',
    secCv: 'Personal Information',

    pillTrabajo: 'Work',
    pillProyectos: 'Projects',

    exploreProfBtn: 'View all Professional Works',
    exploreAcadBtn: 'View all Academic Projects',
    exploreEscBtn: 'View all Essays',
    exploreFotoBtn: 'View all Photographs',
    allPhotosTitle: 'All Photographs',
    exploreAllBtn: 'Explore all Projects',
    apmTitle: 'All Projects',
    filterAll: 'All',

    photoIntro: 'Personal exploration of spatial geometry, architecture, and the urban environment.',

    footerTitle: 'Architecture &<br>BIM Modeling.',
    footerSub: 'Advanced Architecture Student (FADU-UBA)<br>Certified Building Technician',
    footerMenuLabel: 'Menu',
    footerContactLabel: 'Contact',
    backToTop: '↑ Back to top',
    copyright: '© 2026 Agustín Labajian. All rights reserved.',

    // Modal UI
    modalCloseText: 'Close',
    pmCategoryLabel: 'Category',
    pmYearLabel: 'Year',
    pmRoleLabel: 'Role / Studio',
    pmLinkText: 'View Documentation / Link',
    pmPrevText: 'Previous Project',
    pmNextText: 'Next Project',

    // CV EXACT ENGLISH TRANSLATIONS FROM PDF
    cvRoleTitle: 'CERTIFIED BUILDING TECHNICIAN',
    cvBio: 'Advanced Architecture student (FADU-UBA) and Certified Building Technician (Maestro Mayor de Obras) with hands-on experience in BIM modeling and technical documentation for both domestic and international studios. Advanced proficiency in Revit, with a strong focus and interest in architectural design, project development, and representation.',
    cvContactHead: 'CONTACT INFORMATION',
    cvEmailLabel: 'Email',
    cvPhoneLabel: 'Phone',
    cvLocationLabel: 'Location',
    cvEduHead: 'Education',
    cvEdu1Degree: 'Architecture',
    cvEdu1Status: '— in progress (2 courses remaining)',
    cvEdu1School: 'Universidad de Buenos Aires',
    cvEdu1Faculty: 'Faculty of Architecture, Design and Urbanism',
    cvEduItem1Date: '2021 – present',
    cvEduItem2Role: 'Certified Building Technician',
    cvEdu2Level: 'Technical High School',
    cvEdu2School: 'Instituto Tecnológico San Bonifacio',
    cvEduItem2Date: '2013 – 2019',

    cvExpHead: 'Work Experience',
    exp1Role: 'Junior BIM Modeler',
    exp1Date: 'feb 2025 – present',
    exp1Tag: 'international studio',
    exp1B1: 'Developed and modeled technical documentation in Revit for medium-scale projects (educational facilities), working entirely in English and utilizing the Imperial unit system.',
    exp1B2: 'Prepared comprehensive Permit Sets for both Design Development (DD) and Construction Documents (CD) phases, ensuring compliance with San Francisco building codes.',
    exp1B3: 'Managed the Construction Administration (CA) phase, providing comprehensive resolutions and responses to RFIs (Requests for Information) and Submittals while maintaining an organized and up-to-date tracking log.',
    exp1B4: 'Created executive presentations and graphic materials geared toward project communication and client reviews.',

    exp2Role: 'Junior Architectural Drafter',
    exp2Date: 'feb 2024 – apr 2024',
    exp2Tag: 'temporary',
    exp2B1: 'Participated in the development of the executive project for the theatre of the Odeon Tower (Av. Corrientes).',
    exp2B2: 'Drafted technical documentation and detailed construction plans.',
    exp2B3: 'Updated and controlled graphic consistency and constructive precision according to project requirements.',

    exp3Role: 'Administrative Assistant',
    exp3Date: 'nov 2021 – mar 2023',
    exp3B1: 'Managed construction documentation for a country club project and the renovation of a historical building on Av. de Mayo.',
    exp3B2: "Administered the homeowners' association (HOA) operations for a multi-family residential building.",
    exp3B3: 'Coordinated maintenance tasks, material procurement, and labor schedules.',
    exp3B4: 'Managed institutional branding: oversaw social media, website updates, and customer service (Community Manager role).',

    exp4Role: 'Building Maintenance Trainee',
    exp4Date: 'may 2019 – nov 2019',
    exp4Tag: 'internship',
    exp4B1: 'Performed preventive and corrective maintenance tasks across the industrial plant and corporate offices.',
    exp4B2: "Executed assembly and construction work for the plant's showroom and exhibition area.",
    exp4B3: 'Provided general technical support as part of technical high school vocational training.',

    cvSoftHead: 'Software',
    sk2d: '2D Drafting',
    sk3d: '3D Modeling',
    skRender: 'Rendering',
    skGraphic: 'Graphic',
    skAnim: 'Animation',

    cvLangHead: 'Language',
    cvLangNative: 'Native',
    cvLangAdv: 'Advanced',
    langEsName: 'Spanish',
    langEnName: 'English',

    // PROYECTOS DESTACADOS SECCIÓN 01 Y 02 (EN)
    profHibaTitle: 'HIBA Academy Bay Area',
    profHibaCat: 'Educational',
    profIssfTitle: 'International School of San Francisco',
    profIssfCat: 'Educational',
    profOdeonTitle: 'Odeon Theatre',
    profOdeonCat: 'Cultural',

    acad3Title: 'Lobos Cultural Center',
    acad3Cat: 'Architecture III – Jury',
    acad5Title: 'Restaurant',
    acad5Cat: 'Architecture I',
    acad4Title: 'Plaza under Viaduct',
    acad4Cat: 'Architecture II',

    // ESCRITOS EN FORMATO LISTA
    esc1Title: 'Interstice: Between Opening and Enclosure',
    esc1Cat: 'Theory of Architecture',
    esc1Summary: 'Theoretical essay on urban boundaries, spatial frictions, and indeterminate zones where architecture acts as an open field of possibility.',
    esc2Title: 'Local Interpretation of a Global Phenomenon',
    esc2Cat: 'Argentine Architecture, Art & Design',
    esc2Summary: 'Critical and contextual analysis of the Odeón Tower and the vernacular use of exposed brick as an identity translation of international movements.',
    esc4Title: 'Architecture as Political Propaganda',
    esc4Cat: 'History III',
    esc4Summary: 'Audiovisual and essayistic research on the role of public space and monumental architecture as instruments of political legitimation.',
    esc3Title: 'Mixed Uses',
    esc3Cat: 'Architecture IV',
    esc3Summary: 'Audiovisual research and development on programmatic coexistence and mixed uses in the contemporary urban fabric.',

    // MENÚ FLOTANTE INFERIOR
    menuProf: 'Professional',
    menuAcad: 'Academic',
    menuEsc: 'Essays',
    menuFoto: 'Photography',
    menuInfo: 'Information'
  }
};

// TEXTO COMPLETO PÁGINAS 3 A 5 DEL PDF "INTERSTICIO: ENTRE LA APERTURA Y LA CLAUSURA"
const escritoIntersticioHtml_ES = `
  <article class="essay-article">
    <div class="essay-paragraph">
      <p>
        La arquitectura del movimiento moderno consolidó una convicción persistente: proyectar es definir. Definir límites, funciones, recorridos, jerarquías. En esa tradición, el proyecto aparece como un gesto de clarificación progresiva donde lo ambiguo se reduce y lo indeterminado se organiza hasta alcanzar una forma estable. Sin embargo, existen territorios que resisten esa lógica de cierre. No se presentan como objetos consolidados ni como vacíos absolutos, sino como espacios donde múltiples órdenes coexisten sin sintetizarse. Allí, la arquitectura ya no puede operar únicamente como definición; debe confrontarse con la ambigüedad.
      </p>
    </div>

    <div class="essay-grid-two-col">
      <div class="essay-col-text">
        <p>
          Es en ese punto donde emerge la noción de intersticio. No como residuo, ni como resto improductivo, sino como condición espacial específica. El intersticio no es simplemente el “entre” físico que separa dos sistemas; es el espesor donde esos sistemas se tensionan sin resolverse. No es borde, es fricción. No es transición momentánea, sino estado prolongado. Pensarlo implica aceptar que la arquitectura puede existir sin clausura total.
        </p>
        <p>
          La antropología ofrece una herramienta conceptual decisiva para comprender esta condición: la liminalidad. Victor Turner, al estudiar los rituales de paso, describe la fase liminal como un momento intermedio caracterizado por la ambigüedad y la suspensión de las jerarquías habituales. En <em>El proceso ritual</em>, señala: <em>“Las entidades liminales no están aquí ni allí; están entre las posiciones asignadas y ordenadas por la ley, la costumbre, la convención y el ceremonial”</em> (Turner, 1969). La liminalidad implica una pérdida provisional de identidad estable, un desplazamiento hacia un estado indefinido.
        </p>
      </div>
      <div class="essay-col-media">
        <figure class="essay-figure">
          <img src="assets/escritos/intersticio entre la apertura y la clausura/01_imagen.webp" alt="Imagen del sitio. Proyecto del pabellón 4 y actual estacionamiento.">
          <figcaption>Imagen del sitio. Proyecto del pabellón 4 y actual estacionamiento.</figcaption>
        </figure>
      </div>
    </div>

    <div class="essay-grid-two-col reverse">
      <div class="essay-col-media">
        <figure class="essay-figure">
          <img src="assets/escritos/intersticio entre la apertura y la clausura/02_imagen.webp" alt="Fricción entre control y campo abierto">
          <figcaption>Imagen generada con Gemini. “Fricción entre control y campo abierto, donde las marcas se desdibujan y el orden colapsa.”</figcaption>
        </figure>
      </div>
      <div class="essay-col-text">
        <p>
          Trasladado al campo arquitectónico, lo liminal deja de ser una fase temporal para convertirse en condición espacial. El intersticio es liminal cuando no pertenece completamente a un sistema ni a otro, cuando mantiene abierta la posibilidad de múltiples interpretaciones. Turner agrega que en la liminalidad <em>“las estructuras sociales normales se suspenden o se invierten”</em> (1969). Esta suspensión puede pensarse como una analogía espacial: el intersticio suspende la jerarquía formal, relativiza el programa y desestabiliza la función dominante.
        </p>
        <p>
          Sin embargo, la ambigüedad no debe confundirse con vacío. El intersticio no es ausencia, sino coexistencia. Es el lugar donde lógicas distintas (naturales y artificiales, permanentes y transitorias, infraestructurales y simbólicas) se superponen sin integrarse completamente. Esta superposición introduce el concepto de indeterminación. La indeterminación no implica desorden, sino apertura. Supone que el espacio no está completamente fijado por una función única ni por un significado cerrado.
        </p>
      </div>
    </div>

    <div class="essay-paragraph">
      <p>
        Aldo Rossi ofrece una clave fundamental para comprender esta dimensión temporal del espacio. En <em>La arquitectura de la ciudad</em> afirma: <em>“La ciudad es la memoria colectiva de los pueblos; y como la memoria está ligada a hechos y a lugares, la ciudad es el locus de la memoria colectiva”</em>. Esta afirmación desplaza la arquitectura del presente inmediato hacia una duración histórica. Los hechos urbanos —plazas, edificios, infraestructuras— persisten más allá de su función original. Rossi sostiene también que <em>“los hechos urbanos tienen una vida propia, que se prolonga más allá de la función para la que fueron creados”</em>. Esa vida propia es la base de la indeterminación: la forma permanece, el uso cambia, el sentido se transforma.
      </p>
    </div>

    <div class="essay-paragraph">
      <p>
        La permanencia no clausura; acumula. Cada intervención se deposita sobre las anteriores, generando una estratificación donde el significado nunca es definitivo. El intersticio, leído desde Rossi, no es simplemente un espacio vacío entre objetos consolidados; es una capa más dentro de esa memoria colectiva. Puede haber sido proyectado, abandonado, reinterpretado. Puede haber quedado inconcluso. Pero su condición no es la inexistencia, sino la latencia.
      </p>
      <p>
        La latencia es una forma de potencia. Un espacio latente no está inactivo; está abierto a múltiples actualizaciones. Esta idea conecta con el urbanismo infraestructural propuesto por Stan Allen. En su ensayo <em>“Urbanismo infraestructural”</em>, Allen sostiene que la infraestructura <em>“no propone edificios específicos en sitios dados, sino que construye el sitio mismo”</em>. La infraestructura no es un objeto cerrado, sino una condición que organiza relaciones. Funciona como soporte capaz de absorber transformaciones sin perder coherencia.
      </p>
      <p>
        Allen insiste en que los sistemas infraestructurales operan como <em>“condiciones de campo”</em>, es decir, configuraciones donde la relación entre elementos es más importante que la forma individual. <em>“Las condiciones de campo están definidas por relaciones locales complejas, no por esquemas geométricos globales”</em>, señala. Este enfoque desplaza la arquitectura del objeto singular hacia la estructura relacional. El proyecto no define un resultado final, sino un marco operativo que permite múltiples configuraciones.
      </p>
      <p>
        Acá la indeterminación adquiere dimensión proyectual. El sistema no impone una única solución; establece reglas mínimas. El campo no clausura; organiza. La infraestructura, entendida de este modo, no elimina la ambigüedad, sino que la sostiene. Permite que el espacio evolucione en el tiempo, que incorpore usos imprevistos, que acumule memoria.
      </p>
    </div>

    <div class="essay-grid-two-col">
      <div class="essay-col-text">
        <p>
          Sin embargo, esta apertura no está garantizada. El mismo dispositivo infraestructural puede derivar en su contrario: un espacio totalmente regulado, optimizado para el tránsito y la eficiencia, donde la ambigüedad se disuelve. Es aquí donde aparece la figura del no-lugar, formulada por Marc Augé. En <em>Los no lugares</em>, Augé define estos espacios como aquellos que <em>“no pueden definirse ni como lugares de identidad, ni como relacionales, ni como históricos”</em>. Se trata de ámbitos donde la experiencia se reduce a la circulación y el consumo, donde la permanencia se vuelve irrelevante.
        </p>
        <p>
          Augé escribe: <em>“El espacio del no lugar no crea ni identidad singular ni relación, sino soledad y similitud”</em>. El sujeto que atraviesa un aeropuerto o una autopista no se reconoce como habitante, sino como pasajero. El tiempo se mide en conexiones, no en permanencias. La señalética reemplaza a la memoria; la instrucción sustituye al relato.
        </p>
      </div>
      <div class="essay-col-media">
        <figure class="essay-figure">
          <img src="assets/escritos/intersticio entre la apertura y la clausura/03_imagen.webp" alt="Saturación normativa desbordada por la vegetación">
          <figcaption>Imagen generada con Gemini. “Saturación normativa desbordada por la vegetación, donde la señalización excesiva pierde sentido frente al avance de lo orgánico.”</figcaption>
        </figure>
      </div>
    </div>

    <div class="essay-paragraph">
      <p>
        La tensión entre intersticio y no-lugar es sutil. Ambos pueden compartir materialidad e incluso escala. Ambos pueden ser espacios de tránsito. Pero difieren en el modo en que gestionan la incertidumbre. El intersticio sostiene la ambigüedad; el no-lugar la neutraliza. En el primero, la coexistencia es productiva; en el segundo, la regulación es total. El intersticio admite apropiación; el no-lugar prescribe comportamiento.
      </p>
      <p>
        Augé advierte que <em>“si un lugar puede definirse como identitario, relacional e histórico, un espacio que no puede definirse así será un no lugar”</em>. Esta definición introduce un criterio claro: la ausencia de memoria y relación. El intersticio, en cambio, puede ser profundamente histórico, incluso cuando no esté formalmente consolidado. Puede contener huellas, restos, fundaciones inconclusas, vegetación espontánea, recorridos informales. Su identidad no está codificada, pero tampoco está ausente.
      </p>
    </div>

    <div class="essay-full-media">
      <figure class="essay-figure large">
        <img src="assets/escritos/intersticio entre la apertura y la clausura/04_imagen.webp" alt="Croquis del objeto arquitectónico">
        <figcaption>Croquis del objeto arquitectónico. “El proyecto asume el intersticio como condición activa: la reserva avanza y la facultad se expande fuera de su núcleo rígido, transformando el antiguo estacionamiento en un espesor donde infraestructura y paisaje no se anulan, sino que sostienen su tensión.”</figcaption>
      </figure>
    </div>

    <div class="essay-paragraph">
      <p>
        La arquitectura se sitúa entonces en una posición crítica. Puede intervenir para consolidar el intersticio como lugar abierto, sosteniendo su indeterminación, o puede clausurarlo bajo la lógica del control funcional. La diferencia no radica únicamente en la forma, sino en la estructura relacional que se proponga. Una infraestructura concebida como campo puede intensificar la coexistencia. Una infraestructura concebida como dispositivo cerrado puede producir anonimato.
      </p>
      <p>
        Rossi recuerda que la ciudad no es solamente función, sino memoria sedimentada. Allen propone que el proyecto puede operar como sistema abierto. Turner señala que lo liminal es un estado de suspensión donde las jerarquías se desestabilizan. Augé advierte que la sobremodernidad produce espacios donde la identidad se disuelve. Entre estas posiciones surge una pregunta común: ¿es posible proyectar sin clausurar?
      </p>
      <p>
        El intersticio no es una respuesta, sino una condición que obliga a reformular el problema. No se trata de dejar el espacio sin intervención, sino de intervenir sin agotar su potencia. La arquitectura puede funcionar como soporte mínimo, como estructura que organiza sin determinar completamente. Puede aceptar que el significado se construye en el tiempo, que la memoria se acumula, que la apropiación transforma.
      </p>
      <p>
        Quizás el desafío contemporáneo no sea llenar los vacíos, sino reconocer que algunos vacíos no son carencias sino intensidades. Que la indeterminación no es debilidad, sino resistencia frente a la homogenización. Que el límite puede ser espesor, que el umbral puede ser estado, que la infraestructura puede ser campo.
      </p>
      <p class="essay-conclusion-highlight">
        <strong>Entre la apertura y la clausura</strong> se juega el sentido del proyecto. Si la arquitectura insiste en definirlo todo, corre el riesgo de producir no-lugares: espacios eficientes pero despojados de memoria. Si acepta la liminalidad como condición productiva, puede sostener la ambigüedad sin caer en el caos. El intersticio aparece entonces no como resto marginal, sino como núcleo crítico desde el cual repensar la disciplina.
      </p>
      <p>
        No se trata de elegir definitivamente entre orden e indeterminación, sino de mantener la tensión activa. El intersticio no reclama conclusión; reclama atención. No exige forma definitiva; exige estructura abierta. Allí, en ese espesor incierto, <strong>la arquitectura deja de ser objeto cerrado para convertirse en campo de posibilidad.</strong>
      </p>
    </div>
  </article>
`;

const escritoIntersticioHtml_EN = `
  <article class="essay-article">
    <div class="essay-paragraph">
      <p>
        Modern movement architecture consolidated a persistent conviction: to design is to define. To define boundaries, functions, paths, hierarchies. In that tradition, the project appears as a gesture of progressive clarification where ambiguity is reduced and the indeterminate is organized into a stable form. However, there are territories that resist this logic of closure. They present themselves neither as consolidated objects nor as absolute voids, but as spaces where multiple orders coexist without synthesizing. There, architecture can no longer operate solely as definition; it must confront ambiguity.
      </p>
    </div>

    <div class="essay-grid-two-col">
      <div class="essay-col-text">
        <p>
          It is at this point that the notion of interstice emerges. Not as residue, nor as unproductive leftover, but as a specific spatial condition. The interstice is not simply the physical "in-between" separating two systems; it is the thickness where those systems draw tension without resolving. It is not an edge, it is friction. It is not a momentary transition, but a prolonged state. To conceive it implies accepting that architecture can exist without total closure.
        </p>
        <p>
          Anthropology offers a decisive conceptual tool to understand this condition: liminality. Victor Turner, studying rites of passage, describes the liminal phase as an intermediate moment characterized by ambiguity and the suspension of habitual hierarchies. In <em>The Ritual Process</em>, he notes: <em>“Liminal entities are neither here nor there; they are betwixt and between the positions assigned and arrayed by law, custom, convention, and ceremonial”</em> (Turner, 1969). Liminality implies a provisional loss of stable identity, a shift toward an undefined state.
        </p>
      </div>
      <div class="essay-col-media">
        <figure class="essay-figure">
          <img src="assets/escritos/intersticio entre la apertura y la clausura/01_imagen.webp" alt="Site Image. Pavilion 4 project and current parking lot.">
          <figcaption>Site image. Pavilion 4 project and current parking lot.</figcaption>
        </figure>
      </div>
    </div>

    <div class="essay-grid-two-col reverse">
      <div class="essay-col-media">
        <figure class="essay-figure">
          <img src="assets/escritos/intersticio entre la apertura y la clausura/02_imagen.webp" alt="Friction between control and open field">
          <figcaption>Gemini-generated image. “Friction between control and open field, where markings blur and order collapses.”</figcaption>
        </figure>
      </div>
      <div class="essay-col-text">
        <p>
          Transposed to the architectural field, the liminal ceases to be a temporal phase to become a spatial condition. The interstice is liminal when it belongs completely neither to one system nor another, when it keeps open the possibility of multiple interpretations. Turner adds that in liminality <em>“the normal social structure is suspended or inverted”</em> (1969). This suspension can be thought of as a spatial analogy: the interstice suspends formal hierarchy, relativizes the program, and destabilizes the dominant function.
        </p>
        <p>
          However, ambiguity must not be confused with emptiness. The interstice is not absence, but coexistence. It is the place where distinct logics (natural and artificial, permanent and transient, infrastructural and symbolic) overlap without integrating completely. This superposition introduces the concept of indeterminacy. Indeterminacy does not imply disorder, but openness. It assumes space is not completely fixed by a single function nor by a closed meaning.
        </p>
      </div>
    </div>

    <div class="essay-paragraph">
      <p>
        Aldo Rossi provides a fundamental key to understanding this temporal dimension of space. In <em>The Architecture of the City</em> he asserts: <em>“The city is the collective memory of its people; and since memory is tied to events and places, the city is the locus of collective memory”</em>. This statement shifts architecture from the immediate present into historical duration. Urban facts—plazas, buildings, infrastructures—persist beyond their original function. Rossi also argues that <em>“urban facts have a life of their own, extending beyond the purpose for which they were created”</em>. That life of its own is the foundation of indeterminacy: form remains, use changes, meaning transforms.
      </p>
    </div>

    <div class="essay-paragraph">
      <p>
        Permanence does not close; it accumulates. Each intervention deposits over previous ones, generating a stratification where meaning is never definitive. The interstice, read through Rossi, is not simply an empty space between consolidated objects; it is one more layer within that collective memory. It may have been projected, abandoned, reinterpreted. It may have remained incomplete. But its condition is not nonexistence, but latency.
      </p>
      <p>
        Latency is a form of potency. A latent space is not inactive; it is open to multiple updates. This idea connects with infrastructural urbanism proposed by Stan Allen. In his essay <em>“Infrastructural Urbanism”</em>, Allen argues that infrastructure <em>“does not propose specific buildings on given sites, but constructs the site itself”</em>. Infrastructure is not a closed object, but a condition organizing relationships. It operates as a support capable of absorbing transformations without losing coherence.
      </p>
      <p>
        Allen insists that infrastructural systems operate as <em>“field conditions”</em>, that is, configurations where relationships between elements are more important than individual forms. <em>“Field conditions are defined by complex local relationships, not by global geometric schemes”</em>, he notes. This approach shifts architecture from singular object to relational structure. The project defines not a final result, but an operational framework allowing multiple configurations.
      </p>
      <p>
        Here indeterminacy acquires project dimension. The system does not impose a single solution; it sets minimal rules. The field does not close; it organizes. Infrastructure, understood this way, does not eliminate ambiguity, but sustains it. It allows space to evolve over time, to incorporate unforeseen uses, to accumulate memory.
      </p>
    </div>

    <div class="essay-grid-two-col">
      <div class="essay-col-text">
        <p>
          However, this openness is not guaranteed. The same infrastructural device can derive into its opposite: a fully regulated space, optimized for traffic and efficiency, where ambiguity dissolves. Here appears the figure of the non-place, formulated by Marc Augé. In <em>Non-Places</em>, Augé defines these spaces as those that <em>“cannot be defined as relational, or historical, or concerned with identity”</em>. These are realms where experience is reduced to circulation and consumption, where permanence becomes irrelevant.
        </p>
        <p>
          Augé writes: <em>“The space of non-place creates neither singular identity nor relation, but solitude and similitude”</em>. The subject crossing an airport or highway is recognized not as an inhabitant, but as a passenger. Time is measured in connections, not permanences. Signage replaces memory; instruction substitutes narrative.
        </p>
      </div>
      <div class="essay-col-media">
        <figure class="essay-figure">
          <img src="assets/escritos/intersticio entre la apertura y la clausura/03_imagen.webp" alt="Normative saturation overwhelmed by vegetation">
          <figcaption>Gemini-generated image. “Normative saturation overwhelmed by vegetation, where excessive signage loses meaning facing organic progress.”</figcaption>
        </figure>
      </div>
    </div>

    <div class="essay-paragraph">
      <p>
        The tension between interstice and non-place is subtle. Both can share materiality and scale. Both can be transit spaces. But they differ in how they manage uncertainty. The interstice sustains ambiguity; the non-place neutralizes it. In the former, coexistence is productive; in the latter, regulation is total. The interstice permits appropriation; the non-place prescribes behavior.
      </p>
      <p>
        Augé warns that <em>“if a place can be defined as relational, historical and concerned with identity, then a space which cannot be defined thus will be a non-place”</em>. This definition introduces a clear criterion: the absence of memory and relationship. The interstice, by contrast, can be deeply historical, even when not formally consolidated. It can hold traces, remains, unfinished foundations, spontaneous vegetation, informal paths. Its identity is not encoded, yet it is not absent.
      </p>
    </div>

    <div class="essay-full-media">
      <figure class="essay-figure large">
        <img src="assets/escritos/intersticio entre la apertura y la clausura/04_imagen.webp" alt="Architectural Object Sketch">
        <figcaption>Architectural object sketch. “The project assumes the interstice as an active condition: the reserve advances and the faculty expands outside its rigid core, transforming the old parking lot into a thickness where infrastructure and landscape do not cancel out, but sustain their tension.”</figcaption>
      </figure>
    </div>

    <div class="essay-paragraph">
      <p>
        Architecture thus finds itself in a critical position. It can intervene to consolidate the interstice as an open place, sustaining its indeterminacy, or it can close it under functional control logic. The difference lies not merely in form, but in the relational structure proposed. An infrastructure conceived as field can intensify coexistence. An infrastructure conceived as closed device can produce anonymity.
      </p>
      <p>
        Rossi reminds us that the city is not merely function, but sedimented memory. Allen proposes that the project can operate as open system. Turner notes that the liminal is a state of suspension where hierarchies destabilize. Augé warns that supermodernity produces spaces where identity dissolves. Between these positions arises a common question: is it possible to design without closing?
      </p>
      <p>
        The interstice is not an answer, but a condition forcing a reformulation of the problem. It is not about leaving space without intervention, but about intervening without exhausting its potential. Architecture can operate as minimal support, as a structure organizing without completely determining. It can accept that meaning builds over time, memory accumulates, appropriation transforms.
      </p>
      <p>
        Perhaps the contemporary challenge is not to fill voids, but to recognize that some voids are not deficiencies but intensities. That indeterminacy is not weakness, but resistance against homogenization. That the boundary can be thickness, the threshold can be state, the infrastructure can be field.
      </p>
      <p class="essay-conclusion-highlight">
        <strong>Between opening and closure</strong> lies the sense of the project. If architecture insists on defining everything, it risks producing non-places: efficient spaces stripped of memory. If it accepts liminality as productive condition, it can sustain ambiguity without falling into chaos. The interstice appears then not as marginal remainder, but as critical core from which to rethink the discipline.
      </p>
      <p>
        It is not about choosing definitively between order and indeterminacy, but about maintaining active tension. The interstice claims no conclusion; it claims attention. It demands no definitive form; it demands open structure. There, in that uncertain thickness, <strong>architecture stops being a closed object to become a field of possibility.</strong>
      </p>
    </div>
  </article>
`;

// TEXTO COMPLETO PÁGINAS 4 A 13 INCLUSIVE DEL PDF "EDIFICIO CONURBAN: INTERPRETACIÓN LOCAL DE UN FENÓMENO GLOBAL" (HASTA EPÍLOGO, SIN BIBLIOGRAFÍA Y CON CITAS EN PARÁGRAFOS ITÁLICOS SIN BARRA LATERAL)
const escritoConurbanHtml_ES = `
  <article class="essay-article">
    
    <div class="pm-block">
      <h2 class="pm-subheading">Introducción</h2>
      <div class="essay-paragraph">
        <p>
          En el paisaje urbano de Buenos Aires, el edificio Conurban, ubicado en el complejo Catalinas Norte, se erige como una pieza clave en la incorporación del lenguaje del Estilo Internacional en la arquitectura corporativa argentina. Este trabajo surge del interés por explorar cómo una corriente arquitectónica global, nacida en Europa y consolidada en los Estados Unidos, encuentra una reinterpretación en un contexto local, afectado por condiciones materiales, políticas, culturales y simbólicas propias.
        </p>
        <p>
          La elección de este caso no es arbitraria. El edificio Conurban no solo es la voluntad de modernización y alineación con paradigmas internacionales durante las décadas de 1960 y 1970, sino que también materializa una lectura criolla del “ser actual”. Se trata de una arquitectura que, si bien adopta los códigos del Estilo Internacional, fachadas de vidrio, líneas puras, esquemas funcionales, los reinterpreta a través de los recursos constructivos disponibles en el país y un criterio de diseño ligado a nuestras tradiciones.
        </p>
        <p>
          Esta reinterpretación no sólo ocurre a nivel formal, sino también conceptual: la modernidad no es importada de forma pasiva, sino reformulada según las urgencias y aspiraciones de una sociedad con historia propia. En este sentido, la torre funciona como un prisma a través del cual puede observarse el deseo de la elite argentina por posicionarse como parte de una modernidad global, sin abandonar del todo sus modos particulares de producción simbólica.
        </p>
        <p>
          Este ensayo se propone, entonces, como una interpretación crítica: una lectura que no busca simplemente describir el edificio, sino pensar en qué medida la obra opera como una traducción cultural de un lenguaje arquitectónico importado. La hipótesis central sostiene que el edificio Conurban no es un ejemplo más del Estilo Internacional, sino su versión argentina, y que en esa apropiación se revela tanto una aspiración de modernidad como una forma específica de argentinidad.
        </p>
      </div>
    </div>

    <div class="pm-block">
      <h2 class="pm-subheading">Lo contextual y el poder de turno</h2>
      <div class="essay-paragraph">
        <p>
          El período previo a la mitad del siglo XX, dentro del panorama de la arquitectura argentina, dejó un catálogo de obras de diversos estilos; desde la arquitectura neoclásica de procedencia francesa hasta la nueva arquitectura racionalista. Ambas reflejan el contexto de bonanza económica del periodo de entreguerras que gozaba el país. Parte de la sociedad, involucrada en los debates de la arquitectura y el urbanismo, promovía la continuidad estilística alineada al neoclasicismo que encontraba eco en las clases de la burguesía local y la cual contrastaba con la arquitectura racionalista.
        </p>
        <p>
          Durante la década del '30, en Argentina se incrementó la obra pública a nivel nacional, manifestándose principalmente con lenguaje moderno; con la intención de mostrar eficiencia técnica y administrativa. Llegó también a la construcción privada, cubriendo las expectativas de renovación técnica y estética a partir de las nuevas perspectivas de higiene y salud.
        </p>
        <p>
          Katzenstein estudió por vocación propia las posturas enfrentadas, asumiendo la historicidad para cimentar sus propias convicciones. El peronismo gobernó entre los años 1945 y 1955, abarcando casi todo el período de formación universitaria de Katzenstein. La integración económica, social y política fue posible por la consolidación de la industrialización como el eje prioritario de la actividad económica. Perón ganó las elecciones en 1946 y mantuvo la intervención de las universidades. Comenzó una política de nacionalización de empresas, se organizó la economía estatal mediante la implementación de los planes quinquenales en 1947 y 1952. Este nuevo tejido social sería determinante en el cambio del rol del arquitecto, que hasta entonces pertenecía a sectores exclusivos de la sociedad. Sin embargo, en la segunda mitad del siglo los cambios socio políticos darían un giro en el perfil del arquitecto, que se popularizó en mayor medida y encontró en el estado uno de sus mayores clientes.
        </p>
        <p>
          Finalmente el conflicto concluye con el golpe militar de 1955. Esta situación marca un punto de inflexión en la discontinuidad de los mandos del estado, que de alguna u otra manera terminaron de marcar el ritmo de la agitada supervivencia de los arquitectos locales para desarrollar su trabajo con cierta regularidad. Y quizás fue esta falta de estabilidad política la que condiciona también la carrera de Ernesto Katzenstein. El contexto académico de los años cincuenta en el que se formó, estaba marcado por las contradicciones entre los profesores que continúan perpetuando la arquitectura clásica y por otros docentes y estudiantes que aspiraban a un cambio de acuerdo a las tendencias de la nueva arquitectura que se difundió internacionalmente.
        </p>
        <p>
          Era un período de transición donde el propio Katzenstein, respondiendo a una entrevista, define su formación; <em>"En la facultad por esos años, se vivía la transición de la educación académica clásica, a lo que en esos momentos el cuerpo de profesores entendía como una educación y una arquitectura más moderna"</em> (p. 12, Rivas García, 2012).
        </p>
      </div>
    </div>

    <div class="pm-block">
      <h2 class="pm-subheading">Plan para Buenos Aires - Le Corbusier</h2>
      <div class="essay-paragraph">
        <p>
          La Asociación de Amigos de la Ciudad invitó a Le Corbusier a participar del ciclo de conferencias de 1930, donde se generó un debate matizado y complejo sobre los problemas de la ciudad.
        </p>
        <p>
          La primera presentación, titulada <em>“El plan regulador y de extensión de la Capital”</em>, consistía en la exigencia a las autoridades de un “plan conjunto” para la ciudad, cuyos requerimientos enuncia de manera detallada.
        </p>
        <p>
          La segunda presentación, titulada <em>“Buenos Aires y su zona de influencia”</em>, publicada en un periódico, hacía hincapié en la necesidad de trazar y coordinar adecuadamente una red comunicacional en torno a la capital.
        </p>
        <p>
          Le Corbusier había propuesto una alternativa radical a las soluciones que hasta entonces se venían discutiendo. Sus principales características eran: una plataforma para la “ciudad de negocios”, con 12 rascacielos sobre el río rodeados por una tira de <em>redents</em>; la voluntad de concentrar la ciudad; y una unión ferroviaria entre los ramales norte y sur. En este modelo se expresa uno de los principales postulados de su autor: el diálogo entre arquitectura y naturaleza.
        </p>
      </div>
    </div>

    <div class="pm-block">
      <h2 class="pm-subheading">El desarrollo de Catalinas Norte</h2>
      <div class="essay-paragraph">
        <p>
          Catalinas Norte fue visualizada como un enclave estratégico en reiteradas ocasiones a lo largo de la historia, donde la vinculación entre el río y los negocios privados se proyectó y materializó a través de tierras artificiales en 1882, con el objetivo de recuperar, integrar y reactivar esa zona portuaria. Hacia finales del siglo XIX, en el marco del desarrollo de la exportación e importación, se impulsaron el desarrollo de Puerto Madero, los avances del ferrocarril y la rehabilitación de la costa bonaerense mediante la construcción de muelles, playas y depósitos portuarios.
        </p>
        <p>
          Con la compra de más terrenos en el actual barrio de La Boca, se denominó Catalinas Norte a la sección original y Catalinas Sud a las recientemente adquiridas. Con la construcción del Puerto Madero en la última década del siglo XIX, el muelle de las Catalinas fue desmontado. Hacia 1945, la empresa Catalinas Warehouse S.A. vendió sus dos propiedades, y se demolieron los galpones de Catalinas Norte y Sur, quedando terrenos baldíos que posteriormente la Municipalidad pondría en venta.
        </p>
        <p>
          Con el objetivo de funcionar como una puerta de entrada y salida de la ciudad, el área de Catalinas se consolidó como un terreno clave para interconectar e integrar el Río de la Plata con las funciones urbanas de Buenos Aires. Su diseño se pensó a partir de criterios como la organización espacial, las visuales, los conos de sombra y la relación con la masa urbana. El tejido del área fue proyectado considerando la trama urbana circundante, con subdivisiones en sentido sudeste-suroeste, para garantizar la integración visual y evitar bloqueos de luz o perspectivas.
        </p>
        <p>
          Se planteó una plataforma elevada de 10 metros de altura destinada a un sector peatonal, jardines y zonas comerciales; debajo de ella se desarrollaron los niveles inferiores con estacionamientos para los edificios del conjunto. Aunque existía una diferencia de altura entre esta plataforma y las avenidas Leandro N. Alem y Madero, se resolvió mediante terrazas escalonadas, cuyo acceso principal se ubica en el nivel superior. El conjunto se compone de diferentes sectores con funciones diversas, permitiendo su articulación con la ciudad: áreas recreativas al aire libre, torres destinadas a hotelería y edificios de oficinas.
        </p>
        <p>
          El 26 de junio de 1969, el intendente municipal inauguró las obras del primer edificio del complejo, el Sheraton Buenos Aires Hotel. Ese mismo año comenzaron los trabajos para la primera torre de oficinas: el edificio Conurban. En 1976 se iniciaron las obras de la Torre Madero, y más adelante, la Torre IBM. Durante la década de 1990 se construyeron las torres gemelas Catalinas Plaza y Alem Plaza. En 2001 se inauguró la Torre BankBoston, diseñada por César Pelli, junto a la sede del Banco Macro, también proyectada por Pelli, y una torre adicional desarrollada por IRSA para uso de oficinas. En 2015 se proyectó que Catalinas Norte sería la futura sede central del Banco Macro, nuevamente diseñada por César Pelli.
        </p>
      </div>
    </div>

    <div class="pm-block">
      <h2 class="pm-subheading">Lo social y sus necesidades</h2>
      <div class="essay-paragraph">
        <p>
          La Torre Conurban fue proyectada y construida entre 1969 y 1973 para responder a las necesidades específicas de un usuario corporativo emergente en la Argentina de fines de los años sesenta: empresas vinculadas al sector financiero, inmobiliario y administrativo, que buscaban consolidar su presencia dentro de un mercado en expansión y modernización. La obra fue encargada y financiada por Conurban S.A., una compañía fundada a mediados del siglo XX, inicialmente dedicada a la compra y venta de terrenos en el área metropolitana de Buenos Aires, que con el tiempo fue ampliando su perfil hacia el desarrollo urbano e inmobiliario. A lo largo de las décadas de 1950 y 1960, Conurban S.A. fue consolidándose como una empresa de referencia en la promoción de emprendimientos de escala media y alta, articulando capital privado con oportunidades de inversión surgidas de la expansión urbana y las políticas de modernización de infraestructura.
        </p>
        <p>
          La oportunidad de intervenir en el proyecto de Catalinas Norte surgió a partir de una política pública de renovación urbana impulsada por el Estado nacional, que a fines de los años sesenta dispuso la venta de terrenos ferroviarios desafectados en la zona de Retiro, con el objetivo de atraer inversiones del sector privado y consolidar un nuevo centro de oficinas de alto nivel en la ciudad. Conurban S.A. adquirió uno de estos lotes con el propósito de desarrollar allí su sede institucional, a la vez que generar un edificio rentable desde el punto de vista patrimonial. Así, el encargo de la torre respondió tanto a necesidades operativas de la empresa que requería un espacio propio, moderno y jerarquizado para sus actividades administrativas, como a una estrategia de posicionamiento simbólico dentro del creciente mercado corporativo.
        </p>
        <p>
          El usuario que ocupaba este tipo de arquitectura demandaba espacios jerarquizados, modulares y funcionalmente adaptables, capaces de albergar funciones de dirección, planificación, servicios y atención institucional, todo ello en un entorno que garantizara confort, visibilidad y prestigio. La ubicación del edificio en Catalinas Norte no fue casual, sino que respondía a una lógica de centralidad, representatividad y proyección urbana que resultaba fundamental para empresas como Conurban S.A., cuyo campo de acción se entrelazaba con la producción de ciudad. En ese sentido, la Torre Conurban no fue solo un edificio de oficinas, sino también una expresión material del lugar que estas empresas ocupaban en la transformación del perfil económico y espacial del Buenos Aires moderno.
        </p>
      </div>
    </div>

    <div class="pm-block">
      <h2 class="pm-subheading">Lo económico y los recursos disponibles</h2>
      <div class="essay-paragraph">
        <p>
          La construcción de la Torre Conurban tuvo lugar en un período complejo de la economía argentina, comprendido entre fines de los años 60 y comienzos de los 70. Si bien el país atravesaba un escenario marcado por la inestabilidad política e inflación, también existía un marco propicio para ciertas inversiones privadas, especialmente en sectores como la construcción, donde la propiedad inmueble funcionaba como refugio de valor. La disponibilidad de capitales para este tipo de desarrollos provino principalmente de empresas privadas nacionales, con respaldo financiero de grupos inversores vinculados al sector inmobiliario, asegurador y bancario, que encontraban en el mercado de oficinas un destino rentable y de prestigio. La ubicación estratégica de Catalinas Norte, sumado al bajo costo relativo del suelo en comparación con otras centralidades consolidadas, incentivó este tipo de emprendimientos. En este contexto, Conurban S.A., una compañía vinculada al desarrollo urbano y la gestión inmobiliaria, pudo financiar la obra como parte de una estrategia de posicionamiento y expansión dentro del nuevo perfil económico y territorial del centro porteño.
        </p>
        <p>
          Desde el punto de vista técnico y material, la torre fue construida a partir de una cuidadosa selección de recursos de producción nacional, lo cual respondía tanto a criterios económicos como a la voluntad de adoptar un lenguaje moderno sin depender de importaciones.
        </p>
        <p>
          El sistema estructural principal se resolvió mediante hormigón armado, conformado por cemento Portland (producido en plantas locales), arena silícea, piedra partida y acero conformado en barras, todos ellos materiales ampliamente disponibles en el mercado argentino. Esta tecnología, consolidada desde mediados del siglo XX, garantizaba una estructura robusta y eficiente, con gran capacidad portante y adaptabilidad funcional para plantas libres de oficinas.
        </p>
        <p>
          En cuanto al cerramiento exterior, se empleó un sistema de muro cortina en tres de sus fachadas, compuesto por paneles de vidrio tonalizado y carpinterías de aluminio anodizado. Ambos materiales eran en su mayoría producidos en Argentina: el vidrio tonalizado era fabricado por empresas como VASA (Vidriería Argentina S.A.), mientras que los perfiles de aluminio anodizado eran elaborados localmente con tecnología estandarizada, lo cual permitía lograr una imagen moderna y corporativa acorde a las tipologías internacionales sin depender de la importación de componentes. El muro cortina ofrecía además una solución liviana, funcional y eficiente en términos de aislamiento lumínico y térmico.
        </p>
        <p>
          A modo de contraste, la fachada oeste del edificio presenta un revestimiento de ladrillo común a la vista, dispuesto con junta enrasada. Este material, tradicional en la construcción de Buenos Aires y proveniente posiblemente del cordón ladrillero del conurbano bonaerense, aportaba no sólo textura y calidez, sino también una respuesta pasiva ante la incidencia solar de esa orientación. Su uso en una única cara del edificio puede interpretarse como un gesto de contextualización urbana y diferenciación formal frente a la homogeneización típica de los edificios de oficinas de la época.
        </p>
        <p>
          La ejecución de la obra fue encargada a Kocourek S.A., una empresa constructora con experiencia en grandes estructuras, que contaba con un plantel técnico y obrero altamente capacitado. La obra involucró distintas especialidades: albañiles, encofradores, electricistas, soldadores, herreros, carpinteros e instaladores, muchos de ellos provenientes del área metropolitana de Buenos Aires. El sector de la construcción, durante esos años, concentraba una importante porción de la mano de obra activa y disponía de oficios tradicionales bien consolidados, producto de décadas de actividad tanto pública como privada. La racionalización de procesos y la incorporación parcial de componentes prefabricados permitieron optimizar los tiempos y recursos de ejecución, asegurando una calidad técnica destacable dentro de un entorno económico desafiante.
        </p>
        <p>
          En conjunto, la Torre Conurban se materializa como el resultado de una convergencia entre capitales privados nacionales, industria local, tecnologías constructivas modernas y fuerza laboral calificada, representando una síntesis eficaz entre contexto económico, innovación arquitectónica y recursos disponibles.
        </p>
      </div>
    </div>

    <div class="pm-block">
      <h2 class="pm-subheading">Lo profesional</h2>
      <div class="essay-paragraph">
        <p>
          El proyecto estuvo a cargo de los arquitectos Ernesto Katzenstein y Estanislao Kocourek. La colaboración entre ellos en el diseño de la Torre Conurban, emplazada en el conjunto urbano de Catalinas Norte, constituye un ejemplo representativo de su enfoque proyectual, evidenciando tanto su compromiso con los requerimientos del sector corporativo como su interés por consolidar una arquitectura moderna, austera y duradera. A continuación, se desarrollará brevemente la trayectoria profesional de cada uno de ellos, a fin de contextualizar su aporte en dicha obra.
        </p>
        
        <h3 style="font-size: 1.15rem; font-weight: 700; margin: 20px 0 10px 0; color: var(--text-primary);">Ernesto Katzenstein</h3>
        <p>
          Ernesto D. Katzenstein nació en Buenos Aires en el año 1932, en el seno de una familia vinculada al ámbito cultural y profesional de la ciudad. Desde temprana edad mostró interés por las disciplinas proyectuales, inclinación que lo llevó a iniciar sus estudios de arquitectura en la Facultad de Arquitectura y Urbanismo de la Universidad de Buenos Aires (UBA), donde obtuvo su título en 1958. Su aproximación a la arquitectura estuvo marcada por un fuerte compromiso con las ideas del Movimiento Moderno, las cuales fue absorbiendo desde pequeño gracias a la influencia de su tío Carlos Vilar (1891-1986) uno de los primeros arquitectos que promovieron la arquitectura racionalista en Argentina; así como por su temprana inserción en el campo profesional, donde en el año 1956 comenzó a colaborar en el estudio del destacado arquitecto catalán Antonio Bonet, cuya influencia sería determinante en su formación técnica y conceptual. Sin embargo, el contexto académico de los años 50, periodo en el que se formó el arquitecto, seguía marcado por las contradicciones entre los profesores que continuaron perpetuando la arquitectura clásica, y por otros docentes y estudiantes que aspiraban a un cambio de acuerdo a las tendencias de la nueva arquitectura que se difundió internacionalmente.
        </p>
        <p>
          Durante el desarrollo profesional de Ernesto Katzenstein, existieron dos prestigiosos arquitectos que marcaron profundamente su carrera, y con los cuales tuvo la suerte de compartir laboralmente. Estamos hablando de Antonio Bonet (1913-1989) y de Wladimiro Acosta (1900-1967).
        </p>
        <p>
          Para Katzenstein, Bonet fue su maestro, a quien admiraba por sus obras y en el año 1956 comenzó a trabajar en su despacho durante 8 años. Aquí se desarrolló como colaborador y dibujante, hasta convertirse en su hombre de confianza y socio en alguna obra como la vivienda realizada en Olivos en el año 1960-1961.
        </p>
        <p>
          Katzenstein se incorporó a la cátedra de Composición Arquitectónica que lideraba Wladimiro, en la Facultad de Arquitectura de Bs. As., donde aprende a traducir las nuevas formas de la arquitectura moderna con materiales locales, que garanticen su inserción en el medio en el que se desarrollaban, y no como meros hechos formales aislados de su contexto.
        </p>
        <p>
          En cuanto a su experiencia laboral individual, podemos decir que comenzó en 1955 con la creación del Grupo de Arquitectura y Planeamiento (GAP), un colectivo conformado por jóvenes arquitectos como Justo Solsona, Alfredo L. Bell, Rodolfo Livingston y Enrique Rapaport. Desde este espacio, desarrollaron proyectos de vivienda social, urbanismo y equipamiento público, priorizando una metodología colaborativa, funcionalista y contextual, alineada con los principios del Movimiento Moderno, pero con fuerte impronta local. Luego, hacia el año 1967 Katzenstein inició una fructífera asociación profesional con Estanislao Kocourek, con quien desarrolló obras significativas dentro del ámbito corporativo y urbano, como la Torre Conurban, el Hotel Internacional Iguazú, el Club Lagartos y emprendimientos residenciales e industriales en Pilar.
        </p>
        <p>
          En paralelo, mantuvo una intensa actividad docente en la Facultad de Arquitectura de la UBA desde 1957, y durante la última dictadura militar, participó activamente en “La Escuelita”, un taller independiente de pensamiento crítico y formación proyectual, junto a arquitectos como Justo Solsona, Carlos Sallaberry, Juan Manuel Borthagaray y María Teresa Egozcue. Este espacio funcionó como un refugio intelectual y ético durante un contexto autoritario, promoviendo el debate, la experimentación y la transmisión horizontal del saber. Además, Katzenstein fue uno de los impulsores y editores de la revista Summa, desde donde contribuyó a la reflexión y difusión de la arquitectura moderna argentina.
        </p>

        <h3 style="font-size: 1.15rem; font-weight: 700; margin: 20px 0 10px 0; color: var(--text-primary);">Posición frente a la Arquitectura</h3>
        <p>
          Como mencionamos anteriormente, durante su etapa de estudios en la Facultad de Arquitectura, existía este panorama confuso donde se estaba dando la transición entre la arquitectura académica y la nueva arquitectura moderna. Sumado a esto, a fines de los años 50, a nivel internacional comenzaban a surgir nuevas corrientes artísticas que ya cuestionaban los postulados del movimiento moderno, los cuales llevaban varios años desarrollándose. Nos encontrábamos ante una coyuntura arquitectónica muy confusa. Podríamos decir que existían 3 posiciones que podían elegir los arquitectos de aquella época: continuar con una arquitectura ecléctica o académica, realizar una arquitectura racionalista, o seguir los pasos de la nueva arquitectura moderna que llegaba desde Europa.
        </p>
        <p>
          La gran capacidad intelectual de Katzenstein le llevó a estar atento a todas estas corrientes al mismo tiempo que fue buscando su propia forma de aprendizaje e introducción al medio local de todo aquello que venía ‘desde afuera’ y que había estudiado. Lejos de aceptarlo doctrinalmente, Katzenstein prefería la integración de diferentes aspectos de la arquitectura, aceptando los criterios de forma y estética que proponían los arquitectos vanguardistas equilibrándolos con respuestas a problemas de una identidad propia o al menos ligada a la cultura en que se producía. Es decir, Arquitectura formalmente moderna, con espacios modernos, pero con materiales y ciertos rasgos característicos del sitio como modo de integrarse al lugar.
        </p>
        <p>
          <em>“En otro orden de cosas, la imagen supertecnología, por así decirlo, la de Archigram, Eames o los Rogers, siempre me resultó ajena”.</em>
          <br>
          <small style="color: var(--text-muted); font-size: 0.85rem;">Ernesto Katzenstein. Entrevista publicada por Leston, Eduardo. “Horacio Baliero / Ernesto Katzenstein: una arquitectura de síntesis”. Buenos Aires: Summa nº 199 (1984).</small>
        </p>
        <p>
          En esta frase podemos resumir de alguna manera cuál era la posición del arquitecto frente a estos aspectos. No es casualidad que en sus obras Katzenstein se inclinaba por la elección de materiales tradicionales como modo de lenguaje, pero que no dejaba de lado los postulados de forma, función y estética que pregonaba el movimiento moderno. Su posición estaba a favor de la elección de materiales cuya imagen se reconociera como parte del entorno, en contraposición a las vanguardias futuristas. Por ejemplo, frente a obras que tienen un denominador común en el uso del ladrillo, como muro portante y expresión estética arraigada con la historia del lugar, como son la casa en Maschwitz (1957-60), el club house del Country los Lagartos (1969-71) o el edificio Conurban (1969-73).
        </p>

        <h3 style="font-size: 1.15rem; font-weight: 700; margin: 20px 0 10px 0; color: var(--text-primary);">Estanislao Kocourek</h3>
        <p>
          Estanislao Kocourek nació en Buenos Aires en 1930 y desarrolló una trayectoria profesional que combinó el ejercicio arquitectónico con la gestión constructiva. Se formó como arquitecto en la Universidad de Buenos Aires, donde se graduó a fines de la década de 1950, y desde temprano trabajó en estudios relevantes como los de Doulliet, Cappagli y Virasoro, adquiriendo experiencia técnica y proyectual. En 1960, se incorporó a la empresa familiar Constructora Kocourek S.A., donde fundó y dirigió su propio estudio de arquitectura, centrado en el desarrollo de viviendas, urbanismo y obras privadas de escala media. En 1961, obtuvo reconocimiento por un proyecto premiado para un conjunto de viviendas en Catalinas Sur, que anticipaba su interés por intervenir en sectores estratégicos del tejido urbano porteño. Su carrera alcanzó una etapa clave a partir de 1967, cuando se asoció con Ernesto Katzenstein, dando origen a una sociedad profesional que se destacó en el diseño de edificios corporativos y obras de envergadura, como la Torre Conurban (1969–1973), el Club Lagartos, el Hotel Internacional Iguazú, y centros industriales en el conurbano bonaerense. En estas obras se integraban soluciones técnicas precisas con una estética moderna y funcional, en sintonía con los requerimientos del empresariado y el nuevo perfil urbano de Buenos Aires.
        </p>
        <p>
          En 1974, Kocourek fundó Kocourek SRL, una nueva firma con la que continuó desarrollando proyectos hasta fines de la década de 1980, consolidando una modalidad de trabajo que articulaba arquitectura, construcción y promoción inmobiliaria. Más allá del ámbito privado, también tuvo participación en la gestión pública, como asesor técnico del área de vivienda entre 1966 y 1968, y fue una figura activa en instituciones profesionales: integró el consejo directivo de la Unión de Arquitectos de la Ciudad (UAC) desde 1985, y fue su vicepresidente entre 1994 y 1996. En este último período fue distinguido con el Premio Konex por su trayectoria en el campo de la arquitectura y la construcción, reconociendo su aporte a la consolidación de un lenguaje moderno, sobrio y técnico en el panorama edilicio argentino de la segunda mitad del siglo XX.
        </p>
      </div>
    </div>

    <div class="pm-block">
      <h2 class="pm-subheading">El uso y lo estético</h2>
      <div class="essay-paragraph">
        <p>
          <em>“El edificio Conurban es una torre de 85 m de altura, formado por tres subsuelos para estacionamiento, planta baja con 2 locales, sucursales bancaria y 23 pisos altos para oficinas (...) La planta tipo ha sido diseñada teniendo en cuenta el óptimo aprovechamiento de la superficie mencionada y su máxima flexibilidad. De acuerdo a este criterio se han reducido los elementos portantes interiores a cuatro columnas incluyendo las vigas en el cielorraso obteniendo el frente en forma escalonada de manera de desarrollarlo en sesenta metros lineales vidriados de piso a techo con lo que se consigue una máxima entrada de luz natural y ventilación. Por otra parte, ningún punto de la planta dista de diez metros de una carpintería exterior lo que garantiza la homogeneidad de la iluminación natural. El módulo en que está dividida la superficie de las oficinas y también la carpintería exterior se adapta a los paneles existentes en la plaza. El núcleo de servicios es independiente del área de oficinas con lo que se obtiene una buena aislación y circulaciones claras. Todos estos locales tienen iluminación y ventilación naturales. Dentro del garaje se ha definido una zona destinada a servir a la sucursal bancaria que funciona en planta baja y a la que está unida por una circulación vertical propia.”</em>
          <br>
          <small style="color: var(--text-muted); font-size: 0.85rem;">Revista Nuestra Arquitectura, N°470, 1971</small>
        </p>
        <p>
          No se trata de una traducción literal ni de una copia fiel, sino de una búsqueda de aproximación a los criterios formales centrales de la arquitectura moderna, combinada con la incorporación de otros elementos propios. Su obra demuestra un sello personal que caracteriza su arquitectura: no es la mera reproducción de un lenguaje, sino el resultado de haberlo estudiado, asimilado y adaptado al medio en el que se lo propone.
        </p>
        <p>
          La planta baja de las torres fue concebida con el objetivo de alojar programas bancarios y, al mismo tiempo, establecer un diálogo fluido entre el interior y el exterior a través del cerramiento vidriado. Esta cualidad puede leerse como una herencia directa del pensamiento moderno, donde la transparencia y la relación con el espacio público se vuelven principios clave.
        </p>
        <p>
          Asimismo, la distancia entre torres refleja la influencia de las conclusiones higienistas de la modernidad, así como también sus dimensiones, pensadas para garantizar una adecuada ventilación y asoleamiento de los locales.
        </p>
      </div>
    </div>

    <div class="pm-block">
      <h2 class="pm-subheading">Materialidad y morfología</h2>
      <div class="essay-paragraph">
        <p>
          La torre presenta una orientación abierta hacia el noreste, con un revestimiento de curtain wall y una estructura independiente expuesta con vista al río. Por otro lado, hacia el suroeste, se dispone un muro de ladrillo visto que reviste los núcleos sanitarios y de circulación vertical (ascensores), ubicados de forma concentrada y en contraposición con los cerramientos vidriados de las oficinas que enmarcan el espacio interior.
        </p>
        <p>
          Este gesto arquitectónico —reconocer las orientaciones y cerrarse ante la situación más desfavorable, mientras se abre la planta libre hacia las visuales del río— evidencia una sensibilidad proyectual, adaptada al contexto climático local.
        </p>
        <p>
          La estructura, compuesta por tabiques mayoritariamente perimetrales y dispuestos por fuera de la fachada, permite la conformación de plantas libres, habilitando flexibilidad programática en cada nivel. Dichos tabiques sostienen las losas de cada piso mediante vigas que, de manera disimulada, “atraviesan” las fachadas vidriadas a la altura de los antepechos. Esto permite percibir una separación morfológica entre materialidad y estructura, y refuerza la adaptabilidad interior, donde los usos pueden variar sin afectar la lógica portante.
        </p>
        <p>
          El “dentado” que caracteriza la morfología de la fachada vidriada, enfatizado por tabiques blancos verticales, responde a la intención de que cada planta reciba igual cantidad de luz natural, ventilación cruzada y condiciones visuales homogéneas, reforzando así los criterios funcionales y ambientales heredados de los postulados modernos.
        </p>
      </div>
    </div>

    <div class="pm-block">
      <h2 class="pm-subheading">Conclusión</h2>
      <div class="essay-paragraph">
        <p>
          La Torre Conurban, proyectada por Ernesto Katzenstein dentro del desarrollo de Catalinas Norte, representa una interpretación local del Estilo Internacional. No se trata de una copia directa, sino de una adaptación a las condiciones materiales y técnicas de Buenos Aires. El uso del ladrillo visto, el hormigón armado y el muro cortina expresa una arquitectura racional y sobria, atenta al entorno y al clima. La identidad argentina no se manifiesta a través de símbolos evidentes, sino en cómo la obra logra traducir un lenguaje global a un contexto propio.
        </p>
        <p>
          En este sentido, la Torre Conurban puede leerse como una síntesis del pensamiento arquitectónico de Katzenstein, para quien la arquitectura debía ser rigurosa, honesta y coherente con la realidad que la producía. Su mirada integradora, tanto técnica como cultural, concebía al proyecto como un acto crítico más que como una mera aplicación de estilos. La torre no solo evidencia una comprensión sofisticada del lenguaje moderno, sino también una actitud ética frente al acto de proyectar: una arquitectura sin retórica, en la que cada decisión constructiva y espacial responde a una lógica precisa, pero también a una sensibilidad particular hacia el lugar, el tiempo y la cultura en la que se inserta. Así, la obra trasciende su función y su forma, consolidándose como un testimonio elocuente de una arquitectura argentina moderna.
        </p>
      </div>
    </div>

    <div class="pm-block">
      <h2 class="pm-subheading">Epílogo</h2>
      <div class="essay-paragraph">
        <p class="essay-conclusion-highlight">
          Hoy, frente a nuevas lógicas urbanas y corporativas marcadas por la estandarización global, la pregunta por cómo adaptar modelos universales al contexto local sigue siendo fundamental. ¿Qué lecciones deja la Torre Conurban para pensar la arquitectura del presente? Lo valioso no está en reproducir lo global tal como es, sino en asumir una actitud crítica y propositiva: traducir lo universal en clave local. Y que esa traducción, cuando es genuina, construye identidad.
        </p>
      </div>
    </div>

  </article>
`;

const escritoConurbanHtml_EN = `
  <article class="essay-article">
    
    <div class="pm-block">
      <h2 class="pm-subheading">Introduction</h2>
      <div class="essay-paragraph">
        <p>
          In the urban landscape of Buenos Aires, the Conurban Building, located in the Catalinas Norte complex, stands as a key piece in the incorporation of International Style language into Argentine corporate architecture. This work stems from an interest in exploring how a global architectural trend, born in Europe and consolidated in the United States, finds a reinterpretation within a local context affected by its own material, political, cultural, and symbolic conditions.
        </p>
      </div>
    </div>

    <div class="pm-block">
      <h2 class="pm-subheading">Context and Politics</h2>
      <div class="essay-paragraph">
        <p>
          The era prior to the mid-20th century in Argentine architecture presented a catalog of diverse styles, ranging from French neoclassical architecture to new rationalist designs.
        </p>
      </div>
    </div>

    <div class="pm-block">
      <h2 class="pm-subheading">Le Corbusier's Plan for Buenos Aires</h2>
      <div class="essay-paragraph">
        <p>
          The Friends of the City Association invited Le Corbusier in 1930, sparking a nuanced debate on urban challenges and proposed business city platforms over the riverbank.
        </p>
      </div>
    </div>

    <div class="pm-block">
      <h2 class="pm-subheading">Development of Catalinas Norte</h2>
      <div class="essay-paragraph">
        <p>
          Catalinas Norte was envisioned as a strategic enclave connecting the river with private enterprise through land reclamation projects in 1882 and subsequent master planning.
        </p>
      </div>
    </div>

    <div class="pm-block">
      <h2 class="pm-subheading">Social Dimensions and Corporate Needs</h2>
      <div class="essay-paragraph">
        <p>
          Commissioned by Conurban S.A., the tower answered the demands of an emerging corporate user seeking prestige, central location, and flexible high-end office space.
        </p>
      </div>
    </div>

    <div class="pm-block">
      <h2 class="pm-subheading">Economic Factors and Material Resources</h2>
      <div class="essay-paragraph">
        <p>
          Built with domestic materials—local Portland cement, reinforced concrete, VASA tinted glass curtain wall, anodized aluminum mullions, and a distinctive exposed brick west facade.
        </p>
      </div>
    </div>

    <div class="pm-block">
      <h2 class="pm-subheading">Professional Background</h2>
      <div class="essay-paragraph">
        <p>
          Designed by architects Ernesto Katzenstein and Estanislao Kocourek, synthesizing rigorous technical execution with modern architectural aesthetics.
        </p>
      </div>
    </div>

    <div class="pm-block">
      <h2 class="pm-subheading">Use and Aesthetics</h2>
      <div class="essay-paragraph">
        <p>
          The tower design emphasizes functional flexibility and open floor plans while establishing a fluid dialogue with the public realm.
        </p>
      </div>
    </div>

    <div class="pm-block">
      <h2 class="pm-subheading">Materiality and Morphology</h2>
      <div class="essay-paragraph">
        <p>
          Northeast open curtain wall structure contrasting with the southwest exposed brick utility core, responding passively to local climate and solar orientation.
        </p>
      </div>
    </div>

    <div class="pm-block">
      <h2 class="pm-subheading">Conclusion & Epilogue</h2>
      <div class="essay-paragraph">
        <p class="essay-conclusion-highlight">
          The value lies not in reproducing the global as it is, but in adopting a critical and proactive attitude: translating the universal into a local key. And that translation, when genuine, builds identity.
        </p>
      </div>
    </div>

  </article>
`;

// BASE DE DATOS DE PROYECTOS (ESTRUCTURA DAMAS DE FRAMER CON NUESTRO DISEÑO Y CONTENIDO BILINGÜE)
const projectsData = [
  // TRABAJOS PROFESIONALES
  {
    id: 'prof-hiba',
    title_ES: 'HIBA Academy Bay Area',
    title_EN: 'HIBA Academy Bay Area',
    category_ES: 'Educativo',
    category_EN: 'Educational',
    year: '2025 – act.',
    year_ES: '2025 – act.',
    year_EN: '2025 – present',
    role_ES: 'CA architects',
    role_EN: 'CA architects',
    desc_ES: 'Reutilización adaptativa de un antiguo edificio de oficinas corporativas para convertirlo en un campus educativo para estudiantes desde Pre-Kinder hasta 5.º grado, con aproximadamente 59.000 ft² de espacio interior y 10.000 ft² de espacio exterior. El alcance incluyó el desarrollo arquitectónico desde la etapa de DD (Design Development) hasta la fase integral de CD (Construction Documents), junto con una participación activa en las presentaciones de diseño al cliente.',
    desc_EN: 'Adaptive reuse of a former corporate office building into an educational campus for students from Pre-Kindergarten through 5th grade, encompassing approximately 59,000 sq ft of interior space and 10,000 sq ft of outdoor space. The scope included architectural development from DD (Design Development) through the comprehensive CD (Construction Documents) phase, alongside active participation in client design presentations.',
    heroImage: 'assets/trabajos profesionales/hiba academy bay area/00_portada.webp',
    customBody_ES: `
      <div class="pm-sheets-stack">
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/hiba academy bay area/01_entry day.webp" alt="HIBA Academy Bay Area - 01_entry day">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/hiba academy bay area/02_set.webp" alt="HIBA Academy Bay Area - 02_set">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/hiba academy bay area/03_set.webp" alt="HIBA Academy Bay Area - 03_set">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/hiba academy bay area/04_set.webp" alt="HIBA Academy Bay Area - 04_set">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/hiba academy bay area/05_set.webp" alt="HIBA Academy Bay Area - 05_set">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/hiba academy bay area/06_set.webp" alt="HIBA Academy Bay Area - 06_set">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/hiba academy bay area/07_set.webp" alt="HIBA Academy Bay Area - 07_set">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/hiba academy bay area/08_set.webp" alt="HIBA Academy Bay Area - 08_set">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/hiba academy bay area/09_set.webp" alt="HIBA Academy Bay Area - 09_set">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/hiba academy bay area/10_set.webp" alt="HIBA Academy Bay Area - 10_set">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/hiba academy bay area/11_set.webp" alt="HIBA Academy Bay Area - 11_set">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/hiba academy bay area/12_set.webp" alt="HIBA Academy Bay Area - 12_set">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/hiba academy bay area/13_set.webp" alt="HIBA Academy Bay Area - 13_set">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/hiba academy bay area/14_set.webp" alt="HIBA Academy Bay Area - 14_set">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/hiba academy bay area/15_lobby.webp" alt="HIBA Academy Bay Area - 15_lobby">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/hiba academy bay area/16_classroom pre-k.webp" alt="HIBA Academy Bay Area - 16_classroom pre-k">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/hiba academy bay area/17_classroom k-2.webp" alt="HIBA Academy Bay Area - 17_classroom k-2">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/hiba academy bay area/18_3-5 classroom.webp" alt="HIBA Academy Bay Area - 18_3-5 classroom">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/hiba academy bay area/19_art.webp" alt="HIBA Academy Bay Area - 19_art">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/hiba academy bay area/20_music.webp" alt="HIBA Academy Bay Area - 20_music">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/hiba academy bay area/21_dance room 01.webp" alt="HIBA Academy Bay Area - 21_dance room 01">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/hiba academy bay area/22_library-learning 01.webp" alt="HIBA Academy Bay Area - 22_library-learning 01">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/hiba academy bay area/23_wow space 01.webp" alt="HIBA Academy Bay Area - 23_wow space 01">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/hiba academy bay area/24_mpr.webp" alt="HIBA Academy Bay Area - 24_mpr">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/hiba academy bay area/25_playground 01.webp" alt="HIBA Academy Bay Area - 25_playground 01">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/hiba academy bay area/26_entry night.webp" alt="HIBA Academy Bay Area - 26_entry night">
        </div>
      </div>
`,
    customBody_EN: `
      <div class="pm-sheets-stack">
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/hiba academy bay area/01_entry day.webp" alt="HIBA Academy Bay Area - 01_entry day">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/hiba academy bay area/02_set.webp" alt="HIBA Academy Bay Area - 02_set">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/hiba academy bay area/03_set.webp" alt="HIBA Academy Bay Area - 03_set">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/hiba academy bay area/04_set.webp" alt="HIBA Academy Bay Area - 04_set">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/hiba academy bay area/05_set.webp" alt="HIBA Academy Bay Area - 05_set">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/hiba academy bay area/06_set.webp" alt="HIBA Academy Bay Area - 06_set">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/hiba academy bay area/07_set.webp" alt="HIBA Academy Bay Area - 07_set">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/hiba academy bay area/08_set.webp" alt="HIBA Academy Bay Area - 08_set">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/hiba academy bay area/09_set.webp" alt="HIBA Academy Bay Area - 09_set">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/hiba academy bay area/10_set.webp" alt="HIBA Academy Bay Area - 10_set">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/hiba academy bay area/11_set.webp" alt="HIBA Academy Bay Area - 11_set">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/hiba academy bay area/12_set.webp" alt="HIBA Academy Bay Area - 12_set">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/hiba academy bay area/13_set.webp" alt="HIBA Academy Bay Area - 13_set">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/hiba academy bay area/14_set.webp" alt="HIBA Academy Bay Area - 14_set">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/hiba academy bay area/15_lobby.webp" alt="HIBA Academy Bay Area - 15_lobby">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/hiba academy bay area/16_classroom pre-k.webp" alt="HIBA Academy Bay Area - 16_classroom pre-k">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/hiba academy bay area/17_classroom k-2.webp" alt="HIBA Academy Bay Area - 17_classroom k-2">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/hiba academy bay area/18_3-5 classroom.webp" alt="HIBA Academy Bay Area - 18_3-5 classroom">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/hiba academy bay area/19_art.webp" alt="HIBA Academy Bay Area - 19_art">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/hiba academy bay area/20_music.webp" alt="HIBA Academy Bay Area - 20_music">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/hiba academy bay area/21_dance room 01.webp" alt="HIBA Academy Bay Area - 21_dance room 01">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/hiba academy bay area/22_library-learning 01.webp" alt="HIBA Academy Bay Area - 22_library-learning 01">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/hiba academy bay area/23_wow space 01.webp" alt="HIBA Academy Bay Area - 23_wow space 01">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/hiba academy bay area/24_mpr.webp" alt="HIBA Academy Bay Area - 24_mpr">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/hiba academy bay area/25_playground 01.webp" alt="HIBA Academy Bay Area - 25_playground 01">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/hiba academy bay area/26_entry night.webp" alt="HIBA Academy Bay Area - 26_entry night">
        </div>
      </div>
`
  },
  {
    id: 'prof-issf',
    title_ES: 'International School of San Francisco',
    title_EN: 'International School of San Francisco',
    category_ES: 'Educativo',
    category_EN: 'Educational',
    year: '2025 – act.',
    year_ES: '2025 – act.',
    year_EN: '2025 – present',
    role_ES: 'CA architects',
    role_EN: 'CA architects',
    desc_ES: 'Una intervención integral y desarrollada en etapas que implicó una renovación casi total de la infraestructura existente del campus. El alcance se centró en la elaboración de la documentación detallada para el set de permisos, abarcando una amplia variedad de mejoras arquitectónicas interiores y exteriores, y garantizando un estricto cumplimiento de las normativas vigentes.',
    desc_EN: 'A comprehensive, phased intervention involving an almost total renovation of the existing campus infrastructure. The scope focused on producing detailed documentation for the Permit Set, covering a wide variety of interior and exterior architectural improvements, and ensuring strict compliance with applicable building codes.',
    heroImage: 'assets/trabajos profesionales/international school of san francisco/00_portada.webp',
    customBody_ES: `
      <div class="pm-sheets-stack">
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/international school of san francisco/01_ls-ms entry 01.webp" alt="International School of San Francisco - 01_ls-ms entry 01">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/international school of san francisco/02_set.webp" alt="International School of San Francisco - 02_set">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/international school of san francisco/03_set.webp" alt="International School of San Francisco - 03_set">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/international school of san francisco/04_set.webp" alt="International School of San Francisco - 04_set">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/international school of san francisco/05_set.webp" alt="International School of San Francisco - 05_set">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/international school of san francisco/06_set.webp" alt="International School of San Francisco - 06_set">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/international school of san francisco/07_set.webp" alt="International School of San Francisco - 07_set">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/international school of san francisco/08_set.webp" alt="International School of San Francisco - 08_set">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/international school of san francisco/09_set.webp" alt="International School of San Francisco - 09_set">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/international school of san francisco/10_set.webp" alt="International School of San Francisco - 10_set">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/international school of san francisco/11_set.webp" alt="International School of San Francisco - 11_set">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/international school of san francisco/12_set.webp" alt="International School of San Francisco - 12_set">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/international school of san francisco/13_set.webp" alt="International School of San Francisco - 13_set">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/international school of san francisco/14_hs entry 01.webp" alt="International School of San Francisco - 14_hs entry 01">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/international school of san francisco/15_hs entry 02.webp" alt="International School of San Francisco - 15_hs entry 02">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/international school of san francisco/16_ls-ms entry 02.webp" alt="International School of San Francisco - 16_ls-ms entry 02">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/international school of san francisco/17_reception 01.webp" alt="International School of San Francisco - 17_reception 01">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/international school of san francisco/18_reception 02.webp" alt="International School of San Francisco - 18_reception 02">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/international school of san francisco/19_ms waiting.webp" alt="International School of San Francisco - 19_ms waiting">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/international school of san francisco/20_basement 01.webp" alt="International School of San Francisco - 20_basement 01">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/international school of san francisco/21_wellness center 01.webp" alt="International School of San Francisco - 21_wellness center 01">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/international school of san francisco/22_corridor.webp" alt="International School of San Francisco - 22_corridor">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/international school of san francisco/23_science 01.webp" alt="International School of San Francisco - 23_science 01">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/international school of san francisco/24_hs niche.webp" alt="International School of San Francisco - 24_hs niche">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/international school of san francisco/25_hub 4th floor 01.webp" alt="International School of San Francisco - 25_hub 4th floor 01">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/international school of san francisco/26_learning space 01.webp" alt="International School of San Francisco - 26_learning space 01">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/international school of san francisco/27_assembly space 01.webp" alt="International School of San Francisco - 27_assembly space 01">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/international school of san francisco/28_playground 02.webp" alt="International School of San Francisco - 28_playground 02">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/international school of san francisco/29_playground 03.webp" alt="International School of San Francisco - 29_playground 03">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/international school of san francisco/30_playground 01.webp" alt="International School of San Francisco - 30_playground 01">
        </div>
      </div>
`,
    customBody_EN: `
      <div class="pm-sheets-stack">
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/international school of san francisco/01_ls-ms entry 01.webp" alt="International School of San Francisco - 01_ls-ms entry 01">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/international school of san francisco/02_set.webp" alt="International School of San Francisco - 02_set">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/international school of san francisco/03_set.webp" alt="International School of San Francisco - 03_set">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/international school of san francisco/04_set.webp" alt="International School of San Francisco - 04_set">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/international school of san francisco/05_set.webp" alt="International School of San Francisco - 05_set">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/international school of san francisco/06_set.webp" alt="International School of San Francisco - 06_set">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/international school of san francisco/07_set.webp" alt="International School of San Francisco - 07_set">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/international school of san francisco/08_set.webp" alt="International School of San Francisco - 08_set">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/international school of san francisco/09_set.webp" alt="International School of San Francisco - 09_set">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/international school of san francisco/10_set.webp" alt="International School of San Francisco - 10_set">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/international school of san francisco/11_set.webp" alt="International School of San Francisco - 11_set">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/international school of san francisco/12_set.webp" alt="International School of San Francisco - 12_set">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/international school of san francisco/13_set.webp" alt="International School of San Francisco - 13_set">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/international school of san francisco/14_hs entry 01.webp" alt="International School of San Francisco - 14_hs entry 01">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/international school of san francisco/15_hs entry 02.webp" alt="International School of San Francisco - 15_hs entry 02">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/international school of san francisco/16_ls-ms entry 02.webp" alt="International School of San Francisco - 16_ls-ms entry 02">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/international school of san francisco/17_reception 01.webp" alt="International School of San Francisco - 17_reception 01">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/international school of san francisco/18_reception 02.webp" alt="International School of San Francisco - 18_reception 02">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/international school of san francisco/19_ms waiting.webp" alt="International School of San Francisco - 19_ms waiting">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/international school of san francisco/20_basement 01.webp" alt="International School of San Francisco - 20_basement 01">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/international school of san francisco/21_wellness center 01.webp" alt="International School of San Francisco - 21_wellness center 01">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/international school of san francisco/22_corridor.webp" alt="International School of San Francisco - 22_corridor">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/international school of san francisco/23_science 01.webp" alt="International School of San Francisco - 23_science 01">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/international school of san francisco/24_hs niche.webp" alt="International School of San Francisco - 24_hs niche">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/international school of san francisco/25_hub 4th floor 01.webp" alt="International School of San Francisco - 25_hub 4th floor 01">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/international school of san francisco/26_learning space 01.webp" alt="International School of San Francisco - 26_learning space 01">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/international school of san francisco/27_assembly space 01.webp" alt="International School of San Francisco - 27_assembly space 01">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/international school of san francisco/28_playground 02.webp" alt="International School of San Francisco - 28_playground 02">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/international school of san francisco/29_playground 03.webp" alt="International School of San Francisco - 29_playground 03">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/international school of san francisco/30_playground 01.webp" alt="International School of San Francisco - 30_playground 01">
        </div>
      </div>
`
  },
  {
    id: 'prof-odeon',
    title_ES: 'Teatro Odeón',
    title_EN: 'Odeon Theatre',
    category_ES: 'Cultural',
    category_EN: 'Cultural',
    year: '2024',
    year_ES: '2024',
    year_EN: '2024',
    role_ES: 'AVSA Arquitectura S.R.L.',
    role_EN: 'AVSA Arquitectura S.R.L.',
    desc_ES: 'Desarrollo de la documentación ejecutiva de obra para un teatro ubicado en la Torre Odeón (Avenida Corrientes), organizado en múltiples niveles.',
    desc_EN: 'Development of executive construction documentation for a multi-level theatre located in the Odeón Tower on Corrientes Avenue.',
    heroImage: 'assets/trabajos profesionales/teatro odeon/00_portada.webp',
    customBody_ES: `
      <div class="pm-sheets-stack">
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/teatro odeon/01_fachada 01.webp" alt="Teatro Odeón - 01_fachada 01">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/teatro odeon/02_Floor Plan - Ground Floor.webp" alt="Teatro Odeón - 02_Floor Plan - Ground Floor">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/teatro odeon/03_Floor Plan - 1st Mid Level Floor.webp" alt="Teatro Odeón - 03_Floor Plan - 1st Mid Level Floor">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/teatro odeon/04_Floor Plan - 2nd Mid Level Floor.webp" alt="Teatro Odeón - 04_Floor Plan - 2nd Mid Level Floor">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/teatro odeon/05_Floor Plan - First Floor.webp" alt="Teatro Odeón - 05_Floor Plan - First Floor">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/teatro odeon/06_Floor Plan - Second Floor.webp" alt="Teatro Odeón - 06_Floor Plan - Second Floor">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/teatro odeon/07_fachada 02.webp" alt="Teatro Odeón - 07_fachada 02">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/teatro odeon/08_Detail Plan - Sala A 01.webp" alt="Teatro Odeón - 08_Detail Plan - Sala A 01">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/teatro odeon/09_Sala A 01.webp" alt="Teatro Odeón - 09_Sala A 01">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/teatro odeon/10_Detail Section - Sala A 01.webp" alt="Teatro Odeón - 10_Detail Section - Sala A 01">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/teatro odeon/11_Sala A 02.webp" alt="Teatro Odeón - 11_Sala A 02">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/teatro odeon/12_Detail Section - Sala A 02.webp" alt="Teatro Odeón - 12_Detail Section - Sala A 02">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/teatro odeon/13_Sala B 01.webp" alt="Teatro Odeón - 13_Sala B 01">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/teatro odeon/14_Sala B 02.webp" alt="Teatro Odeón - 14_Sala B 02">
        </div>
      </div>
`,
    customBody_EN: `
      <div class="pm-sheets-stack">
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/teatro odeon/01_fachada 01.webp" alt="Teatro Odeón - 01_fachada 01">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/teatro odeon/02_Floor Plan - Ground Floor.webp" alt="Teatro Odeón - 02_Floor Plan - Ground Floor">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/teatro odeon/03_Floor Plan - 1st Mid Level Floor.webp" alt="Teatro Odeón - 03_Floor Plan - 1st Mid Level Floor">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/teatro odeon/04_Floor Plan - 2nd Mid Level Floor.webp" alt="Teatro Odeón - 04_Floor Plan - 2nd Mid Level Floor">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/teatro odeon/05_Floor Plan - First Floor.webp" alt="Teatro Odeón - 05_Floor Plan - First Floor">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/teatro odeon/06_Floor Plan - Second Floor.webp" alt="Teatro Odeón - 06_Floor Plan - Second Floor">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/teatro odeon/07_fachada 02.webp" alt="Teatro Odeón - 07_fachada 02">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/teatro odeon/08_Detail Plan - Sala A 01.webp" alt="Teatro Odeón - 08_Detail Plan - Sala A 01">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/teatro odeon/09_Sala A 01.webp" alt="Teatro Odeón - 09_Sala A 01">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/teatro odeon/10_Detail Section - Sala A 01.webp" alt="Teatro Odeón - 10_Detail Section - Sala A 01">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/teatro odeon/11_Sala A 02.webp" alt="Teatro Odeón - 11_Sala A 02">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/teatro odeon/12_Detail Section - Sala A 02.webp" alt="Teatro Odeón - 12_Detail Section - Sala A 02">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/teatro odeon/13_Sala B 01.webp" alt="Teatro Odeón - 13_Sala B 01">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/trabajos profesionales/teatro odeon/14_Sala B 02.webp" alt="Teatro Odeón - 14_Sala B 02">
        </div>
      </div>
`
  },

  // PROYECTOS ACADÉMICOS
  {
    id: 'acad-1',
    title_ES: 'Espesores de Coexistencia',
    title_EN: 'Thicknesses of Coexistence',
    category_ES: 'Proyecto Urbano',
    category_EN: 'Urban Design Project',
    year: '2026',
    role_ES: 'Taller A77',
    role_EN: 'A77 Studio',
    desc_ES: 'Reconocer el territorio: Cuartel V - Municipio de Moreno. Manifiesto urbano para la reconversión de bordes, tensiones entre movimiento y permanencia, tejido social y recomposición del paisaje.',
    desc_EN: 'Territorial recognition: Cuartel V - Moreno Municipality. Urban manifesto for boundary reconversion, socio-spatial tensions, and landscape integration.',
    heroImage: 'assets/proyectos academicos/espesores de coexistencia/00_portada.webp',
    customBody_ES: `
      <div class="pm-sheets-stack">
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/espesores de coexistencia/01_portada.webp" alt="Espesores de Coexistencia - 01_portada">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/espesores de coexistencia/02_lamina.webp" alt="Espesores de Coexistencia - 02_lamina">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/espesores de coexistencia/03_lamina.webp" alt="Espesores de Coexistencia - 03_lamina">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/espesores de coexistencia/04_lamina.webp" alt="Espesores de Coexistencia - 04_lamina">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/espesores de coexistencia/05_lamina.webp" alt="Espesores de Coexistencia - 05_lamina">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/espesores de coexistencia/06_lamina.webp" alt="Espesores de Coexistencia - 06_lamina">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/espesores de coexistencia/07_lamina.webp" alt="Espesores de Coexistencia - 07_lamina">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/espesores de coexistencia/08_lamina.webp" alt="Espesores de Coexistencia - 08_lamina">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/espesores de coexistencia/09_lamina.webp" alt="Espesores de Coexistencia - 09_lamina">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/espesores de coexistencia/10_lamina.webp" alt="Espesores de Coexistencia - 10_lamina">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/espesores de coexistencia/11_lamina.webp" alt="Espesores de Coexistencia - 11_lamina">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/espesores de coexistencia/12_lamina.webp" alt="Espesores de Coexistencia - 12_lamina">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/espesores de coexistencia/13_lamina.webp" alt="Espesores de Coexistencia - 13_lamina">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/espesores de coexistencia/14_lamina.webp" alt="Espesores de Coexistencia - 14_lamina">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/espesores de coexistencia/15_lamina.webp" alt="Espesores de Coexistencia - 15_lamina">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/espesores de coexistencia/16_lamina.webp" alt="Espesores de Coexistencia - 16_lamina">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/espesores de coexistencia/17_lamina.webp" alt="Espesores de Coexistencia - 17_lamina">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/espesores de coexistencia/18_lamina.webp" alt="Espesores de Coexistencia - 18_lamina">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/espesores de coexistencia/19_lamina.webp" alt="Espesores de Coexistencia - 19_lamina">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/espesores de coexistencia/20_lamina.webp" alt="Espesores de Coexistencia - 20_lamina">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/espesores de coexistencia/21_lamina.webp" alt="Espesores de Coexistencia - 21_lamina">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/espesores de coexistencia/22_lamina.webp" alt="Espesores de Coexistencia - 22_lamina">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/espesores de coexistencia/23_lamina.webp" alt="Espesores de Coexistencia - 23_lamina">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/espesores de coexistencia/24_lamina.webp" alt="Espesores de Coexistencia - 24_lamina">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/espesores de coexistencia/25_lamina.webp" alt="Espesores de Coexistencia - 25_lamina">
        </div>
      </div>
`,
    customBody_EN: `
      <div class="pm-sheets-stack">
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/espesores de coexistencia/01_portada.webp" alt="Espesores de Coexistencia - 01_portada">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/espesores de coexistencia/02_lamina.webp" alt="Espesores de Coexistencia - 02_lamina">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/espesores de coexistencia/03_lamina.webp" alt="Espesores de Coexistencia - 03_lamina">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/espesores de coexistencia/04_lamina.webp" alt="Espesores de Coexistencia - 04_lamina">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/espesores de coexistencia/05_lamina.webp" alt="Espesores de Coexistencia - 05_lamina">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/espesores de coexistencia/06_lamina.webp" alt="Espesores de Coexistencia - 06_lamina">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/espesores de coexistencia/07_lamina.webp" alt="Espesores de Coexistencia - 07_lamina">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/espesores de coexistencia/08_lamina.webp" alt="Espesores de Coexistencia - 08_lamina">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/espesores de coexistencia/09_lamina.webp" alt="Espesores de Coexistencia - 09_lamina">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/espesores de coexistencia/10_lamina.webp" alt="Espesores de Coexistencia - 10_lamina">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/espesores de coexistencia/11_lamina.webp" alt="Espesores de Coexistencia - 11_lamina">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/espesores de coexistencia/12_lamina.webp" alt="Espesores de Coexistencia - 12_lamina">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/espesores de coexistencia/13_lamina.webp" alt="Espesores de Coexistencia - 13_lamina">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/espesores de coexistencia/14_lamina.webp" alt="Espesores de Coexistencia - 14_lamina">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/espesores de coexistencia/15_lamina.webp" alt="Espesores de Coexistencia - 15_lamina">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/espesores de coexistencia/16_lamina.webp" alt="Espesores de Coexistencia - 16_lamina">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/espesores de coexistencia/17_lamina.webp" alt="Espesores de Coexistencia - 17_lamina">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/espesores de coexistencia/18_lamina.webp" alt="Espesores de Coexistencia - 18_lamina">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/espesores de coexistencia/19_lamina.webp" alt="Espesores de Coexistencia - 19_lamina">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/espesores de coexistencia/20_lamina.webp" alt="Espesores de Coexistencia - 20_lamina">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/espesores de coexistencia/21_lamina.webp" alt="Espesores de Coexistencia - 21_lamina">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/espesores de coexistencia/22_lamina.webp" alt="Espesores de Coexistencia - 22_lamina">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/espesores de coexistencia/23_lamina.webp" alt="Espesores de Coexistencia - 23_lamina">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/espesores de coexistencia/24_lamina.webp" alt="Espesores de Coexistencia - 24_lamina">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/espesores de coexistencia/25_lamina.webp" alt="Espesores de Coexistencia - 25_lamina">
        </div>
      </div>
`
  },
  {
    id: 'acad-2',
    title_ES: 'Parque Metropolitano Tecnológico',
    title_EN: 'Metropolitan Technological Park',
    category_ES: 'Arquitectura IV',
    category_EN: 'Architecture IV',
    year: '2023',
    role_ES: 'Autor Principal · FADU-UBA',
    role_EN: 'Lead Author · FADU-UBA',
    desc_ES: 'Masterplan y edificios para el Parque Metropolitano Tecnológico: integración ambiental, centros educativos y culturales, y detalle constructivo de infraestructura urbana.',
    desc_EN: 'Masterplan and architectural designs for the Metropolitan Tech Park: environmental integration, education and culture centers, and urban infrastructure detailing.',
    heroImage: 'assets/proyectos academicos/parque metropolitano tecnologico/00_portada.webp',
    customBody_ES: `
      <div class="pm-sheets-stack">
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/parque metropolitano tecnologico/01_intro 01.webp" alt="Parque Metropolitano Tecnológico - 01_intro 01">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/parque metropolitano tecnologico/02_intro 02.webp" alt="Parque Metropolitano Tecnológico - 02_intro 02">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/parque metropolitano tecnologico/03_master.webp" alt="Parque Metropolitano Tecnológico - 03_master">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/parque metropolitano tecnologico/04_render.webp" alt="Parque Metropolitano Tecnológico - 04_render">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/parque metropolitano tecnologico/05_render.webp" alt="Parque Metropolitano Tecnológico - 05_render">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/parque metropolitano tecnologico/06_render.webp" alt="Parque Metropolitano Tecnológico - 06_render">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/parque metropolitano tecnologico/07_render.webp" alt="Parque Metropolitano Tecnológico - 07_render">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/parque metropolitano tecnologico/08_render.webp" alt="Parque Metropolitano Tecnológico - 08_render">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/parque metropolitano tecnologico/09_centro.webp" alt="Parque Metropolitano Tecnológico - 09_centro">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/parque metropolitano tecnologico/10_axo.webp" alt="Parque Metropolitano Tecnológico - 10_axo">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/parque metropolitano tecnologico/11_esquemas.webp" alt="Parque Metropolitano Tecnológico - 11_esquemas">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/parque metropolitano tecnologico/12_amb.webp" alt="Parque Metropolitano Tecnológico - 12_amb">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/parque metropolitano tecnologico/13_amb.webp" alt="Parque Metropolitano Tecnológico - 13_amb">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/parque metropolitano tecnologico/14_amb.webp" alt="Parque Metropolitano Tecnológico - 14_amb">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/parque metropolitano tecnologico/15_render.webp" alt="Parque Metropolitano Tecnológico - 15_render">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/parque metropolitano tecnologico/16_render.webp" alt="Parque Metropolitano Tecnológico - 16_render">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/parque metropolitano tecnologico/17_render.webp" alt="Parque Metropolitano Tecnológico - 17_render">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/parque metropolitano tecnologico/18_edu.webp" alt="Parque Metropolitano Tecnológico - 18_edu">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/parque metropolitano tecnologico/19_edu.webp" alt="Parque Metropolitano Tecnológico - 19_edu">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/parque metropolitano tecnologico/20_render.webp" alt="Parque Metropolitano Tecnológico - 20_render">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/parque metropolitano tecnologico/21_render.webp" alt="Parque Metropolitano Tecnológico - 21_render">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/parque metropolitano tecnologico/22_render.webp" alt="Parque Metropolitano Tecnológico - 22_render">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/parque metropolitano tecnologico/23_cul.webp" alt="Parque Metropolitano Tecnológico - 23_cul">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/parque metropolitano tecnologico/24_cul.webp" alt="Parque Metropolitano Tecnológico - 24_cul">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/parque metropolitano tecnologico/25_cul.webp" alt="Parque Metropolitano Tecnológico - 25_cul">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/parque metropolitano tecnologico/26_render.webp" alt="Parque Metropolitano Tecnológico - 26_render">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/parque metropolitano tecnologico/27_render.webp" alt="Parque Metropolitano Tecnológico - 27_render">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/parque metropolitano tecnologico/28_render.webp" alt="Parque Metropolitano Tecnológico - 28_render">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/parque metropolitano tecnologico/29_render.webp" alt="Parque Metropolitano Tecnológico - 29_render">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/parque metropolitano tecnologico/30_render.webp" alt="Parque Metropolitano Tecnológico - 30_render">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/parque metropolitano tecnologico/31_render.webp" alt="Parque Metropolitano Tecnológico - 31_render">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/parque metropolitano tecnologico/32_render.webp" alt="Parque Metropolitano Tecnológico - 32_render">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/parque metropolitano tecnologico/33_detalle.webp" alt="Parque Metropolitano Tecnológico - 33_detalle">
        </div>
      </div>
`,
    customBody_EN: `
      <div class="pm-sheets-stack">
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/parque metropolitano tecnologico/01_intro 01.webp" alt="Parque Metropolitano Tecnológico - 01_intro 01">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/parque metropolitano tecnologico/02_intro 02.webp" alt="Parque Metropolitano Tecnológico - 02_intro 02">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/parque metropolitano tecnologico/03_master.webp" alt="Parque Metropolitano Tecnológico - 03_master">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/parque metropolitano tecnologico/04_render.webp" alt="Parque Metropolitano Tecnológico - 04_render">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/parque metropolitano tecnologico/05_render.webp" alt="Parque Metropolitano Tecnológico - 05_render">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/parque metropolitano tecnologico/06_render.webp" alt="Parque Metropolitano Tecnológico - 06_render">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/parque metropolitano tecnologico/07_render.webp" alt="Parque Metropolitano Tecnológico - 07_render">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/parque metropolitano tecnologico/08_render.webp" alt="Parque Metropolitano Tecnológico - 08_render">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/parque metropolitano tecnologico/09_centro.webp" alt="Parque Metropolitano Tecnológico - 09_centro">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/parque metropolitano tecnologico/10_axo.webp" alt="Parque Metropolitano Tecnológico - 10_axo">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/parque metropolitano tecnologico/11_esquemas.webp" alt="Parque Metropolitano Tecnológico - 11_esquemas">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/parque metropolitano tecnologico/12_amb.webp" alt="Parque Metropolitano Tecnológico - 12_amb">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/parque metropolitano tecnologico/13_amb.webp" alt="Parque Metropolitano Tecnológico - 13_amb">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/parque metropolitano tecnologico/14_amb.webp" alt="Parque Metropolitano Tecnológico - 14_amb">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/parque metropolitano tecnologico/15_render.webp" alt="Parque Metropolitano Tecnológico - 15_render">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/parque metropolitano tecnologico/16_render.webp" alt="Parque Metropolitano Tecnológico - 16_render">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/parque metropolitano tecnologico/17_render.webp" alt="Parque Metropolitano Tecnológico - 17_render">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/parque metropolitano tecnologico/18_edu.webp" alt="Parque Metropolitano Tecnológico - 18_edu">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/parque metropolitano tecnologico/19_edu.webp" alt="Parque Metropolitano Tecnológico - 19_edu">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/parque metropolitano tecnologico/20_render.webp" alt="Parque Metropolitano Tecnológico - 20_render">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/parque metropolitano tecnologico/21_render.webp" alt="Parque Metropolitano Tecnológico - 21_render">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/parque metropolitano tecnologico/22_render.webp" alt="Parque Metropolitano Tecnológico - 22_render">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/parque metropolitano tecnologico/23_cul.webp" alt="Parque Metropolitano Tecnológico - 23_cul">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/parque metropolitano tecnologico/24_cul.webp" alt="Parque Metropolitano Tecnológico - 24_cul">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/parque metropolitano tecnologico/25_cul.webp" alt="Parque Metropolitano Tecnológico - 25_cul">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/parque metropolitano tecnologico/26_render.webp" alt="Parque Metropolitano Tecnológico - 26_render">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/parque metropolitano tecnologico/27_render.webp" alt="Parque Metropolitano Tecnológico - 27_render">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/parque metropolitano tecnologico/28_render.webp" alt="Parque Metropolitano Tecnológico - 28_render">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/parque metropolitano tecnologico/29_render.webp" alt="Parque Metropolitano Tecnológico - 29_render">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/parque metropolitano tecnologico/30_render.webp" alt="Parque Metropolitano Tecnológico - 30_render">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/parque metropolitano tecnologico/31_render.webp" alt="Parque Metropolitano Tecnológico - 31_render">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/parque metropolitano tecnologico/32_render.webp" alt="Parque Metropolitano Tecnológico - 32_render">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/parque metropolitano tecnologico/33_detalle.webp" alt="Parque Metropolitano Tecnológico - 33_detalle">
        </div>
      </div>
`
  },
  {
    id: 'acad-3',
    title_ES: 'Centro Cultural Lobos',
    title_EN: 'Lobos Cultural Center',
    category_ES: 'Arquitectura III – Jury',
    category_EN: 'Architecture III – Jury',
    year: '2023',
    role_ES: 'Proyecto de Arquitectura · FADU-UBA',
    role_EN: 'Architectural Design · FADU-UBA',
    desc_ES: 'Propuesta proyectual y resolución espacial para el Centro Cultural Lobos: plantas, cortes perspectivados, axonométricas, salas de auditorio y expansiones exteriores.',
    desc_EN: 'Architectural proposal and spatial resolution for Lobos Cultural Center: plans, perspective sections, axonometrics, auditorium halls, and outdoor expansions.',
    heroImage: 'assets/proyectos academicos/centro cultural lobos/00_portada.webp',
    customBody_ES: `
      <div class="pm-sheets-stack">
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/centro cultural lobos/01_fachada 01.webp" alt="Centro Cultural Lobos - 01_fachada 01">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/centro cultural lobos/02_planta baja.webp" alt="Centro Cultural Lobos - 02_planta baja">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/centro cultural lobos/03_primer piso.webp" alt="Centro Cultural Lobos - 03_primer piso">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/centro cultural lobos/04_segundo piso.webp" alt="Centro Cultural Lobos - 04_segundo piso">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/centro cultural lobos/05_cortes y vistas.webp" alt="Centro Cultural Lobos - 05_cortes y vistas">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/centro cultural lobos/06_detalle.webp" alt="Centro Cultural Lobos - 06_detalle">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/centro cultural lobos/07_corte perspectivado 01.webp" alt="Centro Cultural Lobos - 07_corte perspectivado 01">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/centro cultural lobos/08_axo 01.webp" alt="Centro Cultural Lobos - 08_axo 01">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/centro cultural lobos/09_axo 02.webp" alt="Centro Cultural Lobos - 09_axo 02">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/centro cultural lobos/10_fachada 02.webp" alt="Centro Cultural Lobos - 10_fachada 02">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/centro cultural lobos/11_entrada auditorio 01.webp" alt="Centro Cultural Lobos - 11_entrada auditorio 01">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/centro cultural lobos/12_escultura 01.webp" alt="Centro Cultural Lobos - 12_escultura 01">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/centro cultural lobos/13_escorso 01.webp" alt="Centro Cultural Lobos - 13_escorso 01">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/centro cultural lobos/14_auditorio exterior 01.webp" alt="Centro Cultural Lobos - 14_auditorio exterior 01">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/centro cultural lobos/15_expansion 02.webp" alt="Centro Cultural Lobos - 15_expansion 02">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/centro cultural lobos/16_expansion 01.webp" alt="Centro Cultural Lobos - 16_expansion 01">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/centro cultural lobos/17_hall 01.webp" alt="Centro Cultural Lobos - 17_hall 01">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/centro cultural lobos/18_auditorio interior 01.webp" alt="Centro Cultural Lobos - 18_auditorio interior 01">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/centro cultural lobos/19_auditorio interior 02.webp" alt="Centro Cultural Lobos - 19_auditorio interior 02">
        </div>
      </div>
`,
    customBody_EN: `
      <div class="pm-sheets-stack">
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/centro cultural lobos/01_fachada 01.webp" alt="Centro Cultural Lobos - 01_fachada 01">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/centro cultural lobos/02_planta baja.webp" alt="Centro Cultural Lobos - 02_planta baja">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/centro cultural lobos/03_primer piso.webp" alt="Centro Cultural Lobos - 03_primer piso">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/centro cultural lobos/04_segundo piso.webp" alt="Centro Cultural Lobos - 04_segundo piso">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/centro cultural lobos/05_cortes y vistas.webp" alt="Centro Cultural Lobos - 05_cortes y vistas">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/centro cultural lobos/06_detalle.webp" alt="Centro Cultural Lobos - 06_detalle">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/centro cultural lobos/07_corte perspectivado 01.webp" alt="Centro Cultural Lobos - 07_corte perspectivado 01">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/centro cultural lobos/08_axo 01.webp" alt="Centro Cultural Lobos - 08_axo 01">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/centro cultural lobos/09_axo 02.webp" alt="Centro Cultural Lobos - 09_axo 02">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/centro cultural lobos/10_fachada 02.webp" alt="Centro Cultural Lobos - 10_fachada 02">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/centro cultural lobos/11_entrada auditorio 01.webp" alt="Centro Cultural Lobos - 11_entrada auditorio 01">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/centro cultural lobos/12_escultura 01.webp" alt="Centro Cultural Lobos - 12_escultura 01">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/centro cultural lobos/13_escorso 01.webp" alt="Centro Cultural Lobos - 13_escorso 01">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/centro cultural lobos/14_auditorio exterior 01.webp" alt="Centro Cultural Lobos - 14_auditorio exterior 01">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/centro cultural lobos/15_expansion 02.webp" alt="Centro Cultural Lobos - 15_expansion 02">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/centro cultural lobos/16_expansion 01.webp" alt="Centro Cultural Lobos - 16_expansion 01">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/centro cultural lobos/17_hall 01.webp" alt="Centro Cultural Lobos - 17_hall 01">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/centro cultural lobos/18_auditorio interior 01.webp" alt="Centro Cultural Lobos - 18_auditorio interior 01">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/centro cultural lobos/19_auditorio interior 02.webp" alt="Centro Cultural Lobos - 19_auditorio interior 02">
        </div>
      </div>
`
  },
  {
    id: 'acad-4',
    title_ES: 'Plaza bajo Viaducto',
    title_EN: 'Plaza under Viaduct',
    category_ES: 'Arquitectura II',
    category_EN: 'Architecture II',
    year: '2022',
    role_ES: 'Proyecto de Arquitectura · FADU-UBA',
    role_EN: 'Architectural Design · FADU-UBA',
    desc_ES: 'Intervención y activación del espacio público residual bajo el viaducto ferroviario: puentes peatonales, locales comerciales, pérgolas, áreas de lectura y meditación.',
    desc_EN: 'Public space revitalization underneath the railway viaduct: pedestrian bridges, retail pavilions, pergolas, reading and contemplation areas.',
    heroImage: 'assets/proyectos academicos/plaza sobre viaducto/00_portada.webp',
    customBody_ES: `
      <div class="pm-sheets-stack">
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/plaza sobre viaducto/01_axo 01.webp" alt="Plaza bajo Viaducto - 01_axo 01">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/plaza sobre viaducto/02_axo 02.webp" alt="Plaza bajo Viaducto - 02_axo 02">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/plaza sobre viaducto/03_planta 01.webp" alt="Plaza bajo Viaducto - 03_planta 01">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/plaza sobre viaducto/04_planta 02.webp" alt="Plaza bajo Viaducto - 04_planta 02">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/plaza sobre viaducto/05_bancos 01.webp" alt="Plaza bajo Viaducto - 05_bancos 01">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/plaza sobre viaducto/06_bancos 02.webp" alt="Plaza bajo Viaducto - 06_bancos 02">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/plaza sobre viaducto/07_puente 01.webp" alt="Plaza bajo Viaducto - 07_puente 01">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/plaza sobre viaducto/08_puente 02.webp" alt="Plaza bajo Viaducto - 08_puente 02">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/plaza sobre viaducto/09_locales 01.webp" alt="Plaza bajo Viaducto - 09_locales 01">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/plaza sobre viaducto/09_locales 02.webp" alt="Plaza bajo Viaducto - 09_locales 02">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/plaza sobre viaducto/10_locales 05.webp" alt="Plaza bajo Viaducto - 10_locales 05">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/plaza sobre viaducto/11_locales 06.webp" alt="Plaza bajo Viaducto - 11_locales 06">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/plaza sobre viaducto/12_locales 03.webp" alt="Plaza bajo Viaducto - 12_locales 03">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/plaza sobre viaducto/13_locales 04.webp" alt="Plaza bajo Viaducto - 13_locales 04">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/plaza sobre viaducto/14_locales 07.webp" alt="Plaza bajo Viaducto - 14_locales 07">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/plaza sobre viaducto/15_locales 08.webp" alt="Plaza bajo Viaducto - 15_locales 08">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/plaza sobre viaducto/16_puente 03.webp" alt="Plaza bajo Viaducto - 16_puente 03">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/plaza sobre viaducto/17_pasto 01.webp" alt="Plaza bajo Viaducto - 17_pasto 01">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/plaza sobre viaducto/18_pasto 02.webp" alt="Plaza bajo Viaducto - 18_pasto 02">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/plaza sobre viaducto/19_pergola 01.webp" alt="Plaza bajo Viaducto - 19_pergola 01">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/plaza sobre viaducto/20_pergola 02.webp" alt="Plaza bajo Viaducto - 20_pergola 02">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/plaza sobre viaducto/21_lectura 01.webp" alt="Plaza bajo Viaducto - 21_lectura 01">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/plaza sobre viaducto/22_lectura 02.webp" alt="Plaza bajo Viaducto - 22_lectura 02">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/plaza sobre viaducto/23_meditacion 01.webp" alt="Plaza bajo Viaducto - 23_meditacion 01">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/plaza sobre viaducto/24_meditacion 02.webp" alt="Plaza bajo Viaducto - 24_meditacion 02">
        </div>
      </div>
`,
    customBody_EN: `
      <div class="pm-sheets-stack">
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/plaza sobre viaducto/01_axo 01.webp" alt="Plaza bajo Viaducto - 01_axo 01">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/plaza sobre viaducto/02_axo 02.webp" alt="Plaza bajo Viaducto - 02_axo 02">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/plaza sobre viaducto/03_planta 01.webp" alt="Plaza bajo Viaducto - 03_planta 01">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/plaza sobre viaducto/04_planta 02.webp" alt="Plaza bajo Viaducto - 04_planta 02">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/plaza sobre viaducto/05_bancos 01.webp" alt="Plaza bajo Viaducto - 05_bancos 01">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/plaza sobre viaducto/06_bancos 02.webp" alt="Plaza bajo Viaducto - 06_bancos 02">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/plaza sobre viaducto/07_puente 01.webp" alt="Plaza bajo Viaducto - 07_puente 01">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/plaza sobre viaducto/08_puente 02.webp" alt="Plaza bajo Viaducto - 08_puente 02">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/plaza sobre viaducto/09_locales 01.webp" alt="Plaza bajo Viaducto - 09_locales 01">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/plaza sobre viaducto/09_locales 02.webp" alt="Plaza bajo Viaducto - 09_locales 02">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/plaza sobre viaducto/10_locales 05.webp" alt="Plaza bajo Viaducto - 10_locales 05">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/plaza sobre viaducto/11_locales 06.webp" alt="Plaza bajo Viaducto - 11_locales 06">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/plaza sobre viaducto/12_locales 03.webp" alt="Plaza bajo Viaducto - 12_locales 03">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/plaza sobre viaducto/13_locales 04.webp" alt="Plaza bajo Viaducto - 13_locales 04">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/plaza sobre viaducto/14_locales 07.webp" alt="Plaza bajo Viaducto - 14_locales 07">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/plaza sobre viaducto/15_locales 08.webp" alt="Plaza bajo Viaducto - 15_locales 08">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/plaza sobre viaducto/16_puente 03.webp" alt="Plaza bajo Viaducto - 16_puente 03">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/plaza sobre viaducto/17_pasto 01.webp" alt="Plaza bajo Viaducto - 17_pasto 01">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/plaza sobre viaducto/18_pasto 02.webp" alt="Plaza bajo Viaducto - 18_pasto 02">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/plaza sobre viaducto/19_pergola 01.webp" alt="Plaza bajo Viaducto - 19_pergola 01">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/plaza sobre viaducto/20_pergola 02.webp" alt="Plaza bajo Viaducto - 20_pergola 02">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/plaza sobre viaducto/21_lectura 01.webp" alt="Plaza bajo Viaducto - 21_lectura 01">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/plaza sobre viaducto/22_lectura 02.webp" alt="Plaza bajo Viaducto - 22_lectura 02">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/plaza sobre viaducto/23_meditacion 01.webp" alt="Plaza bajo Viaducto - 23_meditacion 01">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/plaza sobre viaducto/24_meditacion 02.webp" alt="Plaza bajo Viaducto - 24_meditacion 02">
        </div>
      </div>
`
  },
  {
    id: 'acad-5',
    title_ES: 'Restaurante',
    title_EN: 'Restaurant',
    category_ES: 'Arquitectura I',
    category_EN: 'Architecture I',
    year: '2021',
    role_ES: 'Proyecto de Arquitectura · FADU-UBA',
    role_EN: 'Architectural Design · FADU-UBA',
    desc_ES: 'Diseño de un restaurante: articulación entre salón principal, hall de espera, expansión semicubierta y relación con el entorno inmediato.',
    desc_EN: 'Restaurant design: spatial articulation between dining room, lounge, semi-covered expansion, and surrounding landscape.',
    heroImage: 'assets/proyectos academicos/restaurante/00_portada.webp',
    customBody_ES: `
      <div class="pm-sheets-stack">
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/restaurante/01_fachada.webp" alt="Restaurante - 01_fachada">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/restaurante/02_planta.webp" alt="Restaurante - 02_planta">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/restaurante/03_hall de espera.webp" alt="Restaurante - 03_hall de espera">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/restaurante/04_salon.webp" alt="Restaurante - 04_salon">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/restaurante/05_expansion semicubierta.webp" alt="Restaurante - 05_expansion semicubierta">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/restaurante/06_contrafachada.webp" alt="Restaurante - 06_contrafachada">
        </div>
      </div>
`,
    customBody_EN: `
      <div class="pm-sheets-stack">
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/restaurante/01_fachada.webp" alt="Restaurante - 01_fachada">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/restaurante/02_planta.webp" alt="Restaurante - 02_planta">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/restaurante/03_hall de espera.webp" alt="Restaurante - 03_hall de espera">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/restaurante/04_salon.webp" alt="Restaurante - 04_salon">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/restaurante/05_expansion semicubierta.webp" alt="Restaurante - 05_expansion semicubierta">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/restaurante/06_contrafachada.webp" alt="Restaurante - 06_contrafachada">
        </div>
      </div>
`
  },
  {
    id: 'acad-6',
    title_ES: 'Vivienda Unifamiliar',
    title_EN: 'Single-Family House',
    category_ES: 'Arquitectura I',
    category_EN: 'Architecture I',
    year: '2021',
    role_ES: 'Proyecto de Arquitectura · FADU-UBA',
    role_EN: 'Architectural Design · FADU-UBA',
    desc_ES: 'Proyecto de vivienda unifamiliar: estudio tipológico, distribución en plantas, patio interno, accesos, circulaciones y contrafachada.',
    desc_EN: 'Single-family home design: typological analysis, floor plans, internal courtyard, access routes, and rear facade.',
    heroImage: 'assets/proyectos academicos/vivienda unifamiliar/00_portada.webp',
    customBody_ES: `
      <div class="pm-sheets-stack">
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/vivienda unifamiliar/01_fachada.webp" alt="Vivienda Unifamiliar - 01_fachada">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/vivienda unifamiliar/02_plantas.webp" alt="Vivienda Unifamiliar - 02_plantas">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/vivienda unifamiliar/03_acceso.webp" alt="Vivienda Unifamiliar - 03_acceso">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/vivienda unifamiliar/04_circulacion.webp" alt="Vivienda Unifamiliar - 04_circulacion">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/vivienda unifamiliar/05_patio interno.webp" alt="Vivienda Unifamiliar - 05_patio interno">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/vivienda unifamiliar/06_sala de estar.webp" alt="Vivienda Unifamiliar - 06_sala de estar">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/vivienda unifamiliar/07_contrafachada.webp" alt="Vivienda Unifamiliar - 07_contrafachada">
        </div>
      </div>
`,
    customBody_EN: `
      <div class="pm-sheets-stack">
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/vivienda unifamiliar/01_fachada.webp" alt="Vivienda Unifamiliar - 01_fachada">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/vivienda unifamiliar/02_plantas.webp" alt="Vivienda Unifamiliar - 02_plantas">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/vivienda unifamiliar/03_acceso.webp" alt="Vivienda Unifamiliar - 03_acceso">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/vivienda unifamiliar/04_circulacion.webp" alt="Vivienda Unifamiliar - 04_circulacion">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/vivienda unifamiliar/05_patio interno.webp" alt="Vivienda Unifamiliar - 05_patio interno">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/vivienda unifamiliar/06_sala de estar.webp" alt="Vivienda Unifamiliar - 06_sala de estar">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/vivienda unifamiliar/07_contrafachada.webp" alt="Vivienda Unifamiliar - 07_contrafachada">
        </div>
      </div>
`
  },
  {
    id: 'acad-7',
    title_ES: 'Plaza',
    title_EN: 'Plaza',
    category_ES: 'Arquitectura del Paisaje',
    category_EN: 'Landscape Architecture',
    year: '2021',
    role_ES: 'Proyecto de Arquitectura · FADU-UBA',
    role_EN: 'Architectural Design · FADU-UBA',
    desc_ES: 'Diseño de parque y espacio público: integración de paisaje natural, plaza seca, áreas de eventos, monumentos, sectores de ferias y juegos.',
    desc_EN: 'Landscape and public park design: natural integration, hardscape plaza, event zones, monuments, market fairs, and recreation areas.',
    heroImage: 'assets/proyectos academicos/plaza/00_portada.webp',
    customBody_ES: `
      <div class="pm-sheets-stack">
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/plaza/01_plaza_paisaje.webp" alt="Plaza - 01_plaza_paisaje">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/plaza/02_plaza_01.webp" alt="Plaza - 02_plaza_01">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/plaza/03_plaza_02.webp" alt="Plaza - 03_plaza_02">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/plaza/04_plaza_plaza seca.webp" alt="Plaza - 04_plaza_plaza seca">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/plaza/05_plaza_evento.webp" alt="Plaza - 05_plaza_evento">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/plaza/06_plaza_monumentos.webp" alt="Plaza - 06_plaza_monumentos">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/plaza/07_plaza_feria.webp" alt="Plaza - 07_plaza_feria">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/plaza/08_plaza_area de contemplacion.webp" alt="Plaza - 08_plaza_area de contemplacion">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/plaza/09_plaza_juegos.webp" alt="Plaza - 09_plaza_juegos">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/plaza/10_plaza_area de lectura.webp" alt="Plaza - 10_plaza_area de lectura">
        </div>
      </div>
`,
    customBody_EN: `
      <div class="pm-sheets-stack">
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/plaza/01_plaza_paisaje.webp" alt="Plaza - 01_plaza_paisaje">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/plaza/02_plaza_01.webp" alt="Plaza - 02_plaza_01">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/plaza/03_plaza_02.webp" alt="Plaza - 03_plaza_02">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/plaza/04_plaza_plaza seca.webp" alt="Plaza - 04_plaza_plaza seca">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/plaza/05_plaza_evento.webp" alt="Plaza - 05_plaza_evento">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/plaza/06_plaza_monumentos.webp" alt="Plaza - 06_plaza_monumentos">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/plaza/07_plaza_feria.webp" alt="Plaza - 07_plaza_feria">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/plaza/08_plaza_area de contemplacion.webp" alt="Plaza - 08_plaza_area de contemplacion">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/plaza/09_plaza_juegos.webp" alt="Plaza - 09_plaza_juegos">
        </div>
        <div class="pm-sheet-item">
          <img class="pm-sheet-img" src="assets/proyectos academicos/plaza/10_plaza_area de lectura.webp" alt="Plaza - 10_plaza_area de lectura">
        </div>
      </div>
`
  },

  // ESCRITOS
  {
    id: 'esc-1',
    title_ES: 'Intersticio: entre la apertura y la clausura',
    title_EN: 'Interstice: Between Opening and Enclosure',
    category_ES: 'Teoría de la Arquitectura',
    category_EN: 'Theory of Architecture',
    year: '2026',
    role_ES: 'ex Rizzo',
    role_EN: 'ex Rizzo',
    desc_ES: '...Entre la apertura y la clausura se juega el sentido del proyecto. Si la arquitectura insiste en definirlo todo, corre el riesgo de producir no-lugares: espacios eficientes pero despojados de memoria. Si acepta la liminalidad como condición productiva, puede sostener la ambigüedad sin caer en el caos. El intersticio aparece entonces no como resto marginal, sino como núcleo crítico desde el cual repensar la disciplina...',
    desc_EN: '...Between opening and enclosure lies the sense of the project. If architecture insists on defining everything, it risks producing non-places: efficient spaces stripped of memory. If it accepts liminality as productive condition, it can sustain ambiguity without falling into chaos. The interstice appears then not as marginal remainder, but as critical core from which to rethink the discipline...',
    heroImage: 'assets/escritos/intersticio entre la apertura y la clausura/00_portada.webp',
    customBody_ES: escritoIntersticioHtml_ES,
    customBody_EN: escritoIntersticioHtml_EN
  },
  {
    id: 'esc-2',
    title_ES: 'Interpretación local de un fenómeno global',
    title_EN: 'Local Interpretation of a Global Phenomenon',
    category_ES: 'Arquitectura, Arte y Diseño Argentino',
    category_EN: 'Argentine Architecture, Art & Design',
    year: '2025',
    role_ES: 'Labaqui',
    role_EN: 'Labaqui',
    desc_ES: '...La hipótesis central sostiene que el edificio Conurban no es un ejemplo más del Estilo Internacional, sino su versión argentina, y que en esa apropiación se revela tanto una aspiración de modernidad como una forma específica de argentinidad...',
    desc_EN: '...The central hypothesis holds that the Conurban building is not merely another example of the International Style, but its Argentine counterpart, revealing both an aspiration for modernity and a specific form of Argentineness...',
    heroImage: 'assets/escritos/interpretación local de un fenómeno global/00_portada.webp',
    customBody_ES: escritoConurbanHtml_ES,
    customBody_EN: escritoConurbanHtml_EN
  },
  {
    id: 'esc-4',
    title_ES: 'La Arquitectura como Propaganda Política',
    title_EN: 'Architecture as Political Propaganda',
    category_ES: 'Historia III',
    category_EN: 'History III',
    year: '2024',
    role_ES: 'Pernaut a cargo de García Cano',
    role_EN: 'Pernaut by García Cano',
    desc_ES: '...La arquitectura no es un mero contenedor neutro de actividades humanas, sino un dispositivo ideológico capaz de legitimar el poder, modelar la memoria colectiva y proyectar narrativas hegemónicas. El espacio monumental y el orden urbano operan como herramientas de persuasión y consolidación de regímenes a lo largo de la historia...',
    desc_EN: '...Architecture is not a neutral container for human activities, but an ideological device capable of legitimizing power, shaping collective memory, and projecting hegemonic narratives. Monumental space and urban order operate as instruments of persuasion and consolidation of regimes throughout history...',
    heroImage: 'assets/escritos/la arquitectura como propaganda politica/00_portada.webp',
    videoEmbedUrl: 'https://www.youtube.com/embed/RjHkpM-3CrI?start=128',
    sub1Title_ES: 'Investigación & Análisis Audiovisual',
    sub1Title_EN: 'Research & Audiovisual Analysis',
    sub1Desc_ES: 'Ensayo crítico y producción audiovisual estructurada en capítulos temáticos sobre la instrumentalización política de las intervenciones urbanas monumentales, los rituales de masas y el simbolismo arquitectónico de Estado.',
    sub1Desc_EN: 'Critical essay and audiovisual production structured into thematic chapters on the political instrumentalization of monumental urban interventions, mass rituals, and state architectural symbolism.'
  },
  {
    id: 'esc-3',
    title_ES: 'Mixtura de Usos',
    title_EN: 'Mixed-Use Integration',
    category_ES: 'Arquitectura IV',
    category_EN: 'Architecture IV',
    year: '2025',
    role_ES: 'TABA (ex MYVS)',
    role_EN: 'TABA (ex MYVS)',
    desc_ES: '...Investigación y desarrollo proyectual sobre la coexistencia programática y la mixtura de usos en el tejido urbano contemporáneo, articulando vivienda, trabajo, comercio y espacio colectivo bajo criterios de densidad sostenible e hibridación espacial...',
    desc_EN: '...Research and design development on programmatic coexistence and mixed-use integration in contemporary urban fabric, articulating housing, work, commerce, and collective space under sustainable density criteria...',
    heroImage: 'assets/escritos/mixtura de usos/00_portada.webp',
    videoEmbedUrl: 'https://www.youtube.com/embed/-RwX5h1fWYA',
    sub1Title_ES: 'Hibridación Tipológica & Ciudad Compacta',
    sub1Title_EN: 'Typological Hybridization & Compact City',
    sub1Desc_ES: 'Estudio de modelos de hibridación programática en parcelas urbanas de escala intermedia, potenciando la vitalidad de la planta baja y la flexibilidad de los usos compartidos.',
    sub1Desc_EN: 'Study of programmatic hybridization models in intermediate-scale urban plots, enhancing ground floor vitality and shared-use flexibility.'
  }
];

/**
 * Función de desplazamiento asistido para la página principal (Rápida y fluida)
 */
function smoothScrollTo(targetPosition, duration = 850) {
  const startPosition = window.scrollY;
  const distance = targetPosition - startPosition;
  let startTime = null;

  isWheelScrolling = false;
  currentScrollY = startPosition;
  targetScrollY = targetPosition;

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const easeProgress = easeOutCubic(progress);

    const nextY = startPosition + distance * easeProgress;
    window.scrollTo(0, nextY);
    
    currentScrollY = nextY;
    if (progress < 1) {
      targetScrollY = targetPosition;
    } else {
      targetScrollY = nextY;
    }

    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    } else {
      if (typeof updateLateralScrollbar === 'function') updateLateralScrollbar();
      if (typeof updateActiveMenuSection === 'function') updateActiveMenuSection();
    }
  }

  requestAnimationFrame(animation);
}

/**
 * Alterna la apertura/cierre del menú flotante (píldora)
 */
function toggleMenu() {
  const menuWrapper = document.getElementById('menu-wrapper');
  if (menuWrapper) {
    const isOpen = menuWrapper.classList.toggle('is-open');
    if (isOpen) {
      document.body.classList.add('menu-is-open');
    } else {
      document.body.classList.remove('menu-is-open');
    }
  }
}

/**
 * Cierra el menú si está abierto y restaura la pantalla
 */
function closeMenu() {
  const menuWrapper = document.getElementById('menu-wrapper');
  if (menuWrapper && menuWrapper.classList.contains('is-open')) {
    menuWrapper.classList.remove('is-open');
    document.body.classList.remove('menu-is-open');
  }
}

/**
 * Desplaza la página suavemente hacia una sección específica (Respuesta rápida)
 */
function scrollToSection(sectionId) {
  closeMenu();
  const targetElement = document.getElementById(sectionId);
  if (targetElement) {
    const targetY = targetElement.getBoundingClientRect().top + window.scrollY - 80;
    smoothScrollTo(targetY, 850);
  }
}

/**
 * Vuelve al inicio de la página (#home-screen)
 */
function goHome() {
  closeMenu();
  smoothScrollTo(0, 850);
}

/**
 * Actualiza los controles laterales: Iconos Sol/Luna para el tema y badge "ES" / "EN" para el idioma
 */
function updateTopButtonsText() {
  const isDark = document.body.classList.contains('dark-mode');
  const isES = currentLang === 'ES';

  // Actualizar icono de tema (Sol en modo claro, Luna en modo oscuro)
  const sunIcon = document.querySelector('.theme-icon.icon-sun');
  const moonIcon = document.querySelector('.theme-icon.icon-moon');
  if (sunIcon && moonIcon) {
    if (isDark) {
      sunIcon.style.display = 'none';
      moonIcon.style.display = 'block';
    } else {
      sunIcon.style.display = 'block';
      moonIcon.style.display = 'none';
    }
  }

  // Actualizar badge de idioma ("ES" o "EN")
  const langBadge1 = document.getElementById('lang-badge-1');
  const langBadge2 = document.getElementById('lang-badge-2');
  const langCode = isES ? 'ES' : 'EN';
  if (langBadge1) langBadge1.textContent = langCode;
  if (langBadge2) langBadge2.textContent = langCode;
}

function renderQuoteWords(text) {
  const quoteText = document.getElementById('transition-quote-text');
  if (!quoteText) return;
  const quoteString = text || i18n[currentLang].homeQuote;
  const words = quoteString.split(' ');
  quoteText.innerHTML = words.map(w => `<span class="quote-word">${w}</span>`).join(' ');

  const quoteAuthor = document.getElementById('transition-quote-author');
  if (quoteAuthor) {
    quoteAuthor.textContent = i18n[currentLang].homeQuoteAuthor || (currentLang === 'ES' ? 'Louis Kahn, Arquitecto' : 'Louis Kahn, Architect');
  }
}

/**
 * Alterna entre Modo Oscuro y Modo Claro
 */
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  updateTopButtonsText();
  localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');
  if (typeof updateTransitionQuoteScroll === 'function') {
    updateTransitionQuoteScroll();
  }
}

function renderHomeSubtitle(isIntro = false) {
  const el = document.getElementById('home-sub-text');
  if (!el) return;
  const isES = currentLang === 'ES';
  const text = isES 
    ? (i18n.ES.homeSub || 'Estudiante avanzado de Arquitectura | FADU-UBA')
    : (i18n.EN.homeSub || 'Advanced Architecture Student | FADU-UBA');

  let html = '';
  let delay = 0.10;
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char === ' ') {
      html += '<span class="sub-space">&nbsp;</span>';
      delay += 0.04;
    } else {
      const revealedClass = isIntro ? '' : ' is-revealed';
      html += `<span class="sub-char${revealedClass}" style="transition-delay: ${delay.toFixed(2)}s">${char}</span>`;
      delay += 0.02;
    }
  }
  el.innerHTML = html;
}

/**
 * Alterna el idioma entre Español e Inglés y traduce la página y el modal si está abierto
 */
function toggleLanguage() {
  currentLang = currentLang === 'ES' ? 'EN' : 'ES';
  updateTopButtonsText();
  renderHomeSubtitle(false);

  const translatableElements = document.querySelectorAll('[data-i18n]');
  translatableElements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (key && i18n[currentLang][key]) {
      if (key === 'homeQuote') {
        renderQuoteWords(i18n[currentLang][key]);
      } else {
        el.innerHTML = i18n[currentLang][key];
      }
    }
  });

  if (typeof updateTransitionQuoteScroll === 'function') {
    updateTransitionQuoteScroll();
  }

  if (currentActiveProjectId) {
    populateProjectModalData(currentActiveProjectId);
  }

  const allProjectsModal = document.getElementById('all-projects-modal');
  if (allProjectsModal && allProjectsModal.classList.contains('is-active')) {
    const activeFilterBtn = document.querySelector('.apm-filter-btn.is-active');
    const filter = activeFilterBtn ? activeFilterBtn.getAttribute('data-filter') : 'all';
    
    const titleTextEl = document.querySelector('.apm-title-text') || document.querySelector('.apm-title');
    if (titleTextEl) {
      if (filter === 'prof') {
        titleTextEl.textContent = currentLang === 'ES' ? 'Trabajos Profesionales' : 'Professional Works';
      } else if (filter === 'acad') {
        titleTextEl.textContent = currentLang === 'ES' ? 'Proyectos Académicos' : 'Academic Projects';
      } else if (filter === 'esc') {
        titleTextEl.textContent = currentLang === 'ES' ? 'Escritos' : 'Essays';
      } else {
        titleTextEl.textContent = currentLang === 'ES' ? 'Todos los Proyectos' : 'All Projects';
      }
    }
    renderAllProjectsGrid(filter);
  }
}

/**
 * Puebla la sección/modal de proyecto con los datos correspondientes según el idioma
 * @param {string} projectId - ID del proyecto
 */
function populateProjectModalData(projectId) {
  const project = projectsData.find(p => p.id === projectId);
  if (!project) return;

  currentActiveProjectId = projectId;

  const isES = currentLang === 'ES';

  const titleEl = document.getElementById('pm-title');
  const catEl = document.getElementById('pm-category');
  const yearEl = document.getElementById('pm-year');
  const roleEl = document.getElementById('pm-role');
  const linkEl = document.getElementById('pm-link');
  const descEl = document.getElementById('pm-desc');
  const heroImgEl = document.getElementById('pm-hero-img');
  const heroCaptionEl = document.getElementById('pm-hero-caption');
  const sub1TitleEl = document.getElementById('pm-sub1-title');
  const sub1DescEl = document.getElementById('pm-sub1-desc');
  const galleryEl = document.getElementById('pm-gallery');
  const sub2TitleEl = document.getElementById('pm-sub2-title');
  const sub2DescEl = document.getElementById('pm-sub2-desc');

  const catLabelEl = document.getElementById('pm-label-cat') || document.querySelector('[data-i18n="pmCategoryLabel"]');
  const yearLabelEl = document.getElementById('pm-label-year') || document.querySelector('[data-i18n="pmYearLabel"]');
  const roleLabelEl = document.getElementById('pm-label-role') || document.querySelector('[data-i18n="pmRoleLabel"]');

  if (project.id.startsWith('acad-')) {
    if (catLabelEl) catLabelEl.textContent = isES ? 'Materia' : 'Subject';
    if (yearLabelEl) yearLabelEl.textContent = isES ? 'Año' : 'Year';
    if (roleLabelEl) roleLabelEl.textContent = isES ? 'Cátedra' : 'Chair';
  } else if (project.id.startsWith('prof-')) {
    if (catLabelEl) catLabelEl.textContent = isES ? (project.categoryLabel_ES || 'Categoría') : (project.categoryLabel_EN || 'Category');
    if (yearLabelEl) yearLabelEl.textContent = isES ? 'Año' : 'Year';
    if (roleLabelEl) roleLabelEl.textContent = isES ? (project.roleLabel_ES || 'Estudio') : (project.roleLabel_EN || 'Studio');
  } else if (project.id.startsWith('esc-')) {
    if (catLabelEl) catLabelEl.textContent = isES ? (project.categoryLabel_ES || 'Materia') : (project.categoryLabel_EN || 'Subject');
    if (yearLabelEl) yearLabelEl.textContent = isES ? 'Año' : 'Year';
    if (roleLabelEl) roleLabelEl.textContent = isES ? (project.roleLabel_ES || 'Cátedra') : (project.roleLabel_EN || 'Chair');
  } else {
    if (catLabelEl) catLabelEl.textContent = isES ? (project.categoryLabel_ES || 'Categoría') : (project.categoryLabel_EN || 'Category');
    if (yearLabelEl) yearLabelEl.textContent = isES ? 'Año' : 'Year';
    if (roleLabelEl) roleLabelEl.textContent = isES ? (project.roleLabel_ES || 'Estudio') : (project.roleLabel_EN || 'Studio');
  }

  const customBodyContainer = document.getElementById('pm-custom-body');

  if (titleEl) titleEl.textContent = isES ? project.title_ES : project.title_EN;
  if (catEl) catEl.textContent = isES ? project.category_ES : project.category_EN;
  if (yearEl) yearEl.textContent = isES ? (project.year_ES || project.year) : (project.year_EN || project.year);
  if (roleEl) roleEl.textContent = isES ? project.role_ES : project.role_EN;

  if (descEl) {
    descEl.textContent = isES ? project.desc_ES : project.desc_EN;
    if (project.id.startsWith('esc-') || (project.desc_ES && project.desc_ES.startsWith('...'))) {
      descEl.classList.add('pm-desc-italic-quote');
    } else {
      descEl.classList.remove('pm-desc-italic-quote');
    }
  }

  const heroWrapper = document.querySelector('.pm-hero-wrapper');
  if (heroWrapper) {
    if (project.hideHeroInModal) {
      heroWrapper.style.display = 'none';
      heroWrapper.innerHTML = '';
    } else if (project.videoEmbedUrl) {
      heroWrapper.style.display = 'block';
      heroWrapper.innerHTML = `
        <div class="pm-hero-video-container">
          <iframe 
            src="${project.videoEmbedUrl}" 
            title="${isES ? project.title_ES : project.title_EN}" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowfullscreen>
          </iframe>
        </div>
      `;
    } else if (project.heroImage) {
      heroWrapper.style.display = 'block';
      heroWrapper.innerHTML = `
        <img id="pm-hero-img" class="pm-hero-img" src="${project.heroImage}" alt="${isES ? project.title_ES : project.title_EN}">
        <figcaption id="pm-hero-caption" class="pm-hero-caption" style="display: ${project.heroCaption_ES || project.heroCaption_EN ? 'block' : 'none'};">
          ${isES ? (project.heroCaption_ES || '') : (project.heroCaption_EN || '')}
        </figcaption>
      `;
    } else {
      heroWrapper.style.display = 'none';
      heroWrapper.innerHTML = '';
    }
  }

  // SI TIENE UN CUERPO PERSONALIZADO RICO (COMO LOS ESCRITOS EXTENSOS)
  if (project.customBody_ES || project.customBody_EN) {
    if (customBodyContainer) {
      customBodyContainer.innerHTML = isES ? project.customBody_ES : project.customBody_EN;
      customBodyContainer.style.display = 'block';
    }
    const standardBlocks = document.querySelectorAll('.pm-standard-block');
    standardBlocks.forEach(b => b.style.display = 'none');
  } else {
    if (customBodyContainer) {
      customBodyContainer.innerHTML = '';
      customBodyContainer.style.display = 'none';
    }

    const block1El = document.getElementById('pm-block-1');
    const block2El = document.getElementById('pm-block-2');

    const hasSub1 = (project.sub1Title_ES && project.sub1Title_ES.trim().length > 0) || (project.sub1Desc_ES && project.sub1Desc_ES.trim().length > 0);
    const hasSub2 = (project.sub2Title_ES && project.sub2Title_ES.trim().length > 0) || (project.sub2Desc_ES && project.sub2Desc_ES.trim().length > 0);
    const hasGallery = Array.isArray(project.gallery) && project.gallery.length > 0;

    if (block1El) {
      if (hasSub1) {
        block1El.style.display = 'block';
        if (sub1TitleEl) sub1TitleEl.textContent = isES ? project.sub1Title_ES : project.sub1Title_EN;
        if (sub1DescEl) sub1DescEl.textContent = isES ? project.sub1Desc_ES : project.sub1Desc_EN;
      } else {
        block1El.style.display = 'none';
      }
    }

    if (galleryEl) {
      if (hasGallery) {
        galleryEl.style.display = 'grid';
        galleryEl.innerHTML = project.gallery.map(imgUrl => `
          <div class="pm-gallery-item">
            <img src="${imgUrl}" alt="Detalle ${isES ? project.title_ES : project.title_EN}">
          </div>
        `).join('');
      } else {
        galleryEl.style.display = 'none';
        galleryEl.innerHTML = '';
      }
    }

    if (block2El) {
      if (hasSub2) {
        block2El.style.display = 'block';
        if (sub2TitleEl) sub2TitleEl.textContent = isES ? project.sub2Title_ES : project.sub2Title_EN;
        if (sub2DescEl) sub2DescEl.textContent = isES ? project.sub2Desc_ES : project.sub2Desc_EN;
      } else {
        block2El.style.display = 'none';
      }
    }
  }

  // Configurar botones anterior y siguiente
  const currentIndex = projectsData.findIndex(p => p.id === projectId);
  const prevIndex = (currentIndex - 1 + projectsData.length) % projectsData.length;
  const nextIndex = (currentIndex + 1) % projectsData.length;

  const prevBtn = document.getElementById('pm-prev-btn');
  const nextBtn = document.getElementById('pm-next-btn');

  if (prevBtn) {
    prevBtn.onclick = () => openProjectModal(projectsData[prevIndex].id);
  }
  if (nextBtn) {
    nextBtn.onclick = () => openProjectModal(projectsData[nextIndex].id);
  }

  // INICIALIZAR ANIMACIONES DE BARRIDA DESDE ABAJO Y UNBLUR INTERNAS DEL MODAL DE PROYECTO
  setupModalElementsScrollAnimation();
}

/**
 * Aplica las animaciones de barrida desde abajo y desenfoque progresivo a todos los bloques dentro del modal
 */
function setupModalElementsScrollAnimation() {
  const modal = document.getElementById('project-modal');
  if (!modal) return;

  modal.scrollTop = 0;
  modalCurrentScrollY = 0;
  modalTargetScrollY = 0;

  const modalElements = modal.querySelectorAll('.pm-header, .pm-meta-grid, .pm-hero-wrapper, .pm-block, .pm-gallery-item, .pm-footer-nav, .essay-intro-quote, .essay-paragraph, .essay-grid-two-col, .essay-figure');

  if (modalScrollObserver) {
    modalScrollObserver.disconnect();
  }

  modalElements.forEach(el => {
    el.classList.remove('is-revealed');
    el.classList.add('reveal-scroll');
  });

  const observerOptions = {
    root: modal,
    threshold: 0.08,
    rootMargin: '0px 0px -20px 0px'
  };

  modalScrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  modalElements.forEach(el => modalScrollObserver.observe(el));
}

/**
 * Abre el modal de detalle del proyecto estilo Damas
 * @param {string} projectId - ID de la ficha clickeada
 */
function openProjectModal(projectId) {
  closeMenu();
  populateProjectModalData(projectId);

  const modal = document.getElementById('project-modal');
  if (modal) {
    modal.classList.add('is-active');
    document.body.classList.add('has-active-modal');
    document.body.style.overflow = 'hidden';
    modal.scrollTop = 0;
    modalCurrentScrollY = 0;
    modalTargetScrollY = 0;
    if (typeof updateLateralScrollbar === 'function') {
      setTimeout(updateLateralScrollbar, 20);
    }
  }
}

/**
 * Cierra el modal de detalle del proyecto y restaura el scroll de la página
 */
function closeProjectModal() {
  const modal = document.getElementById('project-modal');
  if (modal) {
    modal.classList.remove('is-active');
    const allModal = document.getElementById('all-projects-modal');
    if (!allModal || !allModal.classList.contains('is-active')) {
      document.body.classList.remove('has-active-modal');
      document.body.style.overflow = '';
    }
  }
  currentActiveProjectId = null;
  if (modalScrollObserver) {
    modalScrollObserver.disconnect();
  }
  if (typeof updateLateralScrollbar === 'function') {
    setTimeout(updateLateralScrollbar, 20);
  }
}

// Cargar preferencia guardada de tema y listeners de DOM
function initPortfolio() {
  // 1. INTRO SPLASH CON CASCADA INVERSA Y BARRIDA HACIA ARRIBA (INMEDIATO Y RESILIENTE)
  const introOverlay = document.getElementById('intro-overlay');
  const homeChars = document.querySelectorAll('.home-char');
  const subChars = document.querySelectorAll('.sub-char');
  const topCenterControls = document.getElementById('top-center-controls');

  const skipIntro = sessionStorage.getItem('skipIntroFromPhoto') === 'true';
  sessionStorage.removeItem('skipIntroFromPhoto');
  sessionStorage.removeItem('hasSeenIntro');

  function dismissIntro(immediate = false) {
    if (introOverlay) {
      if (immediate) {
        introOverlay.style.display = 'none';
      }
      introOverlay.classList.add('sweep-up');
    }
    if (immediate) {
      homeChars.forEach(el => el.classList.add('is-revealed'));
      subChars.forEach(el => el.classList.add('is-revealed'));
      if (topCenterControls) {
        topCenterControls.classList.add('is-revealed');
      }
    } else {
      setTimeout(() => {
        homeChars.forEach(el => el.classList.add('is-revealed'));
        subChars.forEach(el => el.classList.add('is-revealed'));
      }, 250);

      setTimeout(() => {
        if (topCenterControls) {
          topCenterControls.classList.add('is-revealed');
        }
      }, 650);
    }
  }

  if (skipIntro) {
    dismissIntro(true);
  } else {
    setTimeout(() => dismissIntro(false), 1150);
    setTimeout(() => dismissIntro(false), 2000);

    if (introOverlay) {
      introOverlay.addEventListener('click', () => dismissIntro(false));
      introOverlay.addEventListener('touchstart', () => dismissIntro(false), { passive: true });
    }
  }

  // Si se ingresó con el hash #fotografia, abrir automáticamente el modal transparente de fotografía
  if (window.location.hash === '#fotografia' || window.location.hash === '#sec-fotografia-all') {
    setTimeout(() => {
      if (typeof openAllPhotosModal === 'function') {
        openAllPhotosModal();
      }
    }, 150);
  }

  try {
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-mode');
    }
  } catch (e) {}

  try {
    updateTopButtonsText();
  } catch (e) {}

  try {
    initHome3DIcosahedrons();
  } catch (e) {
    console.warn('3D Canvas init skipped:', e);
  }

  try {
    renderHomePhotosRandomGrid();
  } catch (e) {
    console.warn('Error rendering random home photos:', e);
  }

  currentScrollY = window.scrollY;
  targetScrollY = window.scrollY;

  // FUNCIÓN DE ESCALADO Y APILAMIENTO DE FICHAS EN MAZO UNIFICADO
  function updateCardStackScale() {
    const wrappers = document.querySelectorAll('.cards-deck-wrapper');
    const windowHeight = window.innerHeight;
    const stickyTop = 20;

    wrappers.forEach(wrapper => {
      const cards = wrapper.querySelectorAll('.card-item');
      const numCards = cards.length;
      if (numCards <= 1) return;

      const rect = wrapper.getBoundingClientRect();
      const trackHeight = wrapper.offsetHeight - windowHeight;
      if (trackHeight <= 0) return;

      // Progreso del scroll en este mazo: 0 cuando el mazo llega a top: 20px, 1 cuando termina el mazo
      const rawProgress = (stickyTop - rect.top) / trackHeight;
      const deckProgress = Math.min(Math.max(0, rawProgress), 1);

      // Generar segmentos de timeline: [Pausa 1, Subida 2, Pausa 2, Subida 3, Pausa 3]
      // Subidas al recorrido original exacto (60vh) + pausas breves de mini scroll entre fichas (20vh)
      const weights = [];
      for (let i = 0; i < numCards; i++) {
        if (i === 0) {
          weights.push({ type: 'pause', cardIndex: 0, weight: 20 });
        } else {
          weights.push({ type: 'climb', cardIndex: i, weight: 60 });
          weights.push({ type: 'pause', cardIndex: i, weight: i === numCards - 1 ? 25 : 20 });
        }
      }
      const totalWeight = weights.reduce((sum, w) => sum + w.weight, 0);

      let acc = 0;
      const segments = weights.map(w => {
        const start = acc / totalWeight;
        acc += w.weight;
        const end = acc / totalWeight;
        return { ...w, start, end };
      });

      cards.forEach((card, index) => {
        // Progreso de subida de esta ficha (si index > 0)
        let climbT = 1;
        if (index > 0) {
          const climbSeg = segments.find(s => s.type === 'climb' && s.cardIndex === index);
          if (climbSeg) {
            if (deckProgress < climbSeg.start) {
              climbT = 0;
            } else if (deckProgress > climbSeg.end) {
              climbT = 1;
            } else {
              climbT = (deckProgress - climbSeg.start) / (climbSeg.end - climbSeg.start);
            }
          }
        }

        // Progreso de subida de la siguiente ficha para escalar y oscurecer esta ficha
        let nextClimbT = 0;
        if (index < numCards - 1) {
          const nextClimbSeg = segments.find(s => s.type === 'climb' && s.cardIndex === index + 1);
          if (nextClimbSeg) {
            if (deckProgress < nextClimbSeg.start) {
              nextClimbT = 0;
            } else if (deckProgress > nextClimbSeg.end) {
              nextClimbT = 1;
            } else {
              nextClimbT = (deckProgress - nextClimbSeg.start) / (nextClimbSeg.end - nextClimbSeg.start);
            }
          }
        }

        const scale = 1 - nextClimbT * 0.05;
        const brightness = 1 - nextClimbT * 0.06;

        if (index === 0) {
          card.style.transform = `translateY(0) scale(${scale})`;
          card.style.filter = `brightness(${brightness})`;
        } else {
          const yPercent = (1 - climbT) * 115;
          if (yPercent > 0.02) {
            card.style.transform = `translateY(${yPercent}%) scale(1)`;
            card.style.filter = 'brightness(1)';
          } else {
            card.style.transform = `translateY(0) scale(${scale})`;
            card.style.filter = `brightness(${brightness})`;
          }
        }
      });
    });
  }

  renderQuoteWords();

  // FUNCIÓN DE TRANSICIÓN Y PINTADO PROGRESIVO DE LA FRASE EDITORIAL AL SCROLLEAR
  function updateTransitionQuoteScroll() {
    const homeScreen = document.getElementById('home-screen');
    const spacer = document.getElementById('home-transition-spacer');
    const quoteText = document.getElementById('transition-quote-text');
    if (!spacer || !quoteText || !homeScreen) return;

    const homeHeight = homeScreen.offsetHeight;
    const scrollY = window.scrollY;

    const quoteAuthor = document.getElementById('transition-quote-author');

    if (window.innerWidth <= 768) {
      quoteText.style.opacity = '1';
      if (quoteAuthor) quoteAuthor.style.opacity = '0.85';
      const words = quoteText.querySelectorAll('.quote-word');
      words.forEach(w => w.style.color = '');
      return;
    }

    // 1. "hasta que no se vaya el agustin labajian de la pantalla no aparece la frase."
    if (scrollY < homeHeight) {
      quoteText.style.opacity = '0';
      if (quoteAuthor) quoteAuthor.style.opacity = '0';
      return;
    }

    // 2. "cuando esta solamente el fondo blanco ahi va apareciendo la frase en gris (de 0% a 100% de transparencia pura)"
    const spacerTop = homeHeight;
    const trackHeight = spacer.offsetHeight - window.innerHeight;
    if (trackHeight <= 0) return;

    const progressInSpacer = (scrollY - spacerTop) / trackHeight;
    const clampedProgress = Math.min(Math.max(0, progressInSpacer), 1);

    // Transparencia pura de 0% a 100% al entrar en la pantalla en blanco
    const fadeInProgress = Math.min(Math.max(0, clampedProgress / 0.08), 1);
    quoteText.style.opacity = fadeInProgress.toString();
    if (quoteAuthor) {
      quoteAuthor.style.opacity = (fadeInProgress * 0.85).toString();
    }

    // 3. "de manera lenta tiene que ir pintandose la frase de negro... a la velocidad de como lo vas leyendo mentalmente"
    const readStart = 0.08;
    const readEnd = 0.88;
    const rawReadingProgress = (clampedProgress - readStart) / (readEnd - readStart);
    const readingProgress = Math.min(Math.max(0, rawReadingProgress), 1);

    const words = quoteText.querySelectorAll('.quote-word');
    const numWords = words.length;
    if (numWords === 0) return;

    const isDarkMode = document.body.classList.contains('dark-mode');

    words.forEach((word, index) => {
      // Cada palabra se va pintando a negro a velocidad de lectura natural
      const wordStart = index / numWords;
      const wordEnd = (index + 1.25) / numWords;
      const wordProgress = Math.min(Math.max(0, (readingProgress - wordStart) / (wordEnd - wordStart)), 1);

      if (isDarkMode) {
        // Modo Oscuro: de gris oscuro apagado (62, 62, 68) a blanco pleno (255, 255, 255)
        const val = Math.round(62 + (255 - 62) * wordProgress);
        word.style.color = `rgb(${val}, ${val}, ${val})`;
      } else {
        // Modo Claro: de gris claro (196, 196, 200) a negro pleno (17, 17, 17)
        const r = Math.round(196 - (196 - 17) * wordProgress);
        const g = Math.round(196 - (196 - 17) * wordProgress);
        const b = Math.round(200 - (200 - 17) * wordProgress);
        word.style.color = `rgb(${r}, ${g}, ${b})`;
      }
    });
  }

  // =======================================================
  // VISIBILIDAD DEL MENÚ FLOTANTE INFERIOR
  // (Aparece únicamente una vez que se pasa la sección de la frase de Louis Kahn)
  // =======================================================
  function updateMenuVisibility() {
    const quoteSpacer = document.getElementById('home-transition-spacer') || document.getElementById('transition-quote-spacer');
    const mainContent = document.getElementById('main-content') || document.getElementById('sec-trabajo-profesional');
    const scrollY = window.scrollY;

    let threshold = 0;
    if (quoteSpacer) {
      threshold = quoteSpacer.offsetTop + quoteSpacer.offsetHeight - window.innerHeight * 0.4;
    } else if (mainContent) {
      threshold = mainContent.offsetTop - window.innerHeight * 0.4;
    } else {
      const homeScreen = document.getElementById('home-screen');
      threshold = homeScreen ? homeScreen.offsetHeight * 1.5 : 800;
    }

    if (scrollY >= threshold) {
      document.body.classList.add('scrolled-past-home');
    } else {
      document.body.classList.remove('scrolled-past-home');
    }
  }

  // =======================================================
  // DETECCIÓN DE LA SECCIÓN ACTIVA EN PANTALLA (TIPO ASCENSOR)
  // =======================================================
  let lastActiveMenuId = null;

  function updateActiveMenuSection() {
    updateMenuVisibility();

    const bottomPillList = document.getElementById('bottom-pill-list');
    const slider = document.getElementById('bottom-pill-slider');
    if (!bottomPillList || !slider) return;

    const quoteSpacer = document.getElementById('home-transition-spacer') || document.getElementById('transition-quote-spacer');
    const scrollY = window.scrollY;

    let quoteEnd = 0;
    if (quoteSpacer) {
      quoteEnd = quoteSpacer.offsetTop + quoteSpacer.offsetHeight - window.innerHeight * 0.4;
    }

    if (scrollY < quoteEnd) {
      slider.style.opacity = '0';
      bottomPillList.querySelectorAll('.bottom-pill-btn').forEach(btn => btn.classList.remove('is-active'));
      return;
    }

    const sections = [
      { id: 'sec-trabajo-profesional', el: document.getElementById('sec-trabajo-profesional') },
      { id: 'sec-proyectos-academicos', el: document.getElementById('sec-proyectos-academicos') },
      { id: 'sec-escritos', el: document.getElementById('sec-escritos') },
      { id: 'sec-fotografia', el: document.getElementById('sec-fotografia') },
      { id: 'sec-cv', el: document.getElementById('sec-cv') }
    ];

    let currentActiveId = null;
    const vh = window.innerHeight;

    for (let i = sections.length - 1; i >= 0; i--) {
      const s = sections[i];
      if (s.el) {
        const rect = s.el.getBoundingClientRect();
        if (rect.top <= vh * 0.52 && rect.bottom >= vh * 0.12) {
          currentActiveId = s.id;
          break;
        }
      }
    }

    if (!currentActiveId && scrollY > (homeScreen ? homeScreen.offsetHeight : 600)) {
      const cvSection = document.getElementById('sec-cv');
      if (cvSection && cvSection.getBoundingClientRect().top < vh * 0.8) {
        currentActiveId = 'sec-cv';
      } else {
        currentActiveId = 'sec-trabajo-profesional';
      }
    }

    const buttons = bottomPillList.querySelectorAll('.bottom-pill-btn');
    let activeBtn = null;

    buttons.forEach(btn => {
      if (btn.getAttribute('data-section') === currentActiveId) {
        btn.classList.add('is-active');
        activeBtn = btn;
      } else {
        btn.classList.remove('is-active');
      }
    });

    if (activeBtn) {
      slider.style.opacity = '1';
      slider.style.width = `${activeBtn.offsetWidth}px`;
      slider.style.transform = `translateX(${activeBtn.offsetLeft}px)`;

      if (lastActiveMenuId !== currentActiveId) {
        lastActiveMenuId = currentActiveId;
        activeBtn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    } else {
      slider.style.opacity = '0';
      lastActiveMenuId = null;
    }
  }

  // =======================================================
  // CONTROLADOR DE BARRA LATERAL JERÁRQUICA E INTERACTIVA
  // (Detecta y controla el contenedor en primer plano)
  // =======================================================
  function getActiveScrollContainerInfo() {
    const allPhotosModal = document.getElementById('all-photos-modal');
    if (allPhotosModal && allPhotosModal.classList.contains('is-active')) {
      const content = allPhotosModal.querySelector('.all-projects-content');
      if (content) {
        const maxScroll = Math.max(1, content.scrollHeight - content.clientHeight);
        return {
          type: 'all-photos',
          element: content,
          scrollTop: content.scrollTop,
          maxScroll: maxScroll,
          scrollTo: (y) => {
            const clampedY = Math.min(Math.max(0, y), maxScroll);
            content.scrollTop = clampedY;
            apmPhotosCurrentScrollY = clampedY;
            apmPhotosTargetScrollY = clampedY;
          }
        };
      }
    }
    const projectModal = document.getElementById('project-modal');
    if (projectModal && projectModal.classList.contains('is-active')) {
      const maxScroll = Math.max(1, projectModal.scrollHeight - projectModal.clientHeight);
      return {
        type: 'project-modal',
        element: projectModal,
        scrollTop: projectModal.scrollTop,
        maxScroll: maxScroll,
        scrollTo: (y) => {
          const clampedY = Math.min(Math.max(0, y), maxScroll);
          projectModal.scrollTop = clampedY;
          modalCurrentScrollY = clampedY;
          modalTargetScrollY = clampedY;
        }
      };
    }

    const allProjectsModal = document.getElementById('all-projects-modal');
    if (allProjectsModal && allProjectsModal.classList.contains('is-active')) {
      const content = allProjectsModal.querySelector('.all-projects-content');
      if (content) {
        const maxScroll = Math.max(1, content.scrollHeight - content.clientHeight);
        return {
          type: 'all-projects',
          element: content,
          scrollTop: content.scrollTop,
          maxScroll: maxScroll,
          scrollTo: (y) => {
            const clampedY = Math.min(Math.max(0, y), maxScroll);
            content.scrollTop = clampedY;
            apmCurrentScrollY = clampedY;
            apmTargetScrollY = clampedY;
          }
        };
      }
    }

    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    return {
      type: 'window',
      element: window,
      scrollTop: window.scrollY,
      maxScroll: maxScroll,
      scrollTo: (y) => {
        const clampedY = Math.min(Math.max(0, y), maxScroll);
        window.scrollTo(0, clampedY);
        currentScrollY = clampedY;
        targetScrollY = clampedY;
        updateCardStackScale();
        updateTransitionQuoteScroll();
        updateActiveMenuSection();
      }
    };
  }

  function updateLateralScrollbar() {
    const scrollbar = document.getElementById('lateral-scrollbar');
    const track = document.getElementById('lateral-scrollbar-track');
    const thumb = document.getElementById('lateral-scrollbar-thumb');
    if (!scrollbar || !track || !thumb) return;

    const info = getActiveScrollContainerInfo();

    if (info.type !== 'window') {
      document.body.classList.add('has-active-modal');
    } else {
      document.body.classList.remove('has-active-modal');
    }

    if (info.maxScroll <= 10) {
      scrollbar.style.opacity = '0';
      scrollbar.style.pointerEvents = 'none';
      return;
    } else {
      scrollbar.style.pointerEvents = 'auto';
    }

    const trackHeight = track.clientHeight;
    const clientHeight = info.type === 'window' ? window.innerHeight : info.element.clientHeight;
    const scrollHeight = info.type === 'window' ? document.documentElement.scrollHeight : info.element.scrollHeight;
    const ratio = Math.min(Math.max(clientHeight / scrollHeight, 0.12), 0.7);
    const thumbHeight = Math.max(26, trackHeight * ratio);

    thumb.style.height = `${thumbHeight}px`;

    const progress = Math.min(Math.max(0, info.scrollTop / info.maxScroll), 1);
    const availableTrack = trackHeight - thumbHeight;
    const thumbY = progress * availableTrack;

    thumb.style.transform = `translateY(${thumbY}px)`;
  }

  function initLateralScrollbarInteraction() {
    const scrollbar = document.getElementById('lateral-scrollbar');
    const track = document.getElementById('lateral-scrollbar-track');
    const thumb = document.getElementById('lateral-scrollbar-thumb');
    if (!scrollbar || !track || !thumb) return;

    let isDragging = false;
    let startY = 0;
    let startScrollTop = 0;

    thumb.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      e.stopPropagation();
      isDragging = true;
      scrollbar.classList.add('is-dragging');
      thumb.setPointerCapture(e.pointerId);
      startY = e.clientY;
      const info = getActiveScrollContainerInfo();
      startScrollTop = info.scrollTop;
    });

    window.addEventListener('pointermove', (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const trackHeight = track.clientHeight;
      const thumbHeight = thumb.clientHeight;
      const availableTrack = trackHeight - thumbHeight;
      if (availableTrack <= 0) return;

      const deltaY = e.clientY - startY;
      const info = getActiveScrollContainerInfo();
      const scrollDelta = (deltaY / availableTrack) * info.maxScroll;
      info.scrollTo(startScrollTop + scrollDelta);
      updateLateralScrollbar();
    });

    const onPointerUp = (e) => {
      if (isDragging) {
        isDragging = false;
        scrollbar.classList.remove('is-dragging');
        try {
          thumb.releasePointerCapture(e.pointerId);
        } catch (err) {}
      }
    };

    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);

    track.addEventListener('click', (e) => {
      if (e.target === thumb) return;
      const rect = track.getBoundingClientRect();
      const clickY = e.clientY - rect.top;
      const trackHeight = track.clientHeight;
      const thumbHeight = thumb.clientHeight;
      const progress = Math.min(Math.max(0, (clickY - thumbHeight / 2) / (trackHeight - thumbHeight)), 1);
      const info = getActiveScrollContainerInfo();
      info.scrollTo(progress * info.maxScroll);
      updateLateralScrollbar();
    });
  }

  window.updateLateralScrollbar = updateLateralScrollbar;
  window.updateActiveMenuSection = updateActiveMenuSection;

  const homeScreen = document.getElementById('home-screen');
  window.addEventListener('scroll', () => {
    if (!isWheelScrolling) {
      currentScrollY = window.scrollY;
      targetScrollY = window.scrollY;
    }

    updateCardStackScale();
    updateTransitionQuoteScroll();
    updateActiveMenuSection();
    updateMenuVisibility();
    updateLateralScrollbar();
  });

  const projectModalEl = document.getElementById('project-modal');
  if (projectModalEl) {
    projectModalEl.addEventListener('scroll', () => {
      updateLateralScrollbar();
    });
  }

  const allProjectsContentEl = document.querySelector('.all-projects-content');
  if (allProjectsContentEl) {
    allProjectsContentEl.addEventListener('scroll', () => {
      updateLateralScrollbar();
    });
  }

  window.addEventListener('resize', () => {
    updateCardStackScale();
    updateTransitionQuoteScroll();
    updateActiveMenuSection();
    updateLateralScrollbar();
  });

  initLateralScrollbarInteraction();
  updateCardStackScale();
  updateTransitionQuoteScroll();
  updateActiveMenuSection();
  updateLateralScrollbar();

  document.addEventListener('click', (event) => {
    const menuWrapper = document.getElementById('menu-wrapper');
    if (menuWrapper && menuWrapper.classList.contains('is-open')) {
      if (!menuWrapper.contains(event.target) && !event.target.closest('#menu-toggle')) {
        closeMenu();
      }
    }
  });

  // Intro splash inicializado arriba

  // 2. CURSOR CARTESIANO DE PANTALLA COMPLETA & PUNTO INVERSOR
  const cursorContainer = document.getElementById('custom-cursor');
  const cursorAxisH = document.getElementById('cursor-axis-h');
  const cursorAxisV = document.getElementById('cursor-axis-v');
  const cursorDot = document.getElementById('cursor-dot');
  const cursorPillText = document.getElementById('cursor-pill-text');

  window.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    if (cursorContainer) {
      cursorContainer.classList.add('is-active');
    }
    if (cursorAxisH) {
      cursorAxisH.style.transform = `translateY(${mouseY}px)`;
    }
    if (cursorAxisV) {
      cursorAxisV.style.transform = `translateX(${mouseX}px)`;
    }
    if (cursorDot) {
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    }
  });

  // EFECTO HOVER EN FICHAS: PROYECTOS ("Ver Proyecto"), ESCRITOS ("Leer Texto"), Y FOTOGRAFÍA ("Ver Foto")
  const hoverCards = document.querySelectorAll('.card-item, .essay-list-item');
  hoverCards.forEach(card => {
    const isEscrito = card.closest('#sec-escritos') !== null || card.classList.contains('essay-list-item');
    card.addEventListener('mouseenter', () => {
      if (cursorDot) {
        cursorDot.classList.add('is-card-hover');
        if (isEscrito) {
          cursorDot.classList.add('is-escrito-pill');
        } else {
          cursorDot.classList.remove('is-escrito-pill');
        }
        if (cursorPillText) {
          if (isEscrito) {
            cursorPillText.textContent = currentLang === 'ES' ? 'Leer Texto' : 'Read Text';
          } else {
            cursorPillText.textContent = currentLang === 'ES' ? 'Ver Proyecto' : 'View Project';
          }
        }
      }
    });
    card.addEventListener('mouseleave', () => {
      if (cursorDot) {
        cursorDot.classList.remove('is-card-hover');
        cursorDot.classList.remove('is-escrito-pill');
      }
    });
  });

  const photoCards = document.querySelectorAll('.photo-card');
  photoCards.forEach(photo => {
    photo.addEventListener('mouseenter', () => {
      if (cursorDot) {
        cursorDot.classList.add('is-card-hover');
        if (cursorPillText) {
          cursorPillText.textContent = currentLang === 'ES' ? 'Ver Foto' : 'View Photo';
        }
      }
    });
    photo.addEventListener('mouseleave', () => {
      if (cursorDot) {
        cursorDot.classList.remove('is-card-hover');
      }
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      if (typeof currentActivePhotoSrc !== 'undefined' && currentActivePhotoSrc) {
        closePhotoModal();
      } else if (currentActiveProjectId) {
        closeProjectModal();
      } else if (document.getElementById('all-projects-modal')?.classList.contains('is-active')) {
        closeAllProjectsModal();
      } else if (document.getElementById('all-photos-modal')?.classList.contains('is-active')) {
        closeAllPhotosModal();
      } else {
        closeMenu();
      }
    }
  });

  // BARRIDA DESDE ABAJO PARA ELEMENTOS DE LA PÁGINA PRINCIPAL
  const scrollElements = document.querySelectorAll('h2.section-title, .card-item, .cv-header-block, .cv-block, .footer-card');
  scrollElements.forEach(el => el.classList.add('reveal-scroll'));

  const observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  };

  const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  scrollElements.forEach(el => scrollObserver.observe(el));

  // RENDER DE RUEDA DE MOUSE INERCIAL (PÁGINA PRINCIPAL - RÁPIDO & FLUIDO)
  function renderWheelScroll() {
    currentScrollY += (targetScrollY - currentScrollY) * 0.12;
    window.scrollTo(0, currentScrollY);
    updateCardStackScale();
    updateTransitionQuoteScroll();
    updateActiveMenuSection();
    updateLateralScrollbar();

    if (Math.abs(targetScrollY - currentScrollY) > 0.5) {
      requestAnimationFrame(renderWheelScroll);
    } else {
      isWheelScrolling = false;
      currentScrollY = window.scrollY;
      targetScrollY = window.scrollY;
      updateLateralScrollbar();
    }
  }

  // RENDER DE RUEDA DE MOUSE INERCIAL (DENTRO DEL MODAL DE PROYECTO)
  function renderModalWheelScroll() {
    const modal = document.getElementById('project-modal');
    if (!modal) return;

    modalCurrentScrollY += (modalTargetScrollY - modalCurrentScrollY) * 0.12;
    modal.scrollTop = modalCurrentScrollY;
    updateLateralScrollbar();

    if (Math.abs(modalTargetScrollY - modalCurrentScrollY) > 0.5) {
      requestAnimationFrame(renderModalWheelScroll);
    } else {
      isModalWheelScrolling = false;
      modalCurrentScrollY = modal.scrollTop;
      modalTargetScrollY = modal.scrollTop;
      updateLateralScrollbar();
    }
  }

  // RENDER DE RUEDA DE MOUSE INERCIAL (DENTRO DEL MODAL DE TODOS LOS PROYECTOS)
  let apmCurrentScrollY = 0;
  let apmTargetScrollY = 0;
  let isApmWheelScrolling = false;

  function renderApmWheelScroll() {
    const allProjectsModal = document.getElementById('all-projects-modal');
    if (!allProjectsModal) return;
    const content = allProjectsModal.querySelector('.all-projects-content');
    if (!content) return;

    apmCurrentScrollY += (apmTargetScrollY - apmCurrentScrollY) * 0.12;
    content.scrollTop = apmCurrentScrollY;
    updateLateralScrollbar();

    if (Math.abs(apmTargetScrollY - apmCurrentScrollY) > 0.5) {
      requestAnimationFrame(renderApmWheelScroll);
    } else {
      isApmWheelScrolling = false;
      apmCurrentScrollY = content.scrollTop;
      apmTargetScrollY = content.scrollTop;
      updateLateralScrollbar();
    }
  }

  // RENDER DE RUEDA DE MOUSE INERCIAL (DENTRO DEL MODAL DE TODAS LAS FOTOGRAFÍAS)
  let apmPhotosCurrentScrollY = 0;
  let apmPhotosTargetScrollY = 0;
  let isApmPhotosWheelScrolling = false;

  function renderApmPhotosWheelScroll() {
    const allPhotosModal = document.getElementById('all-photos-modal');
    if (!allPhotosModal) return;
    const content = allPhotosModal.querySelector('.all-projects-content');
    if (!content) return;

    apmPhotosCurrentScrollY += (apmPhotosTargetScrollY - apmPhotosCurrentScrollY) * 0.12;
    content.scrollTop = apmPhotosCurrentScrollY;
    updateLateralScrollbar();

    if (Math.abs(apmPhotosTargetScrollY - apmPhotosCurrentScrollY) > 0.5) {
      requestAnimationFrame(renderApmPhotosWheelScroll);
    } else {
      isApmPhotosWheelScrolling = false;
      apmPhotosCurrentScrollY = content.scrollTop;
      apmPhotosTargetScrollY = content.scrollTop;
      updateLateralScrollbar();
    }
  }

  // LISTENER DE SCROLL DE RUEDA DEL MOUSE AISLADO POR PESTAÑA / MODAL
  window.addEventListener('wheel', (e) => {
    if (document.body.classList.contains('menu-is-open')) return;

    if (typeof currentActivePhotoSrc !== 'undefined' && currentActivePhotoSrc) {
      e.preventDefault();
      return;
    }

    if (currentActiveProjectId) {
      const modal = document.getElementById('project-modal');
      if (!modal) return;

      e.preventDefault();

      if (!isModalWheelScrolling) {
        modalCurrentScrollY = modal.scrollTop;
        modalTargetScrollY = modal.scrollTop;
      }

      const scrollDelta = e.deltaY * 0.95;
      const maxScroll = Math.max(1, modal.scrollHeight - modal.clientHeight);

      modalTargetScrollY = Math.min(Math.max(0, modalTargetScrollY + scrollDelta), maxScroll);

      if (!isModalWheelScrolling) {
        isModalWheelScrolling = true;
        requestAnimationFrame(renderModalWheelScroll);
      }
      return;
    }

    const allProjectsModal = document.getElementById('all-projects-modal');
    if (allProjectsModal && allProjectsModal.classList.contains('is-active')) {
      const content = allProjectsModal.querySelector('.all-projects-content');
      if (content) {
        e.preventDefault();
        if (!isApmWheelScrolling) {
          apmCurrentScrollY = content.scrollTop;
          apmTargetScrollY = content.scrollTop;
        }
        const scrollDelta = e.deltaY * 0.95;
        const maxScroll = Math.max(1, content.scrollHeight - content.clientHeight);
        apmTargetScrollY = Math.min(Math.max(0, apmTargetScrollY + scrollDelta), maxScroll);
        if (!isApmWheelScrolling) {
          isApmWheelScrolling = true;
          requestAnimationFrame(renderApmWheelScroll);
        }
      }
      return;
    }

    const allPhotosModal = document.getElementById('all-photos-modal');
    if (allPhotosModal && allPhotosModal.classList.contains('is-active')) {
      const content = allPhotosModal.querySelector('.all-projects-content');
      if (content) {
        e.preventDefault();
        if (!isApmPhotosWheelScrolling) {
          apmPhotosCurrentScrollY = content.scrollTop;
          apmPhotosTargetScrollY = content.scrollTop;
        }
        const scrollDelta = e.deltaY * 0.95;
        const maxScroll = Math.max(1, content.scrollHeight - content.clientHeight);
        apmPhotosTargetScrollY = Math.min(Math.max(0, apmPhotosTargetScrollY + scrollDelta), maxScroll);
        if (!isApmPhotosWheelScrolling) {
          isApmPhotosWheelScrolling = true;
          requestAnimationFrame(renderApmPhotosWheelScroll);
        }
      }
      return;
    }

    e.preventDefault();
    
    if (!isWheelScrolling) {
      currentScrollY = window.scrollY;
      targetScrollY = window.scrollY;
    }

    const scrollDelta = e.deltaY * 0.95;
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    
    targetScrollY = Math.min(Math.max(0, targetScrollY + scrollDelta), maxScroll);
    
    if (!isWheelScrolling) {
      isWheelScrolling = true;
      requestAnimationFrame(renderWheelScroll);
    }
  }, { passive: false });
}

// INICIALIZACIÓN RESILIENTE SEGÚN ESTADO DEL DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPortfolio);
} else {
  initPortfolio();
}

// =======================================================
// MODAL DE FOTOGRAFÍA (SOLO IMAGEN EN GRANDE, SIN TEXTO)
// =======================================================
let currentActivePhotoSrc = null;

function openPhotoModal(src) {
  closeMenu();
  const photoModal = document.getElementById('photo-modal');
  const photoImg = document.getElementById('photo-modal-img');
  if (photoModal && photoImg) {
    photoImg.src = src;
    currentActivePhotoSrc = src;
    photoModal.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  }
}

function closePhotoModal() {
  const photoModal = document.getElementById('photo-modal');
  if (photoModal) {
    photoModal.classList.remove('is-active');
    currentActivePhotoSrc = null;
    const allModal = document.getElementById('all-projects-modal');
    if ((!allModal || !allModal.classList.contains('is-active')) && !currentActiveProjectId) {
      document.body.style.overflow = '';
      currentScrollY = window.scrollY;
      targetScrollY = window.scrollY;
      isWheelScrolling = false;
    }
  }
}

// =======================================================
// PANTALLA / MODAL DE TODOS LOS PROYECTOS (16:9 GRID)
// =======================================================
const ALL_PROJECTS_LIST = [
  { id: 'prof-hiba', type: 'prof', title: 'HIBA Academy Bay Area', sub: 'Educativo', img: 'assets/trabajos profesionales/hiba academy bay area/00_portada.webp' },
  { id: 'prof-issf', type: 'prof', title: 'International School of San Francisco', sub: 'Educativo', img: 'assets/trabajos profesionales/international school of san francisco/00_portada.webp' },
  { id: 'prof-odeon', type: 'prof', title: 'Teatro Odeón', sub: 'Cultural', img: 'assets/trabajos profesionales/teatro odeon/00_portada.webp' },
  { id: 'acad-1', type: 'acad', title: 'Espesores de Coexistencia', sub: 'Proyecto Urbano', img: 'assets/proyectos academicos/espesores de coexistencia/00_portada.webp' },
  { id: 'acad-2', type: 'acad', title: 'Parque Metropolitano Tecnológico', sub: 'Arquitectura IV', img: 'assets/proyectos academicos/parque metropolitano tecnologico/00_portada.webp' },
  { id: 'acad-3', type: 'acad', title: 'Centro Cultural Lobos', sub: 'Arquitectura III – Jury', img: 'assets/proyectos academicos/centro cultural lobos/00_portada.webp' },
  { id: 'acad-4', type: 'acad', title: 'Plaza bajo Viaducto', sub: 'Arquitectura II', img: 'assets/proyectos academicos/plaza sobre viaducto/00_portada.webp' },
  { id: 'acad-5', type: 'acad', title: 'Restaurante', sub: 'Arquitectura I', img: 'assets/proyectos academicos/restaurante/00_portada.webp' },
  { id: 'acad-6', type: 'acad', title: 'Vivienda Unifamiliar', sub: 'Arquitectura I', img: 'assets/proyectos academicos/vivienda unifamiliar/00_portada.webp' },
  { id: 'acad-7', type: 'acad', title: 'Plaza', sub: 'Arquitectura del Paisaje', img: 'assets/proyectos academicos/plaza/00_portada.webp' },
  { id: 'esc-1', type: 'esc', title: 'Intersticio: entre la apertura y la clausura', sub: 'Teoría de la Arquitectura', img: 'assets/escritos/intersticio entre la apertura y la clausura/00_portada.webp' },
  { id: 'esc-2', type: 'esc', title: 'Interpretación local de un fenómeno global', sub: 'Arquitectura, Arte y Diseño Argentino', img: 'assets/escritos/interpretación local de un fenómeno global/00_portada.webp' },
  { id: 'esc-4', type: 'esc', title: 'La Arquitectura como Propaganda Política', sub: 'Historia III', img: 'assets/escritos/la arquitectura como propaganda politica/00_portada.webp' },
  { id: 'esc-3', type: 'esc', title: 'Mixtura de Usos', sub: 'Arquitectura IV', img: 'assets/escritos/mixtura de usos/00_portada.webp' }
];

function renderAllProjectsGrid(filter = 'all') {
  const container = document.getElementById('all-projects-grid');
  if (!container) return;

  const filtered = filter === 'all' 
    ? ALL_PROJECTS_LIST 
    : ALL_PROJECTS_LIST.filter(p => p.type === filter);

  const isES = currentLang === 'ES';

  container.innerHTML = '';
  filtered.forEach(p => {
    const isEsc = p.type === 'esc';
    const projData = projectsData.find(d => d.id === p.id);
    const title = projData ? (isES ? projData.title_ES : projData.title_EN) : p.title;
    const sub = projData ? (isES ? projData.category_ES : projData.category_EN) : p.sub;

    const item = document.createElement('div');
    item.className = 'grid-card-item';
    item.setAttribute('data-id', p.id);
    item.id = `grid-${p.id}`;
    item.onclick = () => openProjectModal(p.id);

    item.innerHTML = `
      <div class="grid-card-thumb">
        <img class="grid-card-img" src="${p.img}" alt="${title}">
      </div>
      <div class="grid-card-meta">
        <h4 class="grid-card-title">${title}</h4>
        <p class="grid-card-subtitle">${sub}</p>
      </div>
    `;

    item.addEventListener('mouseenter', () => {
      const cursorDot = document.getElementById('cursor-dot');
      const cursorPillText = document.getElementById('cursor-pill-text');
      if (cursorDot) {
        cursorDot.classList.add('is-card-hover');
        if (cursorPillText) {
          if (isEsc) {
            cursorPillText.textContent = isES ? 'Leer Texto' : 'Read Text';
          } else {
            cursorPillText.textContent = isES ? 'Ver Proyecto' : 'View Project';
          }
        }
      }
    });

    item.addEventListener('mouseleave', () => {
      const cursorDot = document.getElementById('cursor-dot');
      if (cursorDot) {
        cursorDot.classList.remove('is-card-hover');
      }
    });

    container.appendChild(item);
  });

  const countEl = document.getElementById('apm-count');
  if (countEl) {
    countEl.textContent = `(${filtered.length})`;
  }
}

function openAllProjectsModal(filter = 'all') {
  closeMenu();
  const modal = document.getElementById('all-projects-modal');
  if (modal) {
    const content = modal.querySelector('.all-projects-content');
    if (content) content.scrollTop = 0;
    apmCurrentScrollY = 0;
    apmTargetScrollY = 0;
    isApmWheelScrolling = false;

    document.querySelectorAll('.apm-filter-btn').forEach(btn => {
      if (btn.getAttribute('data-filter') === filter) {
        btn.classList.add('is-active');
      } else {
        btn.classList.remove('is-active');
      }
    });

    const titleTextEl = document.querySelector('.apm-title-text') || document.querySelector('.apm-title');
    if (titleTextEl) {
      if (filter === 'prof') {
        titleTextEl.textContent = currentLang === 'ES' ? 'Trabajos Profesionales' : 'Professional Work';
      } else if (filter === 'acad') {
        titleTextEl.textContent = currentLang === 'ES' ? 'Proyectos Académicos' : 'Academic Projects';
      } else if (filter === 'esc') {
        titleTextEl.textContent = currentLang === 'ES' ? 'Escritos' : 'Essays & Writings';
      } else {
        titleTextEl.textContent = currentLang === 'ES' ? 'Todos los Proyectos' : 'All Projects';
      }
    }

    renderAllProjectsGrid(filter);
    modal.classList.add('is-active');
    document.body.classList.add('has-active-modal');
    document.body.style.overflow = 'hidden';
    if (typeof updateLateralScrollbar === 'function') {
      setTimeout(updateLateralScrollbar, 20);
    }
  }
}

function closeAllProjectsModal() {
  const modal = document.getElementById('all-projects-modal');
  if (modal) {
    modal.classList.remove('is-active');
    if (!currentActiveProjectId && (!currentActivePhotoSrc)) {
      document.body.classList.remove('has-active-modal');
      document.body.style.overflow = '';
      currentScrollY = window.scrollY;
      targetScrollY = window.scrollY;
      isWheelScrolling = false;
    }
  }
  if (typeof updateLateralScrollbar === 'function') {
    setTimeout(updateLateralScrollbar, 20);
  }
}

function filterAllProjects(filter, btn) {
  document.querySelectorAll('.apm-filter-btn').forEach(b => b.classList.remove('is-active'));
  if (btn) btn.classList.add('is-active');

  const titleTextEl = document.querySelector('.apm-title-text') || document.querySelector('.apm-title');
  if (titleTextEl) {
    if (filter === 'prof') {
      titleTextEl.textContent = currentLang === 'ES' ? 'Trabajos Profesionales' : 'Professional Work';
    } else if (filter === 'acad') {
      titleTextEl.textContent = currentLang === 'ES' ? 'Proyectos Académicos' : 'Academic Projects';
    } else if (filter === 'esc') {
      titleTextEl.textContent = currentLang === 'ES' ? 'Escritos' : 'Essays & Writings';
    } else {
      titleTextEl.textContent = currentLang === 'ES' ? 'Todos los Proyectos' : 'All Projects';
    }
  }

  renderAllProjectsGrid(filter);
}

// Exportación explícita al scope global para listeners inline HTML
window.openAllProjectsModal = openAllProjectsModal;
window.closeAllProjectsModal = closeAllProjectsModal;
window.filterAllProjects = filterAllProjects;
window.openProjectModal = openProjectModal;
window.closeProjectModal = closeProjectModal;
window.openPhotoModal = openPhotoModal;
window.closePhotoModal = closePhotoModal;

// =======================================================
// 3D ICOSAEDROS INTERACTIVOS EN LA PANTALLA DE INICIO (THREE.JS)
// Color base #f29197 con textura metálica facetada, órbita, rotación aleatoria y física de agarre/tiro
// =======================================================
function initHome3DIcosahedrons() {
  const canvas = document.getElementById('home-3d-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const homeScreen = document.getElementById('home-screen');
  if (!homeScreen) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.z = 15;

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Iluminación para realzar el brillo metálico y facetado #f29197
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
  scene.add(ambientLight);

  const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.4);
  dirLight1.position.set(8, 10, 8);
  scene.add(dirLight1);

  const dirLight2 = new THREE.DirectionalLight(0xffc5cb, 0.9);
  dirLight2.position.set(-8, -6, 5);
  scene.add(dirLight2);

  const pointLight = new THREE.PointLight(0xffffff, 1.2, 35);
  pointLight.position.set(0, 2, 8);
  scene.add(pointLight);

  // Material Metálico con color base #cd8d85 y facetado nítido (Flat Shading)
  const metalMaterial = new THREE.MeshStandardMaterial({
    color: 0xcd8d85, // Color solicitado #cd8d85
    metalness: 0.75, // Manteniendo metalness 0.75
    roughness: 0.18,
    flatShading: true
  });

  // 1. Icosaedro Grande (achicado)
  const geom1 = new THREE.IcosahedronGeometry(1.16, 0);
  const ico1 = new THREE.Mesh(geom1, metalMaterial.clone());
  scene.add(ico1);

  // 2. Icosaedro Mediano (achicado)
  const geom2 = new THREE.IcosahedronGeometry(0.88, 0);
  const ico2 = new THREE.Mesh(geom2, metalMaterial.clone());
  scene.add(ico2);

  // Estado físico y de órbita de los 2 icosaedros
  const bodies = [
    {
      mesh: ico1,
      startPos: new THREE.Vector3(-18, 14, 0),
      targetAnchor: new THREE.Vector3(-4.6, 1.8, 0),
      orbitAnchor: new THREE.Vector3(-18, 14, 0),
      orbitRadiusX: 1.15,
      orbitRadiusY: 0.75,
      orbitSpeed: 0.75,
      orbitPhase: 0,
      rotSpeedX: 0.009,
      rotSpeedY: 0.013,
      rotSpeedZ: 0.006,
      vx: 0,
      vy: 0,
      spinX: 0,
      spinY: 0,
      isGrabbed: false
    },
    {
      mesh: ico2,
      startPos: new THREE.Vector3(18, -12, 0),
      targetAnchor: new THREE.Vector3(4.8, -0.6, 0),
      orbitAnchor: new THREE.Vector3(18, -12, 0),
      orbitRadiusX: 0.95,
      orbitRadiusY: 0.65,
      orbitSpeed: 0.60,
      orbitPhase: 2.3,
      rotSpeedX: 0.012,
      rotSpeedY: 0.008,
      rotSpeedZ: 0.010,
      vx: 0,
      vy: 0,
      spinX: 0,
      spinY: 0,
      isGrabbed: false
    }
  ];

  // Posición inicial fuera de pantalla
  ico1.position.set(-18, 14, 0);
  ico2.position.set(18, -12, 0);

  // Raycasting y Grab / Throw Mechanics
  const raycaster = new THREE.Raycaster();
  const mouseNdc = new THREE.Vector2(-999, -999);
  let activeGrab = null;
  let grabPlaneZ = 0;
  const grabOffset = new THREE.Vector3();
  const pointerHistory = [];

  function getFrustumBounds() {
    const vFOV = THREE.MathUtils.degToRad(camera.fov);
    const height = 2 * Math.tan(vFOV / 2) * camera.position.z;
    const width = height * camera.aspect;
    return {
      minX: -width / 2 + 1.2,
      maxX: width / 2 - 1.2,
      minY: -height / 2 + 1.2,
      maxY: height / 2 - 1.2
    };
  }

  function getMouseWorldPos(clientX, clientY, zPlane = 0) {
    const rect = canvas.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((clientY - rect.top) / rect.height) * 2 + 1;
    const vector = new THREE.Vector3(x, y, 0.5);
    vector.unproject(camera);
    const dir = vector.sub(camera.position).normalize();
    const distance = (zPlane - camera.position.z) / dir.z;
    return camera.position.clone().add(dir.multiplyScalar(distance));
  }

  function onPointerDown(e) {
    if (e.target !== canvas && !e.target.closest('#home-screen')) return;
    const rect = canvas.getBoundingClientRect();
    mouseNdc.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouseNdc.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouseNdc, camera);
    const meshes = bodies.map(b => b.mesh);
    const intersects = raycaster.intersectObjects(meshes);

    if (intersects.length > 0) {
      const hitMesh = intersects[0].object;
      const hitBody = bodies.find(b => b.mesh === hitMesh);
      if (hitBody) {
        activeGrab = hitBody;
        hitBody.isGrabbed = true;
        hitBody.vx = 0;
        hitBody.vy = 0;
        hitBody.spinX = 0;
        hitBody.spinY = 0;

        const worldHit = intersects[0].point;
        grabPlaneZ = hitBody.mesh.position.z;
        grabOffset.copy(hitBody.mesh.position).sub(worldHit);

        pointerHistory.length = 0;
        pointerHistory.push({
          x: hitBody.mesh.position.x,
          y: hitBody.mesh.position.y,
          t: performance.now()
        });
      }
    }
  }

  function onPointerMove(e) {
    const rect = canvas.getBoundingClientRect();
    mouseNdc.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouseNdc.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    if (activeGrab) {
      const worldPos = getMouseWorldPos(e.clientX, e.clientY, grabPlaneZ);
      const targetPos = worldPos.add(grabOffset);

      const dx = targetPos.x - activeGrab.mesh.position.x;
      const dy = targetPos.y - activeGrab.mesh.position.y;

      activeGrab.mesh.position.x = targetPos.x;
      activeGrab.mesh.position.y = targetPos.y;

      // Rotación reactiva al arrastrar
      activeGrab.mesh.rotation.x -= dy * 0.45;
      activeGrab.mesh.rotation.y += dx * 0.45;

      const now = performance.now();
      pointerHistory.push({ x: targetPos.x, y: targetPos.y, t: now });
      while (pointerHistory.length > 8) pointerHistory.shift();
    } else {
      // Destello specular reactivo al cursor
      const worldPos = getMouseWorldPos(e.clientX, e.clientY, 4);
      pointLight.position.x = worldPos.x;
      pointLight.position.y = worldPos.y;
    }
  }

  function onPointerUp() {
    if (activeGrab) {
      if (pointerHistory.length >= 2) {
        const oldest = pointerHistory[0];
        const newest = pointerHistory[pointerHistory.length - 1];
        const dt = Math.max(1, (newest.t - oldest.t) / 1000);
        let vx = (newest.x - oldest.x) / dt * 0.016;
        let vy = (newest.y - oldest.y) / dt * 0.016;

        // Limitar velocidad de tiro máxima
        const maxV = 0.42;
        const speed = Math.hypot(vx, vy);
        if (speed > maxV) {
          vx = (vx / speed) * maxV;
          vy = (vy / speed) * maxV;
        }

        activeGrab.vx = vx;
        activeGrab.vy = vy;
        activeGrab.spinX = vy * 0.35;
        activeGrab.spinY = vx * 0.35;
      }
      activeGrab.orbitAnchor.copy(activeGrab.mesh.position);
      activeGrab.isGrabbed = false;
      activeGrab = null;
    }
  }

  window.addEventListener('pointerdown', onPointerDown, { passive: true });
  window.addEventListener('pointermove', onPointerMove, { passive: true });
  window.addEventListener('pointerup', onPointerUp, { passive: true });
  window.addEventListener('pointercancel', onPointerUp, { passive: true });

  function updateCameraAndCanvas() {
    const isMobile = window.innerWidth <= 768;
    const w = canvas.parentElement ? canvas.parentElement.clientWidth : window.innerWidth;
    const h = isMobile ? 320 : (canvas.parentElement ? canvas.parentElement.clientHeight : window.innerHeight);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);

    if (isMobile) {
      bodies[0].targetAnchor.set(-2.0, 0.5, 0);
      bodies[1].targetAnchor.set(2.0, -0.4, 0);
      bodies[0].orbitRadiusX = 0.65;
      bodies[0].orbitRadiusY = 0.40;
      bodies[1].orbitRadiusX = 0.58;
      bodies[1].orbitRadiusY = 0.35;
      ico1.scale.set(1.05, 1.05, 1.05);
      ico2.scale.set(1.05, 1.05, 1.05);
    } else {
      bodies[0].targetAnchor.set(-4.6, 1.8, 0);
      bodies[1].targetAnchor.set(4.8, -0.6, 0);
      bodies[0].orbitRadiusX = 1.15;
      bodies[0].orbitRadiusY = 0.75;
      bodies[1].orbitRadiusX = 0.95;
      bodies[1].orbitRadiusY = 0.65;
      ico1.scale.set(1, 1, 1);
      ico2.scale.set(1, 1, 1);
    }
  }

  updateCameraAndCanvas();
  window.addEventListener('resize', updateCameraAndCanvas);

  const startTime = performance.now();

  function animate() {
    requestAnimationFrame(animate);

    const now = performance.now();
    const elapsed = (now - startTime) / 1000;

    // Animación de entrada suave con curva cúbica desde afuera de la pantalla
    const introDuration = 1.8;
    const progress = Math.min(1, elapsed / introDuration);
    const easeOutCubic = 1 - Math.pow(1 - progress, 3);

    const bounds = getFrustumBounds();

    bodies.forEach(b => {
      if (b.isGrabbed) return;

      const speed = Math.hypot(b.vx, b.vy);

      if (speed > 0.003) {
        // Física de lanzamiento / inercia
        b.mesh.position.x += b.vx;
        b.mesh.position.y += b.vy;

        b.mesh.rotation.x += b.spinX;
        b.mesh.rotation.y += b.spinY;
        b.mesh.rotation.z += (b.spinX + b.spinY) * 0.2;

        // Fricción
        b.vx *= 0.965;
        b.vy *= 0.965;
        b.spinX *= 0.97;
        b.spinY *= 0.97;

        // Rebote elástico contra los bordes de la pantalla
        if (b.mesh.position.x > bounds.maxX) {
          b.mesh.position.x = bounds.maxX;
          b.vx = -Math.abs(b.vx) * 0.78;
        } else if (b.mesh.position.x < bounds.minX) {
          b.mesh.position.x = bounds.minX;
          b.vx = Math.abs(b.vx) * 0.78;
        }

        if (b.mesh.position.y > bounds.maxY) {
          b.mesh.position.y = bounds.maxY;
          b.vy = -Math.abs(b.vy) * 0.78;
        } else if (b.mesh.position.y < bounds.minY) {
          b.mesh.position.y = bounds.minY;
          b.vy = Math.abs(b.vy) * 0.78;
        }

        b.orbitAnchor.copy(b.mesh.position);
      } else {
        // Si aún está en entrada, interpola hacia targetAnchor
        if (progress < 1) {
          b.orbitAnchor.lerpVectors(b.startPos, b.targetAnchor, easeOutCubic);
        }

        // Órbita y flotación armónica
        const ox = Math.sin(elapsed * b.orbitSpeed + b.orbitPhase) * b.orbitRadiusX;
        const oy = Math.cos(elapsed * (b.orbitSpeed * 1.2) + b.orbitPhase) * b.orbitRadiusY;

        b.mesh.position.x = b.orbitAnchor.x + ox;
        b.mesh.position.y = b.orbitAnchor.y + oy;

        // Rotación continua 3D
        b.mesh.rotation.x += b.rotSpeedX;
        b.mesh.rotation.y += b.rotSpeedY;
        b.mesh.rotation.z += b.rotSpeedZ;
      }
    });

    renderer.render(scene, camera);
  }

  animate();
}

// =======================================================
// LISTA COMPLETA DE FOTOGRAFÍAS (62 ASSETS WEBP CONVERTIDOS)
// =======================================================
const ALL_PHOTOS_LIST = [
  { id: 'foto-01', src: 'assets/fotografia/20210828_205213.webp', alt: 'Fotografía Agustín Labajian - 20210828_205213' },
  { id: 'foto-02', src: 'assets/fotografia/20210831_130348.webp', alt: 'Fotografía Agustín Labajian - 20210831_130348' },
  { id: 'foto-03', src: 'assets/fotografia/20210902_203333.webp', alt: 'Fotografía Agustín Labajian - 20210902_203333' },
  { id: 'foto-04', src: 'assets/fotografia/20210904_122031~2.webp', alt: 'Fotografía Agustín Labajian - 20210904_122031~2' },
  { id: 'foto-05', src: 'assets/fotografia/20210906_162740.webp', alt: 'Fotografía Agustín Labajian - 20210906_162740' },
  { id: 'foto-06', src: 'assets/fotografia/Catedral.webp', alt: 'Fotografía Agustín Labajian - Catedral' },
  { id: 'foto-07', src: 'assets/fotografia/Estatua de la libertad.webp', alt: 'Fotografía Agustín Labajian - Estatua de la libertad' },
  { id: 'foto-08', src: 'assets/fotografia/Ex banco de Londres.webp', alt: 'Fotografía Agustín Labajian - Ex banco de Londres' },
  { id: 'foto-09', src: 'assets/fotografia/Iglesia.webp', alt: 'Fotografía Agustín Labajian - Iglesia' },
  { id: 'foto-10', src: 'assets/fotografia/IMG_0101~2.webp', alt: 'Fotografía Agustín Labajian - IMG_0101~2' },
  { id: 'foto-11', src: 'assets/fotografia/IMG_0184~2.webp', alt: 'Fotografía Agustín Labajian - IMG_0184~2' },
  { id: 'foto-12', src: 'assets/fotografia/IMG_20180907_164408832_HDR.webp', alt: 'Fotografía Agustín Labajian - IMG_20180907_164408832_HDR' },
  { id: 'foto-13', src: 'assets/fotografia/IMG_20180911_100608391_HDR.webp', alt: 'Fotografía Agustín Labajian - IMG_20180911_100608391_HDR' },
  { id: 'foto-14', src: 'assets/fotografia/IMG_20210904_115609.webp', alt: 'Fotografía Agustín Labajian - IMG_20210904_115609' },
  { id: 'foto-15', src: 'assets/fotografia/IMG_20210904_115656.webp', alt: 'Fotografía Agustín Labajian - IMG_20210904_115656' },
  { id: 'foto-16', src: 'assets/fotografia/IMG_20210904_115738.webp', alt: 'Fotografía Agustín Labajian - IMG_20210904_115738' },
  { id: 'foto-17', src: 'assets/fotografia/IMG_20210905_115958.webp', alt: 'Fotografía Agustín Labajian - IMG_20210905_115958' },
  { id: 'foto-18', src: 'assets/fotografia/IMG_20210905_124206.webp', alt: 'Fotografía Agustín Labajian - IMG_20210905_124206' },
  { id: 'foto-19', src: 'assets/fotografia/IMG_20210905_181342.webp', alt: 'Fotografía Agustín Labajian - IMG_20210905_181342' },
  { id: 'foto-20', src: 'assets/fotografia/IMG_20210905_181443.webp', alt: 'Fotografía Agustín Labajian - IMG_20210905_181443' },
  { id: 'foto-21', src: 'assets/fotografia/IMG_20210905_181538.webp', alt: 'Fotografía Agustín Labajian - IMG_20210905_181538' },
  { id: 'foto-22', src: 'assets/fotografia/IMG-20210830-WA0104~2.webp', alt: 'Fotografía Agustín Labajian - IMG-20210830-WA0104~2' },
  { id: 'foto-23', src: 'assets/fotografia/IMG-20260105-WA0130.webp', alt: 'Fotografía Agustín Labajian - IMG-20260105-WA0130' },
  { id: 'foto-24', src: 'assets/fotografia/IMG-20260106-WA0002.webp', alt: 'Fotografía Agustín Labajian - IMG-20260106-WA0002' },
  { id: 'foto-25', src: 'assets/fotografia/IMG-20260107-WA0129.webp', alt: 'Fotografía Agustín Labajian - IMG-20260107-WA0129' },
  { id: 'foto-26', src: 'assets/fotografia/IMG-20260110-WA0319.webp', alt: 'Fotografía Agustín Labajian - IMG-20260110-WA0319' },
  { id: 'foto-27', src: 'assets/fotografia/IMG-20260114-WA0275.webp', alt: 'Fotografía Agustín Labajian - IMG-20260114-WA0275' },
  { id: 'foto-28', src: 'assets/fotografia/IMG-20260114-WA0321.webp', alt: 'Fotografía Agustín Labajian - IMG-20260114-WA0321' },
  { id: 'foto-29', src: 'assets/fotografia/IMG-20260114-WA0400.webp', alt: 'Fotografía Agustín Labajian - IMG-20260114-WA0400' },
  { id: 'foto-30', src: 'assets/fotografia/IMG-20260114-WA0414.webp', alt: 'Fotografía Agustín Labajian - IMG-20260114-WA0414' },
  { id: 'foto-31', src: 'assets/fotografia/IMG-20260115-WA0106.webp', alt: 'Fotografía Agustín Labajian - IMG-20260115-WA0106' },
  { id: 'foto-32', src: 'assets/fotografia/IMG-20260115-WA0287.webp', alt: 'Fotografía Agustín Labajian - IMG-20260115-WA0287' },
  { id: 'foto-33', src: 'assets/fotografia/motion_photo_4574619339018186189.webp', alt: 'Fotografía Agustín Labajian - motion_photo_4574619339018186189' },
  { id: 'foto-34', src: 'assets/fotografia/Palacio agua.webp', alt: 'Fotografía Agustín Labajian - Palacio agua' },
  { id: 'foto-35', src: 'assets/fotografia/PXL_20210908_142741852.webp', alt: 'Fotografía Agustín Labajian - PXL_20210908_142741852' },
  { id: 'foto-36', src: 'assets/fotografia/PXL_20220414_141137684.MP.webp', alt: 'Fotografía Agustín Labajian - PXL_20220414_141137684.MP' },
  { id: 'foto-37', src: 'assets/fotografia/PXL_20220415_140716228.MP~2.webp', alt: 'Fotografía Agustín Labajian - PXL_20220415_140716228.MP~2' },
  { id: 'foto-38', src: 'assets/fotografia/PXL_20220415_205455379~2.webp', alt: 'Fotografía Agustín Labajian - PXL_20220415_205455379~2' },
  { id: 'foto-39', src: 'assets/fotografia/PXL_20221001_195212139.MP.webp', alt: 'Fotografía Agustín Labajian - PXL_20221001_195212139.MP' },
  { id: 'foto-40', src: 'assets/fotografia/PXL_20221002_213448323.MP.webp', alt: 'Fotografía Agustín Labajian - PXL_20221002_213448323.MP' },
  { id: 'foto-41', src: 'assets/fotografia/PXL_20230323_162826117.MP.webp', alt: 'Fotografía Agustín Labajian - PXL_20230323_162826117.MP' },
  { id: 'foto-42', src: 'assets/fotografia/PXL_20230409_022232826.MP-01.webp', alt: 'Fotografía Agustín Labajian - PXL_20230409_022232826.MP-01' },
  { id: 'foto-43', src: 'assets/fotografia/PXL_20230421_191503570.MP.webp', alt: 'Fotografía Agustín Labajian - PXL_20230421_191503570.MP' },
  { id: 'foto-44', src: 'assets/fotografia/PXL_20230429_152005671.MP.webp', alt: 'Fotografía Agustín Labajian - PXL_20230429_152005671.MP' },
  { id: 'foto-45', src: 'assets/fotografia/PXL_20230731_190214495.MP.webp', alt: 'Fotografía Agustín Labajian - PXL_20230731_190214495.MP' },
  { id: 'foto-46', src: 'assets/fotografia/PXL_20230731_212502425.MP.webp', alt: 'Fotografía Agustín Labajian - PXL_20230731_212502425.MP' },
  { id: 'foto-47', src: 'assets/fotografia/PXL_20230731_212720773.MP.webp', alt: 'Fotografía Agustín Labajian - PXL_20230731_212720773.MP' },
  { id: 'foto-48', src: 'assets/fotografia/PXL_20230731_213144573.MP.webp', alt: 'Fotografía Agustín Labajian - PXL_20230731_213144573.MP' },
  { id: 'foto-49', src: 'assets/fotografia/PXL_20231006_171923194.MP.webp', alt: 'Fotografía Agustín Labajian - PXL_20231006_171923194.MP' },
  { id: 'foto-50', src: 'assets/fotografia/PXL_20231006_173247157.MP.webp', alt: 'Fotografía Agustín Labajian - PXL_20231006_173247157.MP' },
  { id: 'foto-51', src: 'assets/fotografia/PXL_20231006_204234461.MP.webp', alt: 'Fotografía Agustín Labajian - PXL_20231006_204234461.MP' },
  { id: 'foto-52', src: 'assets/fotografia/PXL_20240112_223720302.MP~2.webp', alt: 'Fotografía Agustín Labajian - PXL_20240112_223720302.MP~2' },
  { id: 'foto-53', src: 'assets/fotografia/PXL_20240329_191708839.MP~2.webp', alt: 'Fotografía Agustín Labajian - PXL_20240329_191708839.MP~2' },
  { id: 'foto-54', src: 'assets/fotografia/PXL_20240401_182547656.MP.webp', alt: 'Fotografía Agustín Labajian - PXL_20240401_182547656.MP' },
  { id: 'foto-55', src: 'assets/fotografia/PXL_20240401_211450454.MP~4.webp', alt: 'Fotografía Agustín Labajian - PXL_20240401_211450454.MP~4' },
  { id: 'foto-56', src: 'assets/fotografia/PXL_20240423_205916721.webp', alt: 'Fotografía Agustín Labajian - PXL_20240423_205916721' },
  { id: 'foto-57', src: 'assets/fotografia/PXL_20240423_230142697.MP.webp', alt: 'Fotografía Agustín Labajian - PXL_20240423_230142697.MP' },
  { id: 'foto-58', src: 'assets/fotografia/PXL_20240506_140349300.MP.webp', alt: 'Fotografía Agustín Labajian - PXL_20240506_140349300.MP' },
  { id: 'foto-59', src: 'assets/fotografia/PXL_20240506_140833411.MP.webp', alt: 'Fotografía Agustín Labajian - PXL_20240506_140833411.MP' },
  { id: 'foto-60', src: 'assets/fotografia/PXL_20250530_210227627.MP~2.webp', alt: 'Fotografía Agustín Labajian - PXL_20250530_210227627.MP~2' },
  { id: 'foto-61', src: 'assets/fotografia/PXL_20260531_200422977.MP.webp', alt: 'Fotografía Agustín Labajian - PXL_20260531_200422977.MP' },
  { id: 'foto-62', src: 'assets/fotografia/S7300248.webp', alt: 'Fotografía Agustín Labajian - S7300248' }
];

/**
 * Renderiza de forma dinámica y aleatoria 9 fotografías en la grilla de la página de inicio
 */
function renderHomePhotosRandomGrid() {
  const container = document.getElementById('home-photo-grid') || document.querySelector('#sec-fotografia .photo-mosaic-grid');
  if (!container || ALL_PHOTOS_LIST.length === 0) return;

  // Barajar copia de todas las fotos disponibles (Fisher-Yates shuffle)
  const shuffled = [...ALL_PHOTOS_LIST];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  // Tomar exactamente 9 fotos
  const selectedPhotos = shuffled.slice(0, Math.min(9, shuffled.length));

  container.innerHTML = '';
  selectedPhotos.forEach((p, idx) => {
    const card = document.createElement('div');
    card.className = 'photo-card';
    card.id = `foto-home-${idx + 1}`;
    card.onclick = () => openPhotoModal(p.src);

    card.innerHTML = `<img class="photo-img" src="${p.src}" alt="${p.alt}" loading="lazy">`;

    card.addEventListener('mouseenter', () => {
      const cursorDot = document.getElementById('cursor-dot');
      const cursorPillText = document.getElementById('cursor-pill-text');
      if (cursorDot) {
        cursorDot.classList.add('is-card-hover');
        if (cursorPillText) {
          cursorPillText.textContent = currentLang === 'ES' ? 'Ver Foto' : 'View Photo';
        }
      }
    });

    card.addEventListener('mouseleave', () => {
      const cursorDot = document.getElementById('cursor-dot');
      if (cursorDot) {
        cursorDot.classList.remove('is-card-hover');
      }
    });

    container.appendChild(card);
  });
}

function renderAllPhotosGrid() {
  const container = document.getElementById('all-photos-grid');
  if (!container) return;

  container.innerHTML = '';
  ALL_PHOTOS_LIST.forEach((p, idx) => {
    const item = document.createElement('div');
    item.className = 'photo-card';
    item.setAttribute('data-id', p.id);
    item.id = `all-foto-${idx + 1}`;
    item.onclick = () => openPhotoModal(p.src);

    item.innerHTML = `<img class="photo-img" src="${p.src}" alt="${p.alt}" loading="lazy">`;

    item.addEventListener('mouseenter', () => {
      const cursorDot = document.getElementById('cursor-dot');
      const cursorPillText = document.getElementById('cursor-pill-text');
      if (cursorDot) {
        cursorDot.classList.add('is-card-hover');
        if (cursorPillText) {
          cursorPillText.textContent = currentLang === 'ES' ? 'Ver Foto' : 'View Photo';
        }
      }
    });

    item.addEventListener('mouseleave', () => {
      const cursorDot = document.getElementById('cursor-dot');
      if (cursorDot) {
        cursorDot.classList.remove('is-card-hover');
      }
    });

    container.appendChild(item);
  });

  const countEl = document.getElementById('all-photos-count');
  if (countEl) {
    countEl.textContent = `(${ALL_PHOTOS_LIST.length})`;
  }
}

function openAllPhotosModal() {
  closeMenu();
  const modal = document.getElementById('all-photos-modal');
  if (modal) {
    const content = modal.querySelector('.all-projects-content');
    if (content) content.scrollTop = 0;
    apmPhotosCurrentScrollY = 0;
    apmPhotosTargetScrollY = 0;
    isApmPhotosWheelScrolling = false;

    renderAllPhotosGrid();
    modal.classList.add('is-active');
    document.body.classList.add('has-active-modal');
    document.body.style.overflow = 'hidden';
    if (typeof updateLateralScrollbar === 'function') {
      setTimeout(updateLateralScrollbar, 20);
    }
  }
}

function closeAllPhotosModal() {
  const modal = document.getElementById('all-photos-modal');
  if (modal) {
    modal.classList.remove('is-active');
    const allProjectsModal = document.getElementById('all-projects-modal');
    const isProjectsModalActive = allProjectsModal && allProjectsModal.classList.contains('is-active');
    if (!currentActiveProjectId && !isProjectsModalActive && !currentActivePhotoSrc) {
      document.body.classList.remove('has-active-modal');
      document.body.style.overflow = '';
      currentScrollY = window.scrollY;
      targetScrollY = window.scrollY;
      isWheelScrolling = false;
    }
    if (typeof updateLateralScrollbar === 'function') {
      setTimeout(updateLateralScrollbar, 20);
    }
  }
}

window.openAllPhotosModal = openAllPhotosModal;
window.closeAllPhotosModal = closeAllPhotosModal;
window.renderHomePhotosRandomGrid = renderHomePhotosRandomGrid;