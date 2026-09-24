import { useEffect } from "react";

const ITBI_URL = "https://pmroseira.geosiap.net.br:8443/pmroseira/websis/siapegov/arrecadacao/itbi/itbi_login.php";

export default function ItbiPage() {
  useEffect(() => {
    window.location.replace(ITBI_URL);
  }, []);

  return null;
}
