import { neon } from '@neondatabase/serverless'

export const sql = neon(process.env.DATABASE_URL!)

export async function initDB() {
  await sql`
    CREATE TABLE IF NOT EXISTS analyses (
      id SERIAL PRIMARY KEY,
      business_type VARCHAR(50),
      current_stage VARCHAR(50),
      created_at TIMESTAMP DEFAULT NOW()
    )
  `
  await sql`
    CREATE TABLE IF NOT EXISTS waitlist (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `
}

export async function incrementAnalysisCount(
  businessType: string,
  currentStage: string
): Promise<void> {
  try {
    await sql`
      INSERT INTO analyses (business_type, current_stage)
      VALUES (${businessType}, ${currentStage})
    `
  } catch (e) {
    console.error('Failed to log analysis:', e)
  }
}

export async function getAnalysisCount(): Promise<number> {
  try {
    const result = await sql`SELECT COUNT(*) as count FROM analyses`
    return parseInt(result[0].count as string)
  } catch (e) {
    return 0
  }
}

export async function saveToWaitlist(
  name: string,
  email: string
): Promise<{ success: boolean; message: string }> {
  try {
    await sql`
      INSERT INTO waitlist (name, email)
      VALUES (${name}, ${email})
    `
    return { success: true, message: 'Added to waitlist' }
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : ''
    if (msg.includes('unique') || msg.includes('duplicate')) {
      return { success: true, message: 'Already on waitlist' }
    }
    return { success: false, message: 'Failed to save' }
  }
}
