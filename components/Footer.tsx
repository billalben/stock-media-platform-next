import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-6 pb-3">
      <div className="container">
        <div className="rounded-2xl bg-surface-container p-4 text-on-surface-variant md:grid md:grid-cols-2 md:items-end md:gap-6">
          <div>
            <Link
              href="/"
              className="inline-block text-[2.6rem] font-medium text-primary"
            >
              Pixstock
            </Link>
            <p className="my-2 text-body-small leading-4.5 md:mb-1">
              Pixstock is a stock photo app developed by{" "}
              <span className="text-primary">Billal Benz</span> and all Photos
              and Videos provided by{" "}
              <a
                href="https://pexels.com/"
                target="_blank"
                rel="noopener"
                className="inline text-primary hover:underline"
              >
                Pexels
              </a>
              .
            </p>
          </div>
          <div>
            <p className="mb-1 text-label-medium">Follow us on</p>
            <ul className="flex gap-2">
              <li>
                <a
                  href="https://github.com/billalben"
                  target="_blank"
                  rel="noopener"
                  className="text-label-small text-primary hover:underline"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/billal-benzazoua/"
                  target="_blank"
                  rel="noopener"
                  className="text-label-small text-primary hover:underline"
                >
                  Linkedin
                </a>
              </li>
              <li>
                <a
                  href="https://facebook.com/billal.benzazoua/"
                  target="_blank"
                  rel="noopener"
                  className="text-label-small text-primary hover:underline"
                >
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
