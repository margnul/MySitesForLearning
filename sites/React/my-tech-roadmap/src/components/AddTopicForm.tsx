import React, { useState } from 'react';
import type { Topic, Category } from '../types/topic';

export interface AddTopicFormProps {
  onAdd: (topic: Topic) => void,
}

export const AddTopicForm = (props: AddTopicFormProps) => {
  const { onAdd } = props
  const defaultCategory: Category = 'TypeScript'

  const [formData, setFormData] = useState<{
    title: string,
    category: Category,
  }>({
    title: '',
    category: defaultCategory
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.title === "") return;

    const newTopic: Topic = {
      id: Date.now(),
      title: formData.title,
      category: formData.category,
      status: 'todo'
    }

    onAdd(newTopic);
    setFormData({
      title: '',
      category: defaultCategory
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
      display: 'flex',
      flexDirection: 'column',
      border: '1px solid white',
      padding: '20px',
      gap: '10px'
    }}>
      <input
        type="text"
        placeholder="Название темы..."
        value={formData.title}
        onChange={(e) => setFormData(
          { ...formData, title: e.target.value }
        )}
      />

      <select
        value={formData.category}
        onChange={(e) => setFormData(
          { ...formData, category: e.target.value as Category }
        )}
      >
        <option value="TypeScript">TypeScript</option>
        <option value="React">React</option>
        <option value="Redux">Redux</option>
        <option value="Optimization">Optimization</option>
        <option value="Testing">Testing</option>
      </select>

      <button type="submit" style={{ cursor: 'pointer' }}>
        Добавить
      </button>

    </form>
  )
}