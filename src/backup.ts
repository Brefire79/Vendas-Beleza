import type { AppState } from "./types";
import { exportJSON } from "./storage";

export function downloadBackup(state: AppState) {
  const content = exportJSON(state);
  const blob = new Blob([content], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `beleza-vendas-backup-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();

  URL.revokeObjectURL(url);
}

export async function importBackupFile(file: File): Promise<AppState> {
  const text = await file.text();
  const parsed = JSON.parse(text) as AppState;
  return {
    products: parsed.products ?? [],
    sales: parsed.sales ?? [],
    tasks: parsed.tasks ?? [],
    lastBackupISO: parsed.lastBackupISO ?? new Date().toISOString(),
  };
}

/**
 * Placeholder para backup no Google Drive.
 * Para funcionar de verdade:
 * - habilitar Google Drive API no Google Cloud
 * - OAuth consent screen
 * - usar oauth access token e upload via Drive API
 */
export async function backupToGoogleDrivePlaceholder(): Promise<void> {
  alert("Backup no Google Drive: falta configurar credenciais e Drive API. Eu posso te guiar nesse passo.");
}