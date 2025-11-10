import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('api/messages', () => {
    return HttpResponse.json([
      {
        id: 1,
        date: "2025-02-01 14:32",
        author: "Admin",
        text: "Добро пожаловать! Сервер работает"
      },
      {
        id: 2,
        date: "2025-02-01 14:35",
        author: "System",
        text: "Сообщение подключено к MSW"
      },
      {
        id: 3,
        date: "2025-02-01 14:39",
        author: "user1",
        text: "Первое сообщение!"
      }
    ])
  })
]