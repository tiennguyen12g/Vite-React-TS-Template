/// <reference types="vite/client" />

declare module "*.css" {
  const content: string;
  export default content;
}

declare module "*.scss" {
  const content: string;
  export default content;
}

declare module "*.sass" {
  const content: string;
  export default content;
}

declare module '*.css';
declare module 'react-syntax-highlighter'
declare module 'react-syntax-highlighter/dist/esm/styles/prism';