export class ApiError extends Error {
  constructor(status, data) {
    super(
      typeof data?.message === 'string'
        ? data.message
        : `A requisição falhou (HTTP ${status}).`,
    );
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

/** Cria um transporte HTTP sem depender do formato das entidades da API. */
export function createApiClient(baseUrl) {
  return async function request(path, { json, headers, ...options } = {}) {
    if (!baseUrl?.trim()) {
      throw new Error(
        'Configure VITE_API_BASE_URL antes de fazer requisições.',
      );
    }

    const url = `${baseUrl.trim().replace(/\/+$/, '')}/${path.replace(/^\/+/, '')}`;
    const requestHeaders = new Headers(headers);

    if (json !== undefined) {
      requestHeaders.set('Content-Type', 'application/json');
      options.body = JSON.stringify(json);
    }

    const response = await fetch(url, { ...options, headers: requestHeaders });
    const text = await response.text();
    const isJson = response.headers.get('Content-Type')?.includes('json');
    let data = text || null;

    if (text && isJson) {
      try {
        data = JSON.parse(text);
      } catch (error) {
        // Um erro HTTP deve conservar seu status mesmo com um corpo malformado.
        if (response.ok) throw error;
      }
    }

    if (!response.ok) throw new ApiError(response.status, data);
    return data;
  };
}
