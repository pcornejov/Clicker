export interface RegionPhoto {
  landmark: string
  imageUrl: string
  commonsPageUrl: string
  license: string
  author: string
}

/**
 * One real, freely-licensed photo per Chilean region, showing its most
 * iconic landmark. Sourced from Wikimedia Commons (each URL verified with a
 * direct HTTP request before being added here). Purely a presentational
 * lookup keyed by option name — the data model has no image field, so a
 * future battle on a different topic is unaffected.
 */
export const REGION_PHOTOS: Record<string, RegionPhoto> = {
  'Arica y Parinacota': {
    landmark: 'Lago Chungará y volcanes Payachatas',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Lago_Chungar%C3%A1_y_Nevados_de_Payachatas.jpg/960px-Lago_Chungar%C3%A1_y_Nevados_de_Payachatas.jpg',
    commonsPageUrl:
      'https://commons.wikimedia.org/wiki/File:Lago_Chungar%C3%A1_y_Nevados_de_Payachatas.jpg',
    license: 'CC BY-SA 4.0',
    author: 'Pablo Montecinos',
  },
  Tarapacá: {
    landmark: 'Oficina salitrera Humberstone',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Oficinas_salitreras_de_Humberstone_y_Santa_Laura%2C_Chile%2C_2016-02-11%2C_DD_25.jpg/960px-Oficinas_salitreras_de_Humberstone_y_Santa_Laura%2C_Chile%2C_2016-02-11%2C_DD_25.jpg',
    commonsPageUrl:
      'https://commons.wikimedia.org/wiki/File:Oficinas_salitreras_de_Humberstone_y_Santa_Laura,_Chile,_2016-02-11,_DD_25.jpg',
    license: 'CC BY-SA 4.0',
    author: 'Diego Delso',
  },
  Antofagasta: {
    landmark: 'La Portada',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Monumento_Nacional_La_Portada%2C_Antofagasta-Chile.JPG/960px-Monumento_Nacional_La_Portada%2C_Antofagasta-Chile.JPG',
    commonsPageUrl:
      'https://commons.wikimedia.org/wiki/File:Monumento_Nacional_La_Portada,_Antofagasta-Chile.JPG',
    license: 'CC BY-SA 3.0',
    author: 'G.vera',
  },
  Atacama: {
    landmark: 'Valle de la Luna',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Valle_de_la_Luna%2C_San_Pedro_de_Atacama%2C_Chile%2C_2016-02-01%2C_DD_152.JPG/960px-Valle_de_la_Luna%2C_San_Pedro_de_Atacama%2C_Chile%2C_2016-02-01%2C_DD_152.JPG',
    commonsPageUrl:
      'https://commons.wikimedia.org/wiki/File:Valle_de_la_Luna,_San_Pedro_de_Atacama,_Chile,_2016-02-01,_DD_152.JPG',
    license: 'CC BY-SA 4.0',
    author: 'Diego Delso',
  },
  Coquimbo: {
    landmark: 'Valle del Elqui',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Valle_del_Elqui_1.JPG/960px-Valle_del_Elqui_1.JPG',
    commonsPageUrl: 'https://commons.wikimedia.org/wiki/File:Valle_del_Elqui_1.JPG',
    license: 'CC BY-SA 3.0',
    author: 'Menaqs',
  },
  Valparaíso: {
    landmark: 'Cerros y puerto de Valparaíso',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/La_ciudad_de_Valpara%C3%ADso_desde_el_Cerro_Artiller%C3%ADa%2C_Chile_2019.jpg/960px-La_ciudad_de_Valpara%C3%ADso_desde_el_Cerro_Artiller%C3%ADa%2C_Chile_2019.jpg',
    commonsPageUrl:
      'https://commons.wikimedia.org/wiki/File:La_ciudad_de_Valpara%C3%ADso_desde_el_Cerro_Artiller%C3%ADa,_Chile_2019.jpg',
    license: 'CC BY-SA 4.0',
    author: 'Carlos Teixidor Cadenas',
  },
  Metropolitana: {
    landmark: 'Santiago desde el Cerro San Cristóbal',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Sanhattan_desde_el_Cerro_San_Crist%C3%B3bal%2C_Santiago_de_Chile.jpg/960px-Sanhattan_desde_el_Cerro_San_Crist%C3%B3bal%2C_Santiago_de_Chile.jpg',
    commonsPageUrl:
      'https://commons.wikimedia.org/wiki/File:Sanhattan_desde_el_Cerro_San_Crist%C3%B3bal,_Santiago_de_Chile.jpg',
    license: 'CC BY-SA 4.0',
    author: 'AlexVanHeusen',
  },
  "O'Higgins": {
    landmark: 'Viñedos del Valle de Colchagua',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Vi%C3%B1a_Santa_Rita%2C_Valle_de_Colchagua.jpg/960px-Vi%C3%B1a_Santa_Rita%2C_Valle_de_Colchagua.jpg',
    commonsPageUrl:
      'https://commons.wikimedia.org/wiki/File:Vi%C3%B1a_Santa_Rita,_Valle_de_Colchagua.jpg',
    license: 'CC BY-SA 4.0',
    author: 'Jmiguelbarros',
  },
  Maule: {
    landmark: 'Radal Siete Tazas',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Parque_Nacional_Radal_Siete_Tazas_%2813%29.jpg/960px-Parque_Nacional_Radal_Siete_Tazas_%2813%29.jpg',
    commonsPageUrl:
      'https://commons.wikimedia.org/wiki/File:Parque_Nacional_Radal_Siete_Tazas_(13).jpg',
    license: 'CC BY-SA 4.0',
    author: 'Manuel Repol',
  },
  Ñuble: {
    landmark: 'Nevados de Chillán',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Chillan_y_Nevados_de_Chillan_1.jpg/960px-Chillan_y_Nevados_de_Chillan_1.jpg',
    commonsPageUrl: 'https://commons.wikimedia.org/wiki/File:Chillan_y_Nevados_de_Chillan_1.jpg',
    license: 'CC BY-SA 4.0',
    author: 'Dropus',
  },
  Biobío: {
    landmark: 'Salto del Laja',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Salto_del_Laja.jpg/960px-Salto_del_Laja.jpg',
    commonsPageUrl: 'https://commons.wikimedia.org/wiki/File:Salto_del_Laja.jpg',
    license: 'Dominio público',
    author: 'Warko',
  },
  Araucanía: {
    landmark: 'Volcán y Lago Villarrica',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/J25_045_Lago%2C_Volc%C3%A1n_Villarrica.jpg/960px-J25_045_Lago%2C_Volc%C3%A1n_Villarrica.jpg',
    commonsPageUrl:
      'https://commons.wikimedia.org/wiki/File:J25_045_Lago,_Volc%C3%A1n_Villarrica.jpg',
    license: 'CC BY-SA 4.0',
    author: 'Falk2',
  },
  'Los Ríos': {
    landmark: 'Valdivia',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Muelle_Mirador%2C_Valdivia%2C_20190216_-_10.jpg/960px-Muelle_Mirador%2C_Valdivia%2C_20190216_-_10.jpg',
    commonsPageUrl:
      'https://commons.wikimedia.org/wiki/File:Muelle_Mirador,_Valdivia,_20190216_-_10.jpg',
    license: 'CC BY-SA 4.0',
    author: 'Carlos Figueroa Rojas',
  },
  'Los Lagos': {
    landmark: 'Volcán Osorno y Saltos de Petrohué',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Volcan_Osorno_and_Saltos_de_Petrohue.jpg/960px-Volcan_Osorno_and_Saltos_de_Petrohue.jpg',
    commonsPageUrl:
      'https://commons.wikimedia.org/wiki/File:Volcan_Osorno_and_Saltos_de_Petrohue.jpg',
    license: 'CC BY 3.0',
    author: 'Silvio Rossi',
  },
  Aysén: {
    landmark: 'Capillas de Mármol',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Catedral_de_M%C3%A1rmol_1.jpg/960px-Catedral_de_M%C3%A1rmol_1.jpg',
    commonsPageUrl: 'https://commons.wikimedia.org/wiki/File:Catedral_de_M%C3%A1rmol_1.jpg',
    license: 'CC BY-SA 4.0',
    author: 'Manxuc',
  },
  Magallanes: {
    landmark: 'Torres del Paine',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Towers_of_Paine_-_Torres_del_Paine_National_Park_13.jpg/960px-Towers_of_Paine_-_Torres_del_Paine_National_Park_13.jpg',
    commonsPageUrl:
      'https://commons.wikimedia.org/wiki/File:Towers_of_Paine_-_Torres_del_Paine_National_Park_13.jpg',
    license: 'CC BY-SA 4.0',
    author: 'Thomas Fuhrmann',
  },
}

export function getRegionPhoto(name: string): RegionPhoto | undefined {
  return REGION_PHOTOS[name]
}
