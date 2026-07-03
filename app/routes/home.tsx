import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <div className="flex flex-wrap gap-4 p-8">
      <div className="rounded-md bg-brand px-4 py-2 text-white">bg-brand</div>
      <div className="rounded-md border-2 border-brand px-4 py-2">
        border-brand
      </div>
      <p className="text-brand">text-brand</p>
      <div className="rounded-md bg-brand-700 px-4 py-2 text-white">
        bg-brand-700
      </div>
      <div className="rounded-md bg-secondary px-4 py-2 text-white">
        bg-secondary
      </div>
      <div className="rounded-md border-2 border-secondary-light px-4 py-2">
        border-secondary-light
      </div>
      <p className="text-secondary-dark">text-secondary-dark</p>
      <div className="rounded-md bg-error px-4 py-2 text-white">
        bg-error
      </div>
      <div className="rounded-md border-2 border-error-dark px-4 py-2">
        border-error-dark
      </div>
      <p className="text-error-light">text-error-light</p>
      <div className="rounded-md bg-warning px-4 py-2 text-white">
        bg-warning
      </div>
      <div className="rounded-md border-2 border-warning-dark px-4 py-2">
        border-warning-dark
      </div>
      <p className="text-warning-light">text-warning-light</p>
      <div className="rounded-md bg-success px-4 py-2 text-white">
        bg-success
      </div>
      <div className="rounded-md border-2 border-success-dark px-4 py-2">
        border-success-dark
      </div>
      <p className="text-success-light">text-success-light</p>
    </div>
  );
}
