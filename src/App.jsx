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

function App() {
  const [activeCourse, setActiveCourse] = useState(null)
  const [activeTopic, setActiveTopic] = useState(null)
  const [activeLesson, setActiveLesson] = useState(null)

  const isHome = !activeCourse
  const isTopicsPage = activeCourse && !activeTopic
  const isReRanking = activeTopic === 're-ranking'
  const isTopicDetail = activeTopic && activeTopic !== 're-ranking'
  const currentTopic = courseData.topics.find((topic) => topic.id === activeTopic)
  const reRankingTopic = courseData.topics.find((topic) => topic.id === 're-ranking')
  const reRankingConcepts = reRankingTopic?.subtopics.filter((s) => s.group === 'concept') ?? []
  const reRankingCode = reRankingTopic?.subtopics.filter((s) => s.group === 'code') ?? []
  const reRankingPR = reRankingTopic?.subtopics.filter((s) => s.group === 'pr') ?? []
  const isLessonView = Boolean(activeLesson?.path)

  useEffect(() => {
    if (isReRanking && isLessonView) {
      document.body.classList.add('no-scroll')
    } else {
      document.body.classList.remove('no-scroll')
    }
  }, [isReRanking, isLessonView])

  const onSelectCourse = () => {
    setActiveCourse(courseData.id)
    setActiveTopic(null)
    setActiveLesson(null)
  }

  const onSelectTopic = (topicId) => {
    setActiveTopic(topicId)
    setActiveLesson(null)
  }

  const onSelectSubtopic = (topicId, subtopic) => {
    setActiveTopic(topicId)
    if (subtopic.path) {
      setActiveLesson(subtopic)
    } else {
      setActiveLesson(null)
    }
  }

  const onBackToCourses = () => {
    setActiveCourse(null)
    setActiveTopic(null)
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

      <main className={`app-main ${isReRanking ? 'wide' : ''}`}>
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

        {isReRanking && (
          <section className="learning-layout">
            <aside className="sidebar">
              <button className="link-button" onClick={onBackToCourses}>
                ← Back to My Learning
              </button>
              <h2>{reRankingTopic?.title}</h2>
              <nav className="topic-list">
                {reRankingConcepts.length > 0 && (
                  <div className="topic-block">
                    <h3>Concepts</h3>
                    <ul>
                      {reRankingConcepts.map((subtopic) => {
                        const isActive = activeLesson?.id === subtopic.id
                        return (
                          <li key={subtopic.id}>
                            <button
                              className={`subtopic-link ${
                                subtopic.path ? '' : 'disabled'
                              } ${isActive ? 'active' : ''}`}
                              onClick={() => onSelectSubtopic(reRankingTopic.id, subtopic)}
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
                )}
                {reRankingCode.length > 0 && (
                  <div className="topic-block" style={{ marginTop: '1.75rem' }}>
                    <h3>Code Run Down</h3>
                    <ul>
                      {reRankingCode.map((subtopic) => {
                        const isActive = activeLesson?.id === subtopic.id
                        return (
                          <li key={subtopic.id}>
                            <button
                              className={`subtopic-link ${
                                subtopic.path ? '' : 'disabled'
                              } ${isActive ? 'active' : ''}`}
                              onClick={() => onSelectSubtopic(reRankingTopic.id, subtopic)}
                            >
                              <span className="subtopic-title">
                                {subtopic.title}
                              </span>

                              {subtopic.path && (
                                <span className="subtopic-icon" title="Audio available">
                                  🔊
                                </span>
                              )}
                            
                            </button>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                )}
                {reRankingPR.length > 0 && (
                  <div className="topic-block" style={{ marginTop: '1.75rem' }}>
                    <h3>Pull Requests</h3>
                    <ul>
                      {reRankingPR.map((subtopic) => {
                        const isActive = activeLesson?.id === subtopic.id
                        return (
                          <li key={subtopic.id}>
                            <button
                              className={`subtopic-link ${
                                subtopic.path ? '' : 'disabled'
                              } ${isActive ? 'active' : ''}`}
                              onClick={() => onSelectSubtopic(reRankingTopic.id, subtopic)}
                            >
                              <span className="subtopic-title">
                                {subtopic.title}
                              </span>
                              {subtopic.path && (
                                <span className="subtopic-icon" title="Audio available">
                                  🔊
                                </span>
                              )}
                          
                            </button>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                )}
              </nav>
            </aside>
            <div className="learning-main">
              {activeLesson?.path ? (
                <div className="lesson-wrapper">
                  {/* <div className="lesson-toolbar">
                    <div>
                      <h1>{activeLesson.title}</h1>
                      <p>Audio narration is available inside the lesson.</p>
                    </div>
                  </div> */}
                  <div className="lesson-frame">
                    <iframe
                      title={activeLesson.title}
                      src={activeLesson.path}
                      loading="lazy"
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
