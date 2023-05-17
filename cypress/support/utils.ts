// utils.ts

/**
 * Generate a unique email address by appending a given number to the local part of the given email.
 * @param {string} email - The base email.
 * @returns {string} - The fresh email.
 */
export function makeFreshEmail(email: string): string {
    const [localPart, domain] = email.split('@')
    const timestamp = new Date().getTime()
    return `${localPart}${timestamp}@${domain}`
}
