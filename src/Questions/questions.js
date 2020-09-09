let listOfQuestionsWithoutId = [
  {
    question: '¿En cual de estos equipos no jugó Nuno Gomes? ',
    answers: [
      'Porto',
      'Blackburn Rovers',
      'Fiorentina'
    ],
    correct: 0,
    difficulty: 'High',
    creator: 103,
  },
  {
    question: '¿Quién ganó el Balón de Oro otorgado por la FIFA en 1992? ',
    answers: [
      'Mathias Sammer',
      'Marco Van Basten',
      'Lothar Matthaus',
      'Ruud Gullit',
    ],
    correct: 1,
    difficulty: 'Medium',
    creator: 103,
  },
  {
    question: '¿Cuál de estos apodos representa al Club Atlético Platense? ',
    answers: [
      'El Bicho',
      'El Bohemio',
      'El Calamar'
    ],
    correct: 2,
    difficulty: 'Low',
    creator: 103,
  },
  {
    question: 'Durante 12 años, Emilio Butragueño jugó para el mismo club en España. ¿Cuál era? ',
    answers: [
      'Atlético Madrid',
      'Real Madrid',
      'Barcelona'
    ],
    correct: 1,
    difficulty: 'Medium',
    creator: 103,
  },
  {
    question: 'De estos equipos, ¿en cual fue el primero que jugó Zlatan Ibrahimovic ? ',
    answers: [
      'Juventus',
      'Inter',
      'Milán'
    ],
    correct: 0,
    difficulty: 'Low',
    creator: 103,
  },
  {
    question: 'Uno de estos jugadores, nunca ganó la Champions League. ¿Quién es? ',
    answers: [
      'Ronaldo Nazario Lima',
      'Rui Costa',
      'David Beckham',
      'Fernando Hierro',
      'John Terry',
    ],
    correct: 0,
    difficulty: 'Medium',
    creator: 103,
  },
  {
    question: 'En el Mundial de Corea-Japón 2002, Arabia Saudita fue derrotado 8-0 en su debut. ¿Quién fue el verdugo? ',
    answers: [
      'Brasil',
      'España',
      'Alemania',
      'Francia',
    ],
    correct: 2,
    difficulty: 'Medium',
    creator: 103,
  },
  {
    question: 'En Irlanda, desde 1922 que el fútbol es profesional. ¿Quién es el que mayor cantidad de veces fue campeón de la Liga? ',
    answers: [
      'Shelbourne',
      'Shamrock Rovers',
      'St Patrick\'s Athletic',
    ],
    correct: 1,
    difficulty: 'High',
    creator: 103,
  },
  {
    question: '¿Quién ganó el mundial de fútbol de 1954? ',
    answers: [
      'Brasil',
      'Alemania',
      'Italia'
    ],
    correct: 1,
    difficulty: 'Low',
    creator: 103,
  },
  {
    question: '¿Quién fue subcampeón de Inglaterra en el Mundial 1966? ',
    answers: [
      'Alemania',
      'Portugal',
      'Unión Soviética',
    ],
    correct: 0,
    difficulty: 'Medium',
    creator: 103,
  },
  {
    question: 'En la final de la Champions League del 2005, ¿quiénes metieron los goles del Liverpool? ',
    answers: [
      'Baros - Kewell - Carragher',
      'Gerrard - Kewell - Finnan',
      'Gerrard - Smicer - Xabi Alonso',
      'Luis García - Cissé - Carragher'
    ],
    correct: 2,
    difficulty: 'High',
    creator: 103,
  },
  {
    question: '¿Quién era el Entrenador del Velez Campeón de 1998? ',
    answers: [
      'Carlos Bianchi',
      'Marcelo Bielsa',
      'Alfio Basile',
      'Hugo Tocalli',
      'Héctor Veira',
    ],
    correct: 1,
    difficulty: 'High',
    creator: 103,
  },
  {
    question: '¿Cual es la temporada en que los Gunners de Arsene Wenger se coronan campeones sin perder un partido? ',
    answers: [
      '2000-2001',
      '2003-2004',
      '2007-2008'
    ],
    correct: 1,
    difficulty: 'Low',
    creator: 103,
  },
  {
    question: 'En el año 2006, Holanda y Portugal se enfrentan en los Octavos de Final del Mundial de Alemania. ¿Quién salió victorioso? ',
    answers: [
      'Holanda',
      'Portugal',
      'Perdieron los dos'
    ],
    correct: 1,
    difficulty: 'Low',
    creator: 103,
  },
  {
    question: '¿Quién es el máximo goleador histórico de la Selección Argentina de Fútbol ? ',
    answers: [
      'Diego Armando Maradona',
      'Gabriel Omar Batistuta',
      'Lionel Andrés Messi',
    ],
    correct: 2,
    difficulty: 'Low',
    creator: 103,
  },
  {
    question: '¿Quién fue el campeón del Torneo Nacional de 1984 en Argentina? ',
    answers: [
      'Ferro Carril Oeste',
      'Argentinos Juniors',
      'Independiente',
      'Estudiantes de La Plata',
      'River Plate',
    ],
    correct: 0,
    difficulty: 'High',
    creator: 103,
  },
  {
    question: '¿Quién ganó el Balón de Oro a Mejor Jugador en el mundial del 2002? ',
    answers: [
      'Ronaldo Nazario Lima',
      'Oliver Kahn',
      'Rivaldo',
    ],
    correct: 1,
    difficulty: 'Medium',
    creator: 103,
  },
  {
    question: '¿Quién fue el campeón de la Liga MX en México? ',
    answers: [
      'América',
      'Pachuca',
      'Chivas de Guadalajara',
      'Monterrey',
      'Toluca',
    ],
    correct: 3,
    difficulty: 'High',
    creator: 103,
  },
  {
    question: '¿En cuál de estos equipos no jugó Carlos "El Apache" Tevez? ',
    answers: [
      'Manchester United',
      'West Ham',
      'Flamengo',
    ],
    correct: 2,
    difficulty: 'Low',
    creator: 103,
  },
  {
    question: '¿Cuál de estos equipos ingleses no pertenece a la ciudad de Londres? ',
    answers: [
      'West Ham',
      'Crystal Palace',
      'Tottenham',
      'Aston Villa',
      'Arsenal',
    ],
    correct: 3,
    difficulty: 'Medium',
    creator: 105,
  },
  {
    question: '¿Cuantos goles metió el Polaco-Alemán Miroslav Klose en todos los mundiales? ',
    answers: [
      '14',
      '15',
      '16',
      '17',
    ],
    correct: 2,
    difficulty: 'Low',
    creator: 105,
  },
  {
    question: '¿En cuál de estos equipos no jugó Gerard Piqué? ',
    answers: [
      'Manchester United',
      'Barcelona B',
      'Zaragoza',
    ],
    correct: 1,
    difficulty: 'Medium',
    creator: 105,
  },
  {
    question: '¿Qué equipo ganó la Champions League en el año 2002? ',
    answers: [
      'Inter',
      'Juventus',
      'Real Madrid',
      'Bayern Munich',
    ],
    correct: 2,
    difficulty: 'Medium',
    creator: 105,
  },
  {
    question: '¿Qué tienen en común estos jugadores: Pierre Aubameyang, Thierry Henry, Sebastien Squillaci, David Trezeguet y Emmanuel Petit ? ',
    answers: [
      'Todos Representaron a Francia',
      'Todos jugaron en el Arsenal',
      'Todos son Delanteros',
      'Todos Jugaron en el Monaco',
      'Todos jugaron en la Juventus',
    ],
    correct: 3,
    difficulty: 'High',
    creator: 105,
  },
  {
    question: '¿Jugaron juntos en el Sporting Lisboa, Cristiano Ronaldo y Nani? ',
    answers: [
      'Sí',
      'No',
    ],
    correct: 1,
    difficulty: 'Low',
    creator: 105,
  },
  {
    question: '¿En qué año nació Antoine Griezmann? ',
    answers: [
      '1985',
      '1989',
      '1991',
    ],
    correct: 2,
    difficulty: 'Low',
    creator: 105,
  },
  {
    question: '¿Quién fue el tercer puesto en la entrega del Balón de Oro de la FIFA en el 2008? ',
    answers: [
      'Xavi',
      'Fernando Torres',
      'Kaká',
    ],
    correct: 1,
    difficulty: 'Medium',
    creator: 105,
  },
  {
    question: '¿Cuál de estas ligas no pertenece al Quinteto de competiciones más atractivas según la UEFA? ',
    answers: [
      'Ligue 1',
      'Serie A',
      'Liga Portuguesa',
    ],
    correct: 2,
    difficulty: 'Low',
    creator: 105,
  },
];

const listOfQuestions = listOfQuestionsWithoutId.map((question, i) => {
    const newValue = {id: i};
    const questionObject = Object.assign(question, newValue);
    
    return questionObject;
});


export { listOfQuestions };


