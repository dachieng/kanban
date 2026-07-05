import Button from "./ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/Card";
import Input from "./ui/Input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/Popover";

const MailIcon = () => (
  <svg
    className="size-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
  >
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

const HelpCircleIcon = () => (
  <svg
    className="size-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M9.5 9a2.5 2.5 0 0 1 5 0c0 1.5-2.5 1.75-2.5 3.5" />
    <path d="M12 17h.01" />
  </svg>
);

const AlertCircleIcon = () => (
  <svg
    className="size-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v6" />
    <path d="M12 17h.01" />
  </svg>
);

const buttonVariants = [
  "primary",
  "primary-outline",
  "destructive",
  "destructive-outline",
  "success",
  "success-outline",
  "warning",
  "warning-outline",
  "ghost",
] as const;

const buttonSizes = ["sm", "md", "lg", "xl", "2xl"] as const;

const Examples = () => {
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
      <div className="rounded-md bg-error px-4 py-2 text-white">bg-error</div>
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
      <div className="flex w-full flex-wrap items-start gap-4">
        <div className="border-2 border-secondary-light p-spacing-xs">
          <div className="bg-brand p-spacing-xs text-xs text-white">
            p-spacing-xs
          </div>
        </div>
        <div className="border-2 border-secondary-light p-spacing-md">
          <div className="bg-brand p-spacing-md text-xs text-white">
            p-spacing-md
          </div>
        </div>
        <div className="border-2 border-secondary-light p-spacing-xl">
          <div className="bg-brand p-spacing-xl text-xs text-white">
            p-spacing-xl
          </div>
        </div>
        <div className="border-2 border-secondary-light p-spacing-4xl">
          <div className="bg-brand p-spacing-4xl text-xs text-white">
            p-spacing-4xl
          </div>
        </div>
      </div>
      <div className="w-full border-2 border-secondary-light">
        <div className="m-spacing-xl bg-brand p-spacing-xs text-xs text-white">
          m-spacing-xl
        </div>
      </div>
      <div className="flex w-full flex-col gap-2">
        <div className="width-xxs bg-brand p-spacing-xs text-xs text-white">
          width-xxs
        </div>
        <div className="width-xs bg-brand p-spacing-xs text-xs text-white">
          width-xs
        </div>
        <div className="width-sm bg-brand p-spacing-xs text-xs text-white">
          width-sm
        </div>
        <div className="width-md bg-brand p-spacing-xs text-xs text-white">
          width-md
        </div>
        <div className="width-lg bg-brand p-spacing-xs text-xs text-white">
          width-lg
        </div>
        <p className="max-w-paragraph border-2 border-secondary-light p-spacing-xs text-sm">
          max-w-paragraph: The quick brown fox jumps over the lazy dog. The
          quick brown fox jumps over the lazy dog. The quick brown fox jumps
          over the lazy dog. The quick brown fox jumps over the lazy dog.
        </p>
      </div>
      <div className="flex w-full flex-col gap-2">
        <div className="container-padding-mobile bg-brand text-xs text-white">
          container-padding-mobile
        </div>
        <div className="container-padding-desktop bg-brand text-xs text-white">
          container-padding-desktop
        </div>
        <div className="container-max-width-desktop bg-secondary-light p-spacing-xs text-xs">
          container-max-width-desktop
        </div>
      </div>
      <div className="flex w-full flex-col gap-4">
        <div className="flex flex-wrap items-center gap-4">
          {buttonSizes.map((size) => (
            <Button key={size} size={size}>
              {size}
            </Button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-4">
          {buttonVariants.map((variant) => (
            <Button key={variant} variant={variant}>
              {variant}
            </Button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Button disabled>disabled</Button>
        </div>
      </div>
      <div className="grid w-full max-w-3xl grid-cols-2 gap-4">
        <Input
          label="Email"
          required
          placeholder="zuri@safaricom.com"
          endIcon={<HelpCircleIcon />}
          hint="This is a hint text to help user."
        />
        <Input
          label="Email"
          required
          placeholder="zuri@safaricom.com"
          startIcon={<MailIcon />}
          endIcon={<HelpCircleIcon />}
          hint="This is a hint text to help user."
        />
        <Input
          label="Email"
          required
          placeholder="zuri@safaricom.com"
          startIcon={<MailIcon />}
          endIcon={<AlertCircleIcon />}
          error="This is an error message."
        />
        <Input
          label="Email"
          required
          placeholder="zuri@safaricom.com"
          startIcon={<MailIcon />}
          endIcon={<HelpCircleIcon />}
          hint="This is a hint text to help user."
          disabled
        />
      </div>
      <div className="flex w-full flex-wrap items-start gap-4">
        <Card className="w-80">
          <CardHeader>
            <CardTitle>Card title</CardTitle>
            <CardDescription>
              A short description that supports the card title.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-sm text-secondary-900">
              Card content goes here. Any component or text can be placed
              inside this area.
            </p>
          </CardContent>
          <CardFooter>
            <Button size="sm">Confirm</Button>
            <Button size="sm" variant="primary-outline">
              Cancel
            </Button>
          </CardFooter>
        </Card>
        <Popover>
          <PopoverTrigger>
            <Button variant="primary-outline">Open popover</Button>
          </PopoverTrigger>
          <PopoverContent>
            <p className="font-medium text-secondary-900">Popover title</p>
            <p className="mt-spacing-xs text-secondary-500">
              Click outside or press escape to close this popover.
            </p>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default Examples;
