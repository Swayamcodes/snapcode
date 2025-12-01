export interface UIComponent {
  id: string;
  type: string;
  text?: string;
  src?: string;
  [key: string]: unknown; // safe, no TS errors
}
