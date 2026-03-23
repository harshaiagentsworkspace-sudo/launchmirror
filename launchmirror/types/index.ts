export interface FormData {
  businessName: string
  description: string
  businessType: 'Product' | 'Service' | 'SaaS' | 'Content' | 'Agency' | 'E-commerce'
  targetAudience: string
  currentStage: 'Just an idea' | 'Just started' | 'Some revenue' | 'Scaling'
  primaryGoal: 'Get first clients' | 'Increase revenue' | 'Build brand' | 'Automate operations'
  monthlyBudget: 'Zero' | 'Under ₹5K' | '₹5K to ₹20K' | '₹20K+'
}

export interface MirrorOutput {
  viability_score: number
  market_pulse: string
  market_trend: 'up' | 'flat' | 'down'
  brutal_truth_strong: string
  brutal_truth_weak: string
  brutal_truth_killer: string
  prob_first_client: number
  prob_100k_monthly: number
  prob_sustainable: number
  explanation_first_client: string
  explanation_100k: string
  explanation_sustainable: string
  score_explanation: string
}

export interface RoadmapOutput {
  business_model_analysis: {
    strengths: string[]
    weaknesses: string[]
    blind_spot: string
  }
  ninety_day_roadmap: {
    month1: { week1: string; week2: string; week3: string; week4: string }
    month2: { focus: string; tasks: string[] }
    month3: { focus: string; tasks: string[] }
  }
  revenue_strategy: Array<{
    angle: string
    speed_rank: number
    action_this_week: string
  }>
  marketing_playbook: {
    platform: string
    platform_reason: string
    content_strategy: string
    first_three_campaigns: string[]
  }
  automation_opportunities: Array<{
    what: string
    tool: string
    tool_cost: string
    priority: number
  }>
  risk_warnings: Array<{
    risk: string
    mitigation: string
  }>
}

export interface SearchResult {
  title: string
  snippet: string
}
