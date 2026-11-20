"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);
const STORAGE_KEY = "technova_firebase_session_v1";
const DEFAULT_SETTINGS = { apiKey: "", adminUid: "" };

const AUTH_ERRORS = {
  EMAIL_EXISTS: "Esse e-mail já está cadastrado.", EMAIL_NOT_FOUND: "E-mail ou senha incorretos.",
  INVALID_PASSWORD: "E-mail ou senha incorretos.", INVALID_LOGIN_CREDENTIALS: "E-mail ou senha incorretos.",
  WEAK_PASSWORD: "A senha precisa ter ao menos 6 caracteres.", OPERATION_NOT_ALLOWED: "Ative o provedor E-mail/Senha no Firebase Authentication.",
  TOO_MANY_ATTEMPTS_TRY_LATER: "Muitas tentativas. Tente novamente mais tarde.", INVALID_EMAIL: "Digite um e-mail válido.",
};

const readSession = () => {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "null"); } catch { return null; }
};
const writeSession = (session) => {
  try { session ? localStorage.setItem(STORAGE_KEY, JSON.stringify(session)) : localStorage.removeItem(STORAGE_KEY); } catch {}
};
async function firebasePost(apiKey, endpoint, payload, base = "https://identitytoolkit.googleapis.com/v1/") {
  const response = await fetch(`${base}${endpoint}?key=${encodeURIComponent(apiKey)}`, {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const code = data?.error?.message || "UNKNOWN_ERROR";
    throw new Error(AUTH_ERRORS[code] || `Erro na autenticação: ${code}`);
  }
  return data;
}

export function AuthProvider({ children }) {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  const [configured, setConfigured] = useState(false);

  const refreshSession = useCallback(async (oldSession, apiKey) => {
    const resp = await fetch(`https://securetoken.googleapis.com/v1/token?key=${encodeURIComponent(apiKey)}`, {
      method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ grant_type: "refresh_token", refresh_token: oldSession.refreshToken }),
    });
    if (!resp.ok) throw new Error("Sessão expirada.");
    const token = await resp.json();
    return { uid: token.user_id, email: oldSession.email, idToken: token.id_token,
      refreshToken: token.refresh_token, expiresAt: Date.now() + Number(token.expires_in || 3600) * 1000 };
  }, []);

  useEffect(() => {
    let live = true;
    async function boot() {
      let cfg = DEFAULT_SETTINGS;
      try {
        const res = await fetch("/firebase-config.json", { cache: "no-store" });
        if (res.ok) cfg = await res.json();
      } catch {}
      cfg = { apiKey: String(cfg.apiKey || "").trim(), adminUid: String(cfg.adminUid || "").trim() };
      if (!live) return;
      setSettings(cfg);
      const enabled = Boolean(cfg.apiKey && !cfg.apiKey.includes("COLE_AQUI"));
      setConfigured(enabled);
      const saved = readSession();
      if (enabled && saved?.refreshToken) {
        try {
          const session = await refreshSession(saved, cfg.apiKey);
          if (!live) return;
          writeSession(session); setUser(session);
        } catch { writeSession(null); }
      }
      if (live) setReady(true);
    }
    boot();
    return () => { live = false; };
  }, [refreshSession]);

  const login = async (email, password) => {
    if (!configured) throw new Error("Configure o Firebase para ativar as contas reais.");
    const data = await firebasePost(settings.apiKey, "accounts:signInWithPassword", { email, password, returnSecureToken: true });
    const session = { uid: data.localId, email: data.email, idToken: data.idToken, refreshToken: data.refreshToken,
      expiresAt: Date.now() + Number(data.expiresIn || 3600) * 1000 };
    writeSession(session); setUser(session);
    return session;
  };
  const register = async (email, password) => {
    if (!configured) throw new Error("Configure o Firebase para ativar as contas reais.");
    const data = await firebasePost(settings.apiKey, "accounts:signUp", { email, password, returnSecureToken: true });
    const session = { uid: data.localId, email: data.email, idToken: data.idToken, refreshToken: data.refreshToken,
      expiresAt: Date.now() + Number(data.expiresIn || 3600) * 1000 };
    writeSession(session); setUser(session);
    return session;
  };
  const resetPassword = async (email) => {
    if (!configured) throw new Error("Configure o Firebase para ativar as contas reais.");
    await firebasePost(settings.apiKey, "accounts:sendOobCode", { requestType: "PASSWORD_RESET", email });
  };
  const logout = () => { writeSession(null); setUser(null); };
  const isAdmin = Boolean(user?.uid && settings.adminUid && user.uid === settings.adminUid);
  return <AuthContext.Provider value={{ user, ready, configured, isAdmin, login, register, resetPassword, logout }}>
    {children}
  </AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);
