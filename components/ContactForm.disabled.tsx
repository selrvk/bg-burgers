// ENABLE-IF-CLIENT-HAS-INBOX
//
// Not wired up, on purpose.
//
// BG Burgers has no published email address and takes orders through Facebook
// Messenger, which they already watch. A contact form would quietly collect
// messages into an inbox nobody opens — worse than having no form at all,
// because the customer believes they have been in touch.
//
// Turn this on ONLY when there is a real inbox someone checks daily. To do so:
//   1. Rename this file to ContactForm.tsx and delete this comment block.
//   2. Point `action` at a form service that works with a static site
//      (Formspree, Netlify Forms, Web3Forms). There is no server here, so a
//      Next.js route handler will NOT work with `output: "export"`.
//   3. Render <ContactForm /> inside FindUs.tsx.
//   4. Add the owner's email to `contact.email` in lib/content.ts.
//
/*
export function ContactForm() {
  return (
    <form
      action="https://formspree.io/f/REPLACE_ME"
      method="POST"
      className="mt-6 grid gap-3"
    >
      <label className="text-sm font-semibold text-cream/90">
        Pangalan
        <input
          type="text"
          name="name"
          required
          autoComplete="name"
          className="mt-1.5 min-h-[48px] w-full rounded-lg border border-cream/20 bg-night-2/60 px-3 text-cream"
        />
      </label>

      <label className="text-sm font-semibold text-cream/90">
        Mobile number
        <input
          type="tel"
          name="phone"
          inputMode="tel"
          autoComplete="tel"
          placeholder="+63 917 123 4567"
          className="mt-1.5 min-h-[48px] w-full rounded-lg border border-cream/20 bg-night-2/60 px-3 text-cream"
        />
      </label>

      <label className="text-sm font-semibold text-cream/90">
        Message
        <textarea
          name="message"
          rows={4}
          required
          className="mt-1.5 w-full rounded-lg border border-cream/20 bg-night-2/60 p-3 text-cream"
        />
      </label>

      <button type="submit" className="btn btn-primary">
        Send
      </button>
    </form>
  );
}
*/

export {};
