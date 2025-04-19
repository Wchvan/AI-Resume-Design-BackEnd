import { ConversationRes } from './ai/entities/ai.entity';
import { BOT_ID, COZZ_API_KEY } from './config';

let conversationId: string;

export const getAIConversationID = async () => {
  if (!conversationId) {
    const body = {
      bot_id: BOT_ID,
      messages: [
        {
          role: 'user',
        },
      ],
    };
    const res = (await (
      await fetch('https://api.coze.cn/v1/conversation/create', {
        headers: {
          Authorization: `Bearer ${COZZ_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
        method: 'POST',
      })
    ).json()) as ConversationRes;
    console.log(res);
    conversationId = res.data.id;
  }
  return conversationId;
};
