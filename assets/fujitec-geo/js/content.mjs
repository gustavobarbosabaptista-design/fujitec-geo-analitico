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
    video: "assets/fujitec-geo/media/mapa-sinotico.mp4",
    media: "assets/fujitec-global/media/geo-mapa-sinotico.jpg",
    alt: "Mapa sinótico industrial usado pelo NEXO em movimento",
    resources: [
      ["Video Analytics", "Transforma imagens do CFTV em eventos de segurança configurados."],
      ["Geolocalização", "Relaciona pessoas e deslocamentos às zonas da operação."],
      ["Reconhecimento facial", "Por Demanda"]
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
    video: "assets/fujitec-geo/media/mapa-sinotico.mp4",
    media: "assets/fujitec-global/images/planta-3d-rtls.webp",
    alt: "Mapa 3D de localização de pessoas por crachá em movimento",
    deviceCard: {
      file: "assets/fujitec-geo/media/cracha-rtls.png",
      alt: "Crachá RTLS Fujitec com botão SOS",
      title: "Crachá inteligente RTLS",
      text: "Usado pelo colaborador, acompanha sua posição dentro da planta, alimenta o mapa em tempo real e aciona SOS em situações críticas."
    },
    points: [
      ["Localização", "Posição e zona associadas à identidade do crachá."],
      ["SOS", "Canal direto para sinalizar uma situação crítica."],
      ["Geofence", "Regras por área ajudam a orientar permanência e circulação."],
      ["Reconhecimento facial", "Por Demanda"]
    ]
  },
  {
    id: "nexo-03",
    trail: "nexo",
    title: "Cubra seu setor crítico com uma leitura visual única.",
    lead: "O mapa espacial organiza câmeras, zonas e ocorrências em uma referência reconhecível para quem precisa agir. Cada deslocamento fica registrado e gera um histórico consultável por pessoa, zona e período.",
    visual: "zone-map",
    video: "assets/fujitec-geo/media/planta-2d.mp4",
    media: "assets/fujitec-global/images/planta-2d-zonas.webp",
    alt: "Planta 2D com zonas operacionais e histórico de deslocamentos",
    points: ["Zonas permanentes", "Zonas temporárias", "Áreas de exclusão", "Eventos por setor", "Histórico de deslocamentos"]
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
    }
  },
  {
    id: "contato",
    trail: "nexo",
    kicker: "Fale conosco",
    title: "Vamos conversar sobre segurança na sua operação.",
    emphasis: "segurança na sua operação.",
    lead: "Solicite uma demonstração ao vivo da plataforma Fujitec — Video Analytics e Geolocalização — na sua operação, de forma presencial ou remota.",
    visual: "contact",
    contacts: [
      {
        label: "Site",
        value: "fujitecbrasil.com.br",
        detail: "@fujitecbrasilnz",
        href: "https://fujitecbrasil.com.br"
      },
      {
        label: "E-mail",
        value: "info@fujitecbrasil.com.br",
        detail: "Rio das Ostras — RJ",
        href: "mailto:info@fujitecbrasil.com.br"
      },
      {
        label: "Telefone / WhatsApp",
        value: "(19) 99777-5917",
        detail: "(85) 99714-5469",
        href: "tel:+5519997775917"
      },
      {
        label: "Parceria comercial",
        value: "+55 11 98019-5401",
        detail: "Cognitia Soluções Inteligentes",
        href: "tel:+5511980195401"
      }
    ],
    certifications: [
      {
        file: "assets/fujitec-geo/brand/anatel.png",
        alt: "Anatel",
        caption: "Homologação de radiofrequência"
      },
      {
        file: "assets/fujitec-geo/brand/inmetro.png",
        alt: "Inmetro",
        caption: "Conformidade metrológica"
      }
    ],
    close: "Voltar ao início"
  }
]);

export const homeRoute = slides[0].id;

export const trailDefinitions = Object.freeze({
  nexo: Object.freeze({ id: "nexo", label: "NEXO", slides })
});

export const screenById = new Map(slides.map((slide) => [slide.id, slide]));
export const validHashes = Object.freeze(slides.map((slide) => slide.id));
