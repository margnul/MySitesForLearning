import { useEffect, useState } from 'react'
import { mockTopics } from './data/mockTopics';
import type { Topic, TopicStatus } from './types/topic';
import { AddTopicForm, } from './components/AddTopicForm';
import { withConfirm } from './utils/withConfirm';
import { TopicStats } from './components/TopicStats';

function App() {
  //const [count, setCount] = useState<number>(0)
  const [topics, setTopics] = useState<Topic[]>(() => {
    const data = localStorage.getItem('my-roadmap-data');

    return data ? JSON.parse(data) : mockTopics;
  });

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

  const deleteTask = (id: number) => {
    const updatedTopics = topics.filter((t) => t.id !== id)

    setTopics(updatedTopics)
  }

  const addTopic = (newTopic: Topic) => {
    setTopics([
      ...topics,
      newTopic,
    ])
  }

  const handleDelete = (id: number) => {
    setTopics(topics.filter(t => t.id != id ));
  }

  const confirmDelete = withConfirm(handleDelete, "Ты точно уверен, что хочешь это удалить?")

  

  useEffect(() => {
    localStorage.setItem('my-roadmap-data', JSON.stringify(topics));
  }, [topics])

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
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
            }}>
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
              <button
                onClick={() => confirmDelete(topic.id)}
                style={{
                  cursor: 'pointer',
                  padding: '5px 10px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px'
                }}
              >
                Удалить
              </button>
            </div>
          </div>
        ))}
        <TopicStats title="React HOCs и Паттерны" />
      </div>

      <div className="addForm"
        style={{
          position: 'absolute',
          right: '0',
          top: '0'
        }}>
        <AddTopicForm onAdd={addTopic} />
      </div>
    </div>
  )
}

export default App;
