/** Condomínio JCR — dados confirmados pelo cliente em 13/07/2026 (spec DF8).
 * Fase REAL: aprovação e licenciamento ambiental (não está em obra).
 * A copy da seção enfatiza planejamento/aprovação — nunca "em execução".
 * Contador da home vai até 46 (valor final sempre no HTML). */
export const CONDOMINIO_JCR = {
  nome: "Condomínio JCR",
  unidades: 46,
  local: "Areias de Palhocinha, Garopaba/SC",
  fase: "Aprovação e licenciamento ambiental",
  previsao: "2028",
  // ⚠️ nomes dos arquivos vieram trocados no zip: fora2.png é a AÉREA do
  // condomínio; cond2.png é a vista de rua (unidades 04/07).
  imagemAerea: "/media/img/fora2.png",
  imagemRua: "/media/img/cond2.png",
} as const;
