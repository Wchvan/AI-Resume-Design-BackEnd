type ResponseDetail = {
  logid: string;
};
export class ConversationRes {
  data: {
    id: string;
    created_at: string;
    meta_data?: any;
    last_section_id: string;
  };
  detail: ResponseDetail;
  code: number;
  msg: string;
}

type ChatObject = {
  id: string;
  conversation_id: string;
  bot_id: string;
  created_at?: number;
  completed_at?: number;
  failed_at?: number;
  meta_data?: { [key: string]: string };
  last_error?: {
    Code: number;
    Msg: string;
  };
  status:
    | 'created'
    | 'in_progress'
    | 'completed'
    | 'failed'
    | 'requires_action'
    | 'canceled';
  required_action?: {
    type?: 'submit_tool_outputs';
    submit_tool_outputs?: {
      tool_calls?: {
        id?: string;
        type?: 'function' | 'reply_message';
        function?: {
          name?: string;
          arguments?: string;
        };
      }[];
    };
  };
  usage?: {
    token_count?: number;
    output_count?: number;
    input_count?: number;
  };
};

export type ChatApiResponse = {
  data: ChatObject;
  code: number;
  msg: string;
};

// 定义消息类型
type MessageType =
  | 'question'
  | 'answer'
  | 'function_call'
  | 'tool_output'
  | 'tool_response'
  | 'follow_up'
  | 'verbose';

type Role = 'user' | 'assistant';

type ContentType = 'text' | 'object_string' | 'card';

type ChatV3MessageDetail = {
  bot_id: string;
  content: string;
  content_type: ContentType;
  conversation_id: string;
  id: string;
  role: Role;
  type: MessageType;
  chat_id?: string;
  meta_data: Record<string, any>;
  created_at: number;
  section_id?: string;
  updated_at: number;
  reasoning_content?: string;
};

export type ChatV3APIResponse = {
  data: ChatV3MessageDetail[];
  detail: ResponseDetail;
  code: number;
  msg: string;
};
