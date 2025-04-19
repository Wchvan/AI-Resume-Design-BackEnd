import { Injectable } from '@nestjs/common';
import { InputDto } from './dto/input.dto';
import { getAIConversationID } from 'src/ai.client';
import { BOT_ID, COZZ_API_KEY } from 'src/config';
import { ChatApiResponse, ChatV3APIResponse } from './entities/ai.entity';

@Injectable()
export class AiService {
  async getMessage(input: InputDto) {
    const conversation_id = await getAIConversationID();
    const body = {
      bot_id: BOT_ID,
      role: 'user',
      user_id: 'test',
      additional_messages: [
        {
          role: 'user',
          type: 'question',
          content: input.input,
          content_type: 'text',
        },
      ],
    };
    let res = await createChat(conversation_id, body);
    const chat_id = res.data.id;
    return new Promise((resolve) => {
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      const timer = setInterval(async () => {
        if (res.data.status != 'created' && res.data.status != 'in_progress') {
          clearInterval(timer);
          const result = await getChatRes(conversation_id, chat_id);
          resolve(result.data[0].content);
        }
        res = await retrieveChat(conversation_id, chat_id);
      }, 1000);
    });
  }
}

async function createChat(conversation_id: string, body: any) {
  return (await (
    await fetch(
      `https://api.coze.cn/v3/chat?conversation_id=${conversation_id}`,
      {
        headers: {
          Authorization: `Bearer ${COZZ_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
        method: 'POST',
      },
    )
  ).json()) as ChatApiResponse;
}

async function retrieveChat(conversation_id: string, chat_id: string) {
  return (await (
    await fetch(
      `https://api.coze.cn/v3/chat/retrieve?conversation_id=${conversation_id}&chat_id=${chat_id}`,
      {
        headers: {
          Authorization: `Bearer ${COZZ_API_KEY}`,
          'Content-Type': 'application/json',
        },
      },
    )
  ).json()) as ChatApiResponse;
}

async function getChatRes(conversation_id: string, chat_id: string) {
  return (await (
    await fetch(
      `https://api.coze.cn/v3/chat/message/list?conversation_id=${conversation_id}&chat_id=${chat_id}`,
      {
        headers: {
          Authorization: `Bearer ${COZZ_API_KEY}`,
          'Content-Type': 'application/json',
        },
      },
    )
  ).json()) as ChatV3APIResponse;
}
