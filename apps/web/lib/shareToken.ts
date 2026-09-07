import crypto from "crypto";
import fs from "fs";
import os from "os";
import path from "path";

type SharePayload = {
  shareId: string;
  patientId: string;
  expiresAt: number;
};

const REVOCATION_FILE = path.join(
  os.tmpdir(),
  "compass-revoked-share-ids.json"
);

const getSecret = () => {
  const secret = process.env.COMPASS_SHARE_SECRET;

  if (!secret) {
    throw new Error(
      "COMPASS_SHARE_SECRET is not configured."
    );
  }

  return secret;
};

const encode = (value: string) =>
  Buffer.from(value, "utf8").toString("base64url");

const decode = (value: string) =>
  Buffer.from(value, "base64url").toString("utf8");

const readRevokedShareIds = (): Set<string> => {
  try {
    if (!fs.existsSync(REVOCATION_FILE)) {
      return new Set();
    }

    const raw = fs.readFileSync(
      REVOCATION_FILE,
      "utf8"
    );

    const values = JSON.parse(raw);

    if (!Array.isArray(values)) {
      return new Set();
    }

    return new Set(
      values.filter(
        (value): value is string =>
          typeof value === "string"
      )
    );
  } catch {
    return new Set();
  }
};

const writeRevokedShareIds = (
  revokedIds: Set<string>
) => {
  fs.writeFileSync(
    REVOCATION_FILE,
    JSON.stringify([...revokedIds]),
    "utf8"
  );
};

export const createShareToken = (
  patientId: string,
  expiresInMinutes = 60
) => {
  const payload: SharePayload = {
    shareId: crypto.randomUUID(),
    patientId,
    expiresAt:
      Date.now() + expiresInMinutes * 60 * 1000,
  };

  const payloadEncoded = encode(
    JSON.stringify(payload)
  );

  const signature = crypto
    .createHmac("sha256", getSecret())
    .update(payloadEncoded)
    .digest("base64url");

  return `${payloadEncoded}.${signature}`;
};

export const verifyShareToken = (
  token: string
): SharePayload | null => {
  const [payloadEncoded, signature] =
    token.split(".");

  if (!payloadEncoded || !signature) {
    return null;
  }

  const expectedSignature = crypto
    .createHmac("sha256", getSecret())
    .update(payloadEncoded)
    .digest("base64url");

  const receivedBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(
    expectedSignature
  );

  if (
    receivedBuffer.length !==
    expectedBuffer.length
  ) {
    return null;
  }

  if (
    !crypto.timingSafeEqual(
      receivedBuffer,
      expectedBuffer
    )
  ) {
    return null;
  }

  try {
    const payload = JSON.parse(
      decode(payloadEncoded)
    ) as SharePayload;

    if (
      !payload.shareId ||
      !payload.patientId ||
      !payload.expiresAt ||
      payload.expiresAt < Date.now()
    ) {
      return null;
    }

    const revokedShareIds =
      readRevokedShareIds();

    if (
      revokedShareIds.has(payload.shareId)
    ) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
};

export const revokeShareToken = (
  token: string
) => {
  const payload = verifyShareToken(token);

  if (!payload) {
    return false;
  }

  const revokedShareIds =
    readRevokedShareIds();

  revokedShareIds.add(payload.shareId);

  writeRevokedShareIds(revokedShareIds);

  return true;
};