import { NextResponse } from "next/server";

const DONORBOX_URL =
  "https://donorbox.org/embed/give-page-donation?language=en&designation=Emergency+Relief";

const COMMENT = "Noa's fundraiser";

export async function GET() {
  const res = await fetch(DONORBOX_URL);
  let html = await res.text();

  // Add base tag so all relative URLs resolve to donorbox.org
  html = html.replace("<head>", `<head><base href="https://donorbox.org/" /><style>.donation-form{margin:0 auto!important}</style>`);

  // Prefill comment
  html = html.replace(
    `name="donation[comment]">\n</textarea>`,
    `name="donation[comment]">${COMMENT}</textarea>`
  );

  // Check the "leave a comment" checkbox so comment field is visible
  html = html.replace(
    `id="leave_a_comment" class="mdl-checkbox__input"`,
    `id="leave_a_comment" class="mdl-checkbox__input" checked`
  );

  return new NextResponse(html, {
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}
