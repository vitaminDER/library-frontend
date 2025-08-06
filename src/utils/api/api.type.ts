type InterceptorType = "request" | "response";
type InterceptorId = number;

export type Interceptor = {
  type: InterceptorType;
  id: InterceptorId;
};
