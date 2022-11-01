declare module 'store' {
  declare global {
    type cacheType = {
      mode: string;
      name?: RouteRecordName;
    };

    type commonType = {
      today: string;
      week: string;
      quarter: string;
    };
    type userType = {
      locale: string;
      token: string;
      expires: number;
      name?: string;
      list?: [];
    };
  }
}
