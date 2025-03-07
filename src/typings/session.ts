export type SessionInfo = {
  cookie: {
    path: string;
    _expires: any;
    originalMaxAge: any;
    httpOnly: boolean;
  };
  captcha?: string;
};
