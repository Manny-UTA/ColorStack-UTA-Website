export async function airtableRequest(env, path, options = {}, fetcher = fetch) {
  const response = await fetcher(`https://api.airtable.com/v0/${env.AIRTABLE_BASE_ID}/${path}`, {
    ...options,
    headers: { Authorization: `Bearer ${env.AIRTABLE_ACCESS_TOKEN}`, 'Content-Type': 'application/json' },
    cache: 'no-store', signal: AbortSignal.timeout(10000),
  });
  if (!response.ok) throw new Error(`Airtable request failed (${response.status})`);
  return response.json();
}

export async function recordPayment(env, fields, fetcher = fetch) {
  // Validate the linked record first; never create a member from billing email.
  await airtableRequest(env, `Members/${fields.Member[0]}`, {}, fetcher);
  // Server-side upsert allows a retry to repair partial processing without an
  // ordinary read-then-create race. Keep this field immutable and unique.
  await airtableRequest(env, encodeURIComponent('Dues Payments'), {
    method: 'PATCH',
    body: JSON.stringify({ performUpsert: { fieldsToMergeOn: ['Stripe Session ID'] }, records: [{ fields }] }),
  }, fetcher);
  // Activation deliberately awaits the verified-member/term entitlement layer.
  // Recording a payment must not overwrite an alumni or suspended status.
}
