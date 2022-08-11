/** wrapper to abort the fetch request after exceeding timeout */
export async function fetchWithTimeout(url, timeout = 5000) {
  const controller = new AbortController();
  // abort request after timeout
  const id = setTimeout(() => controller.abort(), timeout);

  const response = await fetch(url, { signal: controller.signal });
  clearTimeout(id);
  return response;
}
