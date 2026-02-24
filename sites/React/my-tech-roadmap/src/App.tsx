import { useState } from 'react'
import { mockTopics } from './data/mockTopics';
import type { Topic, TopicStatus } from './types/topic';

function App() {
  //const [count, setCount] = useState<number>(0)
  const [topics, setTopics] = useState<Topic[]>(mockTopics);

  const toggleStatus = (id: number) => {
    const updateTopics = topics.map((topic) => {
      if (topic.id === id) {
        let nextStatus: TopicStatus;
        if (topic.status === 'todo') nextStatus = 'in-progress';
        else if (topic.status === 'in-progress') nextStatus = 'done';
        else nextStatus = 'todo';

        return { ...topic, status: nextStatus };
      }

      return topic;
    })

    setTopics(updateTopics);
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>My React Roadmap</h1>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', color: '#000000' }}>
        {topics.map((topic) => (
          <div key={topic.id} style={{
            border: '1px solid #ccc',
            padding: '15px',
            borderRadius: '10px',
            width: '200px',
            backgroundColor: topic.status === 'done' ? '#e6fffa' : '#fff',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <h3>{topic.title}</h3>
            <p>Статус: <strong>{topic.status}</strong></p>

            {/* Добавляем нашу кнопку */}
            <button
              onClick={() => toggleStatus(topic.id)}
              style={{
                cursor: 'pointer',
                padding: '5px 10px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px'
              }}
            >
              Сменить статус
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App;
