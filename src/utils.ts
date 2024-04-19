/**
 * @description Generates a random string of 8 characters.
 * - This is used to generate unique IDs for players.
 *
 * @returns a random string of 8 characters
 */
export function generateId() {
  return Math.random().toString(36).substr(2, 8);
}
