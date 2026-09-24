import { useEffect } from "react";

const DIVIDA_ATIVA_URL = "https://pmroseira.geosiap.net.br:8443/pmroseira/websis/siapegov/arrecadacao/geda/geda_consulta.php";

export default function DividaAtivaPage() {
  useEffect(() => {
    window.location.replace(DIVIDA_ATIVA_URL);
  }, []);

  return null;
}
