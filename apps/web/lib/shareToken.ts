import crypto from "crypto";

export type SharePayload = {
  shareId: string;
  patientId: string;
  expiresAt: number;
};

const getSecret = () => {
  const secret =
    process.env.COMPASS_SHARE_SECRET;

  if (!secret) {
    throw new Error(
      "COMPASS_SHARE_SECRET is not configured."
    );
  }

  return secret;
};

const encode = (value: string) =>
  Buffer.from(value, "utf8").toString(
    "base64url"
  );

const decode = (value: string) =>
  Buffer.from(value, "base64url").toString(
    "utf8"
  );

export const createShareToken = (
  patientId: string,
  expiresInMinutes = 60
) => {
  const payload: SharePayload = {
    shareId: crypto.randomUUID(),
    patientId,
    expiresAt:
      Date.now() +
      expiresInMinutes * 60 * 1000,
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

  const receivedBuffer =
    Buffer.from(signature);

  const expectedBuffer =
    Buffer.from(expectedSignature);

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
      payload.expiresAt <= Date.now()
    ) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
};