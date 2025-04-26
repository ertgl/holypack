declare module "../../../context/context"
{
  interface ContextCustomProperties
  {
    legacy?: boolean | null;
  }

  interface ResolvedContextCustomProperties
  {
    legacy: boolean;
  }
}

export {};
