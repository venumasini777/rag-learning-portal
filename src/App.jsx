import { useEffect, useState } from 'react'
import './App.css'

const courseData = {
  id: 'rag',
  title: 'RAG Mastery',
  description:
    'Design, evaluate, and scale Retrieval-Augmented Generation systems with real-world patterns.',
  topics: [
    {
      id: 'foundations',
      title: 'Foundations',
      description: 'Core mental models behind RAG systems.',
      subtopics: [
        { id: 'rag-intro', title: 'What is RAG?' },
        { id: 'llm-limits', title: 'LLM Limitations' },
        { id: 'memory-systems', title: 'Memory Systems' },
        { id: 'grounding', title: 'Grounding & Trust' },
      ],
    },
    {
      id: 'data-ingestion',
      title: 'Data Ingestion',
      description: 'Build reliable pipelines that feed your retriever.',
      subtopics: [
        { id: 'sources', title: 'Source Planning' },
        { id: 'chunking', title: 'Chunking Strategy' },
        { id: 'embeddings', title: 'Embedding Models' },
        { id: 'indexing', title: 'Indexing & Storage' },
        { id: 'freshness', title: 'Update Cadence' },
      ],
    },
    {
      id: 'retrieval',
      title: 'Retrieval',
      description: 'Search approaches that maximize recall and relevance.',
      subtopics: [
        { id: 'hybrid-search', title: 'Hybrid Search' },
        { id: 'filters', title: 'Metadata Filters' },
        { id: 'ranking-signal', title: 'Ranking Signals' },
        { id: 'latency', title: 'Latency Budgets' },
      ],
    },
    {
      id: 're-ranking',
      title: 'Re-ranking',
      description: 'Second-stage intelligence that refines evidence quality.',
      subtopics: [
        {
          id: 'what_is_rerankiing',
          title: 'What is Re-ranking',
          group: 'concept',
          path: '/rag/re-ranking/what_is_rerankiing/index.html',
        },
        {
          id: 'cross_encoder_re_rankers',
          title: 'Cross Encoder Re-rankers',
          group: 'concept',
          path: '/rag/re-ranking/cross_encoder_re_rankers/index.html',
        },
        {
          id: 'hybrid_scoring',
          title: 'Hybrid Scoring',
          group: 'concept',
          path: '/rag/re-ranking/Hybrid_scoring/index.html',
        },
        {
          id: 'llm_based_re_ranking',
          title: 'LLM Based Re-ranking',
          group: 'concept',
          path: '/rag/re-ranking/llm_based_re_ranking/index.html',
        },
        {
          id: 'multi_hop_reranking',
          title: 'Multi-hop Re-ranking',
          group: 'concept',
          path: '/rag/re-ranking/Multi_hop_reranking/index.html',
        },
        {
          id: 'query_expansion_re_ranking',
          title: 'Query Expansion Re-ranking',
          group: 'concept',
          path: '/rag/re-ranking/Query_expansion_re_ranking/index.html',
        },
        {
          id: 'query_ambiguity_handling',
          title: 'Query Ambiguity Handling',
          group: 'concept',
          path: '/rag/re-ranking/Query_ambiguity_handling/index.html',
        },
        {
          id: 'rule_based_re_ranking',
          title: 'Rule-based Re-ranking',
          group: 'concept',
          path: '/rag/re-ranking/Rule_based_re_ranking/index.html',
        },
        {
          id: 'latency_optimization_module',
          title: 'Latency Optimization Module',
          group: 'concept',
          path: '/rag/re-ranking/Latency_optimization_module/index.html',
        },
        {
          id: 'offline_evaluation_metrics',
          title: 'Offline Evaluation Metrics',
          group: 'concept',
          path: '/rag/re-ranking/Offline_evaluation_metrics/index.html',
        },
        {
          id: 'online_evaluation',
          title: 'Online Evaluation',
          group: 'concept',
          path: '/rag/re-ranking/Online_evaluation/index.html',
        },
        // Code Run Down subtopics
        {
          id: 'code-chat_service',
          title: 'chat_service.py',
          group: 'code',
          path: '/rag/re-ranking/code_run_down/chat_service/chat_service.html',
        },
        {
          id: 'code-compound_retriever',
          title: 'compound_retriever.py',
          group: 'code',
          path: '/rag/re-ranking/code_run_down/compound_retriever/compound_retriever.html',
        },
        {
          id: 'code-generate',
          title: 'generate.py',
          group: 'code',
          path: '/rag/re-ranking/code_run_down/generate/generate.html',
        },
        {
          id: 'code-config',
          title: 'config.py',
          group: 'code',
          path: '/rag/re-ranking/code_run_down/config/config.html',
        },
        {
          id: 'code-storage_context_manager',
          title: 'storage_context_manager.py',
          group: 'code',
          path: '/rag/re-ranking/code_run_down/storage_context_manager/storage_context_manager.html',
        },
        // Pull Requests
        {
          id: 'pr-36',
          title: 'PR #36: Chat Compound Query Response',
          group: 'pr',
          path: '/rag/re-ranking/PR/36/index.html',
        },
        {
          id: 'pr-43',
          title: 'PR #43: Fast Inference',
          group: 'pr',
          path: '/rag/re-ranking/PR/43/index.html',
        },
      ],
    },
    {
      id: 'evaluation',
      title: 'Evaluation',
      description: 'Measure truthfulness, latency, and user trust.',
      subtopics: [
        { id: 'golden-sets', title: 'Golden Sets' },
        { id: 'offline-metrics', title: 'Offline Metrics' },
        { id: 'online-metrics', title: 'Online Monitoring' },
        { id: 'user-feedback', title: 'User Feedback Loops' },
      ],
    },
    {
      id: 'deployment',
      title: 'Deployment',
      description: 'Ship your RAG system with confidence.',
      subtopics: [
        { id: 'infra', title: 'Infrastructure Layouts' },
        { id: 'guardrails', title: 'Safety & Guardrails' },
        { id: 'caching', title: 'Caching Strategy' },
        { id: 'observability', title: 'Observability' },
      ],
    },
  ],
}

// Core concepts IDs
const coreConceptIds = [
  'llm_based_re_ranking',
  'rule_based_re_ranking',
  'cross_encoder_re_rankers',
  'latency_optimization_module',
]


function App() {
  const [activeCourse, setActiveCourse] = useState(null)
  const [activeTopic, setActiveTopic] = useState(null)
  const [activeSection, setActiveSection] = useState(null)
  const [activeLesson, setActiveLesson] = useState(null)
  const [isIframeLoading, setIsIframeLoading] = useState(false)

  const isHome = !activeCourse
  const isTopicsPage = activeCourse && !activeTopic
  const isReRanking = activeTopic === 're-ranking'
  const isTopicDetail = activeTopic && activeTopic !== 're-ranking'
  const currentTopic = courseData.topics.find((topic) => topic.id === activeTopic)
  const reRankingTopic = courseData.topics.find((topic) => topic.id === 're-ranking')

  // Categorize subtopics into sections
  const allConcepts = reRankingTopic?.subtopics.filter((s) => s.group === 'concept') ?? []
  const coreConcepts = allConcepts.filter((s) => coreConceptIds.includes(s.id))
  const additionalTheory = allConcepts.filter((s) => !coreConceptIds.includes(s.id))
  const reRankingCode = reRankingTopic?.subtopics.filter((s) => s.group === 'code') ?? []
  const reRankingPR = reRankingTopic?.subtopics.filter((s) => s.group === 'pr') ?? []

  const isSectionView = isReRanking && activeSection
  const isSectionPicker = isReRanking && !activeSection

  // Get current section items
  const getCurrentSectionItems = () => {
    switch (activeSection) {
      case 'core-concepts':
        return coreConcepts
      case 'code-walkthrough':
        return reRankingCode
      case 'pull-requests':
        return reRankingPR
      case 'additional-theory':
        return additionalTheory
      default:
        return []
    }
  }

  const getSectionTitle = () => {
    switch (activeSection) {
      case 'core-concepts':
        return 'Core Concepts'
      case 'code-walkthrough':
        return 'Code Walkthrough'
      case 'pull-requests':
        return 'Pull Request Breakdown'
      case 'additional-theory':
        return 'Additional Theory'
      default:
        return ''
    }
  }

  useEffect(() => {
    if (isSectionView) {
      document.body.classList.add('no-scroll')
    } else {
      document.body.classList.remove('no-scroll')
    }
  }, [isSectionView])

  const onSelectCourse = () => {
    setActiveCourse(courseData.id)
    setActiveTopic(null)
    setActiveLesson(null)
  }

  const onSelectTopic = (topicId) => {
    setActiveTopic(topicId)
    setActiveSection(null)
    setActiveLesson(null)
  }

  const onSelectSection = (sectionId) => {
    setActiveSection(sectionId)
    // Auto-select first available lesson in the section
    let items = []
    switch (sectionId) {
      case 'core-concepts':
        items = coreConcepts
        break
      case 'code-walkthrough':
        items = reRankingCode
        break
      case 'pull-requests':
        items = reRankingPR
        break
      case 'additional-theory':
        items = additionalTheory
        break
      default:
        items = []
    }
    const firstAvailable = items.find((item) => item.path)
    if (firstAvailable) {
      setIsIframeLoading(true)
    }
    setActiveLesson(firstAvailable || null)
  }

  const onSelectSubtopic = (subtopic) => {
    if (subtopic.path) {
      setIsIframeLoading(true)
      setActiveLesson(subtopic)
    } else {
      setActiveLesson(null)
    }
  }

  const onIframeLoad = () => {
    setIsIframeLoading(false)
  }

  const onBackToSections = () => {
    setActiveSection(null)
    setActiveLesson(null)
  }

  const onBackToCourses = () => {
    setActiveCourse(null)
    setActiveTopic(null)
    setActiveSection(null)
    setActiveLesson(null)
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand" onClick={onBackToCourses} role="button">
          <span className="brand-dot" />
          <span>AltGAN</span>
        </div>
        <div className="topbar-actions">
          {!isHome && (
            <button className="ghost-button" onClick={onBackToCourses}>
              Back to My Learning
            </button>
          )}
        </div>
      </header>

      <main className={`app-main ${isSectionView ? 'wide' : ''}`}>
        {isHome && (
          <section className="home-hero">
            <div className="home-copy">
              <p className="eyebrow">Learning Path</p>
              <h1>Master Retrieval-Augmented Generation</h1>
              <p className="hero-subtitle">{courseData.description}</p>
              <button className="primary-button" onClick={onSelectCourse}>
                Start Learning
              </button>
            </div>
            <div className="course-card">
              <div className="course-pill">Single Course</div>
              <h2>{courseData.title}</h2>
              <p className="course-description">
                Deep dive into the systems, metrics, and optimizations behind
                reliable RAG products.
              </p>
              <div className="course-stats">
                <div>
                  <span className="stat-value">6</span>
                  <span className="stat-label">Topics</span>
                </div>
                <div>
                  <span className="stat-value">40+</span>
                  <span className="stat-label">Subtopics</span>
                </div>
                <div>
                  <span className="stat-value">Audio</span>
                  <span className="stat-label">Narration</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {isTopicsPage && (
          <section className="topics-page">
            <div className="topics-header">
              <div>
                <h2>{courseData.title}</h2>
                <p>Select a topic to continue learning.</p>
              </div>
            </div>
            <div className="topics-grid">
              {courseData.topics.map((topic) => (
                <button
                  key={topic.id}
                  className="topic-card"
                  onClick={() => onSelectTopic(topic.id)}
                >
                  <div className="topic-card-header">
                    <span className="topic-pill">Topic</span>
                    <div className="topic-stats-breakdown">
                      {(() => {
                        const concepts = topic.subtopics.filter(s => !s.group || s.group === 'concept').length;
                        const code = topic.subtopics.filter(s => s.group === 'code').length;
                        const prs = topic.subtopics.filter(s => s.group === 'pr').length;

                        return (
                          <>
                            <span className="stat-badge concept">{concepts} Concepts</span>
                            {code > 0 && <span className="stat-badge code">{code} Code</span>}
                            {prs > 0 && <span className="stat-badge pr">{prs} PRs</span>}
                          </>
                        );
                      })()}
                    </div>
                  </div>
                  <h3>{topic.title}</h3>
                  <p>{topic.description}</p>
                  <div className="topic-footer">
                    <span className="topic-action">
                      {topic.id === 're-ranking' ? 'Open module' : 'View overview'}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}

        {isTopicDetail && currentTopic && (
          <section className="topic-detail">
            <div className="topic-detail-header">
              <div>
                <h2>{currentTopic.title}</h2>
                <p>{currentTopic.description}</p>
              </div>
              <button className="ghost-button" onClick={() => setActiveTopic(null)}>
                Back to Topics
              </button>
            </div>
            <div className="topic-detail-list">
              {currentTopic.subtopics.map((subtopic) => (
                <div className="topic-detail-item" key={subtopic.id}>
                  <span className="topic-detail-icon">🔒</span>
                  <div>
                    <h4>{subtopic.title}</h4>
                    <p>Coming soon</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {isSectionPicker && (
          <section className="section-picker">
            <div className="section-picker-header">
              <div>
                <h2>{reRankingTopic?.title}</h2>
                <p>Select a section to explore.</p>
              </div>
              <button className="ghost-button" onClick={() => setActiveTopic(null)}>
                Back to Topics
              </button>
            </div>
            <div className="section-grid">
              <button
                className="section-card"
                onClick={() => onSelectSection('core-concepts')}
              >
                <div className="section-card-header">
                  <span className="section-pill">Section</span>
                  <span className="section-count">{coreConcepts.length} lessons</span>
                </div>
                <h3>Core Concepts</h3>
                <p>Essential re-ranking techniques and algorithms you need to master.</p>
                <div className="section-footer">
                  <span className="section-action">Open section</span>
                </div>
              </button>

              <button
                className="section-card"
                onClick={() => onSelectSection('code-walkthrough')}
              >
                <div className="section-card-header">
                  <span className="section-pill">Section</span>
                  <span className="section-count">{reRankingCode.length} files</span>
                </div>
                <h3>Code Walkthrough</h3>
                <p>Line-by-line breakdown of production re-ranking implementations.</p>
                <div className="section-footer">
                  <span className="section-action">Open section</span>
                </div>
              </button>

              <button
                className="section-card"
                onClick={() => onSelectSection('pull-requests')}
              >
                <div className="section-card-header">
                  <span className="section-pill">Section</span>
                  <span className="section-count">{reRankingPR.length} PRs</span>
                </div>
                <h3>Pull Requests</h3>
                <p>Step-by-step explanation of the changes and engineering decisions behind them.</p>
                <div className="section-footer">
                  <span className="section-action">Open section</span>
                </div>
              </button>

              <button
                className="section-card"
                onClick={() => onSelectSection('additional-theory')}
              >
                <div className="section-card-header">
                  <span className="section-pill">Section</span>
                  <span className="section-count">{additionalTheory.length} lessons</span>
                </div>
                <h3>Additional Theory</h3>
                <p>Deep dives into evaluation, optimization, and advanced topics.</p>
                <div className="section-footer">
                  <span className="section-action">Open section</span>
                </div>
              </button>
            </div>
          </section>
        )}

        {isSectionView && (
          <section className="learning-layout">
            <aside className="sidebar">
              <button className="link-button" onClick={onBackToSections}>
                ← Back to Sections
              </button>
              <h2>{getSectionTitle()}</h2>
              <nav className="topic-list">
                <div className="topic-block">
                  <ul>
                    {getCurrentSectionItems().map((subtopic) => {
                      const isActive = activeLesson?.id === subtopic.id
                      return (
                        <li key={subtopic.id}>
                          <button
                            className={`subtopic-link ${
                              subtopic.path ? '' : 'disabled'
                            } ${isActive ? 'active' : ''}`}
                            onClick={() => onSelectSubtopic(subtopic)}
                          >
                            <span className="subtopic-title">
                              {subtopic.title}
                            </span>
                            {subtopic.path && (
                              <span className="subtopic-audio" title="Audio available">
                                🔊
                              </span>
                            )}
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </nav>
            </aside>
            <div className="learning-main">
              {activeLesson?.path ? (
                <div className="lesson-wrapper">
                  <div className="lesson-frame">
                    {isIframeLoading && (
                      <div className="loading-overlay">
                        <div className="spinner" />
                        <p>Loading content...</p>
                      </div>
                    )}
                    <iframe
                      title={activeLesson.title}
                      src={activeLesson.path}
                      loading="lazy"
                      onLoad={onIframeLoad}
                    />
                  </div>
                </div>
              ) : (
                <div className="lesson-placeholder" />
              )}
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

export default App
