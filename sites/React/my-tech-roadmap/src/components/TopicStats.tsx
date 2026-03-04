import React, { useEffect } from 'react';
import { withLoading } from './withLoading';
import type { WithLoadingProps } from './withLoading';

interface TopicStatsBaseProps extends WithLoadingProps {
  title: string
}

const TopicStatsBase:React.FC<TopicStatsBaseProps> = (props) => {
  const { title, isLoading_i, onLoaded_i, toReload_i } = props

  useEffect(() => {
    const timer = setTimeout(() => {
      onLoaded_i();
    }, 1500);

    return () => clearTimeout(timer);
  }, [isLoading_i]);

  return (
    <div style={{ border: '2px solid purple', padding: '15px', marginTop: '20px' }}>
      <h3>Статистика по теме: {title}</h3>

      {/* Рендерим разный UI в зависимости от того, что передал HOC */}
      {isLoading_i ? (
        <p>⏳ Собираем статистику из базы данных...</p>
      ) : (
        <div>
          <p>✅ Статистика успешно загружена!</p>
          <p>Просмотрено уроков: 15/20</p>
        </div>
      )}

      <button onClick={toReload_i}>
        перезагрузить
      </button>
    </div>
  );
}

export const TopicStats = withLoading(TopicStatsBase);