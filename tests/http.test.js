import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { createServer } from 'node:http';
import { once } from 'node:events';
import { createApiClient } from '../src/services/http.js';

let server;
let request;

before(async () => {
  server = createServer(async (req, res) => {
    if (req.url === '/api/empty') {
      res.writeHead(204).end();
      return;
    }
    if (req.url === '/api/text') {
      res.writeHead(200, { 'Content-Type': 'text/plain' }).end('pronto');
      return;
    }
    if (req.url === '/api/no-body') {
      res.writeHead(200).end();
      return;
    }
    if (req.url === '/api/error') {
      res.writeHead(422, { 'Content-Type': 'application/problem+json' });
      res.end(JSON.stringify({ message: 'Dados inválidos', fields: ['nome'] }));
      return;
    }
    if (req.url === '/api/unavailable') {
      res
        .writeHead(503, { 'Content-Type': 'text/html' })
        .end('<h1>Indisponível</h1>');
      return;
    }
    if (req.url === '/api/broken-json') {
      res.writeHead(200, { 'Content-Type': 'application/json' }).end('{');
      return;
    }
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        path: req.url,
        method: req.method,
        contentType: req.headers['content-type'] ?? null,
        authorization: req.headers.authorization ?? null,
        body: Buffer.concat(chunks).toString(),
      }),
    );
  });
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  request = createApiClient(`http://127.0.0.1:${server.address().port}/api/`);
});

after(
  () =>
    new Promise((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
      server.closeAllConnections();
    }),
);

test('preserva o prefixo da API e a consulta ao juntar os caminhos', async () => {
  const result = await request('/campos?status=ativo');
  assert.equal(result.path, '/api/campos?status=ativo');
  assert.equal(result.method, 'GET');
  assert.equal(result.contentType, null);
});

test('envia JSON e preserva os headers definidos pelo grupo', async () => {
  const result = await request('campos', {
    method: 'POST',
    json: { nome: 'Campo de teste' },
    headers: { Authorization: 'Bearer token-de-teste' },
  });
  assert.equal(result.method, 'POST');
  assert.equal(result.contentType, 'application/json');
  assert.equal(result.authorization, 'Bearer token-de-teste');
  assert.deepEqual(JSON.parse(result.body), { nome: 'Campo de teste' });
});

test('envia FormData com o boundary produzido pelo navegador', async () => {
  const form = new FormData();
  form.append('nome', 'Campo de teste');
  const result = await request('upload', { method: 'POST', body: form });
  assert.match(result.contentType, /^multipart\/form-data; boundary=/);
  assert.match(result.body, /Campo de teste/);
});

test('aceita respostas sem corpo e respostas em texto', async () => {
  assert.equal(await request('empty'), null);
  assert.equal(await request('no-body'), null);
  assert.equal(await request('text'), 'pronto');
});

test('expõe status e detalhes do erro de validação da API', async () => {
  await assert.rejects(request('error'), (error) => {
    assert.equal(error.status, 422);
    assert.equal(error.message, 'Dados inválidos');
    assert.deepEqual(error.data.fields, ['nome']);
    return true;
  });
});

test('preserva o status de erro quando o servidor devolve HTML', async () => {
  await assert.rejects(request('unavailable'), (error) => {
    assert.equal(error.status, 503);
    assert.equal(error.data, '<h1>Indisponível</h1>');
    return true;
  });
});

test('não apresenta JSON inválido como uma resposta bem-sucedida', async () => {
  await assert.rejects(request('broken-json'), SyntaxError);
});

test('respeita o cancelamento de uma requisição', async () => {
  const controller = new AbortController();
  controller.abort();
  await assert.rejects(request('campos', { signal: controller.signal }), {
    name: 'AbortError',
  });
});

test('avisa quando a URL da API ainda não foi configurada', async () => {
  const unconfiguredRequest = createApiClient('');
  await assert.rejects(unconfiguredRequest('campos'), /VITE_API_BASE_URL/);
});
