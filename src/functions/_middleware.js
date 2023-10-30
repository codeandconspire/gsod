// https://developers.cloudflare.com/workers/examples/basic-auth

export async function onRequest(context) {
  const { request, env } = context

  const auth = request.headers.get('Authorization')
  if (auth) {
    const [scheme, encoded] = auth.split(' ')

    if (!encoded || scheme !== 'Basic') {
      return new Response('Malformed authorization header.', { status: 400 })
    }

    const buffer = Uint8Array.from(atob(encoded), (character) =>
      character.charCodeAt(0)
    )
    const decoded = new TextDecoder().decode(buffer).normalize()

    const index = decoded.indexOf(':')

    // eslint-disable-next-line no-control-regex
    if (index === -1 || /[\0-\x1F\x7F]/.test(decoded)) {
      return new Response('Invalid authorization value.', { status: 400 })
    }

    const user = decoded.substring(0, index)
    const pass = decoded.substring(index + 1)

    if (user !== env.BASIC_USER || pass !== env.BASIC_PASSWORD) {
      return new Response('Invalid username or password.', { status: 401 })
    }

    return context.next()
  }

  return new Response('Login required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="gsod", charset="UTF-8"'
    }
  })
}
