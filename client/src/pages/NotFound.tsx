/**
 * This file is kept for legacy compatibility but is no longer wired to any route.
 * The canonical 404 is NotFoundPage in SitePages.tsx (the Switch fallback).
 * This file re-exports NotFoundPage to avoid any stale import errors.
 */
export { NotFoundPage as default } from "./SitePages";
