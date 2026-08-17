import type Lenis from 'lenis';

/** Module-level singleton — avoids window.lenis global type conflicts */
let _instance: Lenis | null = null;

export const getLenis = (): Lenis | null => _instance;
export const setLenis = (l: Lenis | null): void => { _instance = l; };
