export const tarotCards: Record<string, string> = {
  "startupbro": "https://res.cloudinary.com/dh9y9v9kg/image/upload/v1775587221/ChatGPT_Image_Apr_7_2026_02_36_47_PM_dykwrb.png",
  "theinfluencer": "https://res.cloudinary.com/dh9y9v9kg/image/upload/v1776023607/ChatGPT_Image_Apr_12_2026_03_53_07_PM_drujwf.png",
  "thevc": "https://res.cloudinary.com/dh9y9v9kg/image/upload/v1769291079/TheVC_cukm3w.png",
  "thegyminfluencer": "https://res.cloudinary.com/dh9y9v9kg/image/upload/v1769291099/TheGymfluencer_d6nnuh.png",
  "thematch": "https://res.cloudinary.com/dh9y9v9kg/image/upload/v1769291119/TheMatch_u5185g.png",
  "thecatfish": "https://res.cloudinary.com/dh9y9v9kg/image/upload/v1769291167/TheCatfish_jwytxx.png",
  "theprincess": "https://res.cloudinary.com/dh9y9v9kg/image/upload/v1769291184/ThePrincess_wa3rts.png",
  "theburntoutpm": "https://res.cloudinary.com/dh9y9v9kg/image/upload/v1775588867/ChatGPT_Image_Apr_7_2026_03_07_38_PM_bwpr0o.png",
  "themaincharacter": "https://res.cloudinary.com/dh9y9v9kg/image/upload/v1769291221/TheMainCharacter_idmqms.png",
  "thealgospin": "https://res.cloudinary.com/dh9y9v9kg/image/upload/v1769291239/TheAlgoSpin_khkn5q.png",
  "thenpc": "https://res.cloudinary.com/dh9y9v9kg/image/upload/v1769291257/TheNPC_zdbtp9.png",
  "thepodcaster": "https://res.cloudinary.com/dh9y9v9kg/image/upload/v1776008143/ChatGPT_Image_Apr_12_2026_11_35_36_AM_yeugun.png",
  "theipadkid": "https://res.cloudinary.com/dh9y9v9kg/image/upload/v1769291296/theIpadKid_pb3wzv.png",
  "thetherapist": "https://res.cloudinary.com/dh9y9v9kg/image/upload/v1769291314/TheTherapist_ouk1uc.png",
  "forbes30u30": "https://res.cloudinary.com/dh9y9v9kg/image/upload/v1775589389/Justice_confined_in_Forbes_30_under_30_n6rmgf.png",
  "thehustler": "https://res.cloudinary.com/dh9y9v9kg/image/upload/v1769291345/TheHustler_baenmk.png",
  "thedigitalnomad": "https://res.cloudinary.com/dh9y9v9kg/image/upload/v1769291363/TheDigitalNomad_u3tbi8.png",
  "thediscordmod": "https://res.cloudinary.com/dh9y9v9kg/image/upload/v1769291374/theDiscordMod_xgvcg3.png",
  "therebrand": "https://res.cloudinary.com/dh9y9v9kg/image/upload/v1769291394/TheRebrand_vhka6m.png",
  "thewellnessbro": "https://res.cloudinary.com/dh9y9v9kg/image/upload/v1769291415/TheWellnessbro_p8bwgb.png",
  "thehealingera": "https://res.cloudinary.com/dh9y9v9kg/image/upload/v1769291435/TheHealingEra_fvffay.png",
  "themarketcrash": "https://res.cloudinary.com/dh9y9v9kg/image/upload/v1769291449/TheMarketcrash_rjw9f6.png",
};

export function getCardUrl(name: string): string {
  if (!name) return tarotCards["startupbro"];
  // Normalize string: lowercase, remove spaces, remove .png, remove parentheses and their content
  const normalized = name.toLowerCase()
    .replace(/\.png/g, '')
    .replace(/\s+/g, '')
    .replace(/\(.*?\)/g, '');
  
  // Specific fallbacks or edge cases if normalization isn't exact
  if (normalized.includes('forbes')) return tarotCards["forbes30u30"];

  return tarotCards[normalized] || tarotCards['startupbro']; // fallback if missing
}
