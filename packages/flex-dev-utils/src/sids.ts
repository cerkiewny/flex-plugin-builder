/**
 * Validates the string is a valid sid
 *
 * @param sid the sid
 */
export const isValidSid = (sid: string | null | undefined) => sid && /^[A-Z]{2}[0-9a-f]{32}$/.test(sid);

/**
 * Validates sid is of type prefix provided
 *
 * @param sid     the sid
 * @param prefix  the prefix of the sid
 */
export const isSidOfType = (sid: string | null | undefined, prefix: string) => {
  return sid && prefix && isValidSid(sid) && prefix.toUpperCase() === sid.substr(0, 2);
};

export default {
  isValidSid,
  isSidOfType,
};
