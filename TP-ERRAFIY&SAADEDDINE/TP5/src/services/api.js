const API_URL = 'http://localhost:3000/jobs'

async function request(url, options = {}) {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    ...options
  })

  if (!response.ok) {
    throw new Error('Une erreur est survenue avec le serveur.')
  }

  return response.status === 204 ? null : response.json()
}

export function getJobs() {
  return request(API_URL)
}

export function getJob(id) {
  return request(`${API_URL}/${id}`)
}

export function createJob(job) {
  return request(API_URL, {
    method: 'POST',
    body: JSON.stringify(job)
  })
}

export function updateJob(id, job) {
  return request(`${API_URL}/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(job)
  })
}

export function deleteJob(id) {
  return request(`${API_URL}/${id}`, { method: 'DELETE' })
}
