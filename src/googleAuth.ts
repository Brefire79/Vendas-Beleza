export type GoogleUser = {
  name?: string;
  email?: string;
  picture?: string;
};

type GoogleCredentialResponse = {
  credential: string; // JWT
  select_by?: string;
};

function decodeJwt(token: string): any {
  const parts = token.split(".");
  if (parts.length < 2) return null;
  const payload = parts[1].replace(/-/g, "+").replace(/_/g, "/");
  const json = decodeURIComponent(
    atob(payload)
      .split("")
      .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join("")
  );
  return JSON.parse(json);
}

export async function ensureGoogleScript(): Promise<void> {
  if (document.getElementById("google-gis")) return;
  await new Promise<void>((resolve, reject) => {
    const s = document.createElement("script");
    s.id = "google-gis";
    s.src = "https://accounts.google.com/gsi/client";
    s.async = true;
    s.defer = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Falha ao carregar Google Identity script"));
    document.head.appendChild(s);
  });
}

export async function googleSignIn(clientId: string): Promise<{ user: GoogleUser; credential: string }> {
  await ensureGoogleScript();

  const g = (window as any).google;
  if (!g?.accounts?.id) throw new Error("Google Identity não disponível");

  return await new Promise((resolve, reject) => {
    g.accounts.id.initialize({
      client_id: clientId,
      callback: (resp: GoogleCredentialResponse) => {
        try {
          const payload = decodeJwt(resp.credential);
          const user: GoogleUser = {
            name: payload?.name,
            email: payload?.email,
            picture: payload?.picture,
          };
          resolve({ user, credential: resp.credential });
        } catch (e) {
          reject(e);
        }
      },
    });

    // abre um popup de login
    g.accounts.id.prompt((notification: any) => {
      if (notification?.isNotDisplayed?.() || notification?.isSkippedMoment?.()) {
        // fallback: renderizar botão, mas aqui mantemos simples
      }
    });

    // botão invisível/temporário
    const temp = document.createElement("div");
    temp.style.position = "fixed";
    temp.style.right = "16px";
    temp.style.bottom = "16px";
    temp.style.opacity = "0";
    document.body.appendChild(temp);

    g.accounts.id.renderButton(temp, {
      theme: "filled_black",
      size: "large",
      type: "standard",
      text: "signin_with",
      shape: "pill",
    });

    // clica programaticamente (nem sempre funciona em todos browsers; se falhar, usuário clica no botão visível do app)
    setTimeout(() => {
      const btn = temp.querySelector("div[role=button]") as HTMLElement | null;
      btn?.click();
      setTimeout(() => temp.remove(), 3000);
    }, 50);

    // Se não resolver, o usuário vai usar o botão do App (que chama googleSignIn de novo).
    setTimeout(() => {
      // não rejeita duro para não atrapalhar UX
    }, 4000);
  });
}