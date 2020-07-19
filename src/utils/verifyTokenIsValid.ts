// @ts-ignore
import decode from "jwt-decode";

export default function (token = null) {
  const currentToken = token || localStorage.getItem("token");
  if (!currentToken) return;
  const decodedCurrentToken = decode(currentToken);

  if (Number(decodedCurrentToken.exp) * 1000 > Date.now()) {
    return true;
  }
    return false;
}
