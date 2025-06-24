"use server";

import { cookies } from "next/headers";

export async function getCookie(name: string): Promise<string | undefined> {
  const c = await cookies();
  const value = c.get(name)?.value;
  return value;
}

export async function setCookie(name: string, value: string, options?: { path?: string; httpOnly?: boolean; sameSite?: "lax" | "strict" | "none"; secure?: boolean; expires?: Date }): Promise<void> {
  const c = await cookies();
  c.set({ name, value, ...options });
}

export async function deleteCookie(name: string): Promise<void> {
  const c = await cookies();
  c.delete(name);
}








