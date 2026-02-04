import { useState } from "react";
import { useSelector } from "react-redux";
import { api } from "../src/api/api";
import type {RootState} from "../src/store/store.ts"
import type Message from "../src/types/MessageType.ts"
import type { MessagesStatus } from "../src/types/MessageType.ts"

const ErrorMessage: Message = {
  id: -1,
  author: "Error",
  text: "message not found or some error occured",
  date: "no-date",
}

interface LoadButtonProps {
  func: () => void;
  text?: string
}

function LoadButton({ func, text = "Reload" }: LoadButtonProps) {
  return (
    <button
      className="messages-console__load-button"
      onClick={func}
    >
      {text}
    </button>
  )
}

function MessagesConsole() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [status, setStatus] = useState <MessagesStatus>('idle')
  const messageID = useSelector((state: RootState) => state.counter.value)

  const loadMessages = async () => {
    try {
      const res = await api.get<Message[]>("api/messages");
      setMessages(res.data)
      setStatus("succeeded")
    } catch {
      setMessages([{ id: 0, author: "Error", text: "Ошибка загрузки", date: "" }])
      setStatus("failed")
    }
  };

  const messageData = messages.find(m => m.id === messageID) || ErrorMessage

  return (() => {
    switch (status) {
      case 'loading':
        return (
          <>
            <div className="messages-console">Loading...</div>
            <LoadButton func={loadMessages}></LoadButton>
          </>
        )
      case 'failed':
        return (
          <>
            <div className="messages-console">Error loading messages</div>
            <LoadButton func={loadMessages}></LoadButton>
          </>
        )
      case 'succeeded':
        return (
          <div className="messages-console">
            <div className="messages-console__content" key={messageData.id}>
              <h1 className="messages-console__title">{messageData.author}</h1>
              <p className="h3 messages-console__text">{messageData.text}</p>
              <p className="messages-console__data">{messageData.date}</p>
            </div>
            <LoadButton func={loadMessages}></LoadButton>
          </div>
        )
      case 'idle':
        return (
          <div className="messages-console">
            <div className="messages-console__content" key={messageData.id}>
              <p className="h3 messages-console__text">
                Data not loaded yet
              </p>
            </div>
            <LoadButton func={loadMessages} text={"Load"}></LoadButton>
          </div>
        )
      default:
        return (
          <>
            <div className="messages-console">
              <div className="messages-console__content" key={messageData.id}>
                <p className="h3 messages-console__text">
                  unknown status name error
                </p>
              </div>
              <LoadButton func={loadMessages} text={"Load"}></LoadButton>
            </div>
          </>
        )
    }
  })();
}

export default MessagesConsole