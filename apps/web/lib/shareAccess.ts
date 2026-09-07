import { supabaseAdmin } from "./supabaseAdmin";

import {
  verifyShareToken,
  type SharePayload,
} from "./shareToken";

type CreateShareAccessInput = {
  shareId: string;
  patientId: string;
  expiresAt: number;
};

export const createShareAccess = async ({
  shareId,
  patientId,
  expiresAt,
}: CreateShareAccessInput) => {
  const { error } = await supabaseAdmin
    .from("share_access")
    .insert({
      share_id: shareId,
      patient_id: patientId,
      expires_at: new Date(expiresAt).toISOString(),
    });

  if (error) {
    throw new Error(
      `Unable to register share access: ${error.message}`
    );
  }
};

export const revokeShareAccess = async (
  shareId: string
) => {
  const { error } = await supabaseAdmin
    .from("share_access")
    .update({
      revoked_at: new Date().toISOString(),
    })
    .eq("share_id", shareId);

  if (error) {
    throw new Error(
      `Unable to revoke share access: ${error.message}`
    );
  }
};

export const isShareAccessActive = async (
  shareId: string,
  patientId: string
) => {
  const { data, error } = await supabaseAdmin
    .from("share_access")
    .select(
      "share_id, patient_id, expires_at, revoked_at"
    )
    .eq("share_id", shareId)
    .eq("patient_id", patientId)
    .maybeSingle();

  if (error) {
    throw new Error(
      `Unable to verify share access: ${error.message}`
    );
  }

  if (!data) {
    return false;
  }

  if (data.revoked_at) {
    return false;
  }

  const expiresAt =
    new Date(data.expires_at).getTime();

  if (
    !Number.isFinite(expiresAt) ||
    expiresAt <= Date.now()
  ) {
    return false;
  }

  return true;
};

export const verifyActiveShareToken = async (
  token: string
): Promise<SharePayload | null> => {
  const payload = verifyShareToken(token);

  if (!payload) {
    return null;
  }

  const active = await isShareAccessActive(
    payload.shareId,
    payload.patientId
  );

  if (!active) {
    return null;
  }

  return payload;
};