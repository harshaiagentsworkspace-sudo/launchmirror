import OpenAI from 'openai'

export function getNvidiaClient(): OpenAI {
  const apiKey = process.env.NVIDIA_API_KEY
  if (!apiKey) {
    throw new Error('NVIDIA_API_KEY environment variable is not set')
  }
  return new OpenAI({
    apiKey,
    baseURL: 'https://integrate.api.nvidia.com/v1',
  })
}
