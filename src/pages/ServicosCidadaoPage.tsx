import { useEffect } from "react";

const SERVICOS_CIDADAO_URL = "https://pmroseira.geosiap.net.br:8443/pmroseira/websis/siapegov/portal/";

export default function ServicosCidadaoPage() {
  useEffect(() => {
    window.location.replace(SERVICOS_CIDADAO_URL);
  }, []);

  return null;
}
