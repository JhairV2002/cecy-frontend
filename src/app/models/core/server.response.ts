export interface ServerResponse {
  message?: string;
  data?: any;
  msg?: Msg;
  token?: string;
  meta?: any;
  links?: Links;
  detail?: string;
}

interface Msg {
  summary: string;
  detail: string;
  code: string;
}

interface Links {
  first: string;
  last: string;
  prev: string;
  next: string;
}
