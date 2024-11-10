interface AudioItem {
  id: string;
  title: string;
  description: string;
  imageFilePath: string;
  audioFilePath: string;
}

const audioList: AudioItem[] = [
  {
    id: "audio1",
    title: "Meditação Inicial",
    description: "Inicie sua jornada da meditação.",
    imageFilePath: "images/meditacao1.jpg",
    audioFilePath: "audios/audio1.mp3",
  },
  {
    id: "audio2",
    title: "Meditação Guiada",
    description: "Relaxe com nossa meditação guiada.",
    imageFilePath: "images/meditacao2.jpg",
    audioFilePath: "audios/audio2.mp3",
  },
  {
    id: "audio3",
    title: "Meditação Avançada",
    description: "Experimente técnicas avançadas.",
    imageFilePath: "images/meditacao3.jpg",
    audioFilePath: "audios/audio3.mp3",
  },
  {
    id: "audio4",
    title: "Meditação para Relaxamento",
    description: "Encontre paz e tranquilidade.",
    imageFilePath: "images/meditacao4.jpg",
    audioFilePath: "audios/audio4.mp3",
  },
  {
    id: "audio5",
    title: "Meditação para Ansiedade",
    description: "Alivie o estresse e a ansiedade.",
    imageFilePath: "images/meditacao5.jpg",
    audioFilePath: "audios/audio5.mp3",
  },
  {
    id: "audio6",
    title: "Meditação para Concentração",
    description: "Aumente o foco e a produtividade.",
    imageFilePath: "images/meditacao6.jpg",
    audioFilePath: "audios/audio6.mp3",
  },
  {
    id: "audio7",
    title: "Meditação para Autocura",
    description: "Desenvolva a cura interna.",
    imageFilePath: "images/meditacao7.jpg",
    audioFilePath: "audios/audio7.mp3",
  },
  {
    id: "audio8",
    title: "Meditação de Gratidão",
    description: "Aumente seu senso de gratidão.",
    imageFilePath: "images/meditacao8.jpg",
    audioFilePath: "audios/audio8.mp3",
  },
  {
    id: "audio9",
    title: "Meditação para Sono",
    description: "Relaxe profundamente e durma melhor.",
    imageFilePath: "images/meditacao9.jpg",
    audioFilePath: "audios/audio9.mp3",
  },
  {
    id: "audio10",
    title: "Meditação para Paz Interior",
    description: "Encontre a verdadeira paz.",
    imageFilePath: "images/meditacao10.jpg",
    audioFilePath: "audios/audio10.mp3",
  },
  {
    id: "audio11",
    title: "Meditação de Respiração",
    description: "Foque em sua respiração para acalmar a mente.",
    imageFilePath: "images/meditacao11.jpg",
    audioFilePath: "audios/audio11.mp3",
  },
  {
    id: "audio12",
    title: "Meditação Profunda",
    description: "Entre em um estado profundo de relaxamento.",
    imageFilePath: "images/meditacao12.jpg",
    audioFilePath: "audios/audio12.mp3",
  },
];

export default audioList;
