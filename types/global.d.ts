import type {PropType as VuePropType} from 'vue';

declare global {
  //time
  type TimeoutHandle = ReturnType<typeof setTimeout>;
  type IntervalHandle = ReturnType<typeof setInterval>;
  interface ChangeEvent extends Event {
    target: HTMLInputElement;
  }
  declare interface ServerConfigs {
    Version?: string;
    Title?: string;
    KeepAlive?: boolean;
    Locale?: string;
    Layout?: string;
  }
  interface AnyObject {
    [key: any]: any;
  }
  // 接口响应通过格式
  interface HttpResponse {
    status: number;
    statusText: string;
    data: {
      code: number;
      desc: string;
      [key: string]: any;
    };
  }
  interface httpCodeType {
    [key: number]: string;
  }
}
