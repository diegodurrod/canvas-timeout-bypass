export type LogThisInput = {
  severity: 'plain' | 'info' | 'warning' | 'error' | 'success';
  message: string;
}