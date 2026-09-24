export const OFFICER_ROLES = ["president", "internal_vp", "external_vp", "treasurer", "secretary", "recruitment"];
export function verifiedEmail(user) {
  const email = user?.emailAddresses?.find(e => e.id === user.primaryEmailAddressId);
  return email?.verification?.status === "verified" ? email.emailAddress.toLowerCase() : null;
}
export function canEdit(user) {
  return Boolean(verifiedEmail(user) && OFFICER_ROLES.includes(user?.privateMetadata?.colorstackRole));
}
