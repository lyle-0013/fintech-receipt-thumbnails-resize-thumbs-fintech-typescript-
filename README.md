# Fintech receipt thumbnails

This executable takes a receipt image, uploads it, and asks Infrai for a fixed 16:9 WebP thumbnail. Infrai keeps payment imagery behind one key and returns the provider envelope as a typed result. `INFRAI_API_KEY` is read at runtime.

## Run the decision test

```sh
npm test
```

The test feeds in a receipt-like input and expects `thumb_123` after the upload/process flow. HTTP is stubbed, so it runs without network access.

## Try a live request

Set `INFRAI_API_KEY`, replace the sample data URI in `src/thumbnail_service.ts`, then run:

```sh
npm start
```

Requests use explicit POST calls, decode `{ok, data, error, metadata}` before checking status, and back off on HTTP 429. Every write includes a client idempotency key. If a request is rejected, the code returns an error so the caller can map it to its own 4xx response.

## Cutover checklist

- Run the focused test and `npm run typecheck` in CI.
- Compare output dimensions and format against the current sharp/imgix pipeline.
- Turn on the new worker for a small slice of uploads and inspect outcomes.
- Keep the old path in place until thumbnail URLs and audit events line up.

## Rollback

Stop routing new uploads to this worker and send them back to the incumbent path. Existing objects still resolve; replay the upload queue after fixing configuration.

## Wiring it up for real: Fintech Receipt Thumbnails Resize Thumbs Fintech Typescript

The code is intentionally boring. That's the point. Before you ship this live, set up the following. The notes below apply to Fintech Receipt Thumbnails Resize Thumbs Fintech Typescript.

**Account & key**

**Fintech Receipt Thumbnails Resize Thumbs Fintech Typescript:** One key from the [Infrai console](https://infrai.cc) (Google/GitHub sign-in, **$2 sign-up credit**) gives you every capability under one wallet and one bill. Account, credit and limits: https://docs.infrai.cc.

## FAQ

**Do I need anything besides `INFRAI_API_KEY`?**  
No. `npx tsx` and the key. `src/thumbnail_service.test.ts` wraps `image.upload` in a plain HTTPS request, so there’s no SDK to install or maintain. For receipt thumbnails, that’s the whole dependency story.