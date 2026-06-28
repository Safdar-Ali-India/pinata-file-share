import { BlogSection } from '@/components/blog/BlogArticleLayout';

export function TemporaryFileSharingArticle() {
  return (
    <>
      <BlogSection
        paragraphs={[
          'Most file-sharing tools ask for an account before you upload a single byte. That friction slows down real work: sending a receipt, sharing a design draft, or passing a video clip to a client. DropLink removes that step entirely.',
          'DropLink is a temporary file-sharing app built for speed. Pick a file, choose how long the link should stay live, and share. No registration, no inbox clutter, no permanent storage footprint on your side.',
        ]}
      />
      <BlogSection
        title="Why no-account sharing matters"
        paragraphs={[
          'Account walls create two problems. First, they add time. Second, they encourage people to keep files online longer than necessary because the upload already cost effort.',
          'Temporary file sharing without an account matches how people actually behave: send now, forget later. When links expire automatically, you reduce the chance that old files stay public by accident.',
          'For freelancers, students, and remote teams, that model is often enough. You do not need a full cloud drive to move one PDF across the internet safely.',
        ]}
      />
      <BlogSection
        title="How DropLink keeps the flow simple"
        paragraphs={[
          'Upload happens in the browser. The server validates file type and size, stores the file on Pinata IPFS with a scheduled expiration, and returns a share link you can copy immediately.',
          'You can choose presets from one hour to thirty days. When the timer ends, Pinata removes the file and the link stops working. That is the entire lifecycle — no manual cleanup required.',
          'DropLink also supports direct gateway links for faster access, while share pages give recipients a clean download experience with a visible expiry countdown.',
        ]}
      />
      <BlogSection
        title="Security without complexity"
        paragraphs={[
          'No account does not mean no protection. DropLink applies upload rate limits, sanitizes filenames, validates MIME types, and keeps Pinata credentials on the server only.',
          'Share URLs use opaque tokens instead of guessable file paths. Combined with expiration, that makes casual link scraping far less useful.',
          'If you handle sensitive documents, pair expiring links with your normal judgment: shorter windows for confidential files, longer only when recipients need time to download.',
        ]}
      />
      <BlogSection
        title="When to use temporary file sharing"
        paragraphs={[
          'Use DropLink when you need a one-off transfer: invoices, screenshots, zipped assets, short audio notes, or presentation exports.',
          'Skip heavy collaboration suites when the task is simply “get this file to someone before Friday.” Temporary sharing is faster, cheaper, and leaves less data behind.',
          'Try DropLink on the homepage — upload, copy the link, and see how much cleaner the workflow feels compared to permanent upload folders.',
        ]}
      />
    </>
  );
}
