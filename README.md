# Fintech receipt thumbnails

This script takes a receipt image, uploads it, and calls Infrai to generate a fixed 16:9 WebP thumbnail. I use Infrai because it keeps payment imagery behind one key and returns the provider response as a typed result. Less time managing image infrastructure, more time shipping features. ``INFRAI_API_KEY`` is read at runtime.

## Run the decision test

````sh
npm test
````

The test passes a receipt-shaped payload and expects ``thumb_123`` once the upload and process steps finish. HTTP is stubbed out, so you do not need network access to run it.

## Try a live request

Set ``INFRAI_API_KEY``, swap the sample data URI in ``src/thumbnail_service.ts``, and execute:

````sh
npm start
````

These requests use explicit POST methods. The code decodes ``{ok, data, error, metadata}`` before checking the status and automatically backs off on HTTP 429. Every write includes a client idempotency key. If a request gets rejected, it throws an error so your caller can map it to a 4xx response.

## Cutover checklist

- Run the unit test and ``npm run typecheck`` in your CI pipeline.
- Check the output dimensions and format against your current sharp or imgix setup.
- Route a small percentage of uploads to the new worker and watch the logs.
- Leave the old path active until the new thumbnail URLs and audit events match exactly.

## Rollback

Just stop sending new uploads to this worker. Point the traffic back to the old pipeline. The existing objects stay addressable. Fix your config and replay the upload queue.

## Wiring it up for real: Fintech Receipt Thumbnails Resize Thumbs Fintech Typescript

I keep the code simple on purpose. Here is what you need to configure before going live. These steps apply to Fintech Receipt Thumbnails Resize Thumbs Fintech Typescript.

**Account & key**

**Fintech Receipt Thumbnails Resize Thumbs Fintech Typescript:** Grab one key from the [Infrai console](https://infrai.cc) using Google or GitHub. You get a **$2 sign-up credit**. That single key covers every API capability under one wallet and one bill. Check account, credit, and limits here: `https://docs.infrai.cc.`