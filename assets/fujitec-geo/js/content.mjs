// Deck derivado da apresentação global Fujitec: somente Geolocalização e
// Video Analytics do NEXO, em trilha linear única, sem hub e sem RFID.
// A mídia é reaproveitada de assets/fujitec-global.
export const slides = Object.freeze([
  {
    id: "capa",
    trail: "nexo",
    kicker: "Plataforma de Segurança Inteligente",
    title: "Ambientes que veem, localizam e reagem.",
    emphasis: "veem, localizam e reagem.",
    lead: "Video Analytics + geolocalização dentro da planta para proteger pessoas, controlar zonas de risco e acelerar a resposta operacional.",
    signature: "Fujitec • Segurança conectada ao contexto",
    visual: "cover"
  },
  {
    id: "nexo-01",
    trail: "nexo",
    title: "Conecte imagem e localização ao contexto da sua operação.",
    lead: "NEXO reúne sinais que normalmente chegam separados para que sua equipe enxergue o evento, a zona e as pessoas relacionadas.",
    visual: "nexo-overview",
    media: "assets/fujitec-global/media/geo-mapa-sinotico.jpg",
    alt: "Mapa sinótico industrial usado pelo NEXO",
    resources: [
      ["Video Analytics", "Transforma imagens do CFTV em eventos de segurança configurados."],
      ["Geolocalização", "Relaciona pessoas e deslocamentos às zonas da operação."],
      ["Reconhecimento facial", "Em Desenvolvimento"]
    ]
  },
  {
    id: "nexo-05",
    trail: "nexo",
    title: "Transforme a planta industrial em mapa operacional.",
    lead: "O modelo espacial se adapta à geometria da sua operação, de plantas onshore a estruturas multinível offshore.",
    visual: "dual-map",
    media: [
      {
        file: "assets/fujitec-global/media/geo-mapa-sinotico.jpg",
        label: "Onshore",
        caption: "Áreas, equipamentos e pessoas distribuídos pela planta.",
        alt: "Mapa sinótico de uma planta industrial onshore"
      },
      {
        file: "assets/fujitec-global/media/geo-mapa-embarcacao.jpg",
        label: "Offshore",
        caption: "Conveses e níveis organizados em uma leitura espacial única.",
        alt: "Mapa sinótico multinível de uma embarcação offshore"
      }
    ]
  },
  {
    id: "nexo-06",
    trail: "nexo",
    title: "Transforme o crachá em um recurso de proteção e acesso.",
    lead: "O crachá conecta a pessoa ao mapa e pode apoiar fluxos de segurança da sua equipe sem depender da leitura contínua de uma câmera.",
    visual: "badge-system",
    media: "assets/fujitec-global/images/planta-3d-rtls.webp",
    alt: "Mapa 3D de localização de pessoas por crachá",
    points: [
      ["Localização", "Posição e zona associadas à identidade do crachá."],
      ["SOS", "Canal direto para sinalizar uma situação crítica."],
      ["Geofence", "Regras por área ajudam a orientar permanência e circulação."],
      ["Reconhecimento facial", "Em Desenvolvimento"]
    ]
  },
  {
    id: "nexo-03",
    trail: "nexo",
    title: "Cubra seu setor crítico com uma leitura visual única.",
    lead: "O mapa espacial organiza câmeras, zonas e ocorrências em uma referência reconhecível para quem precisa agir.",
    visual: "zone-map",
    media: "assets/fujitec-global/images/planta-2d-zonas.webp",
    alt: "Planta 2D com zonas operacionais destacadas",
    points: ["Zonas permanentes", "Zonas temporárias", "Áreas de exclusão", "Eventos por setor"]
  },
  {
    id: "nexo-04",
    trail: "nexo",
    title: "Saiba quem está em cada área e como se desloca.",
    lead: "A geolocalização por crachá transforma posição em contexto para acompanhar presença, trajeto e permanência nas áreas da sua operação.",
    visual: "people-map",
    media: "assets/fujitec-global/media/geo-mapa-sinotico.jpg",
    alt: "Mapa sinótico com pessoas distribuídas por uma planta industrial",
    points: [
      ["Presença", "Visualize quem está dentro de cada zona."],
      ["Trajeto", "Consulte o deslocamento associado ao crachá."],
      ["Permanência", "Identifique ocupação e tempo por área."],
      ["Resposta", "Localize sua equipe quando o cenário muda."]
    ]
  },
  {
    id: "nexo-02",
    trail: "nexo",
    title: "Detecte situações críticas enquanto elas acontecem.",
    lead: "A análise local acompanha cenários definidos para sua indústria e converte a cena monitorada em um alerta que pode orientar uma resposta mais rápida.",
    visual: "video-pair",
    videos: [
      {
        file: "assets/fujitec-global/media/video-epi.mp4",
        label: "Uso de EPI",
        caption: "Acompanhe o uso correto dos equipamentos de proteção previstos para a atividade."
      },
      {
        file: "assets/fujitec-global/media/video-carga-suspensa.mp4",
        label: "Carga suspensa",
        caption: "Sinalize exposição em uma zona crítica durante operações de içamento."
      }
    ]
  },
  {
    id: "nexo-08",
    trail: "nexo",
    title: "Conecta evento, pessoa e local em report normalizado sob demanda.",
    lead: "Quando os sinais compartilham o mesmo contexto, sua equipe deixa de reconstruir o cenário e pode concentrar a atenção na decisão.",
    visual: "correlation",
    chain: [
      ["Evento", "A imagem sinaliza a situação."],
      ["Zona", "O mapa identifica o setor crítico."],
      ["Pessoa", "A geolocalização mostra quem está exposto."],
      ["Resposta", "O registro contextualizado segue para sua equipe."]
    ],
    report: {
      title: "Relatório de análise de vídeo",
      detail: "Exemplo de saída: carga suspensa em área offshore.",
      media: "assets/fujitec-global/media/relatorio-carga-suspensa-preview.png",
      alt: "Prévia da primeira página do relatório de análise de vídeo sobre carga suspensa",
      file: "assets/fujitec-global/media/relatorio-carga-suspensa.pdf"
    },
    close: "Voltar ao início"
  }
]);

export const homeRoute = slides[0].id;

export const trailDefinitions = Object.freeze({
  nexo: Object.freeze({ id: "nexo", label: "NEXO", slides })
});

export const screenById = new Map(slides.map((slide) => [slide.id, slide]));
export const validHashes = Object.freeze(slides.map((slide) => slide.id));
