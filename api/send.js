// Fonction Vercel : envoie la demande du formulaire vers le WhatsApp du propriétaire (CallMeBot).
// Variables à définir dans Vercel (Settings > Environment Variables) :
//   CALLMEBOT_APIKEY = clé reçue par WhatsApp après activation
//   WHATSAPP_PHONE   = 237680165593 (numéro qui reçoit les demandes, sans +)
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false });
  const phone = process.env.WHATSAPP_PHONE || '237680165593';
  const apikey = process.env.CALLMEBOT_APIKEY;
  const msg = String((req.body && req.body.message) || '').trim().slice(0, 1500);
  if (!msg || !apikey) return res.status(200).json({ ok: false });
  try {
    const url = 'https://api.callmebot.com/whatsapp.php?' +
      new URLSearchParams({ phone, text: msg, apikey }).toString();
    const r = await fetch(url);
    return res.status(200).json({ ok: r.ok });
  } catch (e) {
    return res.status(200).json({ ok: false });
  }
}
