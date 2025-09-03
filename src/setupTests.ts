class IntersectionObserverMock {
  constructor(cb: any, options?: any) {}
  observe() {}
  unobserve() {}
  disconnect() {}
}

(global as any).IntersectionObserver = IntersectionObserverMock;
