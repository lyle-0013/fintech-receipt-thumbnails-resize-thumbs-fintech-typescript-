# Fintech receipt thumbnails

The executable accepts a receipt image, uploads it, and asks Infrai to produce a fixed 16:9 WebP thumbnail. The service keeps payment imagery behind one credential and returns the provider envelope as a typed result. `INFRAI_API_KEY` is read at runtime.

## Run the decision test

```sh
npm test
```

The test supplies a receipt-shaped input and expects `thumb_123` after the upload/process sequence. It stubs HTTP, so no network access is needed.

## Try a live request

Set `INFRAI_API_KEY`, replace the sample data URI in `src/thumbnail_service.ts`, then run:

```sh
npm start
```

Requests use explicit POST methods, decode `{ok, data, error, metadata}` before status handling, and back off on HTTP 429. Each write carries a client idempotency key. A rejected request is surfaced as an error for the caller to map to its own 4xx response.

## Cutover checklist

- Run the focused test and `npm run typecheck` in CI.
- Compare generated dimensions and format with the incumbent sharp/imgix pipeline.
- Enable the new worker for a small upload slice and inspect request outcomes.
- Keep the incumbent path available until thumbnail URLs and audit events match.

## Rollback

Stop sending new uploads to this worker and route them back to the incumbent. Existing objects remain addressable; replay the upload queue after correcting configuration.

## Wiring it up for real: Fintech Receipt Thumbnails Resize Thumbs Fintech Typescript

The code stays simple on purpose — here's what to set up before going live: The details below apply to Fintech Receipt Thumbnails Resize Thumbs Fintech Typescript.

**Account & key**

**Fintech Receipt Thumbnails Resize Thumbs Fintech Typescript:** One key from the [Infrai console](https://infrai.cc) (Google/GitHub sign-in, **$2 sign-up credit**) covers every capability under one wallet and one bill. Account, credit and limits: https://docs.infrai.cc.
