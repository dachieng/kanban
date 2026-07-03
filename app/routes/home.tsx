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
      <div className="flex w-full gap-4">
        <p className="font-regular">font-regular</p>
        <p className="font-medium">font-medium</p>
        <p className="font-semibold">font-semibold</p>
        <p className="font-bold">font-bold</p>
      </div>
      <div className="flex w-full flex-wrap items-baseline gap-4">
        <p className="text-xxs">text-xxs</p>
        <p className="text-xs">text-xs</p>
        <p className="text-sm">text-sm</p>
        <p className="text-md">text-md</p>
        <p className="text-lg">text-lg</p>
        <p className="text-xl">text-xl</p>
        <p className="text-display-xs">display-xs</p>
        <p className="text-display-sm">display-sm</p>
        <p className="text-display-md">display-md</p>
        <p className="text-display-lg">display-lg</p>
        <p className="text-display-xl">display-xl</p>
        <p className="text-display-2xl">display-2xl</p>
      </div>
      <div className="flex w-full flex-wrap gap-4">
        <p className="w-40 border border-secondary-light text-sm leading-xs">
          leading-xs: The quick brown fox jumps over the lazy dog.
        </p>
        <p className="w-40 border border-secondary-light text-sm leading-lg">
          leading-lg: The quick brown fox jumps over the lazy dog.
        </p>
        <p className="w-40 border border-secondary-light text-sm leading-display-2xl">
          leading-display-2xl: The quick brown fox jumps over the lazy dog.
        </p>
      </div>
      <div className="flex w-full flex-wrap items-center gap-4">
        <div className="radius-none size-16 border-2 border-brand" />
        <div className="radius-xxs size-16 border-2 border-brand" />
        <div className="radius-xs size-16 border-2 border-brand" />
        <div className="radius-sm size-16 border-2 border-brand" />
        <div className="radius-md size-16 border-2 border-brand" />
        <div className="radius-lg size-16 border-2 border-brand" />
        <div className="radius-xl size-16 border-2 border-brand" />
        <div className="radius-2xl size-16 border-2 border-brand" />
        <div className="radius-3xl size-16 border-2 border-brand" />
        <div className="radius-4xl size-16 border-2 border-brand" />
        <div className="radius-full size-16 border-2 border-brand" />
      </div>
    </div>
  );
}
