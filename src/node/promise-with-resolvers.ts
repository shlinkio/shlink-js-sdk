export type PromiseWithResolvers<T> = {
  promise: Promise<T>;
  resolve: (value: T) => void;
  reject: (error: any) => void;
};

export const promiseWithResolvers = <T = unknown>(): PromiseWithResolvers<T> => {
  let resolve: PromiseWithResolvers<T>['resolve'];
  let reject: PromiseWithResolvers<T>['reject'];
  const promise = new Promise<T>((resolve_, reject_) => {
    resolve = resolve_;
    reject = reject_;
  });

  return { promise, resolve: resolve!, reject: reject! };
};
