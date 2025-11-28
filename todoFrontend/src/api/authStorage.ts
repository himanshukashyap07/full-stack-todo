let accessTokenMemory: string | null = null;

export function setAccessToken(token: string) {
  accessTokenMemory = token;
  localStorage.setItem("accessToken", token); 
}

export function getAccessToken(): string | null {
  if (accessTokenMemory) return accessTokenMemory;
  const stored = localStorage.getItem("accessToken");
  if (stored) accessTokenMemory = stored;
  return accessTokenMemory;
}

export function clearAccessToken() {
  accessTokenMemory = null;
  localStorage.removeItem("accessToken");
}