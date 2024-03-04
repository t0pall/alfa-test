import FingerprintJS from "@fingerprintjs/fingerprintjs"

export async function getVisitorId() {
  const fp = await FingerprintJS.load()
  return await fp.get()
}
