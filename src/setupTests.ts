class IntersectionObserverMock {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

(window as typeof globalThis).IntersectionObserver =
  IntersectionObserverMock as unknown as typeof IntersectionObserver;
