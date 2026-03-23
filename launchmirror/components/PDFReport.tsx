import React from 'react'
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import type { FormData, MirrorOutput, RoadmapOutput } from '@/types'

interface PDFReportProps {
  formData: FormData
  mirrorOutput: MirrorOutput
  roadmapOutput: RoadmapOutput
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#200c1c',
    color: '#fdd8ef',
    fontFamily: 'Helvetica',
    padding: 40,
  },
  pageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    paddingBottom: 12,
    borderBottomColor: '#4a4455',
    borderBottomWidth: 1,
  },
  brandText: {
    fontSize: 12,
    color: '#7c3aed',
    fontFamily: 'Helvetica-Bold',
  },
  pageNum: {
    fontSize: 10,
    color: '#ccc3d8',
  },
  h1: {
    fontSize: 32,
    fontFamily: 'Helvetica-Bold',
    color: '#fdd8ef',
    marginBottom: 8,
  },
  h2: {
    fontSize: 20,
    fontFamily: 'Helvetica-Bold',
    color: '#fdd8ef',
    marginBottom: 10,
  },
  h3: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    color: '#fdd8ef',
    marginBottom: 6,
  },
  body: {
    fontSize: 11,
    color: '#ccc3d8',
    lineHeight: 1.6,
    marginBottom: 8,
  },
  label: {
    fontSize: 9,
    color: '#ccc3d8',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  card: {
    backgroundColor: '#2a1425',
    borderRadius: 8,
    padding: 14,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  col: {
    flex: 1,
  },
  scoreBox: {
    alignItems: 'center',
    marginBottom: 20,
  },
  scoreNumber: {
    fontSize: 64,
    fontFamily: 'Helvetica-Bold',
    color: '#fdd8ef',
  },
  badge: {
    backgroundColor: '#3a2334',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  badgeText: {
    fontSize: 9,
    color: '#7c3aed',
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  successText: { color: '#4edea3' },
  warnText: { color: '#f59e0b' },
  errorText: { color: '#ffb4ab' },
  coverPage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  coverTitle: {
    fontSize: 42,
    fontFamily: 'Helvetica-Bold',
    color: '#fdd8ef',
    marginBottom: 8,
    textAlign: 'center',
  },
  coverSubtitle: {
    fontSize: 18,
    color: '#ccc3d8',
    marginBottom: 32,
    textAlign: 'center',
  },
  coverBusiness: {
    fontSize: 26,
    fontFamily: 'Helvetica-Bold',
    color: '#7c3aed',
    marginBottom: 12,
    textAlign: 'center',
  },
  tagline: {
    fontSize: 11,
    color: 'rgba(204,195,216,0.6)',
    marginTop: 32,
    textAlign: 'center',
  },
  bullet: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 5,
  },
  bulletDot: {
    fontSize: 11,
    color: '#7c3aed',
  },
  bulletText: {
    fontSize: 11,
    color: '#ccc3d8',
    lineHeight: 1.5,
    flex: 1,
  },
})

function PageHeader({ pageNum }: { pageNum: number }) {
  return (
    <View style={styles.pageHeader}>
      <Text style={styles.brandText}>LaunchMirror</Text>
      <Text style={styles.pageNum}>Page {pageNum} of 5</Text>
    </View>
  )
}

export default function PDFReport({ formData, mirrorOutput, roadmapOutput }: PDFReportProps) {
  const today = new Date().toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <Document>
      {/* Page 1 — Cover */}
      <Page size="A4" style={styles.page}>
        <PageHeader pageNum={1} />
        <View style={styles.coverPage}>
          <Text style={styles.coverTitle}>LaunchMirror</Text>
          <Text style={styles.coverSubtitle}>Business Analysis Report</Text>
          <Text style={styles.coverBusiness}>{formData.businessName}</Text>
          <Text style={[styles.body, { textAlign: 'center' }]}>Generated on {today}</Text>
          <View style={[styles.card, { marginTop: 20, width: '80%' }]}>
            <Text style={styles.label}>Business Details</Text>
            <Text style={styles.body}>Type: {formData.businessType}</Text>
            <Text style={styles.body}>Stage: {formData.currentStage}</Text>
            <Text style={styles.body}>Budget: {formData.monthlyBudget}/month</Text>
            <Text style={styles.body}>Goal: {formData.primaryGoal}</Text>
          </View>
          <Text style={styles.tagline}>Powered by AI. Built for Indian Founders.</Text>
        </View>
      </Page>

      {/* Page 2 — Mirror Analysis */}
      <Page size="A4" style={styles.page}>
        <PageHeader pageNum={2} />
        <Text style={styles.h2}>Mirror Analysis</Text>

        <View style={styles.scoreBox}>
          <Text style={styles.scoreNumber}>{mirrorOutput.viability_score}</Text>
          <Text style={styles.label}>Viability Score (out of 100)</Text>
          <Text style={styles.body}>{mirrorOutput.score_explanation}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.h3}>Market Pulse</Text>
          <Text style={[styles.badge]}><Text style={styles.badgeText}>Trend: {mirrorOutput.market_trend.toUpperCase()}</Text></Text>
          <Text style={styles.body}>{mirrorOutput.market_pulse}</Text>
        </View>

        <Text style={styles.h3}>The Brutal Truth</Text>
        <View style={[styles.card, { borderLeftColor: '#4edea3', borderLeftWidth: 3 }]}>
          <Text style={[styles.label, styles.successText]}>✓ Working For You</Text>
          <Text style={styles.body}>{mirrorOutput.brutal_truth_strong}</Text>
        </View>
        <View style={[styles.card, { borderLeftColor: '#f59e0b', borderLeftWidth: 3 }]}>
          <Text style={[styles.label, styles.warnText]}>⚠ Weak Point</Text>
          <Text style={styles.body}>{mirrorOutput.brutal_truth_weak}</Text>
        </View>
        <View style={[styles.card, { borderLeftColor: '#ffb4ab', borderLeftWidth: 3 }]}>
          <Text style={[styles.label, styles.errorText]}>✕ Will Kill This</Text>
          <Text style={styles.body}>{mirrorOutput.brutal_truth_killer}</Text>
        </View>

        <Text style={styles.h3}>Probability Estimates</Text>
        <View style={styles.card}>
          <Text style={styles.body}>First client in 90 days: {mirrorOutput.prob_first_client}% — {mirrorOutput.explanation_first_client}</Text>
          <Text style={styles.body}>Reach ₹1L/month: {mirrorOutput.prob_100k_monthly}% — {mirrorOutput.explanation_100k}</Text>
          <Text style={styles.body}>Long-term sustainable: {mirrorOutput.prob_sustainable}% — {mirrorOutput.explanation_sustainable}</Text>
        </View>
      </Page>

      {/* Page 3 — Business Model + 90-Day Roadmap */}
      <Page size="A4" style={styles.page}>
        <PageHeader pageNum={3} />
        <Text style={styles.h2}>Business Model Analysis</Text>

        <View style={styles.row}>
          <View style={styles.col}>
            <View style={styles.card}>
              <Text style={[styles.h3, styles.successText]}>Strengths</Text>
              {roadmapOutput.business_model_analysis.strengths.map((s, i) => (
                <View key={i} style={styles.bullet}>
                  <Text style={styles.bulletDot}>✓</Text>
                  <Text style={styles.bulletText}>{s}</Text>
                </View>
              ))}
            </View>
          </View>
          <View style={styles.col}>
            <View style={styles.card}>
              <Text style={[styles.h3, styles.errorText]}>Weaknesses</Text>
              {roadmapOutput.business_model_analysis.weaknesses.map((w, i) => (
                <View key={i} style={styles.bullet}>
                  <Text style={[styles.bulletDot, styles.errorText]}>✕</Text>
                  <Text style={styles.bulletText}>{w}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View style={[styles.card, { borderLeftColor: '#f59e0b', borderLeftWidth: 3 }]}>
          <Text style={[styles.label, styles.warnText]}>Blind Spot</Text>
          <Text style={styles.body}>{roadmapOutput.business_model_analysis.blind_spot}</Text>
        </View>

        <Text style={styles.h2}>90-Day Roadmap</Text>
        <Text style={[styles.h3, { color: '#7c3aed' }]}>Month 1</Text>
        <View style={styles.card}>
          <Text style={styles.label}>Week 1</Text>
          <Text style={styles.body}>{roadmapOutput.ninety_day_roadmap.month1.week1}</Text>
          <Text style={styles.label}>Week 2</Text>
          <Text style={styles.body}>{roadmapOutput.ninety_day_roadmap.month1.week2}</Text>
          <Text style={styles.label}>Week 3</Text>
          <Text style={styles.body}>{roadmapOutput.ninety_day_roadmap.month1.week3}</Text>
          <Text style={styles.label}>Week 4</Text>
          <Text style={styles.body}>{roadmapOutput.ninety_day_roadmap.month1.week4}</Text>
        </View>
        <View style={styles.row}>
          <View style={styles.col}>
            <View style={styles.card}>
              <Text style={[styles.h3, { color: '#7c3aed' }]}>Month 2: {roadmapOutput.ninety_day_roadmap.month2.focus}</Text>
              {roadmapOutput.ninety_day_roadmap.month2.tasks.map((t, i) => (
                <View key={i} style={styles.bullet}>
                  <Text style={styles.bulletDot}>•</Text>
                  <Text style={styles.bulletText}>{t}</Text>
                </View>
              ))}
            </View>
          </View>
          <View style={styles.col}>
            <View style={styles.card}>
              <Text style={[styles.h3, { color: '#7c3aed' }]}>Month 3: {roadmapOutput.ninety_day_roadmap.month3.focus}</Text>
              {roadmapOutput.ninety_day_roadmap.month3.tasks.map((t, i) => (
                <View key={i} style={styles.bullet}>
                  <Text style={styles.bulletDot}>•</Text>
                  <Text style={styles.bulletText}>{t}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </Page>

      {/* Page 4 — Revenue + Marketing */}
      <Page size="A4" style={styles.page}>
        <PageHeader pageNum={4} />
        <Text style={styles.h2}>Revenue Strategy</Text>
        {roadmapOutput.revenue_strategy.map((rs) => (
          <View key={rs.speed_rank} style={styles.card}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
              <Text style={styles.h3}>{rs.angle}</Text>
              <Text style={[styles.badge]}>
                <Text style={styles.badgeText}>
                  {rs.speed_rank === 1 ? 'Fastest Revenue' : rs.speed_rank === 2 ? 'Medium Speed' : 'Slower Build'}
                </Text>
              </Text>
            </View>
            <Text style={styles.label}>Do This Week</Text>
            <Text style={styles.body}>{rs.action_this_week}</Text>
          </View>
        ))}

        <Text style={styles.h2}>Marketing Playbook</Text>
        <View style={styles.card}>
          <Text style={styles.h3}>Platform: {roadmapOutput.marketing_playbook.platform}</Text>
          <Text style={styles.body}>{roadmapOutput.marketing_playbook.platform_reason}</Text>
          <Text style={styles.label}>Content Strategy</Text>
          <Text style={styles.body}>{roadmapOutput.marketing_playbook.content_strategy}</Text>
          <Text style={styles.label}>First 3 Campaigns</Text>
          {roadmapOutput.marketing_playbook.first_three_campaigns.map((c, i) => (
            <View key={i} style={styles.bullet}>
              <Text style={styles.bulletDot}>{i + 1}.</Text>
              <Text style={styles.bulletText}>{c}</Text>
            </View>
          ))}
        </View>
      </Page>

      {/* Page 5 — Automations + Risks */}
      <Page size="A4" style={styles.page}>
        <PageHeader pageNum={5} />
        <Text style={styles.h2}>Top 3 Automations</Text>
        {roadmapOutput.automation_opportunities.map((a) => (
          <View key={a.priority} style={styles.card}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
              <Text style={styles.h3}>{a.what}</Text>
              <Text style={[styles.badge]}>
                <Text style={[styles.badgeText, a.tool_cost.toLowerCase() === 'free' ? styles.successText : {}]}>
                  {a.tool_cost}
                </Text>
              </Text>
            </View>
            <Text style={styles.body}>Tool: {a.tool}</Text>
          </View>
        ))}

        <Text style={styles.h2}>Risk Warnings</Text>
        {roadmapOutput.risk_warnings.map((r, i) => (
          <View key={i} style={[styles.card, { borderLeftColor: '#ffb4ab', borderLeftWidth: 3 }]}>
            <Text style={[styles.h3, styles.errorText]}>{r.risk}</Text>
            <Text style={styles.label}>How to Avoid</Text>
            <Text style={styles.body}>{r.mitigation}</Text>
          </View>
        ))}

        <View style={[styles.card, { marginTop: 24 }]}>
          <Text style={[styles.body, { textAlign: 'center', color: 'rgba(204,195,216,0.6)' }]}>
            Generated by LaunchMirror — AI Business Validator for Indian Founders{'\n'}
            launchmirror.in • Free forever
          </Text>
        </View>
      </Page>
    </Document>
  )
}
