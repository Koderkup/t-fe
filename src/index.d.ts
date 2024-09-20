declare global {
  interface Window {
    ym: (id: number, action: string, params: any) => void;
  }
}

export {};
